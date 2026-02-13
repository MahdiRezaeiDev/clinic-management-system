import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Briefcase,
    Building2,
    CheckCircle,
    Edit,
    Filter,
    History,
    Mail,
    MapPin,
    Package,
    Phone,
    Plus,
    Search,
    Trash,
    User,
    X,
} from 'lucide-react';
import { useState } from 'react';

export default function Index({ suppliers }) {
    const [confirmingCompanyDeletion, setConfirmingCompanyDeletion] =
        useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [supplierId, setSupplierId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm();

    // Statistics
    const totalSuppliers = suppliers.length;
    const totalCompanies = new Set(suppliers.map((s) => s.company_name)).size;

    // Filter suppliers based on search
    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.company_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            supplier.contact_person
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            supplier.phone?.includes(searchTerm),
    );

    const confirmSupplierDeletion = (supplier) => {
        setSelectedSupplier(supplier);
        setSupplierId(supplier.id);
        setConfirmingCompanyDeletion(true);
    };

    const deleteCompany = (e) => {
        e.preventDefault();
        destroy(route('suppliers.destroy', supplierId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingCompanyDeletion(false);
        setSupplierId(null);
        setSelectedSupplier(null);
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
        <AuthenticatedLayout title="مدیریت شرکت‌های همکار">
            <Head title="مدیریت شرکت‌های همکار" />

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
                            مدیریت شرکت‌های همکار
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            مدیریت شرکت‌های تامین‌کننده دارو و تجهیزات پزشکی
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                        >
                            <Filter className="h-4 w-4" />
                            فیلترها
                            {searchTerm && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs text-teal-700">
                                    1
                                </span>
                            )}
                        </button>
                        <Link
                            href={route('suppliers.create')}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                        >
                            <Plus className="h-4 w-4" />
                            ثبت شرکت جدید
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="کل شرکت‌ها"
                        value={totalSuppliers}
                        icon={Building2}
                        subtitle="شرکت‌های همکار ثبت شده"
                        color="bg-teal-500"
                    />
                    <StatCard
                        title="شرکت‌های فعال"
                        value={totalCompanies}
                        icon={Briefcase}
                        subtitle="شرکت‌های تامین‌کننده"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="کل خریدها"
                        value={suppliers.reduce(
                            (sum, s) => sum + (s.total_purchases || 0),
                            0,
                        )}
                        icon={Package}
                        subtitle="مقدار خرید از شرکت‌ها"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="تامین‌کنندگان"
                        value={suppliers.filter((s) => s.contact_person).length}
                        icon={User}
                        subtitle="دارای رابط مشخص"
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
                    <div className="mb-8 rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                                <Filter className="ml-2 inline h-5 w-5" />
                                جستجوی پیشرفته
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowFilters(false);
                                    setSearchTerm('');
                                }}
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
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="جستجو نام شرکت، رابط یا شماره تماس..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Table Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Building2 className="h-5 w-5 text-teal-700" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    لیست شرکت‌های همکار
                                </h2>
                                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                                    {filteredSuppliers.length} شرکت
                                </span>
                            </div>
                            {searchTerm && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>نتایج جستجو برای:</span>
                                    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                                        {searchTerm}
                                    </span>
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="rounded-lg p-1.5 hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
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
                                            <Building2 className="h-4 w-4" />
                                            شرکت
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
                                            <User className="h-4 w-4" />
                                            رابط شرکت
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            آدرس
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <History className="h-4 w-4" />
                                            تاریخچه
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-white">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSuppliers.length > 0 ? (
                                    filteredSuppliers.map((supplier, index) => (
                                        <tr
                                            key={supplier.id}
                                            className="group transition-colors hover:bg-teal-50/50"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 font-bold text-white">
                                                        {supplier.company_name.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold text-gray-800">
                                                            {
                                                                supplier.company_name
                                                            }
                                                        </span>
                                                        {supplier.tax_number && (
                                                            <span className="mt-0.5 block text-xs text-gray-500">
                                                                کد اقتصادی:{' '}
                                                                {
                                                                    supplier.tax_number
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                                                    <span className="dir-ltr text-sm text-gray-600">
                                                        {supplier.phone || '-'}
                                                    </span>
                                                </div>
                                                {supplier.email && (
                                                    <div className="mt-1 flex items-center gap-1.5">
                                                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-xs text-gray-500">
                                                            {supplier.email}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <User className="h-3.5 w-3.5 text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {supplier.contact_person ||
                                                            '-'}
                                                    </span>
                                                </div>
                                                {supplier.contact_phone && (
                                                    <div className="mt-1 flex items-center gap-1.5">
                                                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-xs text-gray-500">
                                                            {
                                                                supplier.contact_phone
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex max-w-[200px] items-start gap-1.5">
                                                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                    <span className="line-clamp-2 text-sm text-gray-600">
                                                        {supplier.address ||
                                                            '-'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Link
                                                    href={route(
                                                        'suppliers.show',
                                                        supplier.id,
                                                    )}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-700 transition-all hover:bg-teal-100 hover:shadow-sm"
                                                >
                                                    <History className="h-3.5 w-3.5" />
                                                    تاریخچه خرید
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route(
                                                            'suppliers.edit',
                                                            supplier.id,
                                                        )}
                                                        className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                        title="ویرایش شرکت"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmSupplierDeletion(
                                                                supplier,
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                        title="حذف شرکت"
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
                                                    <Building2 className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <p className="mt-4 text-sm font-medium text-gray-600">
                                                    {searchTerm
                                                        ? 'شرکتی با این مشخصات یافت نشد'
                                                        : 'هیچ شرکتی ثبت نشده است'}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {searchTerm
                                                        ? 'لطفاً عبارت دیگری را جستجو کنید'
                                                        : 'برای ثبت شرکت جدید، دکمه زیر را کلیک کنید'}
                                                </p>
                                                {!searchTerm && (
                                                    <Link
                                                        href={route(
                                                            'suppliers.create',
                                                        )}
                                                        className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        ثبت اولین شرکت
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Summary */}
                    {filteredSuppliers.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-teal-100 p-1.5">
                                        <CheckCircle className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        نمایش {filteredSuppliers.length} شرکت از{' '}
                                        {suppliers.length} شرکت
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-500">
                                        آخرین بروزرسانی:{' '}
                                        {new Date().toLocaleDateString('fa-IR')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal - Enhanced */}
            <Modal show={confirmingCompanyDeletion} onClose={closeModal}>
                <form onSubmit={deleteCompany} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف شرکت همکار
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                آیا از حذف این شرکت اطمینان دارید؟ این عمل
                                غیرقابل بازگشت است.
                            </p>
                        </div>
                    </div>

                    {selectedSupplier && (
                        <div className="mt-4 rounded-xl bg-rose-50 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-rose-600" />
                                <span className="text-sm font-semibold text-rose-700">
                                    {selectedSupplier.company_name}
                                </span>
                            </div>
                            <div className="grid gap-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        رابط شرکت:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedSupplier.contact_person || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        شماره تماس:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedSupplier.phone || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">آدرس:</span>
                                    <span className="font-medium text-gray-800">
                                        {selectedSupplier.address || '-'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3 rounded-lg bg-rose-100/50 p-3 text-xs text-rose-700">
                                <div className="flex items-start gap-1.5">
                                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>
                                        با حذف این شرکت، تمام اطلاعات مربوط به
                                        خریدها، فاکتورها و تراکنش‌های انجام‌شده
                                        با این شرکت از سیستم حذف می‌شود.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <InputError message={errors.id} />

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
                                'حذف شرکت'
                            )}
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Success Toast */}
            <Transition
                show={recentlySuccessful}
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
                            عملیات حذف با موفقیت انجام شد
                        </p>
                    </div>
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
