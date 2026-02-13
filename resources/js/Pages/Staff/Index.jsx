import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Briefcase,
    Building2,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    CreditCard,
    DollarSign,
    Edit,
    FileText,
    Filter,
    Phone,
    Search,
    Trash,
    User,
    UserCircle,
    UserPlus,
    Users,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index({ staffs, filters }) {
    const [confirmingStaffDeletion, setConfirmingStaffDeletion] =
        useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [staffId, setStaffId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm();

    // Role labels with icons and colors
    const roleConfig = {
        doctor: {
            label: 'داکتر',
            icon: UserCircle,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        nurse: {
            label: 'نرس',
            icon: Briefcase,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        pharmacist: {
            label: 'فارمسیست',
            icon: Building2,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        lab: {
            label: 'لابراتوار',
            icon: FileText,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        dentist: {
            label: 'دندان‌پزشک',
            icon: UserCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        },
        emergency: {
            label: 'ایمرجنسی',
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        gynecology: {
            label: 'نسایی ولادی',
            icon: User,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
        },
        inpatient: {
            label: 'بخش بستری',
            icon: Users,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
        },
        service: {
            label: 'خدمات',
            icon: Briefcase,
            color: 'text-gray-600',
            bgColor: 'bg-gray-100',
        },
    };

    // Statistics
    const totalStaff = staffs.data.length;
    const totalSalary = staffs.data.reduce(
        (sum, staff) => sum + Number(staff.base_salary || 0),
        0,
    );
    const averageSalary = totalStaff > 0 ? totalSalary / totalStaff : 0;

    // Role distribution
    const roleDistribution = staffs.data.reduce((acc, staff) => {
        acc[staff.role] = (acc[staff.role] || 0) + 1;
        return acc;
    }, {});
    const topRole =
        Object.entries(roleDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        '';

    const confirmStaffDeletion = (staff) => {
        setSelectedStaff(staff);
        setStaffId(staff.id);
        setConfirmingStaffDeletion(true);
    };

    const deleteStaff = (e) => {
        e.preventDefault();
        destroy(route('staffs.destroy', staffId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log(errors),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingStaffDeletion(false);
        setStaffId(null);
        setSelectedStaff(null);
        clearErrors();
        reset();
    };

    // Handle search/filter
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const submitFilter = (e) => {
        e.preventDefault();
        router.get(
            route('staffs.index'),
            { search, role },
            { preserveState: true },
        );
        setShowFilters(false);
    };

    const clearFilter = () => {
        setSearch('');
        setRole('');
        router.get(route('staffs.index'), {}, { preserveState: true });
        setShowFilters(false);
    };

    // Stat Card Component
    const StatCard = ({ title, value, icon: Icon, subtitle, color }) => (
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
        </div>
    );

    return (
        <AuthenticatedLayout title="مدیریت پرسنل">
            <Head title="مدیریت پرسنل" />

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
                            مدیریت پرسنل
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            مدیریت اطلاعات پرسنل، حقوق و اضافه‌کاری
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                        >
                            <Filter className="h-4 w-4" />
                            فیلترها
                            {(search || role) && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs text-teal-700">
                                    {[search, role].filter(Boolean).length}
                                </span>
                            )}
                        </button>
                        <Link
                            href={route('staffs.create')}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                        >
                            <UserPlus className="h-4 w-4" />
                            افزودن پرسنل جدید
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="کل پرسنل"
                        value={totalStaff}
                        icon={Users}
                        subtitle={`${totalStaff} نفر در کلینیک`}
                        color="bg-teal-500"
                    />
                    <StatCard
                        title="مجموع حقوق پایه"
                        value={totalSalary}
                        icon={DollarSign}
                        subtitle="جمع حقوق ماهیانه"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="میانگین حقوق"
                        value={Math.round(averageSalary)}
                        icon={CreditCard}
                        subtitle="میانگین حقوق هر پرسنل"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="بیشترین نقش"
                        value={
                            topRole
                                ? roleConfig[topRole]?.label || topRole
                                : '-'
                        }
                        icon={Briefcase}
                        subtitle={`${roleDistribution[topRole] || 0} نفر با این نقش`}
                        color="bg-blue-500"
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
                        onSubmit={submitFilter}
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

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500">
                                    جستجو
                                </label>
                                <div className="relative">
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="جستجو نام یا شماره تماس..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500">
                                    نقش
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                >
                                    <option value="">همه نقش‌ها</option>
                                    {Object.entries(roleConfig).map(
                                        ([key, { label }]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <DangerButton
                                type="button"
                                onClick={clearFilter}
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

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Table Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-teal-100 p-2">
                                <Users className="h-5 w-5 text-teal-700" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                لیست پرسنل ثبت شده
                            </h2>
                            <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                                {totalStaff} نفر
                            </span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            نام و نام خانوادگی
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            شماره تماس
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" />
                                            نقش
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            حقوق پایه
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            مدیریت حقوق
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {staffs.data.length ? (
                                    staffs.data.map((staff, index) => {
                                        const roleInfo = roleConfig[
                                            staff.role
                                        ] || {
                                            label: staff.role,
                                            icon: UserCircle,
                                            color: 'text-gray-600',
                                            bgColor: 'bg-gray-100',
                                        };
                                        const RoleIcon = roleInfo.icon;

                                        return (
                                            <tr
                                                key={staff.id}
                                                className="group transition-colors hover:bg-teal-50/50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-600">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-sm font-medium text-white">
                                                            {staff.full_name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {staff.full_name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {staff.phone || '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full ${roleInfo.bgColor} px-3 py-1 text-xs font-medium ${roleInfo.color}`}
                                                        >
                                                            <RoleIcon className="h-3.5 w-3.5" />
                                                            {roleInfo.label}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {staff.base_salary ? (
                                                        <span className="text-sm font-semibold text-gray-800">
                                                            {staff.base_salary.toLocaleString()}
                                                            <span className="mr-1 text-xs text-gray-500">
                                                                ؋
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route(
                                                                'staffs.salary.index',
                                                                staff.id,
                                                            )}
                                                            className="flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-all hover:bg-green-200 hover:shadow-sm"
                                                        >
                                                            <DollarSign className="h-3.5 w-3.5" />
                                                            حقوق
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                'staffs.overtime.index',
                                                                staff.id,
                                                            )}
                                                            className="flex items-center gap-1.5 rounded-lg bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700 transition-all hover:bg-yellow-200 hover:shadow-sm"
                                                        >
                                                            <Clock className="h-3.5 w-3.5" />
                                                            اضافه‌کاری
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route(
                                                                'staffs.edit',
                                                                staff.id,
                                                            )}
                                                            className="rounded-lg p-2 text-sky-600 transition-colors hover:bg-sky-50"
                                                            title="ویرایش پرسنل"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                confirmStaffDeletion(
                                                                    staff,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                            title="حذف پرسنل"
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-full bg-gray-100 p-4">
                                                    <Users className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <p className="mt-4 text-sm font-medium text-gray-600">
                                                    هیچ پرسنلی یافت نشد
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    برای افزودن پرسنل جدید، دکمه
                                                    زیر را کلیک کنید
                                                </p>
                                                <Link
                                                    href={route(
                                                        'staffs.create',
                                                    )}
                                                    className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                >
                                                    <UserPlus className="h-4 w-4" />
                                                    افزودن پرسنل جدید
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {staffs.links && staffs.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <div className="text-sm text-gray-500">
                                نمایش {staffs.from || 0} تا {staffs.to || 0} از{' '}
                                {staffs.total || 0} پرسنل
                            </div>
                            <div className="flex gap-2">
                                {staffs.links.map((link, idx) => {
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

            {/* Delete Modal - Enhanced */}
            <Modal show={confirmingStaffDeletion} onClose={closeModal}>
                <form onSubmit={deleteStaff} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف پرسنل
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                آیا از حذف این پرسنل اطمینان دارید؟ این عمل
                                غیرقابل بازگشت است.
                            </p>
                        </div>
                    </div>

                    {selectedStaff && (
                        <div className="mt-4 rounded-xl bg-rose-50 p-4">
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">نام:</span>
                                    <span className="font-medium text-gray-800">
                                        {selectedStaff.full_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">نقش:</span>
                                    <span className="font-medium text-gray-800">
                                        {roleConfig[selectedStaff.role]
                                            ?.label || selectedStaff.role}
                                    </span>
                                </div>
                                {selectedStaff.phone && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            شماره تماس:
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {selectedStaff.phone}
                                        </span>
                                    </div>
                                )}
                                {selectedStaff.base_salary > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            حقوق پایه:
                                        </span>
                                        <span className="font-bold text-rose-700">
                                            {selectedStaff.base_salary.toLocaleString()}{' '}
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
                                'حذف پرسنل'
                            )}
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Enhanced Success Toast */}
            <Transition
                show={show}
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
