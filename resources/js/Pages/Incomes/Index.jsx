import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    DollarSign,
    Edit,
    FileText,
    Filter,
    Layers,
    Plus,
    Search,
    Trash,
    TrendingUp,
    X,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Index({
    incomes,
    categories,
    paymentMethods,
    filters,
    totalIncomes,
}) {
    const { flash } = usePage().props;
    const [showToast, setShowToast] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (flash.success) {
            setToastMessage(flash.success);
            setShowToast(true);
            const timeout = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    // Filters
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(
        filters.category || '',
    );
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    // Calculate stats
    const totalIncomeAmount = incomes.data.reduce(
        (sum, income) => sum + Number(income.amount),
        0,
    );
    const averageIncome =
        incomes.data.length > 0 ? totalIncomeAmount / incomes.data.length : 0;
    const todayIncome = incomes.data
        .filter(
            (income) =>
                income.income_date ===
                moment().format('jYYYY/jMM/jDD'),
        )
        .reduce((sum, income) => sum + Number(income.amount), 0);

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            route('incomes.index'),
            {
                search,
                category: categoryFilter,
                start_date: startDate,
                end_date: endDate,
            },
            { preserveState: true },
        );
        setShowFilters(false);
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryFilter('');
        setStartDate('');
        setEndDate('');
        router.get(route('incomes.index'), {}, { preserveState: true });
        setShowFilters(false);
    };

    // Form for Add/Edit
    const { data, setData, post, put, processing, reset, errors } = useForm({
        category: 'other',
        amount: '',
        payment_method: 'cash',
        income_date: '',
        description: '',
    });

    const openModal = (income = null) => {
        if (income) {
            setEditMode(true);
            setSelectedIncome(income);
            setData({
                category: income.category,
                amount: income.amount,
                payment_method: income.payment_method,
                income_date: income.income_date,
                description: income.description || '',
            });
        } else {
            setEditMode(false);
            setData({
                category: 'other',
                amount: '',
                payment_method: 'cash',
                income_date: new DateObject({
                    calendar: persian,
                    locale: persian_en,
                }).format('YYYY/MM/DD'),
                description: '',
            });
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editMode && selectedIncome) {
            put(route('incomes.update', selectedIncome.id), {
                preserveScroll: true,
                onSuccess: closeModal,
            });
        } else {
            post(route('incomes.store'), {
                preserveScroll: true,
                onSuccess: closeModal,
            });
        }
    };

    const confirmDeleteIncome = (income) => {
        setSelectedIncome(income);
        setConfirmDelete(true);
    };

    const deleteIncome = () => {
        router.delete(route('incomes.destroy', selectedIncome.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmDelete(false),
        });
    };

    // Stat Card Component
    const StatCard = ({ title, value, icon: Icon, subtitle, color }) => (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute left-0 top-0 h-full w-1 ${color}`}></div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-800">
                        {value.toLocaleString()}
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
        <AuthenticatedLayout title="مدیریت عایدات بیماران">
            <Head title="مدیریت عایدات بیماران" />

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
                            مدیریت عایدات بیماران
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت و پیگیری عایدات حاصل از خدمات درمانی
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                        >
                            <Filter className="h-4 w-4" />
                            فیلترها
                            {(search ||
                                categoryFilter ||
                                startDate ||
                                endDate) && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs text-teal-700">
                                    {
                                        [
                                            search,
                                            categoryFilter,
                                            startDate,
                                            endDate,
                                        ].filter(Boolean).length
                                    }
                                </span>
                            )}
                        </button>
                        <PrimaryButton
                            onClick={() => openModal()}
                            className="flex items-center gap-2 rounded-xl px-5 py-3 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <Plus className="h-4 w-4" />
                            ثبت عاید جدید
                        </PrimaryButton>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="مجموع عایدات"
                        value={totalIncomes}
                        icon={DollarSign}
                        subtitle="جمع کل عایدات تاکنون"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="عایدات امروز"
                        value={todayIncome}
                        icon={TrendingUp}
                        subtitle={moment().format('jDD jMMMM jYYYY')}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="میانگین هر تراکنش"
                        value={averageIncome}
                        icon={CreditCard}
                        subtitle={`از ${incomes.data.length} تراکنش`}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="تعداد تراکنش‌ها"
                        value={incomes.data.length}
                        icon={Layers}
                        subtitle="کل تراکنش‌های ثبت شده"
                        color="bg-teal-500"
                    />
                </div>

                {/* Filter Panel */}
                <Transition
                    show={showFilters}
                    enter="transition-all duration-300 ease-out"
                    enterFrom="opacity-0 -translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition-all duration-200 ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-4"
                >
                    <form
                        onSubmit={applyFilter}
                        className="mb-8 rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                                <Filter className="ml-2 inline h-5 w-5" />
                                فیلترهای پیشرفته
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowFilters(false)}
                                className="rounded-lg p-1 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500">
                                    دسته‌بندی
                                </label>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                >
                                    <option value="">همه دسته‌بندی‌ها</option>
                                    {Object.entries(categories).map(
                                        ([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500">
                                    از تاریخ
                                </label>
                                <AfghanDatePicker
                                    value={startDate}
                                    onChange={(value) => {
                                        setStartDate(
                                            value.format('YYYY/MM/DD'),
                                        );
                                    }}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                                    placeholder="انتخاب تاریخ شروع"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500">
                                    تا تاریخ
                                </label>
                                <AfghanDatePicker
                                    value={endDate}
                                    onChange={(value) => {
                                        setEndDate(value.format('YYYY/MM/DD'));
                                    }}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                                    placeholder="انتخاب تاریخ پایان"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500">
                                    جستجو
                                </label>
                                <div className="relative">
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="جستجو در توضیحات..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <DangerButton
                                type="button"
                                onClick={clearFilters}
                                className="rounded-lg px-5 py-2.5"
                            >
                                پاک کردن فیلترها
                            </DangerButton>
                            <PrimaryButton
                                type="submit"
                                className="rounded-lg px-5 py-2.5"
                            >
                                اعمال فیلترها
                            </PrimaryButton>
                        </div>
                    </form>
                </Transition>

                {/* Total Summary Banner */}
                <div className="mb-6 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm opacity-90">
                                    مجموع عایدات حاصله
                                </p>
                                <p className="text-2xl font-bold">
                                    {Number(totalIncomes).toLocaleString()}{' '}
                                    افغانی
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">
                                تعداد {incomes.data.length} تراکنش ثبت شده
                            </span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        #
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        بخش
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        مبلغ
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        روش پرداخت
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        تاریخ
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        توضیحات
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {incomes.data.length ? (
                                    incomes.data.map((income, index) => (
                                        <tr
                                            key={income.id}
                                            className="group transition-colors hover:bg-teal-50/50"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                                                    {
                                                        categories[
                                                            income.category
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-gray-800">
                                                    {Number(
                                                        income.amount,
                                                    ).toLocaleString()}
                                                </span>
                                                <span className="mr-1 text-xs text-gray-500">
                                                    ؋
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${income.payment_method === 'cash' ? 'bg-green-100 text-green-700' : ''} ${income.payment_method === 'card' ? 'bg-blue-100 text-blue-700' : ''} ${income.payment_method === 'insurance' ? 'bg-purple-100 text-purple-700' : ''} ${income.payment_method === 'bank_transfer' ? 'bg-teal-100 text-teal-700' : ''} `}
                                                >
                                                    {
                                                        paymentMethods[
                                                            income
                                                                .payment_method
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                    {moment(
                                                        income.income_date,
                                                    ).format('jYYYY/jMM/jDD')}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                <div className="flex items-start gap-1">
                                                    <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                    <span className="line-clamp-2">
                                                        {income.description ||
                                                            '-'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openModal(income)
                                                        }
                                                        className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                        title="ویرایش"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            confirmDeleteIncome(
                                                                income,
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
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <AlertCircle className="h-12 w-12 text-gray-300" />
                                                <p className="mt-2 text-sm text-gray-500">
                                                    هیچ عایدی یافت نشد.
                                                </p>
                                                <PrimaryButton
                                                    onClick={() => openModal()}
                                                    className="mt-4"
                                                >
                                                    ثبت اولین عاید
                                                </PrimaryButton>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {incomes.links && incomes.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <div className="text-sm text-gray-500">
                                نمایش {incomes.from || 0} تا {incomes.to || 0}{' '}
                                از {incomes.total || 0} مورد
                            </div>
                            <div className="flex gap-2">
                                {incomes.links.map((link, idx) => {
                                    if (
                                        link.label.includes('Previous') ||
                                        link.label.includes('Next')
                                    ) {
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url)
                                                }
                                                disabled={!link.url}
                                                className={`rounded-lg border p-2 transition-colors ${
                                                    link.url
                                                        ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                                        : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400'
                                                }`}
                                            >
                                                {link.label.includes(
                                                    'Previous',
                                                ) ? (
                                                    <ChevronRight className="h-5 w-5" />
                                                ) : (
                                                    <ChevronLeft className="h-5 w-5" />
                                                )}
                                            </button>
                                        );
                                    }

                                    const pageNum = link.label.replace(
                                        /[^\d]/g,
                                        '',
                                    );
                                    if (!pageNum) return null;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                link.url && router.get(link.url)
                                            }
                                            className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-teal-600 text-white'
                                                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <form onSubmit={submit} className="space-y-4">
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                        <h2 className="text-lg font-semibold text-white">
                            {editMode ? 'ویرایش عاید' : 'افزودن عاید جدید'}
                        </h2>
                        <p className="mt-1 text-sm text-teal-100">
                            {editMode
                                ? 'اطلاعات عاید را ویرایش کنید'
                                : 'اطلاعات عاید جدید را وارد کنید'}
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    بخش
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                >
                                    <option value="">انتخاب کنید</option>
                                    {Object.entries(categories).map(
                                        ([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                                <InputError message={errors.category} />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    روش پرداخت
                                </label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) =>
                                        setData(
                                            'payment_method',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                >
                                    {Object.entries(paymentMethods).map(
                                        ([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                                <InputError message={errors.payment_method} />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    مبلغ (افغانی)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData('amount', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="۰"
                                    />
                                </div>
                                <InputError message={errors.amount} />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    تاریخ
                                </label>
                                <AfghanDatePicker
                                    value={data.income_date}
                                    onChange={(date) =>
                                        setData(
                                            'income_date',
                                            date.format('YYYY/MM/DD'),
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                                />
                                <InputError message={errors.income_date} />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    توضیحات
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="توضیحات مربوط به این عاید..."
                                ></textarea>
                            </div>
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
                                        {editMode
                                            ? 'در حال بروزرسانی...'
                                            : 'در حال ذخیره...'}
                                    </span>
                                ) : editMode ? (
                                    'بروزرسانی'
                                ) : (
                                    'ذخیره'
                                )}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal show={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف عاید
                            </h2>
                            <p className="text-sm text-gray-500">
                                آیا از حذف این مورد اطمینان دارید؟
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-rose-50 p-4 text-sm text-rose-700">
                        <p className="font-medium">
                            هشدار: این عمل غیرقابل بازگشت است!
                        </p>
                        <p className="mt-1">
                            مبلغ:{' '}
                            {Number(selectedIncome?.amount).toLocaleString()}{' '}
                            افغانی
                        </p>
                        <p>بخش: {categories[selectedIncome?.category]}</p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={() => setConfirmDelete(false)}
                            className="rounded-lg px-5 py-2.5"
                        >
                            انصراف
                        </SecondaryButton>
                        <DangerButton
                            onClick={deleteIncome}
                            className="rounded-lg px-5 py-2.5"
                        >
                            حذف
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            {/* Toast Notification */}
            <Transition
                show={showToast}
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
