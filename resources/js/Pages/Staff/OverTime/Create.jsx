import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Briefcase,
    Calculator,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    FileText,
    Save,
    Timer,
    TrendingUp,
    User,
    Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import { DateObject } from 'react-multi-date-picker';

export default function Create({ staff }) {
    const { data, setData, post, processing, errors } = useForm({
        date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        hours: 0,
        rate: 0,
        total: 0,
        description: '',
    });

    const [calculatedTotal, setCalculatedTotal] = useState(0);

    // Calculate total whenever hours or rate changes
    useEffect(() => {
        const total = Number(data.hours) * Number(data.rate);
        setCalculatedTotal(total);
        if (total > 0) {
            setData('total', total);
        }
    }, [data.hours, data.rate]);

    const submit = (e) => {
        e.preventDefault();
        post(route('staffs.overtime.store', staff.id));
    };

    // Check if form is valid
    const isValid = data.hours > 0 && data.rate > 0 && data.total > 0;

    return (
        <AuthenticatedLayout title="ثبت اضافه‌کاری جدید">
            <Head title={`ثبت اضافه‌کاری - ${staff.full_name}`} />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            ثبت اضافه‌کاری جدید
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت ساعات اضافه‌کاری برای پرسنل
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2">
                        <Timer className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                            فرم اضافه‌کاری
                        </span>
                    </div>
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Form Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-teal-100 p-2">
                                <Timer className="h-5 w-5 text-teal-700" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    فرم ثبت اضافه‌کاری
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    اطلاعات اضافه‌کاری را وارد کنید
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        <div className="space-y-6">
                            {/* Date Field - Required */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    تاریخ اضافه‌کاری
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <AfghanDatePicker
                                        id="overtime_date"
                                        value={data.date}
                                        onChange={(val) =>
                                            setData(
                                                'date',
                                                val.format('YYYY/MM/DD'),
                                            )
                                        }
                                        placeholder="تاریخ اضافه‌کاری را انتخاب کنید"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm"
                                    />
                                </div>
                                <InputError message={errors.date} />
                            </div>

                            {/* Hours and Rate - Both Required */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Hours */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        ساعت کار
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            min="0.5"
                                            step="0.5"
                                            value={data.hours}
                                            onChange={(e) =>
                                                setData('hours', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="مثلاً ۸"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        حداقل ۰.۵ ساعت
                                    </p>
                                    <InputError message={errors.hours} />
                                </div>

                                {/* Rate */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        نرخ هر ساعت (افغانی)
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                            ؋
                                        </span>
                                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            min="0"
                                            step="10"
                                            value={data.rate}
                                            onChange={(e) =>
                                                setData('rate', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="مثلاً ۵۰۰"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        نرخ هر ساعت اضافه‌کاری
                                    </p>
                                    <InputError message={errors.rate} />
                                </div>
                            </div>

                            {/* Auto-calculated Total */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    مبلغ قابل پرداخت
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calculator className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <input
                                        type="number"
                                        value={data.total}
                                        onChange={(e) =>
                                            setData('total', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-8 pr-10 text-sm font-bold text-gray-800"
                                        placeholder="۰"
                                        readOnly
                                    />
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-teal-50 p-3 text-xs">
                                    <TrendingUp className="h-4 w-4 text-teal-600" />
                                    <span className="text-teal-700">
                                        محاسبه خودکار: {Number(data.hours) || 0}{' '}
                                        ساعت ×{' '}
                                        {Number(data.rate).toLocaleString()}{' '}
                                        افغانی ={' '}
                                        {calculatedTotal.toLocaleString()}{' '}
                                        افغانی
                                    </span>
                                </div>
                                <InputError message={errors.total} />
                            </div>

                            {/* Description - Optional */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    توضیحات
                                    <span className="mr-1 text-gray-400">
                                        (اختیاری)
                                    </span>
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <textarea
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="توضیحات اضافه‌کاری (دلیل، پروژه، شیفت و ...)"
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>

                            {/* Summary Card */}
                            {isValid && (
                                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-teal-600" />
                                        <span className="text-sm font-medium text-teal-700">
                                            خلاصه اضافه‌کاری
                                        </span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-500">
                                                تاریخ:
                                            </span>
                                            <span className="mr-2 font-medium text-gray-800">
                                                {data.date}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                ساعت:
                                            </span>
                                            <span className="mr-2 font-medium text-gray-800">
                                                {data.hours} ساعت
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                نرخ:
                                            </span>
                                            <span className="mr-2 font-medium text-gray-800">
                                                {Number(
                                                    data.rate,
                                                ).toLocaleString()}{' '}
                                                ؋/ساعت
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                قابل پرداخت:
                                            </span>
                                            <span className="mr-2 font-bold text-teal-700">
                                                {Number(
                                                    data.total,
                                                ).toLocaleString()}{' '}
                                                افغانی
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                                <SecondaryButton
                                    href={route(
                                        'staffs.overtime.index',
                                        staff.id,
                                    )}
                                    className="flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm"
                                >
                                    انصراف
                                </SecondaryButton>
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing || !isValid}
                                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            در حال ذخیره...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            ثبت اضافه‌کاری
                                        </>
                                    )}
                                </PrimaryButton>
                            </div>

                            {/* Required Fields Note */}
                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                <AlertCircle className="h-3.5 w-3.5" />
                                <span>
                                    فیلدهای دارای{' '}
                                    <span className="text-red-500">*</span>{' '}
                                    الزامی هستند
                                </span>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Help Card */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Timer className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                راهنمای ثبت اضافه‌کاری
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • تاریخ اضافه‌کاری را با دقت انتخاب کنید
                                <br />
                                • ساعت کار می‌تواند با اعشار باشد (مثلاً ۷.۵
                                ساعت)
                                <br />
                                • نرخ هر ساعت بر اساس توافق با پرسنل تعیین
                                می‌شود
                                <br />
                                • مبلغ کل به صورت خودکار محاسبه می‌شود
                                <br />• توضیحات می‌تواند شامل دلیل اضافه‌کاری
                                باشد
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
