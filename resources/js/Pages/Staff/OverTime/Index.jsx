import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment-jalaali';

const afghanMonths = [
    { value: '1', label: 'حمل' },
    { value: '2', label: 'ثور' },
    { value: '3', label: 'جوزا' },
    { value: '4', label: 'سرطان' },
    { value: '5', label: 'اسد' },
    { value: '6', label: 'سنبله' },
    { value: '7', label: 'میزان' },
    { value: '8', label: 'عقرب' },
    { value: '9', label: 'قوس' },
    { value: '10', label: 'جدی' },
    { value: '11', label: 'دلو' },
    { value: '12', label: 'حوت' },
];

export default function Index({ staff, overtimes }) {
    return (
        <AuthenticatedLayout title={`اضافه‌کاری‌ها - ${staff.full_name}`}>
            <Head title={`اضافه‌کاری‌ها - ${staff.full_name}`} />

            <div className="mx-auto w-full md:px-10 md:py-16">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        لیست اضافه‌کاری‌ها
                    </h3>
                    <Link
                        href={route('staffs.overtime.create', staff.id)}
                        className="bg-blueGray-600 rounded px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                    >
                        ثبت اضافه‌کاری
                    </Link>
                </div>

                <div className="overflow-x-auto rounded shadow-lg">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-blueGray-600 text-sm text-white">
                                <th className="px-6 py-3 text-right">#</th>
                                <th className="px-6 py-3 text-right">تاریخ</th>
                                <th className="px-6 py-3 text-right">ساعت</th>
                                <th className="px-6 py-3 text-right">نرخ</th>
                                <th className="px-6 py-3 text-right">
                                    مبلغ کل
                                </th>
                                <th className="px-6 py-3 text-right">
                                    توضیحات
                                </th>
                                <th className="px-6 py-3 text-right">وضعیت</th>
                                <th className="px-6 py-3 text-right">
                                    ماه حقوق
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {overtimes.length > 0 ? (
                                overtimes.map((overTime, index) => (
                                    <tr
                                        key={overTime.id}
                                        className={`border-b text-xs ${
                                            overTime.salary_id
                                                ? 'bg-green-50'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <td className="px-6 py-2 text-right">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {moment(overTime.date).format(
                                                'jYYYY/jMM/jDD',
                                            )}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.hours}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {parseFloat(
                                                overTime.rate,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {parseFloat(
                                                overTime.total,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.description || '-'}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.salary_id ? (
                                                <span className="rounded bg-green-500/20 px-3 py-1 text-green-700">
                                                    پرداخت شده
                                                </span>
                                            ) : (
                                                <span className="rounded bg-yellow-500/20 px-3 py-1 text-yellow-700">
                                                    پرداخت نشده
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.salary
                                                ? `ماه ${afghanMonths[overTime.salary.salary_month - 1].label}`
                                                : '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        هیچ اضافه‌کاری ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
