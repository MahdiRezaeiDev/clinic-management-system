import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function PurchasesIndex({ purchases }) {
    const [activeTab, setActiveTab] = useState('remaining');

    const remaining = purchases.filter((p) => p.status === 'unpaid');
    const fullyPaid = purchases.filter((p) => p.status === 'paid');

    return (
        <AuthenticatedLayout title="خریدهای ثبت شده">
            <Head title="خریدهای ثبت شده" />
            <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8 md:px-10">
                {/* Tabs */}
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex justify-between border-b border-gray-200">
                        <div>
                            <button
                                onClick={() => setActiveTab('remaining')}
                                className={`-mb-px border-b-2 px-4 py-2 font-semibold ${
                                    activeTab === 'remaining'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                باقی مانده
                            </button>
                            <button
                                onClick={() => setActiveTab('fullyPaid')}
                                className={`-mb-px border-b-2 px-4 py-2 font-semibold ${
                                    activeTab === 'fullyPaid'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                تسویه شده
                            </button>
                        </div>
                        <Link
                            href={route('medicine.create')}
                            className="bg-blueGray-600 flex items-center rounded px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                        >
                            ثبت خرید
                        </Link>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                        شرکت همکار
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                        تاریخ خرید
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                        کل مبلغ
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                        پرداخت شده
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                        باقی مانده
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                        وضعیت
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {(activeTab === 'remaining'
                                    ? remaining
                                    : fullyPaid
                                ).length ? (
                                    (activeTab === 'remaining'
                                        ? remaining
                                        : fullyPaid
                                    ).map((purchase, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                {purchase.supplier_name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                {purchase.purchase_date}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                {purchase.total_amount}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                {purchase.paid_amount}
                                            </td>
                                            <td
                                                className={`whitespace-nowrap px-4 py-2 ${purchase.status === 'unpaid' ? 'text-red-500' : ''}`}
                                            >
                                                {purchase.remaining_amount}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                {purchase.status === 'paid'
                                                    ? 'تسویه شده'
                                                    : 'پرداخت نشده'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-2 text-center text-gray-500"
                                        >
                                            رکوردی وجود ندارد
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
