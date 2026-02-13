import { Maximize2, Minimize2, TrendingDown, TrendingUp } from 'lucide-react';
import 'moment/locale/fa';
import { useState } from 'react';
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// Afghan (Jalali) months
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

export default function FinanceChart({ data = [] }) {
    const [chartType, setChartType] = useState('line');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showGrid, setShowGrid] = useState(true);

    const chartData = afghanMonths.map((monthName, idx) => {
        const item = data[idx] || { income: 0, expense: 0, profit: 0 };
        return {
            name: monthName,
            income: item.income,
            expense: item.expense,
            profit: item.income - item.expense,
        };
    });

    // Calculate totals and averages
    const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = chartData.reduce((sum, item) => sum + item.expense, 0);
    const totalProfit = totalIncome - totalExpense;
    const averageIncome = totalIncome / chartData.length;
    const averageExpense = totalExpense / chartData.length;
    const profitMargin =
        totalIncome > 0 ? Math.round((totalProfit / totalIncome) * 100) : 0;

    // Find best and worst months
    const bestMonth = [...chartData].sort((a, b) => b.profit - a.profit)[0];
    const worstMonth = [...chartData].sort((a, b) => a.profit - b.profit)[0];

    const formatCurrency = (value) => {
        return `${value.toLocaleString()} ؋`;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                    <p className="mb-2 text-sm font-bold text-gray-800">
                        {label}
                    </p>
                    {payload.map((entry, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-4 text-xs"
                        >
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                ></span>
                                <span className="text-gray-600">
                                    {entry.name}:
                                </span>
                            </div>
                            <span
                                className="font-semibold"
                                style={{ color: entry.color }}
                            >
                                {formatCurrency(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                    >
                        {showGrid && (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                                vertical={false}
                            />
                        )}
                        <XAxis
                            dataKey="name"
                            reversed={true}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                            }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(v) => v.toLocaleString()}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                            }}
                            orientation="right"
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                                fontSize: '12px',
                                direction: 'rtl',
                            }}
                        />
                        <Bar
                            dataKey="income"
                            name="عایدات"
                            fill="#22c55e"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="expense"
                            name="مصارف"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                        />
                    </ComposedChart>
                );
            case 'area':
                return (
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
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
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#22c55e"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="expenseGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#ef4444"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ef4444"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        {showGrid && (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                                vertical={false}
                            />
                        )}
                        <XAxis
                            dataKey="name"
                            reversed={true}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                            }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(v) => v.toLocaleString()}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                            }}
                            orientation="right"
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                                fontSize: '12px',
                                direction: 'rtl',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            name="عایدات"
                            stroke="#22c55e"
                            strokeWidth={2}
                            fill="url(#incomeGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            name="مصارف"
                            stroke="#ef4444"
                            strokeWidth={2}
                            fill="url(#expenseGradient)"
                        />
                    </ComposedChart>
                );
            default:
                return (
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                    >
                        {showGrid && (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                                vertical={false}
                            />
                        )}
                        <XAxis
                            dataKey="name"
                            reversed={true}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                            }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(v) => v.toLocaleString()}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                            }}
                            orientation="right"
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                                fontSize: '12px',
                                direction: 'rtl',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            name="عایدات"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: '#22c55e',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 6,
                                fill: '#22c55e',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            name="مصارف"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: '#ef4444',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 6,
                                fill: '#ef4444',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                );
        }
    };

    return (
        <div
            className={`font-vazirmatn w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 ${
                isExpanded ? 'fixed inset-4 z-50' : ''
            }`}
            dir="rtl"
        >
            {/* Header */}
            <div className="border-b border-gray-100 bg-gradient-to-r from-teal-700 to-teal-600 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">
                                راپور ماهانه عایدات و مصارف
                            </h3>
                            <p className="text-xs text-teal-100">
                                تحلیل عملکرد مالی ماهانه
                            </p>
                        </div>
                    </div>

                    {/* Chart Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setChartType('line')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                chartType === 'line'
                                    ? 'bg-white text-teal-700 shadow-md'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            خطی
                        </button>
                        <button
                            onClick={() => setChartType('bar')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                chartType === 'bar'
                                    ? 'bg-white text-teal-700 shadow-md'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            میله‌ای
                        </button>
                        <button
                            onClick={() => setChartType('area')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                chartType === 'area'
                                    ? 'bg-white text-teal-700 shadow-md'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            مساحتی
                        </button>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20"
                            title={isExpanded ? 'کوچک کردن' : 'تمام صفحه'}
                        >
                            {isExpanded ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 border-b border-gray-100 bg-gray-50/50 p-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">عایدات کل</p>
                    <p className="text-lg font-bold text-green-600">
                        {formatCurrency(totalIncome)}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">مصارف کل</p>
                    <p className="text-lg font-bold text-red-600">
                        {formatCurrency(totalExpense)}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">سود/زیان کل</p>
                    <p
                        className={`text-lg font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {formatCurrency(totalProfit)}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">حاشیه سود</p>
                    <p className="text-lg font-bold text-teal-600">
                        {profitMargin}%
                    </p>
                </div>
            </div>

            {/* Best/Worst Months */}
            <div className="grid grid-cols-2 gap-3 border-b border-gray-100 bg-gray-50/50 px-4 pb-4">
                <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-50 to-white p-3">
                    <div className="rounded-full bg-green-100 p-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">بهترین ماه</p>
                        <p className="text-sm font-bold text-gray-800">
                            {bestMonth?.name} (
                            {formatCurrency(bestMonth?.profit || 0)})
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-50 to-white p-3">
                    <div className="rounded-full bg-red-100 p-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">ضعیف‌ترین ماه</p>
                        <p className="text-sm font-bold text-gray-800">
                            {worstMonth?.name} (
                            {formatCurrency(worstMonth?.profit || 0)})
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="w-full p-4">
                <ResponsiveContainer
                    width="100%"
                    height={isExpanded ? 500 : 320}
                >
                    {renderChart()}
                </ResponsiveContainer>
            </div>

            {/* Footer Controls */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                                showGrid
                                    ? 'bg-teal-100 text-teal-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            خطوط راهنما
                        </button>
                        <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                                <span className="text-gray-600">عایدات</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                                <span className="text-gray-600">مصارف</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400">
                        میانگین عایدات:{' '}
                        {formatCurrency(Math.round(averageIncome))} | میانگین
                        مصارف: {formatCurrency(Math.round(averageExpense))}
                    </div>
                </div>
            </div>

            <style>
                {`
                    .recharts-wrapper:focus,
                    .recharts-wrapper svg:focus {
                        outline: none !important;
                    }
                    
                    /* Custom scrollbar for expanded mode */
                    .fixed {
                        overflow-y: auto;
                        background: white;
                    }
                    
                    .fixed::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    .fixed::-webkit-scrollbar-track {
                        background: #f1f1f1;
                    }
                    
                    .fixed::-webkit-scrollbar-thumb {
                        background: #888;
                        border-radius: 4px;
                    }
                    
                    .fixed::-webkit-scrollbar-thumb:hover {
                        background: #555;
                    }
                `}
            </style>
        </div>
    );
}
