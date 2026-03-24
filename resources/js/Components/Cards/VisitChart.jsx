import {
    Activity,
    ArrowDown,
    ArrowUp,
    Maximize2,
    Minimize2,
    TrendingUp,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

moment.loadPersian({ dialect: 'persian-modern' });

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

// Color palette for bars
const colors = [
    '#2563eb', // blue
    '#3b82f6',
    '#4f46e5', // indigo
    '#6366f1',
    '#06b6d4', // cyan
    '#0ea5e9',
    '#2563eb',
    '#3b82f6',
    '#4f46e5',
    '#6366f1',
    '#06b6d4',
    '#0ea5e9',
];

export default function MonthlyVisitsBarChart({ data = [] }) {
    const [chartType, setChartType] = useState('bar');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [showValues, setShowValues] = useState(true);

    // Map data to Afghan months
    const chartData = afghanMonths.map((monthName, idx) => {
        const item = data[idx] || { visits: 0 };
        return {
            name: monthName,
            visits: item.visits,
            monthIndex: idx + 1,
        };
    });

    // Calculate statistics
    const totalVisits = chartData.reduce((sum, item) => sum + item.visits, 0);
    const averageVisits = Math.round(totalVisits / chartData.length);
    const maxVisits = Math.max(...chartData.map((item) => item.visits));
    const minVisits = Math.min(...chartData.map((item) => item.visits));
    const maxMonth =
        chartData.find((item) => item.visits === maxVisits)?.name || '';
    const minMonth =
        chartData.find((item) => item.visits === minVisits)?.name || '';

    // Find months with above average visits
    const aboveAverageCount = chartData.filter(
        (item) => item.visits > averageVisits,
    ).length;
    const belowAverageCount = chartData.filter(
        (item) => item.visits < averageVisits && item.visits > 0,
    ).length;

    const formatNumber = (value) => {
        return value.toLocaleString();
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                    <p className="mb-2 text-sm font-bold text-gray-800">
                        {label}
                    </p>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-4 text-xs">
                            <span className="text-gray-600">
                                تعداد ویزیت‌ها:
                            </span>
                            <span className="font-bold text-teal-600">
                                {formatNumber(data.visits)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-xs">
                            <span className="text-gray-600">ماه:</span>
                            <span className="font-medium text-gray-700">
                                {data.monthIndex} / ۱۲
                            </span>
                        </div>
                        {data.visits > averageVisits && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                                <ArrowUp className="h-3 w-3" />
                                <span>بالاتر از میانگین</span>
                            </div>
                        )}
                        {data.visits < averageVisits && data.visits > 0 && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-orange-600">
                                <ArrowDown className="h-3 w-3" />
                                <span>پایین‌تر از میانگین</span>
                            </div>
                        )}
                        {data.visits === 0 && (
                            <div className="mt-1 text-xs text-gray-400">
                                هیچ ویزیتی ثبت نشده
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderChart = () => {
        return (
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
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
                        fontFamily: 'Vazir, Tahoma, sans-serif',
                        fontSize: 12,
                        fill: '#6b7280',
                    }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    interval={0}
                />
                <YAxis
                    tick={{
                        fontFamily: 'Vazir, Tahoma, sans-serif',
                        fontSize: 12,
                        fill: '#6b7280',
                    }}
                    orientation="right"
                    tickFormatter={formatNumber}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    wrapperStyle={{
                        fontFamily: 'Vazir, Tahoma, sans-serif',
                        direction: 'rtl',
                        fontSize: 12,
                        paddingTop: '10px',
                    }}
                />
                <Bar
                    dataKey="visits"
                    name="تعداد ویزیت‌ها"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                            fillOpacity={entry.visits > 0 ? 1 : 0.3}
                        />
                    ))}
                    {showValues && (
                        <LabelList
                            dataKey="visits"
                            position="top"
                            formatter={formatNumber}
                            style={{
                                fontFamily: 'Vazir, Tahoma, sans-serif',
                                fontSize: '11px',
                                fill: '#6b7280',
                                fontWeight: '500',
                            }}
                        />
                    )}
                </Bar>
            </BarChart>
        );
    };

    return (
        <div
            className={`font-vazirmatn h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 ${
                isExpanded ? 'fixed inset-4 z-50' : ''
            }`}
            dir="rtl"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-32 w-32 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-32 w-32 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="border-b border-gray-100 bg-gradient-to-r from-blue-700 to-blue-600 p-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">
                                راپور ماهانه ویزیت‌ها
                            </h3>
                            <p className="text-xs text-blue-100">
                                تحلیل آمار ویزیت بیماران در ماه‌های مختلف
                            </p>
                        </div>
                    </div>

                    {/* Chart Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowValues(!showValues)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                showValues
                                    ? 'bg-white text-blue-700 shadow-md'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            نمایش مقادیر
                        </button>
                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                showGrid
                                    ? 'bg-white text-blue-700 shadow-md'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            خطوط راهنما
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
            <div className="grid grid-cols-2 gap-3 border-b border-gray-100 bg-gray-50/50 p-2 md:grid-cols-4">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">کل ویزیت‌ها</p>
                    <p className="text-lg font-bold text-gray-800">
                        {formatNumber(totalVisits)}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">میانگین ماهانه</p>
                    <p className="text-lg font-bold text-blue-600">
                        {formatNumber(averageVisits)}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">بالاتر از میانگین</p>
                    <p className="text-lg font-bold text-green-600">
                        {aboveAverageCount} ماه
                    </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs text-gray-500">پایین‌تر از میانگین</p>
                    <p className="text-lg font-bold text-orange-600">
                        {belowAverageCount} ماه
                    </p>
                </div>
            </div>

            {/* Best/Worst Months */}
            <div className="grid grid-cols-2 gap-3 border-b border-gray-100 bg-gray-50/50 px-2 pb-4">
                <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-50 to-white p-3">
                    <div className="rounded-full bg-green-100 p-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">
                            پرتراکم‌ترین ماه
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                            {maxMonth} ({formatNumber(maxVisits)})
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-50 to-white p-3">
                    <div className="rounded-full bg-orange-100 p-2">
                        <TrendingUp className="h-4 w-4 rotate-180 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">
                            کم‌تراکم‌ترین ماه
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                            {minMonth} ({formatNumber(minVisits)})
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="w-full p-2">
                <ResponsiveContainer
                    width="100%"
                    height={isExpanded ? 500 : 320}
                >
                    {renderChart()}
                </ResponsiveContainer>
            </div>

            {/* Footer Insights */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-2 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                            <span className="text-gray-600">
                                تعداد ویزیت‌ها
                            </span>
                        </div>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">
                            مجموع: {formatNumber(totalVisits)} ویزیت
                        </span>
                    </div>
                    <div className="text-gray-400">
                        میانگین: {formatNumber(averageVisits)} در ماه
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
