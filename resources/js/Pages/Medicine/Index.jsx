import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    BadgeCheck,
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    Edit,
    FileText,
    History,
    Package,
    Plus,
    Receipt,
    Trash,
    TrendingUp,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function PurchasesIndex({ purchases }) {
    const [activeTab, setActiveTab] = useState('remaining');
    const remaining = purchases.filter((p) => p.status === 'unpaid');
    const fullyPaid = purchases.filter((p) => p.status === 'paid');
    const displayed = activeTab === 'remaining' ? remaining : fullyPaid;

    // Calculate statistics
    const totalRemaining = remaining.reduce(
        (sum, p) => sum + Number(p.remaining_amount),
        0,
    );
    const totalPaid = fullyPaid.reduce(
        (sum, p) => sum + Number(p.paid_amount),
        0,
    );
    const totalPurchases = purchases.reduce(
        (sum, p) => sum + Number(p.total_amount),
        0,
    );
    const averagePurchase =
        purchases.length > 0 ? totalPurchases / purchases.length : 0;

    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const [purchaseId, setPurchaseId] = useState(null);
    const [confirmingPurchaseDeletion, setConfirmingPurchaseDeletion] =
        useState(false);
    const [confirmingPayment, setConfirmingPayment] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

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
        payment_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        description: '',
    });

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmPurchaseDeletion = (purchase) => {
        setSelectedPurchase(purchase);
        setPurchaseId(purchase.id);
        setConfirmingPurchaseDeletion(true);
    };

    const confirmPaymentModal = (purchase) => {
        setSelectedPurchase(purchase);
        setPurchaseId(purchase.id);
        setConfirmingPayment(true);
    };

    const deletePurchase = (e) => {
        e.preventDefault();
        destroy(route('medicine.destroy', purchaseId), {
            preserveScroll: true,
            onSuccess: closeModal,
            onFinish: reset,
        });
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
        setConfirmingPurchaseDeletion(false);
        setConfirmingPayment(false);
        setPurchaseId(null);
        setSelectedPurchase(null);
        clearErrors();
        reset();
    };

    // Stat Card Component
    const StatCard = ({ title, value, icon: Icon, subtitle, color }) => (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute left-0 top-0 h-full w-1 ${color}`}></div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-800">
                        {Number(value).toLocaleString()}
                        <span className="mr-1 text-sm font-normal text-gray-500">
                            افغانی
                        </span>
                    </p>
                    {subtitle && (
                        <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
                    )}
                </div>
                <div
                    className={`rounded-xl p-3 ${color.replace('bg-', 'bg- bg-opacity-10')}`}
                >
                    <Icon
                        className={`h-6 w-6 ${color.replace('bg-', 'text-')}`}
                    />
                </div>
            </div>
        </div>
    );

    // Progress Bar Component
    const PaymentProgress = ({ paid, total }) => {
        const percentage = total > 0 ? Math.round((paid / total) * 100) : 0;
        return (
            <div className="w-32">
                <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700">
                        {percentage}%
                    </span>
                    <span className="text-gray-500">
                        {paid.toLocaleString()} / {total.toLocaleString()}
                    </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            percentage === 100 ? 'bg-green-500' : 'bg-teal-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout title="مدیریت خرید دارو">
            <Head title="مدیریت خرید دارو" />

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
                            مدیریت خرید دارو
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت و پیگیری خریدهای دارو از شرکت‌های تامین‌کننده
                        </p>
                    </div>

                    <Link
                        href={route('medicine.create')}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                    >
                        <Plus className="h-4 w-4" />
                        ثبت خرید جدید
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="کل خریدها"
                        value={totalPurchases}
                        icon={Package}
                        subtitle={`${purchases.length} فاکتور خرید`}
                        color="bg-teal-500"
                    />
                    <StatCard
                        title="پرداخت شده"
                        value={totalPaid}
                        icon={CheckCircle}
                        subtitle="مبلغ تسویه شده"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="باقی مانده"
                        value={totalRemaining}
                        icon={Clock}
                        subtitle="مبلغ پرداخت نشده"
                        color="bg-orange-500"
                    />
                    <StatCard
                        title="میانگین هر خرید"
                        value={averagePurchase}
                        icon={TrendingUp}
                        subtitle="میانگین مبلغ هر فاکتور"
                        color="bg-purple-500"
                    />
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Tabs & Filter Section */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Building2 className="h-5 w-5 text-teal-700" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    لیست خریدهای دارو
                                </h2>
                            </div>

                            {/* Tabs */}
                            <div className="flex rounded-xl bg-gray-100 p-1">
                                <button
                                    onClick={() => setActiveTab('remaining')}
                                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        activeTab === 'remaining'
                                            ? 'bg-white text-teal-700 shadow-md'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-teal-600'
                                    }`}
                                >
                                    <Clock className="h-4 w-4" />
                                    باقی مانده
                                    {remaining.length > 0 && (
                                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                            {remaining.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('fullyPaid')}
                                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        activeTab === 'fullyPaid'
                                            ? 'bg-white text-teal-700 shadow-md'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-teal-600'
                                    }`}
                                >
                                    <BadgeCheck className="h-4 w-4" />
                                    تسویه شده
                                    {fullyPaid.length > 0 && (
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                            {fullyPaid.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Purchases Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4" />
                                            شرکت تامین‌کننده
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            توضیحات
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-medium text-white">
                                        <div className="flex items-center justify-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            تاریخ خرید
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-medium text-white">
                                        <div className="flex items-center justify-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            کل مبلغ
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-medium text-white">
                                        <div className="flex items-center justify-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            پرداخت شده
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-medium text-white">
                                        <div className="flex items-center justify-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            باقی مانده
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-medium text-white">
                                        پیشرفت پرداخت
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-medium text-white">
                                        اقدامات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {displayed.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-full bg-gray-100 p-4">
                                                    <Package className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <p className="mt-4 text-sm font-medium text-gray-600">
                                                    هیچ خریدی در این بخش وجود
                                                    ندارد
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    برای ثبت خرید جدید، دکمه زیر
                                                    را کلیک کنید
                                                </p>
                                                <Link
                                                    href={route(
                                                        'medicine.create',
                                                    )}
                                                    className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    ثبت اولین خرید
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    displayed.map((purchase) => (
                                        <tr
                                            key={purchase.id}
                                            className="group transition-colors hover:bg-teal-50/50"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-lg bg-teal-50 p-1.5">
                                                        <Building2 className="h-4 w-4 text-teal-600" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {
                                                                purchase.supplier_name
                                                            }
                                                        </span>
                                                        {purchase.invoice_number && (
                                                            <span className="mt-0.5 block text-xs text-gray-500">
                                                                فاکتور:{' '}
                                                                {
                                                                    purchase.invoice_number
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex max-w-xs items-start gap-1.5">
                                                    <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                                                    <span className="line-clamp-2 text-sm text-gray-600">
                                                        {purchase.description ||
                                                            'بدون توضیحات'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5">
                                                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {moment(
                                                            purchase.purchase_date,
                                                        ).format(
                                                            'jYYYY/jMM/jDD',
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="text-sm font-bold text-gray-800">
                                                    {purchase.total_amount.toLocaleString()}
                                                </span>
                                                <span className="mr-1 text-xs text-gray-500">
                                                    ؋
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="text-sm font-semibold text-green-600">
                                                    {purchase.paid_amount.toLocaleString()}
                                                </span>
                                                <span className="mr-1 text-xs text-gray-500">
                                                    ؋
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="text-sm font-semibold text-red-600">
                                                    {purchase.remaining_amount.toLocaleString()}
                                                </span>
                                                <span className="mr-1 text-xs text-gray-500">
                                                    ؋
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <PaymentProgress
                                                    paid={purchase.paid_amount}
                                                    total={
                                                        purchase.total_amount
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {purchase.status !==
                                                        'paid' && (
                                                        <button
                                                            onClick={() =>
                                                                confirmPaymentModal(
                                                                    purchase,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                            title="ثبت پرداخت"
                                                        >
                                                            <Receipt className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                    <Link
                                                        href={route(
                                                            'medicine.payments.index',
                                                            purchase.id,
                                                        )}
                                                        className="rounded-lg p-2 text-sky-600 transition-colors hover:bg-sky-50"
                                                        title="تاریخچه پرداخت‌ها"
                                                    >
                                                        <History className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            'medicine.edit',
                                                            purchase.id,
                                                        )}
                                                        className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                        title="ویرایش"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmPurchaseDeletion(
                                                                purchase,
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                        title="حذف"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Summary */}
                    {displayed.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-teal-100 p-1.5">
                                        <CheckCircle className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        نمایش {displayed.length} خرید در بخش{' '}
                                        {activeTab === 'remaining'
                                            ? 'باقی مانده'
                                            : 'تسویه شده'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            جمع کل:
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            {displayed
                                                .reduce(
                                                    (sum, p) =>
                                                        sum +
                                                        Number(p.total_amount),
                                                    0,
                                                )
                                                .toLocaleString()}{' '}
                                            ؋
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            باقی مانده:
                                        </span>
                                        <span className="text-sm font-bold text-orange-600">
                                            {displayed
                                                .reduce(
                                                    (sum, p) =>
                                                        sum +
                                                        Number(
                                                            p.remaining_amount,
                                                        ),
                                                    0,
                                                )
                                                .toLocaleString()}{' '}
                                            ؋
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal - Enhanced */}
            <Modal show={confirmingPurchaseDeletion} onClose={closeModal}>
                <form onSubmit={deletePurchase} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف خرید دارو
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                آیا از حذف این خرید اطمینان دارید؟ این عمل
                                غیرقابل بازگشت است.
                            </p>
                        </div>
                    </div>

                    {selectedPurchase && (
                        <div className="mt-4 rounded-xl bg-rose-50 p-4">
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">شرکت:</span>
                                    <span className="font-medium text-gray-800">
                                        {selectedPurchase.supplier_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        تاریخ خرید:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {moment(
                                            selectedPurchase.purchase_date,
                                        ).format('jYYYY/jMM/jDD')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        مبلغ کل:
                                    </span>
                                    <span className="font-bold text-rose-700">
                                        {Number(
                                            selectedPurchase.total_amount,
                                        ).toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
                                {selectedPurchase.remaining_amount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            باقی مانده:
                                        </span>
                                        <span className="font-medium text-orange-600">
                                            {Number(
                                                selectedPurchase.remaining_amount,
                                            ).toLocaleString()}{' '}
                                            افغانی
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={closeModal}
                            className="px-5 py-2.5"
                        >
                            انصراف
                        </SecondaryButton>
                        <DangerButton
                            disabled={processing}
                            className="px-5 py-2.5"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    در حال حذف...
                                </span>
                            ) : (
                                'حذف خرید'
                            )}
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Payment Modal - Enhanced */}
            <Modal show={confirmingPayment} onClose={closeModal}>
                <form onSubmit={savePayment} className="space-y-4">
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                        <h2 className="text-lg font-semibold text-white">
                            ثبت پرداخت جدید
                        </h2>
                        <p className="mt-1 text-sm text-teal-100">
                            اطلاعات پرداخت برای{' '}
                            {selectedPurchase?.supplier_name}
                        </p>
                    </div>

                    <div className="space-y-4 p-6">
                        {selectedPurchase && (
                            <div className="rounded-xl bg-teal-50 p-4">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-600">
                                            مبلغ کل:
                                        </span>
                                        <span className="mr-2 font-bold text-gray-800">
                                            {Number(
                                                selectedPurchase.total_amount,
                                            ).toLocaleString()}{' '}
                                            ؋
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">
                                            پرداخت شده:
                                        </span>
                                        <span className="mr-2 font-bold text-green-600">
                                            {Number(
                                                selectedPurchase.paid_amount,
                                            ).toLocaleString()}{' '}
                                            ؋
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">
                                            باقی مانده:
                                        </span>
                                        <span className="mr-2 font-bold text-orange-600">
                                            {Number(
                                                selectedPurchase.remaining_amount,
                                            ).toLocaleString()}{' '}
                                            ؋
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
                                <input
                                    type="number"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
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
                            <AfghanDatePicker
                                value={data.payment_date}
                                onChange={(value) =>
                                    setData(
                                        'payment_date',
                                        value.format('YYYY/MM/DD'),
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                            />
                            <InputError message={errors.payment_date} />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                یادداشت (اختیاری)
                            </label>
                            <textarea
                                rows="3"
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="توضیحات مربوط به این پرداخت..."
                            />
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
                                ) : (
                                    'ثبت پرداخت'
                                )}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
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
                        <p className="text-sm text-gray-600">{flash.success}</p>
                    </div>
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
