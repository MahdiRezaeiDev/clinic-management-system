import moment from 'moment-jalaali';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
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

export default function MonthlyReportChart({ data = [] }) {
    // Convert your Gregorian month data to Jalali months
    const chartData = afghanMonths.map((monthName, idx) => {
        const item = data[idx] || { income: 0, expense: 0 };
        return {
            name: monthName,
            income: item.income,
            expense: item.expense,
        };
    });

    return (
        <div
            className="font-vazirmatn rounded-2xl bg-white p-6 text-right shadow"
            dir="rtl"
        >
            <h3 className="mb-4 text-lg font-bold text-gray-700">
                راپور ماهانه عایدات و مصارف
            </h3>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{
                            fontSize: 13,
                            fontFamily: 'Vazir, Tahoma, sans-serif',
                        }}
                        reversed={true} // Right-to-left
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                        tickFormatter={(v) => v.toLocaleString()}
                        tick={{
                            fontSize: 13,
                            fontFamily: 'Vazir, Tahoma, sans-serif',
                        }}
                        orientation="right"
                    />
                    <Tooltip
                        formatter={(value) =>
                            `${value.toLocaleString()} افغانی`
                        }
                        contentStyle={{
                            fontFamily: 'Vazir, Tahoma, sans-serif',
                            fontSize: '13px',
                            direction: 'rtl',
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            fontFamily: 'Vazir, Tahoma, sans-serif',
                            fontSize: '13px',
                            direction: 'rtl',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="income"
                        name="عایدات"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        name="مصارف"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
