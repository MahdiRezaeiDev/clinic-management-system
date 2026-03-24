import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    DollarSign,
    Edit,
    File as Female,
    FileText,
    Filter,
    File as Male,
    MapPin,
    Phone,
    Plus,
    Stethoscope,
    Trash,
    User,
    UserCircle,
    Users,
    X,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

export default function Index({ visits, doctors, filters }) {
    const [confirmingVisitDeletion, setConfirmingVisitDeletion] =
        useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [visitId, setVisitId] = useState(null);
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

    // Calculate statistics
    const totalVisits = visits.data.length;
    const totalRevenue = visits.data.reduce(
        (sum, visit) => sum + Number(visit.fee),
        0,
    );
    const averageFee = totalVisits > 0 ? totalRevenue / totalVisits : 0;

    // Unique patients count
    const uniquePatients = new Set(visits.data.map((visit) => visit.patient.id))
        .size;

    // Gender distribution
    const malePatients = visits.data.filter(
        (visit) => visit.patient.gender === 'male',
    ).length;
    const femalePatients = visits.data.filter(
        (visit) => visit.patient.gender === 'female',
    ).length;

    const confirmVisitDeletion = (visit) => {
        setSelectedVisit(visit);
        setVisitId(visit.id);
        setConfirmingVisitDeletion(true);
    };

    const deleteVisit = (e) => {
        e.preventDefault();
        destroy(route('visits.destroy', visitId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log(errors),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingVisitDeletion(false);
        setVisitId(null);
        setSelectedVisit(null);
        clearErrors();
        reset();
    };

    // Filter states
    const [doctor, setDoctor] = useState(filters.doctor || '');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            route('visits.index'),
            {
                doctor,
                start_date: startDate,
                end_date: endDate,
            },
            { preserveState: true },
        );
        setShowFilters(false);
    };

    const clearFilters = () => {
        setDoctor('');
        setStartDate('');
        setEndDate('');
        router.get(route('visits.index'), {}, { preserveState: true });
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

    // Gender Badge Component
    const GenderBadge = ({ gender }) => {
        if (gender === 'male') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                    <Male className="h-3.5 w-3.5" />
                    مذکر
                </span>
            );
        } else if (gender === 'female') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2.5 py-1 text-xs font-medium text-pink-700">
                    <Female className="h-3.5 w-3.5" />
                    مونث
                </span>
            );
        }
        return <span className="text-xs text-gray-500">-</span>;
    };

    return (
        <AuthenticatedLayout title="مدیریت ویزیت‌ها">
            <Head title="مدیریت ویزیت‌ها" />

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
                            مدیریت ویزیت‌ها
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت و پیگیری ویزیت‌های بیماران
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                        >
                            <Filter className="h-4 w-4" />
                            فیلترها
                            {(doctor || startDate || endDate) && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs text-teal-700">
                                    {
                                        [doctor, startDate, endDate].filter(
                                            Boolean,
                                        ).length
                                    }
                                </span>
                            )}
                        </button>
                        <Link
                            href={route('visits.create')}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                        >
                            <Plus className="h-4 w-4" />
                            ثبت ویزیت جدید
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="کل ویزیت‌ها"
                        value={totalVisits}
                        icon={Activity}
                        subtitle={`${totalVisits} ویزیت`}
                        color="bg-teal-500"
                    />
                    <StatCard
                        title="عواید ویزیت"
                        value={totalRevenue}
                        icon={DollarSign}
                        subtitle="جمع عواید حاصله"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="میانگین هر ویزیت"
                        value={Math.round(averageFee)}
                        icon={Clock}
                        subtitle="میانگین هزینه هر ویزیت"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="بیماران منحصر به فرد"
                        value={uniquePatients}
                        icon={Users}
                        subtitle={`${malePatients} مذکر • ${femalePatients} مونث`}
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
                                    داکتر معالج
                                </label>
                                <div className="relative">
                                    <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 px-2 text-gray-400" />
                                    <select
                                        value={doctor}
                                        onChange={(e) =>
                                            setDoctor(e.target.value)
                                        }
                                        className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    >
                                        <option value="">همه داکترها</option>
                                        {doctors.map((doctor) => (
                                            <option
                                                key={doctor.id}
                                                value={doctor.id}
                                            >
                                                {doctor.full_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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

                            <div className="flex items-end gap-2">
                                <PrimaryButton
                                    type="submit"
                                    className="mb-1 flex-1 rounded-lg px-5 py-2.5"
                                >
                                    اعمال فیلترها
                                </PrimaryButton>
                                <DangerButton
                                    type="button"
                                    onClick={clearFilters}
                                    className="mb-1 rounded-lg px-5 py-2.5"
                                >
                                    حذف
                                </DangerButton>
                            </div>
                        </div>
                    </form>
                </Transition>

                {/* Revenue Summary Banner */}
                <div className="mb-6 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm opacity-90">
                                    مجموع عواید ویزیت‌ها
                                </p>
                                <p className="text-2xl font-bold">
                                    {totalRevenue.toLocaleString()}{' '}
                                    <span className="text-sm font-normal">
                                        افغانی
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <Activity className="h-4 w-4" />
                            <span className="text-sm">
                                {totalVisits} ویزیت ثبت شده
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Table Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-teal-100 p-2">
                                <Users className="h-5 w-5 text-teal-700" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                لیست ویزیت‌های ثبت شده
                            </h2>
                            <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                                {totalVisits} ویزیت
                            </span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        #
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            بیمار
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <UserCircle className="h-4 w-4" />
                                            جنسیت
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            سن
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            تماس
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            آدرس
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-4 w-4" />
                                            داکتر معالج
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            هزینه
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            تاریخ مراجعه
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            توضیحات
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visits.data.length ? (
                                    visits.data.map((visit, index) => (
                                        <tr
                                            key={visit.id}
                                            className="group transition-colors hover:bg-teal-50/50"
                                        >
                                            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-sm font-medium text-white">
                                                        {visit.patient.full_name.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {
                                                                visit.patient
                                                                    .full_name
                                                            }
                                                        </span>
                                                        {visit.patient.age && (
                                                            <span className="mt-0.5 block text-xs text-gray-500">
                                                                {
                                                                    visit
                                                                        .patient
                                                                        .age
                                                                }{' '}
                                                                ساله
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <GenderBadge
                                                    gender={
                                                        visit.patient.gender
                                                    }
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                                                {visit.patient.age || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                                                    <span className="dir-ltr text-sm text-gray-600">
                                                        {visit.patient.phone ||
                                                            '-'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <div className="flex max-w-[150px] items-center gap-1.5">
                                                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                    <span className="truncate text-sm text-gray-600">
                                                        {visit.patient
                                                            .address || '-'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Stethoscope className="h-3.5 w-3.5 text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {visit.doctor.full_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <span className="inline-flex items-center rounded-lg bg-green-100 px-2.5 py-1.5 text-sm font-bold text-green-700">
                                                    {Number(
                                                        visit.fee,
                                                    ).toLocaleString()}
                                                    <span className="mr-1 text-xs">
                                                        ؋
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {moment(
                                                            visit.visit_date,
                                                        ).format(
                                                            'jYYYY/jMM/jDD',
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex max-w-[200px] items-start gap-1.5">
                                                    <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                    <span className="line-clamp-2 text-sm text-gray-600">
                                                        {visit.description ||
                                                            '-'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route(
                                                            'visits.edit',
                                                            visit.id,
                                                        )}
                                                        className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                        title="ویرایش ویزیت"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmVisitDeletion(
                                                                visit,
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                        title="حذف ویزیت"
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
                                            colSpan="11"
                                            className="py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-full bg-gray-100 p-4">
                                                    <Activity className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <p className="mt-4 text-sm font-medium text-gray-600">
                                                    هیچ ویزیتی یافت نشد
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    برای ثبت ویزیت جدید، دکمه
                                                    زیر را کلیک کنید
                                                </p>
                                                <Link
                                                    href={route(
                                                        'visits.create',
                                                    )}
                                                    className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    ثبت اولین ویزیت
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {visits.links && visits.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <div className="text-sm text-gray-500">
                                نمایش {visits.from || 0} تا {visits.to || 0} از{' '}
                                {visits.total || 0} ویزیت
                            </div>
                            <div className="flex gap-2">
                                {visits.links.map((link, idx) => {
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
            <Modal show={confirmingVisitDeletion} onClose={closeModal}>
                <form onSubmit={deleteVisit} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف ویزیت
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                آیا از حذف این ویزیت اطمینان دارید؟ این عمل
                                غیرقابل بازگشت است.
                            </p>
                        </div>
                    </div>

                    {selectedVisit && (
                        <div className="mt-4 rounded-xl bg-rose-50 p-4">
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        بیمار:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedVisit.patient.full_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        داکتر معالج:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedVisit.doctor.full_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        تاریخ ویزیت:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {moment(
                                            selectedVisit.visit_date,
                                        ).format('jYYYY/jMM/jDD')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        هزینه ویزیت:
                                    </span>
                                    <span className="font-bold text-rose-700">
                                        {Number(
                                            selectedVisit.fee,
                                        ).toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
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
                                'حذف ویزیت'
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
