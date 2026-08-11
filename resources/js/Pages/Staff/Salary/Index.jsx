import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Edit,
    FileText,
    Trash,
    User,
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

export default function Index({ staff, salaries }) {
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [salaryId, setSalaryId] = useState(null);
    const [selectedYear, setSelectedYear] = useState(moment().jYear());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const { delete: destroy, processing, reset, clearErrors } = useForm();

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmDelete = (id) => {
        setConfirmingDelete(true);
        setSalaryId(id);
    };

    const deleteSalary = (e) => {
        e.preventDefault();
        destroy(route('staffs.salary.destroy', [staff.id, salaryId]), {
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDelete(false);
        setSalaryId(null);
        clearErrors();
        reset();
    };

    const filteredSalaries = salaries.filter((salary) => {
        if (selectedMonth) {
            return (
                salary.salary_month === selectedMonth &&
                moment(salary.payment_date).jYear() === selectedYear
            );
        }
        return moment(salary.payment_date).jYear() === selectedYear;
    });

    const totalPaid = filteredSalaries.reduce(
        (sum, salary) => sum + parseFloat(salary.total_paid),
        0,
    );

    const years = [
        ...new Set(salaries.map((s) => moment(s.payment_date).jYear())),
    ].sort((a, b) => b - a);

    return (
        <AuthenticatedLayout title={`حقوق پرسنل: ${staff.full_name}`}>
            <Head title={`حقوق ${staff.full_name}`} />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl" />
            </div>
            <div className="min-h-screen px-4 py-8 md:px-8">
                {/* Header Card */}
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-l from-blue-50 to-white px-6 py-8">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                        <span className="text-2xl font-bold">
                                            {staff.full_name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                                            {staff.full_name}
                                        </h1>
                                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <CreditCard className="h-4 w-4" />
                                                <span>
                                                    کد: {staff.code || '---'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span>
                                                    سمت:{' '}
                                                    {staff.position || '---'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    تاریخ استخدام:{' '}
                                                    {staff.hire_date
                                                        ? moment(
                                                              staff.hire_date,
                                                          ).format(
                                                              'jYYYY/jMM/jDD',
                                                          )
                                                        : '---'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={route(
                                        'staffs.salary.create',
                                        staff.id,
                                    )}
                                    className="inline-flex transform items-center gap-2 rounded-xl bg-gradient-to-l from-teal-500 to-emerald-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-teal-600 hover:to-emerald-700 hover:shadow-xl"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    پرداخت حقوق جدید
                                </Link>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        سال:
                                    </span>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) =>
                                            setSelectedYear(
                                                parseInt(e.target.value),
                                            )
                                        }
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        ماه:
                                    </span>
                                    <select
                                        value={selectedMonth || ''}
                                        onChange={(e) =>
                                            setSelectedMonth(
                                                e.target.value
                                                    ? parseInt(e.target.value)
                                                    : null,
                                            )
                                        }
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">همه ماه‌ها</option>
                                        {afghanMonths.map((month) => (
                                            <option
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1"></div>
                                <div className="rounded-lg bg-blue-100 px-4 py-2">
                                    <span className="text-sm font-medium text-blue-800">
                                        جمع کل پرداختی:
                                    </span>
                                    <span className="mr-2 text-lg font-bold text-blue-600">
                                        {totalPaid.toLocaleString()} افغانی
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-500">
                                        تعداد پرداخت‌ها
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {filteredSalaries.length}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-500">
                                        میانگین حقوق
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {filteredSalaries.length
                                            ? Math.round(
                                                  totalPaid /
                                                      filteredSalaries.length,
                                              ).toLocaleString()
                                            : 0}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <svg
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-500">
                                        بیشترین حقوق
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {filteredSalaries.length
                                            ? Math.max(
                                                  ...filteredSalaries.map((s) =>
                                                      parseFloat(s.total_paid),
                                                  ),
                                              ).toLocaleString()
                                            : 0}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                    <svg
                                        className="h-6 w-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-500">
                                        کمترین حقوق
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {filteredSalaries.length
                                            ? Math.min(
                                                  ...filteredSalaries.map((s) =>
                                                      parseFloat(s.total_paid),
                                                  ),
                                              ).toLocaleString()
                                            : 0}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                    <svg
                                        className="h-6 w-6 text-amber-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-l from-gray-50 to-white px-6 py-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                لیست حقوق پرداختی
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                تمام پرداخت‌های انجام شده برای این پرسنل
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            #
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            حقوق پایه
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            اضافه کاری
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            کسورات
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            ماه
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            مبلغ پرداختی
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            تاریخ
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            توضیحات
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredSalaries.length > 0 ? (
                                        filteredSalaries.map(
                                            (salary, index) => (
                                                <tr
                                                    key={salary.id}
                                                    className="transition-colors hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {parseFloat(
                                                            salary.base_salary,
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-green-600">
                                                        +
                                                        {salary.overtimes
                                                            .reduce(
                                                                (sum, ot) =>
                                                                    sum +
                                                                    parseFloat(
                                                                        ot.total,
                                                                    ),
                                                                0,
                                                            )
                                                            .toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-red-600">
                                                        -
                                                        {salary.deductions
                                                            ? parseFloat(
                                                                  salary.deductions,
                                                              ).toLocaleString()
                                                            : 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                                            {
                                                                afghanMonths[
                                                                    salary.salary_month -
                                                                        1
                                                                ].label
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                        {parseFloat(
                                                            salary.total_paid,
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-gray-400" />
                                                            {moment(
                                                                salary.payment_date,
                                                            ).format(
                                                                'jYYYY/jMM/jDD',
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-600">
                                                        {salary.description ? (
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                                                <span className="truncate">
                                                                    {
                                                                        salary.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400">
                                                                ---
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Link
                                                                href={route(
                                                                    'staffs.salary.edit',
                                                                    [
                                                                        staff.id,
                                                                        salary.id,
                                                                    ],
                                                                )}
                                                                className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                                                                title="ویرایش"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    confirmDelete(
                                                                        salary.id,
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                                                                title="حذف"
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="px-6 py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <svg
                                                        className="mb-4 h-16 w-16"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <h4 className="mb-1 text-lg font-medium text-gray-600">
                                                        پرداختی یافت نشد
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        برای این سال/ماه هیچ
                                                        حقوقی پرداخت نشده است
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {filteredSalaries.length > 0 && (
                                    <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-left"
                                            >
                                                <span className="font-semibold text-gray-700">
                                                    جمع کل پرداختی:
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-lg font-bold text-blue-600">
                                                {totalPaid.toLocaleString()}
                                            </td>
                                            <td colSpan="3"></td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>

                        {/* Pagination or Navigation */}
                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    نمایش {filteredSalaries.length} از{' '}
                                    {salaries.length} پرداخت
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">
                                        1
                                    </span>
                                    <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingDelete} onClose={closeModal}>
                <form onSubmit={deleteSalary} className="p-6">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="h-8 w-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-gray-900">
                            حذف پرداخت حقوق
                        </h2>
                        <p className="mb-6 text-sm text-gray-500">
                            آیا از حذف این پرداخت اطمینان دارید؟ این عمل قابل
                            بازگشت نیست.
                        </p>
                    </div>
                    <div className="flex justify-center gap-3">
                        <SecondaryButton onClick={closeModal} className="px-6">
                            انصراف
                        </SecondaryButton>
                        <DangerButton className="px-6" disabled={processing}>
                            {processing ? 'در حال حذف...' : 'حذف'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Flash Message */}
            <Transition
                show={showFlash}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 text-white shadow-xl">
                    <svg
                        className="h-5 w-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-sm font-medium">{flash.success}</span>
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
