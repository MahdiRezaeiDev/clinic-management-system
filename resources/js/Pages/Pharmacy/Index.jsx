import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Edit,
    FileText,
    Package,
    Pill,
    Plus,
    File as Prescription,
    Printer,
    Receipt,
    ShoppingCart,
    Trash,
    TrendingUp,
    User,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

export default function PharmacySalesIndex({ sales }) {
    const [activeTab, setActiveTab] = useState('with');
    const { with: withPrescription, without: withoutPrescription } = sales;
    const displayed =
        activeTab === 'with' ? withPrescription : withoutPrescription;

    // Calculate statistics
    const totalWithPrescription = withPrescription.reduce(
        (sum, sale) => sum + Number(sale.total_amount),
        0,
    );
    const totalWithoutPrescription = withoutPrescription.reduce(
        (sum, sale) => sum + Number(sale.total_amount),
        0,
    );
    const totalSales = totalWithPrescription + totalWithoutPrescription;
    const averageSale =
        displayed.length > 0
            ? displayed.reduce(
                  (sum, sale) => sum + Number(sale.total_amount),
                  0,
              ) / displayed.length
            : 0;

    const { flash, auth } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const [saleId, setSaleId] = useState(null);
    const [confirmingSaleDeletion, setConfirmingSaleDeletion] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    const { delete: destroy, reset, clearErrors, processing } = useForm({});

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmSaleDeletion = (sale) => {
        setSelectedSale(sale);
        setSaleId(sale.id);
        setConfirmingSaleDeletion(true);
    };

    const deleteSale = (e) => {
        e.preventDefault();
        destroy(route('pharmacy.destroy', saleId), {
            preserveScroll: true,
            onSuccess: closeModal,
            onFinish: reset,
        });
    };

    const closeModal = () => {
        setConfirmingSaleDeletion(false);
        setSaleId(null);
        setSelectedSale(null);
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

    return (
        <AuthenticatedLayout title="مدیریت فروش دارو">
            <Head title="مدیریت فروش دارو" />

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
                            مدیریت فروش دارو
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت و پیگیری فروش داروهای با نسخه و بدون نسخه
                        </p>
                    </div>

                    <Link
                        href={route('pharmacy.create')}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                    >
                        <Plus className="h-4 w-4" />
                        ثبت فروش جدید
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="کل فروش"
                        value={totalSales}
                        icon={ShoppingCart}
                        subtitle="مجموع فروش کل داروخانه"
                        color="bg-teal-500"
                    />
                    <StatCard
                        title="فروش با نسخه"
                        value={totalWithPrescription}
                        icon={Prescription}
                        subtitle={`${withPrescription.length} تراکنش`}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="فروش بدون نسخه"
                        value={totalWithoutPrescription}
                        icon={Package}
                        subtitle={`${withoutPrescription.length} تراکنش`}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="میانگین هر فروش"
                        value={averageSale}
                        icon={TrendingUp}
                        subtitle={`در بخش ${activeTab === 'with' ? 'با نسخه' : 'بدون نسخه'}`}
                        color="bg-green-500"
                    />
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Tabs & Filter Section */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Pill className="h-5 w-5 text-teal-700" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    لیست فروش دارو
                                </h2>
                            </div>

                            {/* Tabs */}
                            <div className="flex rounded-xl bg-gray-100 p-1">
                                <button
                                    onClick={() => setActiveTab('with')}
                                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        activeTab === 'with'
                                            ? 'bg-white text-teal-700 shadow-md'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-teal-600'
                                    }`}
                                >
                                    <Prescription className="h-4 w-4" />
                                    با نسخه
                                    {withPrescription.length > 0 && (
                                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700">
                                            {withPrescription.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('without')}
                                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        activeTab === 'without'
                                            ? 'bg-white text-teal-700 shadow-md'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-teal-600'
                                    }`}
                                >
                                    <Package className="h-4 w-4" />
                                    بدون نسخه
                                    {withoutPrescription.length > 0 && (
                                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                                            {withoutPrescription.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        #
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            تاریخ فروش
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            جمع کل
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            توضیحات
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            کاربر
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {displayed.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-full bg-gray-100 p-4">
                                                    <Package className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <p className="mt-4 text-sm font-medium text-gray-600">
                                                    هیچ فروشی در این بخش وجود
                                                    ندارد
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    برای ثبت فروش جدید، دکمه زیر
                                                    را کلیک کنید
                                                </p>
                                                <Link
                                                    href={route(
                                                        'pharmacy.create',
                                                    )}
                                                    className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    ثبت اولین فروش
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    displayed.map((sale, index) => (
                                        <tr
                                            key={sale.id}
                                            className="group transition-colors hover:bg-teal-50/50"
                                        >
                                            <td className="px-4 py-4 text-sm font-medium text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-lg bg-teal-50 p-1.5">
                                                        <Calendar className="h-4 w-4 text-teal-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {moment(
                                                            sale.sale_date,
                                                        ).format(
                                                            'jDD jMMMM jYYYY',
                                                        )}
                                                    </span>
                                                </div>
                                                <span className="mt-1 block text-xs text-gray-400">
                                                    {moment(
                                                        sale.sale_date,
                                                    ).fromNow()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-lg font-bold text-gray-800">
                                                        {Number(
                                                            sale.total_amount,
                                                        ).toLocaleString()}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        ؋
                                                    </span>
                                                </div>
                                                {activeTab === 'with' &&
                                                    sale.prescription_number && (
                                                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                            <FileText className="h-3 w-3" />
                                                            نسخه:{' '}
                                                            {
                                                                sale.prescription_number
                                                            }
                                                        </span>
                                                    )}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-start gap-1.5">
                                                    <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                                                    <span className="line-clamp-2 text-sm text-gray-600">
                                                        {sale.description ||
                                                            'بدون توضیحات'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-sm font-medium text-white">
                                                        {auth.user.name.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {auth.user.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route(
                                                            'pharmacy.show',
                                                            sale.id,
                                                        )}
                                                        className="rounded-lg p-2 text-sky-600 transition-colors hover:bg-sky-50"
                                                        title="مشاهده فاکتور"
                                                    >
                                                        <Receipt className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            'pharmacy.edit',
                                                            sale.id,
                                                        )}
                                                        className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                        title="ویرایش"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmSaleDeletion(
                                                                sale,
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                        title="حذف"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            window.print()
                                                        }
                                                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50"
                                                        title="چاپ"
                                                    >
                                                        <Printer className="h-4 w-4" />
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
                                        نمایش {displayed.length} فروش در بخش{' '}
                                        {activeTab === 'with'
                                            ? 'با نسخه'
                                            : 'بدون نسخه'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">
                                        جمع کل:
                                    </span>
                                    <span className="text-lg font-bold text-teal-700">
                                        {displayed
                                            .reduce(
                                                (sum, sale) =>
                                                    sum +
                                                    Number(sale.total_amount),
                                                0,
                                            )
                                            .toLocaleString()}
                                        <span className="mr-1 text-sm font-normal text-gray-500">
                                            افغانی
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal - Enhanced */}
            <Modal show={confirmingSaleDeletion} onClose={closeModal}>
                <form onSubmit={deleteSale} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف فروش دارو
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                آیا از حذف این فروش اطمینان دارید؟ این عمل
                                غیرقابل بازگشت است.
                            </p>
                        </div>
                    </div>

                    {selectedSale && (
                        <div className="mt-4 rounded-xl bg-rose-50 p-4">
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        تاریخ فروش:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedSale.sale_date}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        مبلغ کل:
                                    </span>
                                    <span className="font-bold text-rose-700">
                                        {Number(
                                            selectedSale.total_amount,
                                        ).toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
                                {selectedSale.prescription_number && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            شماره نسخه:
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {selectedSale.prescription_number}
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
                                'حذف فروش'
                            )}
                        </DangerButton>
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
