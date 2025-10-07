import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Profile({
    supplier,
    remainingRecords,
    fullyPaidRecords,
    TotalPurchased,
    TotalPaid,
    TotalRemaining,
}) {
    const [activeTab, setActiveTab] = useState('remaining');

    return (
        <AuthenticatedLayout title="پروفایل شرکت همکار">
            <Head title="پروفایل شرکت همکار" />

            <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8 md:px-10">
                {/* Profile Card */}
                <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg md:flex-row md:items-center md:gap-6">
                    {/* Logo */}
                    <div className="mb-4 flex-shrink-0 md:mb-0">
                        <img
                            src={supplier.logo || '/images/default-company.png'}
                            alt={supplier.company_name}
                            className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {supplier.company_name}
                        </h2>
                        <p className="mt-1 text-gray-600">
                            {supplier.contact_person &&
                                `شخص تماس: ${supplier.contact_person}`}{' '}
                            <br />
                            {supplier.phone &&
                                `شماره تماس: ${supplier.phone}`}{' '}
                            <br />
                            {supplier.address && `آدرس: ${supplier.address}`}
                        </p>
                        {supplier.description && (
                            <p className="mt-2 text-gray-700">
                                {supplier.description}
                            </p>
                        )}

                        {/* Statistics */}
                        <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex-1 rounded-lg bg-blue-50 px-4 py-2 text-center">
                                <p className="text-sm text-gray-500">کل خرید</p>
                                <p className="text-lg font-semibold text-blue-600">
                                    {TotalPurchased}
                                </p>
                            </div>
                            <div className="flex-1 rounded-lg bg-green-50 px-4 py-2 text-center">
                                <p className="text-sm text-gray-500">
                                    کل پرداخت شده
                                </p>
                                <p className="text-lg font-semibold text-green-600">
                                    {TotalPaid}
                                </p>
                            </div>
                            <div className="flex-1 rounded-lg bg-red-50 px-4 py-2 text-center">
                                <p className="text-sm text-gray-500">
                                    باقی مانده
                                </p>
                                <p className="text-lg font-semibold text-red-600">
                                    {TotalRemaining}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="rounded-2xl bg-white shadow-lg">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('remaining')}
                            className={`flex-1 px-6 py-3 text-center font-semibold transition-all ${
                                activeTab === 'remaining'
                                    ? 'border-b-4 border-blue-500 text-blue-600'
                                    : 'border-b-4 border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            باقی مانده
                        </button>
                        <button
                            onClick={() => setActiveTab('fullyPaid')}
                            className={`flex-1 px-6 py-3 text-center font-semibold transition-all ${
                                activeTab === 'fullyPaid'
                                    ? 'border-b-4 border-blue-500 text-blue-600'
                                    : 'border-b-4 border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            تسویه شده
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="overflow-x-auto p-4">
                        {activeTab === 'remaining' && (
                            <RecordsTable
                                records={remainingRecords}
                                showRemaining
                            />
                        )}
                        {activeTab === 'fullyPaid' && (
                            <RecordsTable records={fullyPaidRecords} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function RecordsTable({ records, showRemaining = false }) {
    if (!records.length) {
        return (
            <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
                رکوردی وجود ندارد
            </div>
        );
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        تاریخ
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        محصول
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        مقدار
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        قیمت
                    </th>
                    {showRemaining && (
                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                            باقی مانده
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {records.map((record, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2">
                            {record.date}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                            {record.product}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                            {record.quantity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                            {record.price}
                        </td>
                        {showRemaining && (
                            <td className="whitespace-nowrap px-4 py-2 text-red-600">
                                {record.remaining}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
