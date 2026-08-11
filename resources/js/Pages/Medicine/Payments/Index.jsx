import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import logo from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Building2,
    Calendar,
    Check,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign,
    Edit,
    FileText,
    MapPin,
    Package,
    Phone,
    Plus,
    Printer,
    Receipt,
    Trash,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

export default function PurchasePayments({
    medicine,
    payments: initialPayments,
}) {
    const [payments, setPayments] = useState(initialPayments);
    const [confirmingPayment, setConfirmingPayment] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [deletePaymentId, setDeletePaymentId] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
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

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const totalPaid = payments.reduce(
        (sum, p) => sum + parseFloat(p.amount),
        0,
    );
    const remaining = medicine.total_amount - totalPaid;
    const paymentPercentage =
        medicine.total_amount > 0
            ? Math.round((totalPaid / medicine.total_amount) * 100)
            : 0;

    function closeModal() {
        setConfirmingPayment(false);
        setSelectedPayment(null);
        reset();
        clearErrors();
    }

    function openCreateModal() {
        setSelectedPayment(null);
        setData({
            id: null,
            amount: remaining > 0 ? remaining : '',
            payment_date: moment().format('jYYYY/jMM/jDD'),
            description: '',
        });
        setConfirmingPayment(true);
    }

    function openEditModal(payment) {
        setSelectedPayment(payment);
        setData({
            id: payment.id,
            amount: payment.amount,
            payment_date: payment.payment_date,
            description: payment.description || '',
        });
        setConfirmingPayment(true);
    }

    function savePayment(e) {
        e.preventDefault();

        if (data.id) {
            // Update existing payment
            put(route('medicine.payments.update', [medicine.id, data.id]), {
                onSuccess: () => {
                    setPayments((prev) =>
                        prev.map((p) =>
                            p.id === data.id ? { ...p, ...data } : p,
                        ),
                    );
                    closeModal();
                },
            });
        } else {
            // Create new payment
            post(route('medicine.payments.store', medicine.id), {
                onSuccess: (res) => {
                    setPayments((prev) => [...prev, res.props.payment]);
                    closeModal();
                },
            });
        }
    }

    function handleDeletePayment(payment) {
        setSelectedPayment(payment);
        setDeletePaymentId(payment.id);
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
                    setSelectedPayment(null);
                },
            },
        );
    }

    return (
        <AuthenticatedLayout
            title={`مدیریت پرداخت‌ها - فاکتور #${medicine.id}`}
        >
            <Head title={`مدیریت پرداخت‌ها - فاکتور #${medicine.id}`} />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            مدیریت پرداخت‌ها
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            فاکتور #{medicine.id} -{' '}
                            {medicine.supplier.company_name}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                        >
                            <Printer className="h-4 w-4" />
                            چاپ صورتحساب
                        </button>
                        <PrimaryButton
                            onClick={openCreateModal}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                        >
                            <Plus className="h-4 w-4" />
                            ثبت پرداخت جدید
                        </PrimaryButton>
                    </div>
                </div>

                {/* Main Invoice Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl print:shadow-none">
                    {/* Invoice Header */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6 text-white">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 overflow-hidden rounded-xl bg-white/10 p-2 backdrop-blur-sm">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        فروشگاه {medicine.supplier.company_name}
                                    </h2>
                                    <p className="mt-1 text-sm text-teal-100">
                                        فاکتور خرید دارو و تجهیزات پزشکی
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-left backdrop-blur-sm">
                                <p className="text-sm text-teal-100">
                                    شماره فاکتور
                                </p>
                                <p className="text-2xl font-bold">
                                    #{medicine.id}
                                </p>
                                <p className="mt-1 text-xs text-teal-100">
                                    تاریخ:{' '}
                                    {moment(medicine.purchase_date).format(
                                        'jDD jMMMM jYYYY',
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        {/* Supplier Info */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Building2 className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="font-semibold text-gray-800">
                                    اطلاعات تأمین‌کننده
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Building2 className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">شرکت:</span>
                                    <span className="font-medium text-gray-800">
                                        {medicine.supplier.company_name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        شماره تماس:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {medicine.supplier.phone}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">آدرس:</span>
                                    <span className="flex-1 font-medium text-gray-800">
                                        {medicine.supplier.address || '-'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Details */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Package className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="font-semibold text-gray-800">
                                    جزئیات خرید
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Receipt className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        مبلغ کل:
                                    </span>
                                    <span className="font-bold text-gray-800">
                                        {medicine.total_amount.toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        تاریخ خرید:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {medicine.purchase_date}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        توضیحات:
                                    </span>
                                    <span className="line-clamp-2 flex-1 font-medium text-gray-800">
                                        {medicine.description || 'بدون توضیحات'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Progress */}
                    <div className="mx-6 mb-6 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <TrendingUp className="h-5 w-5 text-teal-700" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        پیشرفت پرداخت
                                    </p>
                                    <p className="text-2xl font-bold text-teal-700">
                                        {paymentPercentage}%
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        پرداخت شده
                                    </p>
                                    <p className="text-lg font-bold text-green-600">
                                        {totalPaid.toLocaleString()}{' '}
                                        <span className="text-xs">؋</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        باقی مانده
                                    </p>
                                    <p
                                        className={`text-lg font-bold ${remaining === 0 ? 'text-green-600' : 'text-orange-600'}`}
                                    >
                                        {remaining.toLocaleString()}{' '}
                                        <span className="text-xs">؋</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
                                style={{ width: `${paymentPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Payments Table */}
                    <div className="px-6 pb-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4" />
                                                مبلغ
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4" />
                                                روش پرداخت
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                تاریخ پرداخت
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4" />
                                                وضعیت
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                توضیحات
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {payments.length > 0 ? (
                                        payments.map((payment, idx) => (
                                            <tr
                                                key={payment.id}
                                                className="group transition-colors hover:bg-teal-50/50"
                                            >
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-600">
                                                    {idx + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <span className="text-sm font-bold text-gray-800">
                                                        {payment.amount.toLocaleString()}
                                                    </span>
                                                    <span className="mr-1 text-xs text-gray-500">
                                                        ؋
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                        <CreditCard className="h-3 w-3" />
                                                        نقدی
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {payment.payment_date}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    {payment.amount ===
                                                    remaining ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                            <Clock className="h-3 w-3" />
                                                            در انتظار
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                            <Check className="h-3 w-3" />
                                                            تکمیل شده
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex max-w-[200px] items-start gap-1.5">
                                                        <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                        <span className="line-clamp-2 text-sm text-gray-600">
                                                            {payment.description ||
                                                                '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    payment,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                            title="ویرایش پرداخت"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeletePayment(
                                                                    payment,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                            title="حذف پرداخت"
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="rounded-full bg-gray-100 p-4">
                                                        <Wallet className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                    <p className="mt-4 text-sm font-medium text-gray-600">
                                                        هیچ پرداختی ثبت نشده است
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        برای ثبت اولین پرداخت،
                                                        دکمه زیر را کلیک کنید
                                                    </p>
                                                    <button
                                                        onClick={
                                                            openCreateModal
                                                        }
                                                        className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        ثبت اولین پرداخت
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="px-4 py-3 text-sm font-medium text-gray-700"
                                        >
                                            جمع کل پرداخت‌ها
                                        </td>
                                        <td
                                            colSpan="2"
                                            className="px-4 py-3 text-sm font-bold text-teal-700"
                                        >
                                            {totalPaid.toLocaleString()} افغانی
                                        </td>
                                        <td colSpan="3"></td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="px-4 py-3 text-sm font-medium text-gray-700"
                                        >
                                            مبلغ باقی‌مانده
                                        </td>
                                        <td
                                            colSpan="2"
                                            className={`px-4 py-3 text-sm font-bold ${remaining === 0 ? 'text-green-700' : 'text-orange-700'}`}
                                        >
                                            {remaining.toLocaleString()} افغانی
                                        </td>
                                        <td colSpan="3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Payment Modal - Enhanced */}
                <Modal show={confirmingPayment} onClose={closeModal}>
                    <form onSubmit={savePayment} className="space-y-4">
                        <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                            <h2 className="text-lg font-semibold text-white">
                                {data.id ? 'ویرایش پرداخت' : 'ثبت پرداخت جدید'}
                            </h2>
                            <p className="mt-1 text-sm text-teal-100">
                                {data.id
                                    ? 'ویرایش اطلاعات پرداخت'
                                    : 'برای فاکتور #' + medicine.id}
                            </p>
                        </div>

                        <div className="space-y-4 p-6">
                            {!data.id && (
                                <div className="rounded-xl bg-teal-50 p-4">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-600">
                                                مبلغ کل:
                                            </span>
                                            <span className="mr-2 font-bold text-gray-800">
                                                {medicine.total_amount.toLocaleString()}{' '}
                                                ؋
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                پرداخت شده:
                                            </span>
                                            <span className="mr-2 font-bold text-green-600">
                                                {totalPaid.toLocaleString()} ؋
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                باقی مانده:
                                            </span>
                                            <span className="mr-2 font-bold text-orange-600">
                                                {remaining.toLocaleString()} ؋
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    مبلغ پرداخت
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <DollarSign className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        step="100"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData('amount', e.target.value)
                                        }
                                        placeholder="۰"
                                        required
                                    />
                                </div>
                                <InputError message={errors.amount} />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    تاریخ پرداخت
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <AfghanDatePicker
                                        value={data.payment_date}
                                        onChange={(value) =>
                                            setData(
                                                'payment_date',
                                                value.format('YYYY/MM/DD'),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm"
                                    />
                                </div>
                                <InputError message={errors.payment_date} />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    یادداشت (اختیاری)
                                </label>
                                <div className="relative">
                                    <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                                    <textarea
                                        rows="3"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="توضیحات مربوط به این پرداخت..."
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <SecondaryButton
                                    onClick={closeModal}
                                    className="rounded-lg px-5 py-2.5"
                                >
                                    انصراف
                                </SecondaryButton>
                                <PrimaryButton
                                    disabled={processing}
                                    className="rounded-lg px-5 py-2.5"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            در حال ثبت...
                                        </span>
                                    ) : data.id ? (
                                        'ویرایش پرداخت'
                                    ) : (
                                        'ثبت پرداخت'
                                    )}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal - Enhanced */}
                <Modal
                    show={confirmingDelete}
                    onClose={() => setConfirmingDelete(false)}
                >
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-rose-100 p-3">
                                <AlertCircle className="h-6 w-6 text-rose-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    حذف پرداخت
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    آیا از حذف این پرداخت اطمینان دارید؟ این عمل
                                    غیرقابل بازگشت است.
                                </p>
                            </div>
                        </div>

                        {selectedPayment && (
                            <div className="mt-4 rounded-xl bg-rose-50 p-4">
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            مبلغ پرداخت:
                                        </span>
                                        <span className="font-bold text-rose-700">
                                            {selectedPayment.amount.toLocaleString()}{' '}
                                            افغانی
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            تاریخ پرداخت:
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {moment(
                                                selectedPayment.payment_date,
                                            ).format('jYYYY/jMM/jDD')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton
                                onClick={() => setConfirmingDelete(false)}
                                className="rounded-lg px-5 py-2.5"
                            >
                                انصراف
                            </SecondaryButton>
                            <DangerButton
                                onClick={confirmDelete}
                                className="rounded-lg px-5 py-2.5"
                            >
                                حذف پرداخت
                            </DangerButton>
                        </div>
                    </div>
                </Modal>

                {/* Enhanced Flash Message */}
                <Transition
                    show={showFlash}
                    enter="transition-all duration-300 ease-out"
                    enterFrom="opacity-0 translate-x-2"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-200 ease-in"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-2"
                    className="fixed bottom-6 left-6 z-50"
                >
                    <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-2xl">
                        <div className="rounded-full bg-green-100 p-1">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">موفقیت!</p>
                            <p className="text-sm text-gray-600">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </Transition>
            </div>
        </AuthenticatedLayout>
    );
}
