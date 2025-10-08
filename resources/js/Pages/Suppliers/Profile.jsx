import factory from '@/img/factory.svg';
import logo from '@/img/logo.jpg';
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
                {/* Supplier Info */}
                <div className="mx-auto mb-8 max-w-5xl">
                    <div className="grid grid-cols-1 items-start gap-6 rounded-xl bg-white p-6 text-right text-sm shadow-md md:grid-cols-3">
                        <div className="flex flex-col items-center space-y-3 md:col-span-1 md:items-start">
                            <div className="h-28 w-28 overflow-hidden rounded-full border border-gray-300 shadow">
                                <img src={factory} alt="factory Icon" />
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="text-base font-bold text-sky-700">
                                    {supplier.company_name}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    {supplier.contact_person}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {supplier.phone}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {supplier.address}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {supplier.description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 md:col-span-2 md:mt-0">
                            <div className="rounded-lg bg-sky-100 p-4 shadow-sm">
                                <div className="text-xs text-gray-500">
                                    تعداد سفارش‌ها
                                </div>
                                <div className="text-xl font-bold text-sky-700">
                                    1
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-100 p-4 shadow-sm">
                                <div className="text-xs text-gray-500">
                                    مجموع خریدهای شما
                                </div>
                                <div className="text-xl font-bold text-purple-700">
                                    {TotalPurchased}
                                </div>
                            </div>
                            <div className="rounded-lg bg-green-100 p-4 shadow-sm">
                                <div className="text-xs text-gray-500">
                                    پرداخت شده
                                </div>
                                <div className="text-xl font-bold text-green-700">
                                    {TotalPaid}
                                    <span className="text-xs">افغانی</span>
                                </div>
                            </div>
                            <div className="rounded-lg bg-red-100 p-4 shadow-sm">
                                <div className="text-xs text-gray-500">
                                    باقی‌مانده
                                </div>
                                <div className="text-xl font-bold text-red-700">
                                    {TotalRemaining}
                                    <span className="text-xs">افغانی </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mx-auto mb-12 w-full max-w-4xl">
                    <nav className="flex space-x-4 bg-gray-700 px-4 py-3 text-sm font-medium text-white rtl:space-x-reverse">
                        <TabButton
                            active={activeTab === 'remaining'}
                            onClick={() => setActiveTab('remaining')}
                            label="باقی مانده"
                        />
                        <TabButton
                            active={activeTab === 'fullyPaid'}
                            onClick={() => setActiveTab('fullyPaid')}
                            label="تسویه شده"
                        />
                    </nav>

                    <div className="overflow-x-auto">
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

function TabButton({ active, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 outline-none hover:bg-sky-500 hover:text-white focus:outline-none ${active ? 'bg-sky-600 text-white' : ''} focus:outline-none`}
        >
            {label}
        </button>
    );
}

function RecordsTable({ records, showRemaining = false }) {
    if (!records.length) {
        return (
            <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-600 shadow-md">
                <div className="mb-4 flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 4v1m0 14v1m8.66-9.66l-.707.707M4.34 4.34l-.707.707M20 12h1M3 12H2m16.24 6.24l-.707-.707M4.34 19.66l-.707-.707M12 6a6 6 0 100 12 6 6 0 000-12z"
                        />
                    </svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-700">
                    هیچ موردی یافت نشد
                </h3>
                <p className="text-xs text-gray-500">
                    در حال حاضر هیچ داده‌ای برای نمایش وجود ندارد.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {records.map((record) => (
                <div
                    key={record.id}
                    className="mx-auto mb-5 max-w-4xl rounded bg-white p-3 shadow-lg md:p-5"
                >
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-right">
                            <h1 className="mb-2 text-lg font-bold">
                                {record.supplier_name || 'شرکت همکار'}
                            </h1>
                            <p className="mb-1 text-xs text-gray-600">
                                {record.description || 'بدون توضیحات'}
                            </p>
                        </div>
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-16 rounded-full"
                        />
                    </div>

                    {/* Info Table */}
                    <table className="mt-4 w-full border border-gray-300 text-right text-xs">
                        <tbody>
                            <tr className="border-b">
                                <td className="w-32 border-l px-2 py-1 font-semibold">
                                    تاریخ خرید:
                                </td>
                                <td className="px-2 py-1" dir="ltr">
                                    {record.purchase_date}
                                </td>
                                <td className="w-32 border-l px-2 py-1 font-semibold">
                                    وضعیت:
                                </td>
                                <td className="px-2 py-1">
                                    {record.status === 'paid'
                                        ? 'تسویه شده'
                                        : 'پرداخت نشده'}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="border-l px-2 py-1 font-semibold">
                                    مجموع مبلغ:
                                </td>
                                <td className="px-2 py-1">
                                    {record.total_amount.toLocaleString()}{' '}
                                    افغانی
                                </td>
                                <td className="border-l px-2 py-1 font-semibold">
                                    پرداخت شده:
                                </td>
                                <td className="px-2 py-1">
                                    {record.paid_amount.toLocaleString()} افغانی
                                </td>
                            </tr>
                            {showRemaining && (
                                <tr>
                                    <td className="border-l px-2 py-1 font-semibold">
                                        باقی مانده:
                                    </td>
                                    <td
                                        className="px-2 py-1 font-bold text-red-700"
                                        colSpan="3"
                                    >
                                        {record.remaining_amount.toLocaleString()}{' '}
                                        افغانی
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Quick Links */}
                    <div className="mt-3 flex justify-end space-x-2 rtl:space-x-reverse">
                        <a
                            href={route('medicine.show', record.id)}
                            className="rounded bg-indigo-600 px-3 py-1 text-xs text-white shadow hover:bg-indigo-700"
                        >
                            مشاهده خرید
                        </a>
                        <a
                            href={`/purchases/${record.id}/payments`}
                            className="rounded bg-yellow-600 px-3 py-1 text-xs text-white shadow hover:bg-yellow-700"
                        >
                            مشاهده پرداخت‌ها
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
