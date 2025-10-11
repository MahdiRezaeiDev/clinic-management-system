import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import log from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function PurchasePayments({
    medicine,
    payments: initialPayments,
}) {
    const [payments, setPayments] = useState(initialPayments);
    const [confirmingPayment, setConfirmingPayment] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [deletePaymentId, setDeletePaymentId] = useState(null);
    const [data, setData] = useState({
        id: null,
        amount: '',
        payment_date: '',
        description: '',
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    console.log(errors);

    const totalPaid = payments.reduce(
        (sum, p) => sum + parseFloat(p.amount),
        0,
    );
    const remaining = medicine.total_amount - totalPaid;

    function closeModal() {
        setConfirmingPayment(false);
        setData({ id: null, amount: '', payment_date: '', description: '' });
        setErrors({});
    }

    function savePayment(e) {
        e.preventDefault();
        setProcessing(true);

        // Simulate saving/updating payment
        if (data.id) {
            // Edit existing payment
            setPayments((prev) =>
                prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)),
            );
        } else {
            // Add new payment
            const newPayment = { ...data, id: Date.now() };
            setPayments((prev) => [...prev, newPayment]);
        }

        setProcessing(false);
        closeModal();
    }

    function handleDeletePayment(id) {
        setDeletePaymentId(id);
        setConfirmingDelete(true);
    }

    function confirmDelete() {
        setPayments((prev) => prev.filter((p) => p.id !== deletePaymentId));
        setConfirmingDelete(false);
        setDeletePaymentId(null);
    }

    return (
        <AuthenticatedLayout title="صورتحساب پرداخت‌ها">
            <Head title="صورتحساب پرداخت‌ها" />

            <div className="m-6 mx-auto max-w-4xl font-sans print:bg-white">
                {/* Header */}
                <div className="mx-3 mb-6 flex flex-col justify-between rounded-t-xl bg-gray-700 p-6 text-white shadow-sm print:mb-4 print:rounded-none print:bg-gray-200 print:text-gray-700">
                    {/* Top Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Logo + Store Info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={log}
                                alt="Logo"
                                className="h-16 w-16 rounded-full border border-gray-500 bg-white shadow-sm print:border-gray-300 print:shadow-none"
                            />
                            <div>
                                <h1 className="text-2xl font-bold leading-tight">
                                    فروشگاه {medicine.supplier.company_name}
                                </h1>
                                <p className="text-sm opacity-80">
                                    فاکتور خرید
                                </p>
                            </div>
                        </div>

                        {/* Bill Info */}
                        <div className="text-right">
                            <p className="text-xl font-extrabold tracking-wide">
                                فاکتور #{medicine.id}
                            </p>
                            <p className="mt-1 text-sm opacity-90">
                                تاریخ: {medicine.purchase_date}
                            </p>
                        </div>
                    </div>

                    {/* Optional Subtext */}
                    <div className="mt-4 border-t border-gray-600 pt-2 text-center text-xs opacity-80 print:border-gray-300">
                        صادرشده توسط سیستم مدیریت دارو - بدون نیاز به امضا
                    </div>
                </div>

                {/* Supplier & Purchase Info */}
                <div className="mb-6 grid grid-cols-1 gap-4 px-3 md:grid-cols-2 print:mb-4 print:grid-cols-2">
                    {/* Supplier Info */}
                    <div className="rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm print:border print:shadow-none">
                        <h2 className="mb-3 border-b pb-2 text-base font-semibold text-gray-700">
                            اطلاعات تأمین‌کننده
                        </h2>
                        <div className="space-y-1.5 text-sm">
                            <p className="flex justify-between">
                                <span className="text-gray-600">شرکت:</span>
                                <span
                                    className="max-w-[180px] truncate font-medium text-gray-800"
                                    title={medicine.supplier.company_name}
                                >
                                    {medicine.supplier.company_name}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">
                                    شماره تماس:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {medicine.supplier.phone}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">آدرس:</span>
                                <span
                                    className="max-w-[180px] truncate font-medium text-gray-800"
                                    title={medicine.supplier.address || '-'}
                                >
                                    {medicine.supplier.address || '-'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Purchase Info */}
                    <div className="rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm print:border print:shadow-none">
                        <h2 className="mb-3 border-b pb-2 text-base font-semibold text-gray-700">
                            جزئیات خرید
                        </h2>
                        <div className="space-y-1.5 text-sm">
                            <p className="flex justify-between">
                                <span className="text-gray-600">توضیحات:</span>
                                <span
                                    className="max-w-[180px] truncate font-medium text-gray-800"
                                    title={medicine.description}
                                >
                                    {medicine.description || '-'}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">
                                    تاریخ خرید:
                                </span>
                                <span className="font-medium text-gray-800">
                                    {medicine.purchase_date}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">مبلغ کل:</span>
                                <span className="font-medium text-gray-800">
                                    {medicine.total_amount.toLocaleString()}{' '}
                                    افغانی
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="mx-3 overflow-hidden rounded-xl border border-gray-200 shadow-sm print:border print:shadow-none">
                    <table className="min-w-full border-collapse">
                        {/* Header */}
                        <thead className="bg-gradient-to-l from-gray-600 to-gray-500 text-white print:bg-gray-100 print:text-gray-700">
                            <tr>
                                {[
                                    'مبلغ',
                                    'روش پرداخت',
                                    'تاریخ پرداخت',
                                    'وضعیت',
                                    'توضیحات',
                                    'عملیات',
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="border-gry-400 border-b p-2 text-right text-sm font-medium print:border-gray-300 print:bg-gray-50"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((p, idx) => (
                                    <tr
                                        key={p.id}
                                        className={`${
                                            idx % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        } transition-colors hover:bg-blue-50/60 print:bg-white`}
                                    >
                                        <td className="p-2 text-right text-sm font-medium text-gray-800">
                                            {p.amount.toLocaleString()}
                                        </td>
                                        <td className="p-2 text-right text-sm text-gray-700">
                                            نقدی
                                        </td>
                                        <td className="p-2 text-right text-sm text-gray-700">
                                            {p.payment_date}
                                        </td>
                                        <td className="p-2 text-center">
                                            {p.amount === remaining ? (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                                                    در انتظار
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                                    پرداخت‌شده
                                                </span>
                                            )}
                                        </td>
                                        <td
                                            className="max-w-[200px] truncate p-2 text-right text-sm text-gray-700"
                                            title={p.description}
                                        >
                                            {p.description || '-'}
                                        </td>
                                        <td className="p-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                {/* Edit */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData({
                                                            amount: p.amount,
                                                            payment_date:
                                                                p.payment_date,
                                                            description:
                                                                p.description,
                                                            id: p.id,
                                                        });
                                                        setConfirmingPayment(
                                                            true,
                                                        );
                                                    }}
                                                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                                >
                                                    ✏️ ویرایش
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeletePayment(
                                                            p.id,
                                                        )
                                                    }
                                                    className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
                                                >
                                                    🗑️ حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 text-center text-sm text-gray-500"
                                    >
                                        هیچ پرداختی ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                        {/* Footer */}
                        <tfoot className="bg-gray-100 font-semibold print:bg-gray-200">
                            <tr>
                                <td
                                    colSpan={2}
                                    className="p-2 text-right text-sm text-gray-800"
                                >
                                    جمع کل پرداخت‌ها
                                </td>
                                <td
                                    colSpan={2}
                                    className="p-2 text-right text-sm text-blue-700"
                                >
                                    {totalPaid.toLocaleString()} افغانی
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={2}
                                    className="p-2 text-right text-sm text-gray-800"
                                >
                                    مبلغ باقی‌مانده
                                </td>
                                <td
                                    colSpan={2}
                                    className={`p-2 text-right text-sm font-bold ${
                                        remaining === 0
                                            ? 'text-green-700'
                                            : 'text-red-700'
                                    }`}
                                >
                                    {remaining.toLocaleString()} افغانی
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Print Button */}
                <div className="mt-6 flex justify-end p-3 print:hidden">
                    <PrimaryButton onClick={() => window.print()}>
                        چاپ صورتحساب
                    </PrimaryButton>
                </div>

                {/* ✅ Payment Modal */}
                <Modal show={confirmingPayment} onClose={closeModal}>
                    <form onSubmit={savePayment} className="space-y-4 p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            {data.id ? 'ویرایش پرداخت' : 'ثبت پرداخت جدید'}
                        </h2>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                مبلغ پرداخت
                            </label>
                            <input
                                type="number"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.amount}
                                onChange={(e) =>
                                    setData({ ...data, amount: e.target.value })
                                }
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
                                    setData({
                                        ...data,
                                        payment_date: v.format('YYYY-MM-DD'),
                                    })
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
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                value={data.description}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        description: e.target.value,
                                    })
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
                                {data.id ? 'ویرایش پرداخت' : 'ثبت پرداخت'}
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>

                {/* ✅ Delete Confirmation Modal */}
                <Modal
                    show={confirmingDelete}
                    onClose={() => setConfirmingDelete(false)}
                >
                    <div className="space-y-4 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            حذف پرداخت
                        </h2>
                        <p>
                            آیا از حذف این پرداخت مطمئن هستید؟ این عملیات قابل
                            بازگشت نیست.
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                            <SecondaryButton
                                onClick={() => setConfirmingDelete(false)}
                            >
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton onClick={confirmDelete}>
                                حذف
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
