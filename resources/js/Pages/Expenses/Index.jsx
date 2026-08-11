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
    TrendingDown,
    X,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Index({
    expenses,
    categories,
    paymentMethods,
    filters,
    totalExpense,
}) {
    const { flash } = usePage().props;
    const [showToast, setShowToast] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
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
    const totalExpenseAmount = expenses.data.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0,
    );
    const averageExpense =
        expenses.data.length > 0
            ? totalExpenseAmount / expenses.data.length
            : 0;
    const todayExpense = expenses.data
        .filter(
            (expense) =>
                expense.expense_date === moment().format('jYYYY/jMM/jDD'),
        )
        .reduce((sum, expense) => sum + Number(expense.amount), 0);

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            route('expenses.index'),
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
        router.get(route('expenses.index'), {}, { preserveState: true });
        setShowFilters(false);
    };

    // Form for Add/Edit
    const { data, setData, post, put, processing, reset, errors } = useForm({
        category: 'other',
        amount: '',
        payment_method: 'cash',
        expense_date: '',
        description: '',
    });

    const openModal = (expense = null) => {
        if (expense) {
            setEditMode(true);
            setSelectedExpense(expense);
            setData({
                category: expense.category,
                amount: expense.amount,
                payment_method: expense.payment_method,
                expense_date: expense.expense_date,
                description: expense.description || '',
            });
        } else {
            setEditMode(false);
            setData({
                category: 'other',
                amount: '',
                payment_method: 'cash',
                expense_date: new DateObject({
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

        if (editMode && selectedExpense) {
            put(route('expenses.update', selectedExpense.id), {
                preserveScroll: true,
                onSuccess: closeModal,
            });
        } else {
            post(route('expenses.store'), {
                preserveScroll: true,
                onSuccess: closeModal,
            });
        }
    };

    const confirmDeleteExpense = (expense) => {
        setSelectedExpense(expense);
        setConfirmDelete(true);
    };

    const deleteExpense = () => {
        router.delete(route('expenses.destroy', selectedExpense.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmDelete(false),
        });
    };

    // Category color mapping
    const categoryColors = {
        salary: 'bg-purple-100 text-purple-700',
        rent: 'bg-blue-100 text-blue-700',
        utilities: 'bg-yellow-100 text-yellow-700',
        office: 'bg-green-100 text-green-700',
        travel: 'bg-indigo-100 text-indigo-700',
        other: 'bg-gray-100 text-gray-700',
    };

    // Payment method colors
    const paymentMethodColors = {
        cash: 'bg-green-100 text-green-700',
        bank: 'bg-blue-100 text-blue-700',
        cheque: 'bg-amber-100 text-amber-700',
    };

    return (
        <AuthenticatedLayout title="مدیریت هزینه‌ها">
            <Head title="هزینه‌ها" />

            <div className="min-h-screen px-4 py-6 md:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                                <TrendingDown className="h-6 w-6 text-rose-600" />
                                مدیریت هزینه‌ها
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                ثبت و پیگیری هزینه‌های سازمان
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <Filter className="h-4 w-4" />
                                فیلترها
                                {(search ||
                                    categoryFilter ||
                                    startDate ||
                                    endDate) && (
                                    <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-xs text-rose-700">
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
                                className="flex items-center gap-2 px-4 py-2"
                            >
                                <Plus className="h-4 w-4" />
                                ثبت هزینه جدید
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500">
                                        مجموع هزینه‌ها
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {Number(totalExpense).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                                    <DollarSign className="h-5 w-5 text-rose-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                جمع کل هزینه‌ها تاکنون
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500">
                                        هزینه‌های امروز
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {todayExpense.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                {new Date().toLocaleDateString('fa-IR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500">
                                        میانگین هر هزینه
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {averageExpense.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                    <CreditCard className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                از {expenses.data.length} هزینه
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500">
                                        تعداد هزینه‌ها
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {expenses.data.length}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                                    <Layers className="h-5 w-5 text-teal-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                کل هزینه‌های ثبت شده
                            </p>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <Transition
                        show={showFilters}
                        enter="transition-all duration-300"
                        enterFrom="opacity-0 -translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition-all duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-4"
                    >
                        <form
                            onSubmit={applyFilter}
                            className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                    <Filter className="h-4 w-4 text-gray-500" />
                                    فیلترهای پیشرفته
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(false)}
                                    className="rounded p-1 hover:bg-gray-100"
                                >
                                    <X className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        دسته‌بندی
                                    </label>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                    >
                                        <option value="">
                                            همه دسته‌بندی‌ها
                                        </option>
                                        {Object.entries(categories).map(
                                            ([key, label]) => (
                                                <option key={key} value={key}>
                                                    {label}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        از تاریخ
                                    </label>
                                    <AfghanDatePicker
                                        value={startDate}
                                        onChange={(value) =>
                                            setStartDate(
                                                value.format('YYYY/MM/DD'),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                        placeholder="انتخاب تاریخ شروع"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        تا تاریخ
                                    </label>
                                    <AfghanDatePicker
                                        value={endDate}
                                        onChange={(value) =>
                                            setEndDate(
                                                value.format('YYYY/MM/DD'),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                        placeholder="انتخاب تاریخ پایان"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        جستجو
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="جستجو در توضیحات..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4">
                                <DangerButton
                                    type="button"
                                    onClick={clearFilters}
                                    className="border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                >
                                    پاک کردن فیلترها
                                </DangerButton>
                                <PrimaryButton
                                    type="submit"
                                    className="px-4 py-2 text-sm"
                                >
                                    اعمال فیلترها
                                </PrimaryButton>
                            </div>
                        </form>
                    </Transition>

                    {/* Total Summary Banner */}
                    <div className="mb-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 p-5 text-white shadow-lg">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                    <DollarSign className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">
                                        مجموع هزینه‌ها
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {Number(totalExpense).toLocaleString()}{' '}
                                        افغانی
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">
                                    تعداد {expenses.data.length} هزینه ثبت شده
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                        <div className="border-b border-gray-200 bg-gradient-to-l from-gray-50 to-white px-5 py-4">
                            <h3 className="font-medium text-gray-800">
                                لیست هزینه‌ها
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                نمایش {expenses.from || 0} تا {expenses.to || 0}{' '}
                                از {expenses.total || 0} هزینه
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            #
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            دسته‌بندی
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            مبلغ
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            روش پرداخت
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            تاریخ
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            توضیحات
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-medium text-gray-600">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {expenses.data.length ? (
                                        expenses.data.map((expense, index) => (
                                            <tr
                                                key={expense.id}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-5 py-3 text-sm text-gray-500">
                                                    {index + 1}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[expense.category] || 'bg-gray-100 text-gray-700'}`}
                                                    >
                                                        {
                                                            categories[
                                                                expense.category
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {Number(
                                                            expense.amount,
                                                        ).toLocaleString()}
                                                    </span>
                                                    <span className="mr-1 text-xs text-gray-500">
                                                        افغانی
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${paymentMethodColors[expense.payment_method] || 'bg-gray-100 text-gray-700'}`}
                                                    >
                                                        {
                                                            paymentMethods[
                                                                expense
                                                                    .payment_method
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {
                                                                expense.expense_date
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex max-w-xs items-center gap-1.5">
                                                        <FileText className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                        <span
                                                            className="truncate text-sm text-gray-600"
                                                            title={
                                                                expense.description
                                                            }
                                                        >
                                                            {expense.description ||
                                                                '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() =>
                                                                openModal(
                                                                    expense,
                                                                )
                                                            }
                                                            className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                                                            title="ویرایش"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                confirmDeleteExpense(
                                                                    expense,
                                                                )
                                                            }
                                                            className="rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
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
                                                className="px-5 py-8 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <AlertCircle className="mb-3 h-12 w-12 text-gray-300" />
                                                    <h4 className="mb-1 text-base font-medium text-gray-600">
                                                        هیچ هزینه‌ای یافت نشد
                                                    </h4>
                                                    <p className="mb-3 text-sm text-gray-500">
                                                        برای شروع، اولین هزینه
                                                        را ثبت کنید
                                                    </p>
                                                    <PrimaryButton
                                                        onClick={() =>
                                                            openModal()
                                                        }
                                                        className="flex items-center gap-1.5 px-4 py-2 text-sm"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        ثبت هزینه جدید
                                                    </PrimaryButton>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {expenses.links && expenses.links.length > 3 && (
                            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        صفحه {expenses.current_page} از{' '}
                                        {expenses.last_page}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {expenses.links.map((link, idx) => {
                                            if (
                                                idx === 0 ||
                                                idx ===
                                                    expenses.links.length - 1
                                            ) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() =>
                                                            link.url &&
                                                            router.get(link.url)
                                                        }
                                                        disabled={!link.url}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                                                            link.url
                                                                ? 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                                                                : 'cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400'
                                                        }`}
                                                    >
                                                        {idx === 0 ? (
                                                            <ChevronRight className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronLeft className="h-4 w-4" />
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
                                                        link.url &&
                                                        router.get(link.url)
                                                    }
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-rose-600 text-white'
                                                            : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <form onSubmit={submit}>
                    <div className="overflow-hidden rounded-lg bg-white">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-l from-rose-600 to-rose-500 px-5 py-4">
                            <h3 className="flex items-center gap-2 text-base font-medium text-white">
                                {editMode ? (
                                    <>
                                        <Edit className="h-4 w-4" />
                                        ویرایش هزینه
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        ثبت هزینه جدید
                                    </>
                                )}
                            </h3>
                        </div>

                        {/* Modal Body */}
                        <div className="space-y-4 p-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {/* Category */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        دسته‌بندی{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData('category', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
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
                                    <InputError
                                        message={errors.category}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        روش پرداخت{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.payment_method}
                                        onChange={(e) =>
                                            setData(
                                                'payment_method',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                    >
                                        {Object.entries(paymentMethods).map(
                                            ([key, label]) => (
                                                <option key={key} value={key}>
                                                    {label}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    <InputError
                                        message={errors.payment_method}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Amount */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        مبلغ{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                            ؋
                                        </span>
                                        <input
                                            type="number"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData(
                                                    'amount',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-8 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                            placeholder="۰"
                                            min="0"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.amount}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Expense Date */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                    تاریخ هزینه{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <AfghanDatePicker
                                    value={data.expense_date}
                                    onChange={(date) =>
                                        setData(
                                            'expense_date',
                                            date.format('YYYY/MM/DD'),
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                    placeholder="انتخاب تاریخ"
                                />
                                <InputError
                                    message={errors.expense_date}
                                    className="mt-1"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                    توضیحات
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows="2"
                                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
                                    placeholder="توضیحات مربوط به این هزینه (اختیاری)..."
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-1"
                                />
                            </div>

                            {/* Form Validation Summary */}
                            {Object.keys(errors).length > 0 && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <div className="flex items-center gap-1.5 text-red-800">
                                        <AlertCircle className="h-4 w-4" />
                                        <span className="text-xs font-medium">
                                            لطفاً خطاهای زیر را برطرف کنید:
                                        </span>
                                    </div>
                                    <ul className="mt-1 list-inside list-disc text-xs text-red-600">
                                        {Object.values(errors).map(
                                            (error, index) => (
                                                <li key={index}>{error}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3">
                            <SecondaryButton
                                onClick={closeModal}
                                className="px-4 py-2 text-sm"
                            >
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-sm"
                            >
                                {processing ? (
                                    <>
                                        <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        در حال ذخیره...
                                    </>
                                ) : editMode ? (
                                    'ویرایش'
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
                <div className="overflow-hidden rounded-lg bg-white">
                    <div className="bg-gradient-to-l from-red-600 to-rose-600 px-5 py-4">
                        <h3 className="flex items-center gap-2 text-base font-medium text-white">
                            <Trash className="h-4 w-4" />
                            حذف هزینه
                        </h3>
                    </div>

                    <div className="p-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-gray-800">
                                    آیا از حذف این هزینه اطمینان دارید؟
                                </h4>
                                <p className="text-xs text-gray-500">
                                    این عمل غیرقابل بازگشت است و اطلاعات برای
                                    همیشه پاک خواهند شد.
                                </p>
                            </div>
                        </div>

                        {selectedExpense && (
                            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm">
                                <p className="text-gray-700">
                                    <span className="font-medium">مبلغ:</span>{' '}
                                    {Number(
                                        selectedExpense.amount,
                                    ).toLocaleString()}{' '}
                                    افغانی
                                </p>
                                <p className="mt-1 text-gray-700">
                                    <span className="font-medium">
                                        دسته‌بندی:
                                    </span>{' '}
                                    {categories[selectedExpense.category]}
                                </p>
                            </div>
                        )}

                        <div className="mt-5 flex justify-end gap-2 border-t border-gray-200 pt-4">
                            <SecondaryButton
                                onClick={() => setConfirmDelete(false)}
                                className="px-4 py-2 text-sm"
                            >
                                انصراف
                            </SecondaryButton>
                            <DangerButton
                                onClick={deleteExpense}
                                className="px-4 py-2 text-sm"
                            >
                                حذف
                            </DangerButton>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Toast Notification */}
            <Transition
                show={showToast}
                enter="transition-all duration-300"
                enterFrom="opacity-0 translate-x-2"
                enterTo="opacity-100 translate-x-0"
                leave="transition-all duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            موفقیت!
                        </p>
                        <p className="text-xs text-gray-600">{toastMessage}</p>
                    </div>
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
