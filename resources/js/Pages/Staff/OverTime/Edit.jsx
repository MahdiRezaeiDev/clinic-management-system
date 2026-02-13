import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Briefcase,
    Calculator,
    Calendar,
    Clock,
    DollarSign,
    Edit3,
    FileText,
    Save,
    TrendingUp,
    User,
    Wallet,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import { DateObject } from 'react-multi-date-picker';

export default function Edit({ staff, overtime }) {
    const { data, setData, put, processing, errors } = useForm({
        date: overtime.date
            ? new DateObject({
                  date: moment(overtime.date).format('jYYYY/jMM/jDD'),
                  calendar: persian,
                  locale: persian_en,
              }).format('YYYY/MM/DD')
            : new DateObject({ calendar: persian, locale: persian_en }).format(
                  'YYYY/MM/DD',
              ),
        hours: overtime.hours || 0,
        rate: overtime.rate || 0,
        total: overtime.total || 0,
        description: overtime.description || '',
    });

    const [calculatedTotal, setCalculatedTotal] = useState(overtime.total || 0);
    const [hasChanges, setHasChanges] = useState(false);

    // Calculate total whenever hours or rate changes
    useEffect(() => {
        const total = Number(data.hours) * Number(data.rate);
        setCalculatedTotal(total);
        if (total > 0) {
            setData('total', total);
        }

        // Check if form has changes compared to original overtime
        const hasChanges =
            data.hours != overtime.hours ||
            data.rate != overtime.rate ||
            data.total != overtime.total ||
            data.description != overtime.description ||
            data.date != moment(overtime.date).format('jYYYY/jMM/jDD');

        setHasChanges(hasChanges);
    }, [data.hours, data.rate, data.description, data.date]);

    const submit = (e) => {
        e.preventDefault();
        put(route('staffs.overtime.update', [staff.id, overtime.id]));
    };

    // Check if form is valid
    const isValid = data.hours > 0 && data.rate > 0 && data.total > 0;

    return (
        <AuthenticatedLayout title="ویرایش اضافه‌کاری">
            <Head title={`ویرایش اضافه‌کاری - ${staff.full_name}`} />

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
                            ویرایش اضافه‌کاری
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ویرایش اطلاعات اضافه‌کاری پرسنل
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2">
                        <Edit3 className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                            در حال ویرایش
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

                {/* Original Overtime Info */}
                <div className="mb-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            اطلاعات فعلی اضافه‌کاری
                        </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                        <div>
                            <span className="text-gray-500">تاریخ:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {moment(overtime.date).format('jYYYY/jMM/jDD')}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">ساعت:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {overtime.hours} ساعت
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">نرخ:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {Number(overtime.rate).toLocaleString()} ؋/ساعت
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">مبلغ:</span>
                            <span className="mr-1 font-bold text-teal-700">
                                {Number(overtime.total).toLocaleString()} ؋
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Form Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-amber-100 p-2">
                                <Edit3 className="h-5 w-5 text-amber-700" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    فرم ویرایش اضافه‌کاری
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    اطلاعات اضافه‌کاری را ویرایش کنید
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
                                    <Calendar className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                                        <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                                        <DollarSign className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                                    <Calculator className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                                    <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
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

                            {/* Changes Summary */}
                            {hasChanges && isValid && (
                                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-amber-600" />
                                        <span className="text-sm font-medium text-amber-700">
                                            تغییرات اعمال شده
                                        </span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                        {data.date !=
                                            moment(overtime.date).format(
                                                'jYYYY/jMM/jDD',
                                            ) && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500">
                                                    تاریخ:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {moment(
                                                        overtime.date,
                                                    ).format('jYYYY/jMM/jDD')}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {data.date}
                                                </span>
                                            </div>
                                        )}
                                        {data.hours != overtime.hours && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500">
                                                    ساعت:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {overtime.hours}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {data.hours}
                                                </span>
                                            </div>
                                        )}
                                        {data.rate != overtime.rate && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500">
                                                    نرخ:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {Number(
                                                        overtime.rate,
                                                    ).toLocaleString()}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {Number(
                                                        data.rate,
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                        {data.total != overtime.total && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500">
                                                    مبلغ:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {Number(
                                                        overtime.total,
                                                    ).toLocaleString()}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-bold text-amber-700">
                                                    {Number(
                                                        data.total,
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
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
                                    disabled={
                                        processing || !isValid || !hasChanges
                                    }
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
                                            ذخیره تغییرات
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
                <div className="mt-6 rounded-xl bg-gradient-to-r from-amber-50 to-teal-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Edit3 className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                نکات ویرایش اضافه‌کاری
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • تغییرات فقط بر روی این رکورد اضافه‌کاری اعمال
                                می‌شود
                                <br />
                                • در صورت تغییر ساعت یا نرخ، مبلغ کل به صورت
                                خودکار محاسبه می‌شود
                                <br />
                                • می‌توانید توضیحات را ویرایش یا تکمیل کنید
                                <br />• دکمه ذخیره تا زمانی که تغییری اعمال
                                نکرده‌اید غیرفعال است
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
