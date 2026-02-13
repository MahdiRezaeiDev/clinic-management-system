import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import factory from '@/img/factory.svg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    Eye,
    FileText,
    History,
    MapPin,
    Package,
    Phone,
    TrendingUp,
    User,
    Wallet,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

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
    const [selectedRecord, setSelectedRecord] = useState(null);

    const { post, data, setData, processing, reset, errors, clearErrors } =
        useForm({
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

    const confirmPaymentModal = (record) => {
        setSelectedRecord(record);
        setPurchaseId(record.id);
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
        setSelectedRecord(null);
        clearErrors();
        reset();
    };

    // Calculate statistics
    const totalOrders = remainingRecords.length + fullyPaidRecords.length;
    const paidPercentage =
        TotalPurchased > 0 ? Math.round((TotalPaid / TotalPurchased) * 100) : 0;
    const remainingPercentage =
        TotalPurchased > 0
            ? Math.round((TotalRemaining / TotalPurchased) * 100)
            : 0;

    // Stat Card Component
    const StatCard = ({ title, value, icon: Icon, subtitle, color, trend }) => (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute left-0 top-0 h-full w-1 ${color}`}></div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-800">
                        {typeof value === 'number'
                            ? value.toLocaleString()
                            : value}
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
            {trend && (
                <div className="mt-3 flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-600">
                        {trend}% نسبت به ماه قبل
                    </span>
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout title={`پروفایل ${supplier.company_name}`}>
            <Head title={`پروفایل ${supplier.company_name}`} />

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
                {/* Header with Back Button */}
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        href={route('suppliers.index')}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition-all hover:bg-gray-50 hover:shadow-md"
                    >
                        <ArrowRight className="h-4 w-4" />
                        بازگشت به لیست شرکت‌ها
                    </Link>
                </div>

                {/* Supplier Profile Card */}
                <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {supplier.company_name}
                                </h1>
                                <p className="mt-1 text-sm text-teal-100">
                                    اطلاعات شرکت و تاریخچه خرید
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Company Logo & Basic Info */}
                            <div className="flex flex-col items-center gap-4 md:items-start">
                                <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50 shadow-lg">
                                    <img
                                        src={factory}
                                        alt={supplier.company_name}
                                        className="h-full w-full object-contain p-4"
                                    />
                                </div>
                                <div className="text-center md:text-right">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {supplier.company_name}
                                    </h2>
                                    {supplier.contact_person && (
                                        <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-gray-600 md:justify-start">
                                            <User className="h-4 w-4 text-gray-400" />
                                            {supplier.contact_person}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    اطلاعات تماس
                                </h3>
                                <div className="space-y-2">
                                    {supplier.phone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-teal-600" />
                                            <span className="dir-ltr text-gray-600">
                                                {supplier.phone}
                                            </span>
                                        </div>
                                    )}
                                    {supplier.email && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-teal-600" />
                                            <span className="text-gray-600">
                                                {supplier.email}
                                            </span>
                                        </div>
                                    )}
                                    {supplier.address && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="mt-0.5 h-4 w-4 text-teal-600" />
                                            <span className="text-gray-600">
                                                {supplier.address}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {supplier.description && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-700">
                                        توضیحات
                                    </h3>
                                    <div className="flex items-start gap-2 text-sm">
                                        <FileText className="mt-0.5 h-4 w-4 text-teal-600" />
                                        <p className="line-clamp-3 text-gray-600">
                                            {supplier.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="کل سفارش‌ها"
                        value={totalOrders}
                        icon={Package}
                        subtitle={`${remainingRecords.length} فعال • ${fullyPaidRecords.length} تسویه شده`}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="مجموع خرید"
                        value={TotalPurchased}
                        icon={Wallet}
                        subtitle="جمع مبلغ سفارش‌ها"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="پرداخت شده"
                        value={TotalPaid}
                        icon={CheckCircle}
                        subtitle={`${paidPercentage}% از کل خریدها`}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="باقی مانده"
                        value={TotalRemaining}
                        icon={Clock}
                        subtitle={`${remainingPercentage}% از کل خریدها`}
                        color="bg-orange-500"
                    />
                </div>

                {/* Payment Progress Bar */}
                {TotalPurchased > 0 && (
                    <div className="mb-8 overflow-hidden rounded-xl bg-white p-6 shadow-lg">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-teal-600" />
                                <h3 className="font-semibold text-gray-800">
                                    پیشرفت پرداخت
                                </h3>
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-teal-700">
                                    {paidPercentage}%
                                </span>
                                <span className="mx-1 text-gray-400">
                                    پرداخت شده
                                </span>
                                <span className="font-bold text-orange-700">
                                    {remainingPercentage}%
                                </span>
                                <span className="mr-1 text-gray-400">
                                    باقی مانده
                                </span>
                            </div>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
                                style={{ width: `${paidPercentage}%` }}
                            ></div>
                        </div>
                        <div className="mt-3 flex justify-between text-xs text-gray-500">
                            <span>
                                پرداخت شده: {TotalPaid.toLocaleString()} افغانی
                            </span>
                            <span>
                                باقی مانده: {TotalRemaining.toLocaleString()}{' '}
                                افغانی
                            </span>
                        </div>
                    </div>
                )}

                {/* Tabs Section */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Tabs Header */}
                    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex gap-1 p-1">
                            <button
                                onClick={() => setActiveTab('remaining')}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                                    activeTab === 'remaining'
                                        ? 'bg-teal-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Clock className="h-4 w-4" />
                                باقی مانده
                                {remainingRecords.length > 0 && (
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                            activeTab === 'remaining'
                                                ? 'bg-white/20 text-white'
                                                : 'bg-orange-100 text-orange-700'
                                        }`}
                                    >
                                        {remainingRecords.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('fullyPaid')}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                                    activeTab === 'fullyPaid'
                                        ? 'bg-teal-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <CheckCircle className="h-4 w-4" />
                                تسویه شده
                                {fullyPaidRecords.length > 0 && (
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                            activeTab === 'fullyPaid'
                                                ? 'bg-white/20 text-white'
                                                : 'bg-green-100 text-green-700'
                                        }`}
                                    >
                                        {fullyPaidRecords.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Records Display */}
                    <div className="p-6">
                        {activeTab === 'remaining' ? (
                            <RecordsTable
                                records={remainingRecords}
                                type="remaining"
                                onPayment={confirmPaymentModal}
                            />
                        ) : (
                            <RecordsTable
                                records={fullyPaidRecords}
                                type="paid"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Modal - Enhanced */}
            <Modal show={confirmingPayment} onClose={closeModal}>
                <form onSubmit={savePayment} className="space-y-4">
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                        <h2 className="text-lg font-semibold text-white">
                            ثبت پرداخت جدید
                        </h2>
                        <p className="mt-1 text-sm text-teal-100">
                            {selectedRecord &&
                                `برای خرید مورخ ${moment(selectedRecord.purchase_date).format('jYYYY/jMM/jDD')}`}
                        </p>
                    </div>

                    <div className="space-y-4 p-6">
                        {selectedRecord && (
                            <div className="rounded-xl bg-teal-50 p-4">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-600">
                                            مبلغ کل:
                                        </span>
                                        <span className="mr-2 font-bold text-gray-800">
                                            {Number(
                                                selectedRecord.total_amount,
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
                                                selectedRecord.paid_amount,
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
                                                selectedRecord.remaining_amount,
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
                                <DollarSign className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
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
                                    onChange={(v) =>
                                        setData(
                                            'payment_date',
                                            v.format('YYYY/MM/DD'),
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
                                        setData('description', e.target.value)
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

// Enhanced Records Table Component
function RecordsTable({ records, type, onPayment }) {
    if (!records.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-gray-100 p-4">
                    {type === 'remaining' ? (
                        <Clock className="h-12 w-12 text-gray-400" />
                    ) : (
                        <CheckCircle className="h-12 w-12 text-gray-400" />
                    )}
                </div>
                <p className="mt-4 text-sm font-medium text-gray-600">
                    {type === 'remaining'
                        ? 'هیچ سفارش پرداخت نشده‌ای وجود ندارد'
                        : 'هیچ سفارش تسویه شده‌ای وجود ندارد'}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                    {type === 'remaining'
                        ? 'پس از ثبت خرید، موارد در این بخش نمایش داده می‌شوند'
                        : 'پس از تسویه کامل، موارد در این بخش نمایش داده می‌شوند'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {records.map((record) => (
                <div
                    key={record.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg"
                >
                    {/* Record Header */}
                    <div
                        className={`border-b px-4 py-3 ${
                            type === 'remaining'
                                ? 'bg-orange-50'
                                : 'bg-green-50'
                        }`}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    {moment(record.purchase_date).format(
                                        'jDD jMMMM jYYYY',
                                    )}
                                </span>
                                <span
                                    className={`mr-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        type === 'remaining'
                                            ? 'bg-orange-100 text-orange-700'
                                            : 'bg-green-100 text-green-700'
                                    }`}
                                >
                                    {type === 'remaining'
                                        ? 'پرداخت نشده'
                                        : 'تسویه شده'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                    شماره فاکتور:
                                </span>
                                <span className="text-xs font-medium text-gray-800">
                                    #INV-{record.id}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Record Body */}
                    <div className="p-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">
                                    مجموع مبلغ
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <Wallet className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm font-bold text-gray-800">
                                        {record.total_amount.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        افغانی
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">
                                    پرداخت شده
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-semibold text-green-600">
                                        {record.paid_amount.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        افغانی
                                    </span>
                                </div>
                            </div>

                            {type === 'remaining' && (
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-500">
                                        باقی مانده
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-orange-500" />
                                        <span className="text-sm font-bold text-orange-600">
                                            {record.remaining_amount.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            افغانی
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">
                                    توضیحات
                                </span>
                                <div className="flex items-start gap-1.5">
                                    <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                                    <span className="line-clamp-1 text-sm text-gray-600">
                                        {record.description || 'بدون توضیحات'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 pt-4">
                            {type === 'remaining' && (
                                <button
                                    onClick={() => onPayment(record)}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                                >
                                    <DollarSign className="h-3.5 w-3.5" />
                                    ثبت پرداخت
                                </button>
                            )}
                            <Link
                                href={route('medicine.show', record.id)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                <Eye className="h-3.5 w-3.5" />
                                مشاهده خرید
                            </Link>
                            <Link
                                href={route(
                                    'medicine.payments.index',
                                    record.id,
                                )}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                <History className="h-3.5 w-3.5" />
                                تاریخچه پرداخت‌ها
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Mail icon component (since it might not be imported)
function Mail(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}
