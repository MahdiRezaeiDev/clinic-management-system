import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';
import {
    Activity,
    Calendar,
    ChevronDown,
    DollarSign,
    FileSpreadsheet,
    FileText,
    ShoppingCart,
    TrendingDown,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import * as XLSX from 'xlsx';

export default function FinanceLineChart({ monthlyData, totals }) {
    const [selectedMonth, setSelectedMonth] = useState('کل سال');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [animateChart, setAnimateChart] = useState(false);
    const dropdownRef = useRef(null);
    const tableRef = useRef();

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

    // Animation on mount
    useEffect(() => {
        setAnimateChart(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    // Calculate growth percentages
    const calculateGrowth = (current, previous) => {
        if (!previous || previous === 0) return 0;
        return (((current - previous) / previous) * 100).toFixed(1);
    };

    const currentMonthData =
        selectedMonth !== 'کل سال' ? filteredData[1] : null;
    const previousMonthData =
        selectedMonth !== 'کل سال' && filteredData[0] !== filteredData[1]
            ? filteredData[0]
            : null;

    const exportExcel = () => {
        const records = filteredData.map((item) => ({
            ماه: item.month,
            'فروش دارو': item.pharmacySales,
            'خرید دارو': item.purchasedMedicine,
            حقوق: item.staffSalaries,
            ویزیت: item.visitsIncome,
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
                ویزیت: totals.visitsIncome,
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

    const StatCard = ({
        title,
        value,
        icon: Icon,
        trend,
        trendValue,
        color,
    }) => (
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute left-0 top-0 h-full w-1 ${color}`}></div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-800">
                        {value?.toLocaleString()}{' '}
                        <span className="text-sm font-normal text-gray-500">
                            افغانی
                        </span>
                    </p>
                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            {trend > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span
                                className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                                {trend > 0 ? '+' : ''}
                                {trendValue}%
                            </span>
                            <span className="text-xs text-gray-500">
                                نسبت به ماه قبل
                            </span>
                        </div>
                    )}
                </div>
                <div
                    className={`rounded-xl p-3 ${color.replace('bg-', 'bg- bg-opacity-10')}`}
                >
                    <Icon
                        className={`h-6 w-6 ${color.replace('bg-', 'text-')}`}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout title="گزارش مالی">
            <Head title="گزارش مالی" />

            {/* Custom gradient background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            داشبورد مالی
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            بررسی و تحلیل عملکرد مالی کلینیک
                        </p>
                    </div>

                    {/* Custom Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 rounded-xl bg-white px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <Calendar className="h-5 w-5 text-teal-600" />
                            <span className="font-medium text-gray-700">
                                {selectedMonth}
                            </span>
                            <ChevronDown
                                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="animate-slideDown absolute left-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5">
                                <button
                                    onClick={() => {
                                        setSelectedMonth('کل سال');
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`block w-full px-4 py-2 text-right text-sm transition-colors hover:bg-teal-50 ${
                                        selectedMonth === 'کل سال'
                                            ? 'bg-teal-50 font-medium text-teal-700'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    کل سال
                                </button>
                                <div className="my-1 border-t border-gray-100"></div>
                                {afghanMonths.map((m, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedMonth(m);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-right text-sm transition-colors hover:bg-teal-50 ${
                                            selectedMonth === m
                                                ? 'bg-teal-50 font-medium text-teal-700'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="درآمد کل"
                        value={
                            selectedMonth === 'کل سال'
                                ? totals.income
                                : currentMonthData?.income
                        }
                        icon={DollarSign}
                        trend={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.income,
                                      previousMonthData?.income,
                                  )
                                : null
                        }
                        trendValue={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.income,
                                      previousMonthData?.income,
                                  )
                                : null
                        }
                        color="bg-green-500"
                    />
                    <StatCard
                        title="مصارف کل"
                        value={
                            selectedMonth === 'کل سال'
                                ? totals.expenses
                                : currentMonthData?.expenses
                        }
                        icon={ShoppingCart}
                        trend={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.expenses,
                                      previousMonthData?.expenses,
                                  )
                                : null
                        }
                        trendValue={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.expenses,
                                      previousMonthData?.expenses,
                                  )
                                : null
                        }
                        color="bg-red-500"
                    />
                    <StatCard
                        title="سود خالص"
                        value={
                            selectedMonth === 'کل سال'
                                ? totals.profit
                                : currentMonthData?.profit
                        }
                        icon={Activity}
                        trend={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.profit,
                                      previousMonthData?.profit,
                                  )
                                : null
                        }
                        trendValue={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.profit,
                                      previousMonthData?.profit,
                                  )
                                : null
                        }
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="تعداد ویزیت"
                        value={
                            selectedMonth === 'کل سال'
                                ? totals.visitsIncome
                                : currentMonthData?.visitsIncome
                        }
                        icon={Users}
                        trend={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.visitsIncome,
                                      previousMonthData?.visitsIncome,
                                  )
                                : null
                        }
                        trendValue={
                            previousMonthData
                                ? calculateGrowth(
                                      currentMonthData?.visitsIncome,
                                      previousMonthData?.visitsIncome,
                                  )
                                : null
                        }
                        color="bg-purple-500"
                    />
                </div>

                {/* Chart Section */}
                <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-blue-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    نمودار تحلیل مالی
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    روند درآمد، هزینه و سود در ماه‌های مختلف
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={exportExcel}
                                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
                                >
                                    <FileSpreadsheet className="h-4 w-4" />
                                    اکسل
                                </button>
                                <button
                                    onClick={exportPDF}
                                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
                                >
                                    <FileText className="h-4 w-4" />
                                    PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-96 p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={filteredData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 20,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="incomeGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#22c55e"
                                            stopOpacity={0.2}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#22c55e"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="expensesGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#ef4444"
                                            stopOpacity={0.2}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#ef4444"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e5e7eb"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="month"
                                    reversed
                                    tick={{
                                        fontSize: 12,
                                        fill: '#6b7280',
                                        fontFamily: 'Vazir, Tahoma, sans-serif',
                                    }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{
                                        fontSize: 12,
                                        fill: '#6b7280',
                                        fontFamily: 'Vazir, Tahoma, sans-serif',
                                    }}
                                    orientation="right"
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={false}
                                    tickFormatter={(value) =>
                                        `${value.toLocaleString()} ؋`
                                    }
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow:
                                            '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                        padding: '12px',
                                        fontFamily: 'Vazir, Tahoma, sans-serif',
                                        direction: 'rtl',
                                    }}
                                    labelFormatter={(name) => `📅 ${name}`}
                                    formatter={(value, name) => [
                                        `${value.toLocaleString()} افغانی`,
                                        name === 'income'
                                            ? 'درآمد'
                                            : name === 'expenses'
                                              ? 'هزینه'
                                              : 'سود/زیان',
                                    ]}
                                />
                                <Legend
                                    verticalAlign="top"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => (
                                        <span
                                            style={{
                                                color: '#374151',
                                                fontFamily:
                                                    'Vazir, Tahoma, sans-serif',
                                            }}
                                        >
                                            {value}
                                        </span>
                                    )}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    fill="url(#incomeGradient)"
                                    name="درآمد"
                                    animationBegin={animateChart ? 0 : 300}
                                    animationDuration={1500}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    fill="url(#expensesGradient)"
                                    name="هزینه"
                                    animationBegin={animateChart ? 200 : 500}
                                    animationDuration={1500}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    dot={{
                                        r: 6,
                                        fill: '#f59e0b',
                                        stroke: '#fff',
                                        strokeWidth: 2,
                                    }}
                                    activeDot={{
                                        r: 8,
                                        fill: '#f59e0b',
                                        stroke: '#fff',
                                        strokeWidth: 2,
                                    }}
                                    name="سود/زیان"
                                    animationBegin={animateChart ? 400 : 700}
                                    animationDuration={1500}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            جزئیات گزارش مالی
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            اطلاعات تفکیکی هر ماه به همراه جمع‌بندی سالانه
                        </p>
                    </div>

                    <div ref={tableRef} className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
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
                                            className="px-4 py-4 text-right text-sm font-medium text-white"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredData.map((m, idx) => (
                                    <tr
                                        key={idx}
                                        className="group transition-colors hover:bg-teal-50/50"
                                    >
                                        <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                            {m.month}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {m.pharmacySales.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {m.purchasedMedicine.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {m.staffSalaries.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {m.visitsIncome.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                                            {m.income.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-red-600">
                                            {m.expenses.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${
                                                    m.profit >= 0
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {m.profit >= 0 ? '+' : ''}
                                                {m.profit.toLocaleString()}
                                                {m.profit >= 0 ? '↑' : '↓'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {selectedMonth === 'کل سال' && (
                                    <tr className="bg-gradient-to-r from-teal-100 to-teal-50 font-semibold">
                                        <td className="px-4 py-4 text-sm font-bold text-teal-800">
                                            جمع کل سال
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-teal-800">
                                            {totals.pharmacySales.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-teal-800">
                                            {totals.purchasedMedicine.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-teal-800">
                                            {totals.staffSalaries.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-teal-800">
                                            {totals.visitsIncome.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-teal-800">
                                            {totals.income.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-teal-800">
                                            {totals.expenses.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 ${
                                                    totals.profit >= 0
                                                        ? 'bg-green-200 text-green-800'
                                                        : 'bg-red-200 text-red-800'
                                                }`}
                                            >
                                                {totals.profit >= 0 ? '+' : ''}
                                                {totals.profit.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
                .recharts-wrapper:focus,
                .recharts-wrapper svg:focus {
                    outline: none !important;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
