import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import * as XLSX from 'xlsx';

export default function FinanceLineChart({ monthlyData, totals }) {
    const [selectedMonth, setSelectedMonth] = useState('کل سال');
    const afghanMonths = [
        'حمل',
        'ثور',
        'جوزا',
        'سرطان',
        'اسد',
        'سنبله',
        'میزان',
        'عقرب',
        'قوس',
        'جدی',
        'دلو',
        'حوت',
    ];
    const tableRef = useRef();

    // ⚡ اطمینان از حداقل دو نقطه در نمودار
    const filteredData = useMemo(() => {
        if (selectedMonth === 'کل سال') return monthlyData;
        const monthIndex = monthlyData.findIndex(
            (m) => m.month === selectedMonth,
        );
        const current = monthlyData[monthIndex];
        const prev = monthlyData[monthIndex - 1] || current;
        const next = monthlyData[monthIndex + 1] || current;
        return [prev, current, next];
    }, [selectedMonth, monthlyData]);

    const filteredTotals = useMemo(() => {
        if (selectedMonth === 'کل سال') return totals;
        return filteredData[1] || {};
    }, [selectedMonth, filteredData, totals]);

    // ✅ اصلاح خروجی Excel با نام ستون‌های فارسی
    const exportExcel = () => {
        const records = filteredData.map((item) => ({
            ماه: item.month,
            'فروش دارو': item.pharmacySales,
            'خرید دارو': item.purchasedMedicine,
            حقوق: item.staffSalaries,
            ویزیت: item.visits,
            درآمد: item.income,
            مصارف: item.expenses,
            'سود/زیان': item.profit,
        }));

        if (selectedMonth === 'کل سال') {
            records.push({
                ماه: 'جمع کل سال',
                'فروش دارو': totals.pharmacySales,
                'خرید دارو': totals.purchasedMedicine,
                حقوق: totals.staffSalaries,
                ویزیت: totals.visits,
                درآمد: totals.income,
                مصارف: totals.expenses,
                'سود/زیان': totals.profit,
            });
        }

        const ws = XLSX.utils.json_to_sheet(records);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'گزارش مالی');
        XLSX.writeFile(wb, 'گزارش_مالی.xlsx');
    };

    // ✅ PDF فارسی و راست‌چین
    const exportPDF = () => {
        const element = tableRef.current;
        html2pdf()
            .set({
                margin: 10,
                filename: 'گزارش_مالی.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, letterRendering: true },
                jsPDF: { orientation: 'landscape' },
            })
            .from(element)
            .save();
    };

    return (
        <AuthenticatedLayout title="گزارش مالی">
            <Head title="گزارش مالی" />
            <div className="mx-auto my-8 max-w-6xl space-y-6" dir="rtl">
                {/* فیلتر ماه */}
                <div className="flex items-center gap-4 rounded-xl bg-teal-700 p-4 shadow">
                    <label className="font-medium text-white">
                        انتخاب ماه:
                    </label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="rounded-md border bg-white px-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="کل سال">کل سال</option>
                        {afghanMonths.map((m, idx) => (
                            <option key={idx} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                {/* نمودار منحنی راست‌چین */}
                <div
                    dir="rtl"
                    className="h-80 w-full rounded-xl bg-white p-4 shadow-lg"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={[...filteredData]} // جهت داده‌ها برعکس
                            margin={{
                                top: 10,
                                right: 20,
                                left: 20,
                                bottom: 10,
                            }}
                        >
                            <XAxis
                                dataKey="month"
                                reversed // 🔹 محور X راست‌چین
                                tick={{
                                    fontSize: 12,
                                    fill: '#4B5563',
                                    fontFamily: 'Vazir, Tahoma, sans-serif',
                                    textAnchor: 'end',
                                }}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                tick={{
                                    fontSize: 13,
                                    fontFamily: 'Vazir, Tahoma, sans-serif',
                                    textAnchor: 'end',
                                }}
                                orientation="right"
                            />
                            <Tooltip
                                labelFormatter={(name) => `ماه: ${name}`}
                                formatter={(value) =>
                                    `${value.toLocaleString()} افغانی`
                                }
                                contentStyle={{
                                    fontFamily: 'Vazir, Tahoma, sans-serif',
                                    fontSize: '13px',
                                    direction: 'rtl',
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#22c55e"
                                name="درآمد"
                                strokeWidth={3}
                            />
                            <Line
                                type="monotone"
                                dataKey="expenses"
                                stroke="#ef4444"
                                name="هزینه"
                                strokeWidth={3}
                            />
                            <Line
                                type="monotone"
                                dataKey="profit"
                                stroke="#facc15"
                                name="سود/زیان"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* جدول */}
                <div
                    ref={tableRef}
                    className="overflow-x-auto rounded-xl bg-white p-4 shadow-lg"
                >
                    <table className="min-w-full divide-y divide-gray-200 text-right">
                        <thead className="bg-teal-700">
                            <tr>
                                {[
                                    'ماه',
                                    'فروش دارو',
                                    'خرید دارو',
                                    'حقوق',
                                    'ویزیت',
                                    'درآمد',
                                    'مصارف',
                                    'سود/زیان',
                                ].map((h, idx) => (
                                    <th
                                        key={idx}
                                        className="px-2 py-3 text-right text-sm font-semibold text-white"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.map((m, idx) => (
                                <tr
                                    key={idx}
                                    className="text-gray-800 transition-colors even:bg-sky-100 hover:bg-sky-200"
                                >
                                    <td className="p-2 text-right text-sm font-semibold">
                                        {m.month}
                                    </td>
                                    <td className="p-2 text-right text-sm font-semibold">
                                        {m.pharmacySales.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right text-sm font-semibold">
                                        {m.purchasedMedicine.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right text-sm font-semibold">
                                        {m.staffSalaries.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right text-sm font-semibold">
                                        {m.visits.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right text-sm font-semibold text-green-600">
                                        {m.income.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right text-sm font-semibold text-red-600">
                                        {m.expenses.toLocaleString()}
                                    </td>
                                    <td
                                        className={`p-2 text-right text-sm font-semibold ${
                                            m.profit >= 0
                                                ? 'text-green-700'
                                                : 'text-red-700'
                                        }`}
                                    >
                                        {m.profit.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {selectedMonth === 'کل سال' && (
                                <tr className="text-md bg-teal-700 font-semibold text-white">
                                    <td className="p-2 text-right">
                                        جمع کل سال
                                    </td>
                                    <td className="p-2 text-right">
                                        {totals.pharmacySales.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right">
                                        {totals.purchasedMedicine.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right">
                                        {totals.staffSalaries.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right">
                                        {totals.visits.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right">
                                        {totals.income.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right">
                                        {totals.expenses.toLocaleString()}
                                    </td>
                                    <td className={`p-2 text-right`}>
                                        {totals.profit.toLocaleString()}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-4">
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={exportExcel}
                            className="flex items-center gap-2 rounded bg-green-700 px-6 py-2 text-white transition hover:bg-green-800"
                        >
                            <FileSpreadsheet className="h-5 w-5" />
                            خروجی اکسل
                        </button>

                        <button
                            onClick={exportPDF}
                            className="flex items-center gap-2 rounded bg-sky-700 px-6 py-2 text-white transition hover:bg-sky-800"
                        >
                            <FileText className="h-5 w-5" />
                            خروجی PDF
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
                    /* Remove focus outline for charts */
                    .recharts-wrapper:focus,
                    .recharts-wrapper svg:focus {
                        outline: none !important;
                    }
                `}
            </style>
        </AuthenticatedLayout>
    );
}
