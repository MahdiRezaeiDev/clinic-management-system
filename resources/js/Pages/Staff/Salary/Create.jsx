import AfghanDatePicker from '@/Components/AfghanDatePicker';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    ChevronLeft,
    Clock,
    DollarSign,
    FileText,
    User,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

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

export default function Create({ staff, unpaidOvertimes }) {
    const { data, setData, post, processing, errors } = useForm({
        base_salary: staff.base_salary || 0,
        overtime_amount: 0,
        deductions: 0,
        total_paid: staff.base_salary || 0,
        salary_month: '',
        payment_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        description: '',
        selectedOvertimes: [],
    });

    const [showOvertimeTable, setShowOvertimeTable] = useState(
        unpaidOvertimes.length > 0,
    );

    // Toggle overtime selection
    const toggleOvertime = (id, amount) => {
        const selected = [...data.selectedOvertimes];
        let newSelected, newOvertimeAmount, newTotalPaid;

        amount = parseFloat(amount);

        if (selected.includes(id)) {
            newSelected = selected.filter((i) => i !== id);
            newOvertimeAmount =
                (parseFloat(data.overtime_amount) || 0) - amount;
            newTotalPaid = (parseFloat(data.total_paid) || 0) - amount;
        } else {
            newSelected = [...selected, id];
            newOvertimeAmount =
                (parseFloat(data.overtime_amount) || 0) + amount;
            newTotalPaid = (parseFloat(data.total_paid) || 0) + amount;
        }

        setData({
            ...data,
            selectedOvertimes: newSelected,
            overtime_amount: newOvertimeAmount,
            total_paid: newTotalPaid >= 0 ? newTotalPaid : 0,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('staffs.salary.store', staff.id), {
            onSuccess: () => {
                setData({
                    base_salary: staff.base_salary || 0,
                    overtime_amount: 0,
                    deductions: 0,
                    total_paid: 0,
                    salary_month: '',
                    payment_date: new DateObject({
                        calendar: persian,
                        locale: persian_en,
                    }).format('YYYY/MM/DD'),
                    description: '',
                    selectedOvertimes: [],
                });
            },
        });
    };

    // Calculate net amount
    const netAmount =
        parseFloat(data.base_salary) +
        parseFloat(data.overtime_amount) -
        parseFloat(data.deductions || 0);

    return (
        <AuthenticatedLayout title={`افزودن حقوق ${staff.full_name}`}>
            <Head title={`افزودن حقوق برای ${staff.full_name}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 px-4 py-8 md:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route('staffs.salary.index', staff.id)}
                            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            بازگشت به لیست حقوق
                        </Link>

                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                            <div className="border-b border-gray-100 bg-gradient-to-l from-blue-50 to-white px-6 py-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-lg">
                                        {staff.full_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                                            {staff.full_name}
                                        </h1>
                                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span>
                                                    کد پرسنلی:{' '}
                                                    {staff.code || '---'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                <span>
                                                    حقوق پایه:{' '}
                                                    {parseFloat(
                                                        staff.base_salary || 0,
                                                    ).toLocaleString()}{' '}
                                                    افغانی
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Summary */}
                            <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-4 md:divide-x md:divide-y-0">
                                <div className="px-6 py-4">
                                    <p className="mb-1 text-xs text-gray-500">
                                        اضافه کاری
                                    </p>
                                    <p className="text-lg font-bold text-green-600">
                                        +
                                        {parseFloat(
                                            data.overtime_amount || 0,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div className="px-6 py-4">
                                    <p className="mb-1 text-xs text-gray-500">
                                        کسورات
                                    </p>
                                    <p className="text-lg font-bold text-red-600">
                                        -
                                        {parseFloat(
                                            data.deductions || 0,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div className="px-6 py-4">
                                    <p className="mb-1 text-xs text-gray-500">
                                        خالص پرداختی
                                    </p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {netAmount.toLocaleString()}
                                    </p>
                                </div>
                                <div className="px-6 py-4">
                                    <p className="mb-1 text-xs text-gray-500">
                                        تعداد اضافه‌کاری
                                    </p>
                                    <p className="text-lg font-bold text-gray-700">
                                        {data.selectedOvertimes.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Unpaid Overtime Section */}
                    {unpaidOvertimes.length > 0 && (
                        <div className="mb-6">
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                                <div
                                    className="flex cursor-pointer items-center justify-between border-b border-gray-100 bg-gradient-to-l from-amber-50 to-white px-6 py-4"
                                    onClick={() =>
                                        setShowOvertimeTable(!showOvertimeTable)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                                            <Clock className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                اضافه‌کاری‌های پرداخت نشده
                                            </h3>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                {unpaidOvertimes.length} مورد
                                                اضافه‌کاری برای پرداخت
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            {showOvertimeTable
                                                ? 'کلیک کنید تا بسته شود'
                                                : 'کلیک کنید تا باز شود'}
                                        </span>
                                        <svg
                                            className={`h-5 w-5 text-gray-400 transition-transform ${showOvertimeTable ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {showOvertimeTable && (
                                    <div className="p-6">
                                        <div className="overflow-hidden rounded-xl border border-gray-200">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                            انتخاب
                                                        </th>
                                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                            تاریخ
                                                        </th>
                                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                            مقدار
                                                        </th>
                                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                            توضیحات
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {unpaidOvertimes.map(
                                                        (overTime) => (
                                                            <tr
                                                                key={
                                                                    overTime.id
                                                                }
                                                                className={`transition-colors hover:bg-gray-50 ${
                                                                    data.selectedOvertimes.includes(
                                                                        overTime.id,
                                                                    )
                                                                        ? 'bg-blue-50/50'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <Checkbox
                                                                        checked={data.selectedOvertimes.includes(
                                                                            overTime.id,
                                                                        )}
                                                                        onChange={() =>
                                                                            toggleOvertime(
                                                                                overTime.id,
                                                                                overTime.total,
                                                                            )
                                                                        }
                                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                                        <span className="text-sm text-gray-700">
                                                                            {moment(
                                                                                overTime.date,
                                                                            ).format(
                                                                                'jYYYY/jMM/jDD',
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                                                                        {parseFloat(
                                                                            overTime.total,
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="h-4 w-4 text-gray-400" />
                                                                        <span className="text-sm text-gray-600">
                                                                            {overTime.description ||
                                                                                '---'}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                                {data.selectedOvertimes.length >
                                                    0 && (
                                                    <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                                                        <tr>
                                                            <td
                                                                colSpan="2"
                                                                className="px-6 py-4 text-left"
                                                            >
                                                                <span className="font-medium text-gray-700">
                                                                    جمع
                                                                    اضافه‌کاری:
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="font-bold text-green-600">
                                                                    +
                                                                    {parseFloat(
                                                                        data.overtime_amount ||
                                                                            0,
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </tfoot>
                                                )}
                                            </table>
                                        </div>

                                        {data.selectedOvertimes.length ===
                                            0 && (
                                            <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-600">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>
                                                    هیچ اضافه‌کاری انتخاب نشده
                                                    است. می‌توانید از چک‌باکس‌ها
                                                    برای انتخاب استفاده کنید.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Salary Form */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-l from-green-50 to-white px-6 py-4">
                            <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                فرم ثبت حقوق
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                اطلاعات مربوط به پرداخت حقوق را وارد کنید
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Base Salary */}
                                <div>
                                    <InputLabel
                                        htmlFor="base_salary"
                                        value="حقوق پایه"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <div className="relative">
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <TextInput
                                            type="number"
                                            id="base_salary"
                                            value={data.base_salary}
                                            onChange={(e) => {
                                                setData(
                                                    'base_salary',
                                                    e.target.value,
                                                );
                                                setData(
                                                    'total_paid',
                                                    parseFloat(
                                                        e.target.value || 0,
                                                    ) +
                                                        parseFloat(
                                                            data.overtime_amount ||
                                                                0,
                                                        ) -
                                                        parseFloat(
                                                            data.deductions ||
                                                                0,
                                                        ),
                                                );
                                            }}
                                            className="w-full rounded-lg border-gray-300 pr-10 text-sm transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                            min={0}
                                            step="100"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.base_salary}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Overtime Amount (readonly) */}
                                <div>
                                    <InputLabel
                                        htmlFor="overtime_amount"
                                        value="اضافه کاری"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <div className="relative">
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <TextInput
                                            type="number"
                                            id="overtime_amount"
                                            value={data.overtime_amount}
                                            readOnly
                                            className="w-full rounded-lg border-gray-300 bg-gray-50 pr-10 text-sm text-gray-700"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        * از طریق انتخاب اضافه‌کاری محاسبه
                                        می‌شود
                                    </p>
                                </div>

                                {/* Deductions */}
                                <div>
                                    <InputLabel
                                        htmlFor="deductions"
                                        value="کسورات"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <div className="relative">
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                                            <span className="text-gray-400">
                                                -
                                            </span>
                                        </div>
                                        <TextInput
                                            type="number"
                                            id="deductions"
                                            value={data.deductions}
                                            onChange={(e) => {
                                                setData(
                                                    'deductions',
                                                    e.target.value,
                                                );
                                                setData(
                                                    'total_paid',
                                                    parseFloat(
                                                        data.base_salary || 0,
                                                    ) +
                                                        parseFloat(
                                                            data.overtime_amount ||
                                                                0,
                                                        ) -
                                                        parseFloat(
                                                            e.target.value || 0,
                                                        ),
                                                );
                                            }}
                                            className="w-full rounded-lg border-gray-300 pr-10 text-sm transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                            min={0}
                                            step="100"
                                            placeholder="۰"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.deductions}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Salary Month */}
                                <div>
                                    <InputLabel
                                        htmlFor="salary_month"
                                        value="ماه حقوق"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <select
                                        id="salary_month"
                                        value={data.salary_month}
                                        onChange={(e) =>
                                            setData(
                                                'salary_month',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">
                                            ماه را انتخاب کنید
                                        </option>
                                        {afghanMonths.map((month) => (
                                            <option
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.salary_month}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Payment Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="payment_date"
                                        value="تاریخ پرداخت"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <AfghanDatePicker
                                        id="payment_date"
                                        value={data.payment_date}
                                        onChange={(val) =>
                                            setData(
                                                'payment_date',
                                                val.format('YYYY/MM/DD'),
                                            )
                                        }
                                        placeholder="تاریخ پرداخت را انتخاب کنید"
                                        className="w-full"
                                    />
                                    <InputError
                                        message={errors.payment_date}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Total Paid (readonly) */}
                                <div>
                                    <InputLabel
                                        htmlFor="total_paid"
                                        value="مبلغ پرداختی کل"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <div className="relative">
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <TextInput
                                            type="number"
                                            id="total_paid"
                                            value={netAmount}
                                            readOnly
                                            className="w-full rounded-lg border-green-300 bg-green-50 pr-10 text-sm font-bold text-green-700"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        * مبلغ نهایی پس از محاسبات
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="description"
                                    value="توضیحات"
                                    className="mb-2 text-sm font-medium text-gray-700"
                                />
                                <div className="relative">
                                    <div className="absolute right-3 top-3">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        rows={3}
                                        className="w-full resize-none rounded-lg border-gray-300 pr-10 text-sm transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                        placeholder="توضیحات مربوط به پرداخت (اختیاری)..."
                                    />
                                </div>
                                <InputError
                                    message={errors.description}
                                    className="mt-1"
                                />
                            </div>

                            {/* Form Validation Summary */}
                            {Object.keys(errors).length > 0 && (
                                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                                    <div className="flex items-center gap-2 text-red-800">
                                        <AlertCircle className="h-5 w-5" />
                                        <span className="text-sm font-medium">
                                            لطفاً خطاهای زیر را برطرف کنید:
                                        </span>
                                    </div>
                                    <ul className="mt-2 list-inside list-disc text-xs text-red-600">
                                        {Object.values(errors).map(
                                            (error, index) => (
                                                <li key={index}>{error}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-4">
                                <Link
                                    href={route(
                                        'staffs.salary.index',
                                        staff.id,
                                    )}
                                    className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                >
                                    انصراف
                                </Link>
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-gradient-to-l from-green-500 to-emerald-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-md"
                                >
                                    {processing ? (
                                        <>
                                            <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            در حال ذخیره...
                                        </>
                                    ) : (
                                        'ذخیره و ثبت حقوق'
                                    )}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Help Card */}
                    <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                            <div>
                                <p className="mb-1 text-sm font-medium text-blue-800">
                                    راهنمای ثبت حقوق
                                </p>
                                <p className="text-xs leading-relaxed text-blue-700">
                                    • حقوق پایه به صورت خودکار از اطلاعات پرسنل
                                    بارگذاری می‌شود.
                                    <br />
                                    • برای اضافه کردن اضافه‌کاری، موارد مورد نظر
                                    را از جدول انتخاب کنید.
                                    <br />
                                    • کسورات را به صورت دستی وارد کنید (در صورت
                                    وجود).
                                    <br />
                                    • ماه حقوق و تاریخ پرداخت را انتخاب کنید.
                                    <br />• مبلغ نهایی به صورت خودکار محاسبه
                                    می‌شود.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
