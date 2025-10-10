import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import log from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function PurchasePayments({
    medicine,
    payments: initialPayments,
}) {
    const [payments, setPayments] = useState(initialPayments);
    const [confirmingPayment, setConfirmingPayment] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [deletePaymentId, setDeletePaymentId] = useState(null);

    const {
        delete: destroy,
        post,
        put,
        data,
        setData,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        id: null,
        amount: '',
        payment_date: '',
        description: '',
    });

    const totalPaid = payments.reduce(
        (sum, p) => sum + parseFloat(p.amount),
        0,
    );
    const remaining = medicine.total_amount - totalPaid;

    function closeModal() {
        setConfirmingPayment(false);
        reset();
        clearErrors();
    }

    function openEditModal(payment) {
        setData({
            id: payment.id,
            amount: payment.amount,
            payment_date: payment.payment_date,
            description: payment.description,
        });
        setConfirmingPayment(true);
    }

    function savePayment(e) {
        e.preventDefault();

        if (data.id) {
            // Edit payment
            put(route('medicine.payments.update', [medicine.id, data.id]), {
                onSuccess: () => {
                    // Update payments locally
                    setPayments((prev) =>
                        prev.map((p) =>
                            p.id === data.id ? { ...p, ...data } : p,
                        ),
                    );
                    closeModal();
                },
            });
        } else {
            // Add new payment
            post(route('medicine.payments.store', medicine.id), {
                onSuccess: () => {
                    // Add payment locally (simulate ID)
                    const newPayment = { ...data, id: Date.now() };
                    setPayments((prev) => [...prev, newPayment]);
                    closeModal();
                },
            });
        }
    }

    function handleDeletePayment(id) {
        setDeletePaymentId(id);
        setConfirmingDelete(true);
    }

    function confirmDelete() {
        destroy(
            route('medicine.payments.destroy', [medicine.id, deletePaymentId]),
            {
                onSuccess: () => {
                    setPayments((prev) =>
                        prev.filter((p) => p.id !== deletePaymentId),
                    );
                    setConfirmingDelete(false);
                    setDeletePaymentId(null);
                },
            },
        );
    }

    return (
        <AuthenticatedLayout title="صورتحساب پرداخت‌ها">
            <Head title="صورتحساب پرداخت‌ها" />

            <div className="m-6 mx-auto max-w-4xl bg-gray-50 font-sans print:bg-white">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between rounded-t-lg bg-blue-700 p-6 text-white print:mb-4 print:rounded-none print:bg-white print:text-black">
                    <div className="flex items-center">
                        <img
                            src={log}
                            alt="Logo"
                            className="mr-4 h-16 w-16 rounded-full"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">
                                فروشگاه {medicine.supplier.company_name}
                            </h1>
                            <p className="mt-1 text-gray-200">بیل خرید</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">
                            تاریخ بیل: {medicine.purchase_date}
                        </p>
                        <p className="text-lg font-semibold">
                            شماره بیل: {medicine.id}
                        </p>
                    </div>
                </div>

                {/* Supplier & Purchase Info */}
                <div className="mb-6 grid grid-cols-1 gap-6 px-3 md:grid-cols-2 print:mb-4 print:grid-cols-2">
                    <div className="rounded border p-4 shadow-sm print:border print:shadow-none">
                        <h2 className="mb-2 text-lg font-semibold">
                            اطلاعات تامین‌کننده
                        </h2>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">شرکت:</span>{' '}
                            {medicine.supplier.company_name}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                شماره تماس:
                            </span>{' '}
                            {medicine.supplier.phone}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">آدرس:</span>{' '}
                            {medicine.supplier.address || '-'}
                        </p>
                    </div>
                    <div className="rounded border p-4 shadow-sm print:border print:shadow-none">
                        <h2 className="mb-2 text-lg font-semibold">
                            جزئیات خرید
                        </h2>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                توضیحات :
                            </span>{' '}
                            {medicine.description}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                تاریخ خرید:
                            </span>{' '}
                            {medicine.purchase_date}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                مبلغ کل:
                            </span>{' '}
                            {medicine.total_amount.toLocaleString()} AFN
                        </p>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="mx-3 overflow-hidden rounded-lg border shadow-sm print:border print:shadow-none">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-gray-200 print:bg-gray-100">
                            <tr>
                                <th className="border-b px-4 py-2 text-right">
                                    مبلغ
                                </th>
                                <th className="border-b px-4 py-2 text-right">
                                    روش پرداخت
                                </th>
                                <th className="border-b px-4 py-2 text-right">
                                    تاریخ پرداخت
                                </th>
                                <th className="border-b px-4 py-2 text-right">
                                    توضیحات
                                </th>
                                <th className="border-b px-4 py-2 text-center">
                                    وضعیت
                                </th>
                                <th className="border-b px-4 py-2 text-center">
                                    عملیات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, idx) => (
                                <tr
                                    key={p.id}
                                    className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 print:bg-white`}
                                >
                                    <td className="p-2 text-right text-sm">
                                        {p.amount.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right text-sm">
                                        نقدی
                                    </td>
                                    <td className="p-2 text-right text-sm">
                                        {p.payment_date}
                                    </td>
                                    <td className="p-2 text-right text-sm">
                                        {p.description || '-'}
                                    </td>
                                    <td className="p-2 text-center text-sm">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${p.amount === remaining ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}
                                        >
                                            {p.amount === remaining
                                                ? 'پرداخت نشده'
                                                : 'پرداخت شده'}
                                        </span>
                                    </td>
                                    <td className="space-x-2 p-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(p)}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            ویرایش
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeletePayment(p.id)
                                            }
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-200 font-semibold print:bg-gray-300">
                            <tr>
                                <td className="border-t px-4 py-2 text-right">
                                    جمع کل پرداخت‌ها
                                </td>
                                <td className="border-t px-4 py-2 text-right">
                                    {totalPaid.toLocaleString()}
                                </td>
                                <td
                                    className="border-t px-4 py-2"
                                    colSpan={4}
                                ></td>
                            </tr>
                            <tr>
                                <td className="border-t px-4 py-2 text-right">
                                    باقی مانده
                                </td>
                                <td className="border-t px-4 py-2 text-right font-bold text-red-600">
                                    {remaining.toLocaleString()}
                                </td>
                                <td
                                    className="border-t px-4 py-2"
                                    colSpan={4}
                                ></td>
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

                {/* Payment Modal */}
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
                                    setData('amount', e.target.value)
                                }
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
                                    setData(
                                        'payment_date',
                                        v.format('YYYY-MM-DD'),
                                    )
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
                                    setData('description', e.target.value)
                                }
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

                {/* Delete Confirmation Modal */}
                <Modal
                    show={confirmingDelete}
                    onClose={() => setConfirmingDelete(false)}
                >
                    <div className="space-y-4 p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            حذف پرداخت
                        </h2>
                        <p>
                            آیا از حذف این پرداخت اطمینان دارید؟ این عملیات قابل
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
