import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import log from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Check, Cross } from 'lucide-react';
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

            <div className="m-6 mx-auto max-w-4xl bg-gray-50 font-sans print:bg-white">
                {/* Header */}
                <div className="bg-blueGray-600 mb-6 flex items-center justify-between rounded-t-lg p-6 text-white print:mb-4 print:rounded-none print:bg-white print:text-black">
                    {/* Logo and Store Name */}
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

                    {/* Invoice Info */}
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
                            <span className="text-sm font-semibold">شرکت:</span>
                            <span className="text-xs font-semibold">
                                {medicine.supplier.company_name}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                شماره تماس:
                            </span>
                            <span className="text-xs font-semibold">
                                {medicine.supplier.phone}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">آدرس:</span>
                            <span className="text-xs font-semibold">
                                {medicine.supplier.address || '-'}
                            </span>
                        </p>
                    </div>
                    <div className="rounded border p-4 shadow-sm print:border print:shadow-none">
                        <h2 className="mb-2 text-lg font-semibold">
                            جزئیات خرید
                        </h2>
                        <p className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                توضیحات :
                            </span>
                            <span className="text-xs font-semibold">
                                {medicine.description}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                تاریخ خرید:
                            </span>
                            <span className="text-xs font-semibold">
                                {medicine.purchase_date}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                مبلغ کل:
                            </span>
                            <span className="text-xs font-semibold">
                                {medicine.total_amount.toLocaleString()} افغانی
                            </span>
                        </p>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="mx-3 overflow-hidden rounded-lg border shadow-sm print:border print:shadow-none">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-blueGray-600 print:bg-gray-100">
                            <tr>
                                <th className="border-b p-2 text-right text-sm text-white print:text-gray-700">
                                    مبلغ
                                </th>
                                <th className="border-b p-2 text-right text-sm text-white print:text-gray-700">
                                    روش پرداخت
                                </th>
                                <th className="border-b p-2 text-right text-sm text-white print:text-gray-700">
                                    تاریخ پرداخت
                                </th>

                                <th className="border-b p-2 text-center text-sm text-white print:text-gray-700">
                                    وضعیت
                                </th>
                                <th className="border-b p-2 text-right text-sm text-white print:text-gray-700">
                                    توضیحات
                                </th>
                                <th className="border-b p-2 text-center text-sm text-white print:text-gray-700">
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
                                    <td className="p-2 text-left text-sm">
                                        {p.amount === remaining ? (
                                            <Cross className="mx-auto h-4 w-4" />
                                        ) : (
                                            <Check className="mx-auto h-4 w-4 font-semibold text-green-600" />
                                        )}
                                    </td>
                                    <td className="p-2 text-right text-sm">
                                        {p.description || '-'}
                                    </td>

                                    <td className="flex justify-center gap-2 p-2">
                                        {/* Edit Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData({
                                                    amount: p.amount,
                                                    payment_date:
                                                        p.payment_date,
                                                    description: p.description,
                                                    id: p.id,
                                                });
                                                setConfirmingPayment(true);
                                            }}
                                            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                        >
                                            ویرایش
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeletePayment(p.id)
                                            }
                                            className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-blueGray-600 font-semibold print:bg-gray-300">
                            <tr>
                                <td className="p-2 text-right text-sm text-white print:text-gray-700">
                                    جمع کل پرداخت‌ها
                                </td>
                                <td className="p-2 text-right text-sm text-white print:text-gray-700">
                                    {totalPaid.toLocaleString()}
                                </td>
                                <td
                                    className="p-2 text-sm text-white print:text-gray-700"
                                    colSpan={4}
                                ></td>
                            </tr>
                            <tr>
                                <td className="p-2 text-right text-sm text-white print:text-gray-700">
                                    باقی مانده
                                </td>
                                <td className="p-2 text-right text-sm font-bold text-white print:text-gray-700">
                                    {remaining.toLocaleString()}
                                </td>
                                <td
                                    className="p-2 text-sm text-white print:text-gray-700"
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
