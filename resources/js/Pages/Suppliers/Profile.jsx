import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import factory from '@/img/factory.svg';
import logo from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Profile({
    supplier,
    remainingRecords,
    fullyPaidRecords,
    TotalPurchased,
    TotalPaid,
    TotalRemaining,
}) {
    const [activeTab, setActiveTab] = useState('remaining');
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    const [purchaseId, setPurchaseId] = useState(null);
    const [confirmingPayment, setConfirmingPayment] = useState(false);

    const {
        delete: destroy,
        post,
        data,
        setData,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        amount: '',
        payment_date: '',
        description: '',
    });

    const inputClass =
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm';

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmPaymentModal = (id) => {
        setPurchaseId(id);
        setConfirmingPayment(true);
    };

    const savePayment = (e) => {
        e.preventDefault();
        post(route('medicine.payments.store', purchaseId), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                reset();
            },
        });
    };

    const closeModal = () => {
        setConfirmingPayment(false);
        setPurchaseId(null);
        clearErrors();
        reset();
    };

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
                            <SummaryCard
                                label="تعداد سفارش‌ها"
                                value="1"
                                color="sky"
                            />
                            <SummaryCard
                                label="مجموع خریدهای شما"
                                value={TotalPurchased}
                                color="purple"
                            />
                            <SummaryCard
                                label="پرداخت شده"
                                value={`${TotalPaid} افغانی`}
                                color="green"
                            />
                            <SummaryCard
                                label="باقی‌مانده"
                                value={`${TotalRemaining} افغانی`}
                                color="red"
                            />
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
                                onPayment={confirmPaymentModal}
                            />
                        )}
                        {activeTab === 'fullyPaid' && (
                            <RecordsTable records={fullyPaidRecords} />
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <Modal show={confirmingPayment} onClose={closeModal}>
                <form onSubmit={savePayment} className="space-y-4 p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ثبت پرداخت جدید
                    </h2>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            مبلغ پرداخت
                        </label>
                        <input
                            type="number"
                            className={inputClass}
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            placeholder="مبلغ پرداخت"
                            required
                        />
                        <InputError message={errors.amount} />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            تاریخ پرداخت
                        </label>
                        <AfghanDatePicker
                            value={data.payment_date}
                            onChange={(v) =>
                                setData('payment_date', v.format('YYYY-MM-DD'))
                            }
                        />
                        <InputError message={errors.payment_date} />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            یادداشت (اختیاری)
                        </label>
                        <textarea
                            rows="2"
                            className={inputClass}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="توضیحات پرداخت"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            ثبت پرداخت
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Flash Message */}
            <Transition
                show={showFlash}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="rounded bg-green-600 p-3 text-sm text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}

function SummaryCard({ label, value, color }) {
    const colorMap = {
        sky: 'bg-sky-100 text-sky-700',
        purple: 'bg-purple-100 text-purple-700',
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-700',
    };
    return (
        <div className={`rounded-lg p-4 shadow-sm ${colorMap[color]}`}>
            <div className="text-xs text-gray-600">{label}</div>
            <div className="text-xl font-bold">{value}</div>
        </div>
    );
}

function TabButton({ active, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 ${active ? 'bg-sky-600 text-white' : 'hover:bg-sky-500 hover:text-white'}`}
        >
            {label}
        </button>
    );
}

function RecordsTable({ records, showRemaining = false, onPayment }) {
    if (!records.length) {
        return (
            <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-600 shadow-md">
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
                                {showRemaining ? (
                                    <>
                                        <td className="border-l px-2 py-1 font-semibold">
                                            پرداخت شده:
                                        </td>
                                        <td className="px-2 py-1">
                                            {record.paid_amount.toLocaleString()}{' '}
                                            افغانی
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border-l px-2 py-1 font-semibold">
                                            توضیحات
                                        </td>
                                        <td className="w-96 px-2 py-1 text-gray-700">
                                            {record.description}
                                        </td>
                                    </>
                                )}
                            </tr>
                            {showRemaining && (
                                <tr>
                                    <td className="border-l px-2 py-1 font-semibold">
                                        باقی مانده:
                                    </td>
                                    <td className="px-2 py-1 font-bold text-red-700">
                                        {record.remaining_amount.toLocaleString()}{' '}
                                        افغانی
                                    </td>
                                    <td className="border-l px-2 py-1 font-semibold">
                                        توضیحات
                                    </td>
                                    <td className="w-96 px-2 py-1 text-gray-700">
                                        {record.description}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-3 flex justify-end gap-2">
                        {showRemaining && (
                            <button
                                onClick={() => onPayment(record.id)}
                                className="rounded bg-teal-600 px-3 py-1 text-xs text-white shadow hover:bg-teal-700"
                            >
                                پرداخت
                            </button>
                        )}
                        <Link
                            href={route('medicine.show', record.id)}
                            className="rounded bg-indigo-600 px-3 py-1 text-xs text-white shadow hover:bg-indigo-700"
                        >
                            مشاهده خرید
                        </Link>
                        <Link
                            href={route('medicine.payments.index', record.id)}
                            className="rounded bg-yellow-600 px-3 py-1 text-xs text-white shadow hover:bg-yellow-700"
                        >
                            مشاهده پرداخت‌ها
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
