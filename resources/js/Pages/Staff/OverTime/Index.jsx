import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Award,
    Briefcase,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    Edit,
    FileText,
    History,
    Plus,
    Timer,
    Trash,
    TrendingUp,
    User,
    Wallet,
    XCircle,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

const afghanMonths = [
    { value: '1', label: 'حمل' },
    { value: '2', label: 'ثور' },
    { value: '3', label: 'جوزا' },
    { value: '4', label: 'سرطان' },
    { value: '5', label: 'اسد' },
    { value: '6', label: 'سنبله' },
    { value: '7', label: 'میزان' },
    { value: '8', label: 'عقرب' },
    { value: '9', label: 'قوس' },
    { value: '10', label: 'جدی' },
    { value: '11', label: 'دلو' },
    { value: '12', label: 'حوت' },
];

export default function Index({ staff, overtimes }) {
    const { flash } = usePage().props;
    const [show, setShowFlash] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [selectedOvertime, setSelectedOvertime] = useState(null);
    const [salaryId, setSalaryId] = useState(null);
    const { delete: destroy, processing, reset, clearErrors } = useForm();

    // Calculate statistics
    const totalHours = overtimes.reduce((sum, ot) => sum + Number(ot.hours), 0);
    const totalAmount = overtimes.reduce(
        (sum, ot) => sum + Number(ot.total),
        0,
    );
    const paidOvertimes = overtimes.filter((ot) => ot.salary_id).length;
    const unpaidOvertimes = overtimes.filter((ot) => !ot.salary_id).length;
    const unpaidAmount = overtimes
        .filter((ot) => !ot.salary_id)
        .reduce((sum, ot) => sum + Number(ot.total), 0);

    const averageRate =
        overtimes.length > 0
            ? overtimes.reduce((sum, ot) => sum + Number(ot.rate), 0) /
              overtimes.length
            : 0;

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmOvertimeDeletion = (overtime) => {
        setSelectedOvertime(overtime);
        setSalaryId(overtime.id);
        setConfirmingDelete(true);
    };

    const deleteOvertime = (e) => {
        e.preventDefault();
        destroy(route('staffs.overtime.destroy', [staff.id, salaryId]), {
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDelete(false);
        setSalaryId(null);
        setSelectedOvertime(null);
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
        <AuthenticatedLayout title={`مدیریت اضافه‌کاری - ${staff.full_name}`}>
            <Head title={`مدیریت اضافه‌کاری - ${staff.full_name}`} />

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
                            مدیریت اضافه‌کاری
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت و پیگیری اضافه‌کاری‌های پرسنل
                        </p>
                    </div>

                    <Link
                        href={route('staffs.overtime.create', staff.id)}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                    >
                        <Plus className="h-4 w-4" />
                        ثبت اضافه‌کاری جدید
                    </Link>
                </div>

                {/* Staff Info Card */}
                <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white shadow-lg">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <User className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold">
                                    {staff.full_name}
                                </h2>
                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                    {staff.role || 'پرسنل'}
                                </span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-4">
                                <div className="flex items-center gap-1.5 text-sm text-teal-100">
                                    <Briefcase className="h-4 w-4" />
                                    {staff.position || 'نامشخص'}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-teal-100">
                                    <Wallet className="h-4 w-4" />
                                    حقوق پایه:{' '}
                                    {Number(
                                        staff.base_salary,
                                    ).toLocaleString()}{' '}
                                    افغانی
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-teal-100">
                                    <Clock className="h-4 w-4" />
                                    کل اضافه‌کاری: {totalHours} ساعت
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="مجموع ساعت اضافه‌کاری"
                        value={totalHours}
                        icon={Timer}
                        subtitle={`${totalHours} ساعت اضافه‌کاری`}
                        color="bg-teal-500"
                    />
                    <StatCard
                        title="مجموع مبلغ اضافه‌کاری"
                        value={totalAmount}
                        icon={DollarSign}
                        subtitle="جمع مبلغ اضافه‌کاری‌ها"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="پرداخت شده"
                        value={paidOvertimes}
                        icon={CheckCircle}
                        subtitle={`${paidOvertimes} مورد پرداخت شده`}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="پرداخت نشده"
                        value={unpaidOvertimes}
                        icon={XCircle}
                        subtitle={`${unpaidAmount.toLocaleString()} افغانی باقی‌مانده`}
                        color="bg-orange-500"
                    />
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Table Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <History className="h-5 w-5 text-teal-700" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    لیست اضافه‌کاری‌های {staff.full_name}
                                </h2>
                                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                                    {overtimes.length} مورد
                                </span>
                            </div>

                            {/* Summary Badges */}
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5">
                                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                                    <span className="text-xs font-medium text-green-700">
                                        پرداخت شده: {paidOvertimes}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 rounded-lg bg-yellow-50 px-3 py-1.5">
                                    <Clock className="h-3.5 w-3.5 text-yellow-600" />
                                    <span className="text-xs font-medium text-yellow-700">
                                        پرداخت نشده: {unpaidOvertimes}
                                    </span>
                                </div>
                            </div>
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
                                            <Calendar className="h-4 w-4" />
                                            تاریخ
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            مدت (ساعت)
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            نرخ فی ساعت
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            مبلغ کل
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
                                            <CheckCircle className="h-4 w-4" />
                                            وضعیت
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Award className="h-4 w-4" />
                                            ماه حقوق
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-right text-sm font-medium text-white">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {overtimes.length > 0 ? (
                                    overtimes.map((overTime, index) => {
                                        const monthInfo = overTime.salary
                                            ? afghanMonths[
                                                  overTime.salary.salary_month -
                                                      1
                                              ]
                                            : null;

                                        return (
                                            <tr
                                                key={overTime.id}
                                                className={`group transition-colors hover:bg-teal-50/50 ${
                                                    overTime.salary_id
                                                        ? 'bg-green-50/30'
                                                        : ''
                                                }`}
                                            >
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-600">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {moment(
                                                                overTime.date,
                                                            ).format(
                                                                'jYYYY/jMM/jDD',
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <span className="text-sm font-semibold text-gray-800">
                                                        {overTime.hours}
                                                    </span>
                                                    <span className="mr-1 text-xs text-gray-500">
                                                        ساعت
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {parseFloat(
                                                            overTime.rate,
                                                        ).toLocaleString()}
                                                    </span>
                                                    <span className="mr-1 text-xs text-gray-500">
                                                        ؋/ساعت
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <span className="text-sm font-bold text-gray-800">
                                                        {parseFloat(
                                                            overTime.total,
                                                        ).toLocaleString()}
                                                    </span>
                                                    <span className="mr-1 text-xs text-gray-500">
                                                        ؋
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex max-w-[200px] items-start gap-1.5">
                                                        <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                                                        <span className="line-clamp-2 text-sm text-gray-600">
                                                            {overTime.description ||
                                                                '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    {overTime.salary_id ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            پرداخت شده
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            پرداخت نشده
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    {monthInfo ? (
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {monthInfo.label}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route(
                                                                'staffs.overtime.edit',
                                                                [
                                                                    staff.id,
                                                                    overTime.id,
                                                                ],
                                                            )}
                                                            className="rounded-lg p-2 text-teal-600 transition-colors hover:bg-teal-50"
                                                            title="ویرایش اضافه‌کاری"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                confirmOvertimeDeletion(
                                                                    overTime,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                                                            title="حذف اضافه‌کاری"
                                                            disabled={
                                                                overTime.salary_id
                                                            }
                                                        >
                                                            <Trash
                                                                className={`h-4 w-4 ${
                                                                    overTime.salary_id
                                                                        ? 'cursor-not-allowed opacity-30'
                                                                        : ''
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-full bg-gray-100 p-4">
                                                    <Clock className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <p className="mt-4 text-sm font-medium text-gray-600">
                                                    هیچ اضافه‌کاری ثبت نشده است
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    برای ثبت اضافه‌کاری جدید،
                                                    دکمه زیر را کلیک کنید
                                                </p>
                                                <Link
                                                    href={route(
                                                        'staffs.overtime.create',
                                                        staff.id,
                                                    )}
                                                    className="mt-4 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition hover:bg-teal-700"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    ثبت اولین اضافه‌کاری
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Summary */}
                    {overtimes.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-teal-100 p-1.5">
                                        <CheckCircle className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        مجموع ساعات: {totalHours} ساعت
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            میانگین نرخ:
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            {Math.round(
                                                averageRate,
                                            ).toLocaleString()}{' '}
                                            ؋/ساعت
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            جمع کل:
                                        </span>
                                        <span className="text-lg font-bold text-teal-700">
                                            {totalAmount.toLocaleString()} ؋
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal - Enhanced */}
            <Modal show={confirmingDelete} onClose={closeModal}>
                <form onSubmit={deleteOvertime} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-rose-100 p-3">
                            <AlertCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                حذف اضافه‌کاری
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                آیا از حذف این اضافه‌کاری اطمینان دارید؟ این عمل
                                غیرقابل بازگشت است.
                            </p>
                        </div>
                    </div>

                    {selectedOvertime && (
                        <div className="mt-4 rounded-xl bg-rose-50 p-4">
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        تاریخ:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedOvertime.date}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        ساعت اضافه‌کاری:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {selectedOvertime.hours} ساعت
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        نرخ فی ساعت:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {parseFloat(
                                            selectedOvertime.rate,
                                        ).toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        مبلغ کل:
                                    </span>
                                    <span className="font-bold text-rose-700">
                                        {parseFloat(
                                            selectedOvertime.total,
                                        ).toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
                                {selectedOvertime.salary_id && (
                                    <div className="mt-2 rounded-lg bg-amber-100 p-2 text-xs text-amber-700">
                                        <div className="flex items-center gap-1.5">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>
                                                این اضافه‌کاری قبلاً پرداخت شده
                                                است
                                            </span>
                                        </div>
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
                            disabled={processing || selectedOvertime?.salary_id}
                            className="px-5 py-2.5"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    در حال حذف...
                                </span>
                            ) : (
                                'حذف اضافه‌کاری'
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
