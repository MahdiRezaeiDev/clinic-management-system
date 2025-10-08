import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { DollarSign, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function PurchasesIndex({ purchases }) {
    const [activeTab, setActiveTab] = useState('remaining');

    const remaining = purchases.filter((p) => p.status === 'unpaid');
    const fullyPaid = purchases.filter((p) => p.status === 'paid');
    const displayed = activeTab === 'remaining' ? remaining : fullyPaid;

    return (
        <AuthenticatedLayout title="خریدهای ثبت شده">
            <Head title="خریدهای ثبت شده" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 pt-8 md:px-10">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        لیست خریدها
                    </h1>
                    <Link
                        href={route('medicine.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" /> ثبت خرید جدید
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
                    <button
                        onClick={() => setActiveTab('remaining')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeTab === 'remaining'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        باقی مانده
                    </button>
                    <button
                        onClick={() => setActiveTab('fullyPaid')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeTab === 'fullyPaid'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        تسویه شده
                    </button>
                </div>

                {/* Purchases Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    تامین‌کننده
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    توضیحات
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    تاریخ
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    کل مبلغ
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    پرداخت شده
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    باقی مانده
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    وضعیت
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    اقدامات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {displayed.map((purchase) => (
                                <tr
                                    key={purchase.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    {/* Supplier */}
                                    <td className="whitespace-normal px-6 py-4 text-right font-semibold text-gray-800">
                                        {purchase.supplier_name}
                                    </td>

                                    {/* Description */}
                                    <td className="line-clamp-2 px-6 py-4 text-left text-sm text-gray-500">
                                        {purchase.description || '-'}
                                    </td>

                                    {/* Dates and amounts */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                                        {purchase.purchase_date}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                                        {purchase.total_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                                        {purchase.paid_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">
                                        {purchase.remaining_amount.toLocaleString()}
                                    </td>

                                    {/* Status with colored circle */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="flex items-center justify-center gap-2">
                                            <span
                                                className={`h-3 w-3 rounded-full ${
                                                    purchase.status === 'paid'
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-400'
                                                }`}
                                            ></span>
                                            <span className="text-sm text-gray-700">
                                                {purchase.status === 'paid'
                                                    ? 'تسویه شده'
                                                    : 'پرداخت نشده'}
                                            </span>
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="flex justify-center gap-2 px-6 py-4 text-center">
                                        <Link
                                            href={route(
                                                'medicine.edit',
                                                purchase.id,
                                            )}
                                            className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                        >
                                            <Edit className="h-4 w-4" /> ویرایش
                                        </Link>
                                        <button className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
                                            <Trash2 className="h-4 w-4" /> حذف
                                        </button>
                                        {purchase.remaining_amount > 0 && (
                                            <button className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-600 transition hover:bg-green-100">
                                                <DollarSign className="h-4 w-4" />{' '}
                                                پرداخت
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {displayed.length === 0 && (
                    <div className="rounded-lg border bg-white py-10 text-center text-gray-500 shadow-sm">
                        <p>هیچ خریدی در این بخش وجود ندارد</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
