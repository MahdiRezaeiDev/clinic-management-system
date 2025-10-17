import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';
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

    // ⚡ حداقل دو نقطه برای Line
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

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet([
            ...filteredData,
            selectedMonth === 'کل سال'
                ? { month: 'جمع کل سال', ...totals }
                : filteredTotals,
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Finance');
        XLSX.writeFile(wb, 'FinanceReport.xlsx');
    };

    const exportPDF = () => {
        const element = tableRef.current;
        html2pdf()
            .set({
                margin: 10,
                filename: 'FinanceReport.pdf',
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
            <div className="mx-auto my-8 max-w-7xl space-y-6">
                {/* فیلتر ماه */}
                <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow">
                    <label className="font-medium text-gray-700">
                        انتخاب ماه:
                    </label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="کل سال">کل سال</option>
                        {afghanMonths.map((m, idx) => (
                            <option key={idx} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                {/* نمودار منحنی */}
                <div className="h-80 w-full rounded-xl bg-white p-4 shadow-lg">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12, fill: '#4B5563' }}
                            />
                            <YAxis tick={{ fontSize: 12, fill: '#4B5563' }} />
                            <Tooltip
                                formatter={(value) => value.toLocaleString()}
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
                        <thead className="bg-gray-100">
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
                                        className="px-6 py-3 text-sm font-medium text-gray-600"
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
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {m.month}
                                    </td>
                                    <td className="px-6 py-4">
                                        {m.pharmacySales.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {m.purchasedMedicine.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {m.staffSalaries.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {m.visits.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        {m.income.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-red-600">
                                        {m.expenses.toLocaleString()}
                                    </td>
                                    <td
                                        className={`px-6 py-4 font-semibold ${m.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}
                                    >
                                        {m.profit.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {selectedMonth === 'کل سال' && (
                                <tr className="bg-gray-200 text-lg font-bold">
                                    <td className="px-6 py-4">جمع کل سال</td>
                                    <td className="px-6 py-4">
                                        {totals.pharmacySales.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {totals.purchasedMedicine.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {totals.staffSalaries.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {totals.visits.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-green-600">
                                        {totals.income.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-red-600">
                                        {totals.expenses.toLocaleString()}
                                    </td>
                                    <td
                                        className={`px-6 py-4 ${totals.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}
                                    >
                                        {totals.profit.toLocaleString()}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-4">
                    <button
                        onClick={exportExcel}
                        className="rounded bg-blue-500 px-6 py-2 font-medium text-white shadow-lg transition hover:bg-blue-600"
                    >
                        خروجی Excel
                    </button>
                    <button
                        onClick={exportPDF}
                        className="rounded bg-green-500 px-6 py-2 font-medium text-white shadow-lg transition hover:bg-green-600"
                    >
                        خروجی PDF
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
