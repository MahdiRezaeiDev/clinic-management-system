import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Building2,
    Calendar,
    CreditCard,
    DollarSign,
    FileText,
    Package,
    Receipt,
    Save,
    TrendingUp,
    Truck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Purchase({ suppliers }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        supplier_id: '',
        total_amount: '',
        paid_amount: 0,
        remaining_amount: '',
        purchase_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        description: '',
        user_id: 1,
    });

    const [formStep, setFormStep] = useState(1);
    const [calculatedRemaining, setCalculatedRemaining] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        post(route('medicine.store'), {
            onSuccess: () => {
                reset();
                setFormStep(1);
            },
        });
    };

    // Auto-calculate remaining
    const handleAmountChange = (field, value) => {
        setData(field, value);
        const total =
            parseFloat(field === 'total_amount' ? value : data.total_amount) ||
            0;
        const paid =
            parseFloat(field === 'paid_amount' ? value : data.paid_amount) || 0;
        const remaining = total - paid;
        setCalculatedRemaining(remaining);
        setData('remaining_amount', remaining);
    };

    // Update remaining when both fields change
    useEffect(() => {
        const total = parseFloat(data.total_amount) || 0;
        const paid = parseFloat(data.paid_amount) || 0;
        const remaining = total - paid;
        setCalculatedRemaining(remaining);
        setData('remaining_amount', remaining);
    }, [data.total_amount, data.paid_amount]);

    // Check if form is valid
    const isValid =
        data.supplier_id && data.total_amount > 0 && data.purchase_date;

    // Calculate payment percentage
    const paymentPercentage =
        data.total_amount > 0
            ? Math.round(
                  (parseFloat(data.paid_amount) /
                      parseFloat(data.total_amount)) *
                      100,
              )
            : 0;

    return (
        <AuthenticatedLayout title="ثبت خرید جدید">
            <Head title="ثبت خرید جدید" />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            ثبت خرید جدید
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ثبت خرید دارو از شرکت‌های تامین‌کننده
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2">
                        <Package className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                            فرم خرید
                        </span>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 flex items-center justify-center gap-2">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formStep >= 1
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        1
                    </div>
                    <div
                        className={`h-1 w-16 ${
                            formStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'
                        }`}
                    ></div>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formStep >= 2
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        2
                    </div>
                    <div
                        className={`h-1 w-16 ${
                            formStep >= 3 ? 'bg-teal-600' : 'bg-gray-200'
                        }`}
                    ></div>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formStep >= 3
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        3
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                                <Truck className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    فرم ثبت خرید دارو
                                </h2>
                                <p className="mt-1 text-sm text-teal-100">
                                    اطلاعات خرید و پرداخت را وارد کنید
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        {/* Step 1: Supplier Information */}
                        <div
                            className={`space-y-6 ${formStep !== 1 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Building2 className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات تامین‌کننده
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۱ از ۳
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Supplier - Required */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        شرکت همکار
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <select
                                            id="supplier_id"
                                            value={data.supplier_id}
                                            onChange={(e) =>
                                                setData(
                                                    'supplier_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            required
                                        >
                                            <option value="" disabled>
                                                انتخاب شرکت همکار
                                            </option>
                                            {suppliers.map((supplier) => (
                                                <option
                                                    key={supplier.id}
                                                    value={supplier.id}
                                                >
                                                    {supplier.company_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError message={errors.supplier_id} />
                                </div>

                                {/* Purchase Date - Required */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        تاریخ خرید
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <AfghanDatePicker
                                            value={data.purchase_date}
                                            onChange={(value) =>
                                                setData(
                                                    'purchase_date',
                                                    value.format('YYYY/MM/DD'),
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.purchase_date}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(2)}
                                    disabled={
                                        !data.supplier_id || !data.purchase_date
                                    }
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    مرحله بعد
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Payment Information */}
                        <div
                            className={`space-y-6 ${formStep !== 2 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <DollarSign className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات پرداخت
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۲ از ۳
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Total Amount - Required */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        کل مبلغ (افغانی)
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
                                            step="100"
                                            value={data.total_amount}
                                            onChange={(e) =>
                                                handleAmountChange(
                                                    'total_amount',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="مثلاً ۵۰۰۰۰"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.total_amount} />
                                </div>

                                {/* Paid Amount */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        مبلغ پرداخت شده
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                            ؋
                                        </span>
                                        <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            min="0"
                                            step="100"
                                            value={data.paid_amount}
                                            onChange={(e) =>
                                                handleAmountChange(
                                                    'paid_amount',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="۰"
                                        />
                                    </div>
                                    <InputError message={errors.paid_amount} />
                                </div>
                            </div>

                            {/* Payment Progress */}
                            {data.total_amount > 0 && (
                                <div className="rounded-xl bg-teal-50 p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-teal-600" />
                                            <span className="text-xs font-medium text-teal-700">
                                                پیشرفت پرداخت
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-teal-700">
                                            {paymentPercentage}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-teal-200">
                                        <div
                                            className="h-full rounded-full bg-teal-600 transition-all duration-300"
                                            style={{
                                                width: `${paymentPercentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(1)}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                                >
                                    <ArrowRight className="h-4 w-4 rotate-180" />
                                    مرحله قبل
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormStep(3)}
                                    disabled={
                                        !data.total_amount ||
                                        data.total_amount <= 0
                                    }
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    مرحله بعد
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Step 3: Additional Information */}
                        <div
                            className={`space-y-6 ${formStep !== 3 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <FileText className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات تکمیلی
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۳ از ۳
                                </span>
                            </div>

                            {/* Description - Optional */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    توضیحات
                                    <span className="mr-1 text-gray-400">
                                        (اختیاری)
                                    </span>
                                </label>
                                <div className="relative">
                                    <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        rows="5"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="توضیحات اضافی درباره خرید، شرایط پرداخت و ..."
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>

                            {/* Purchase Summary */}
                            {data.supplier_id && data.total_amount > 0 && (
                                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4">
                                    <div className="flex items-center gap-2">
                                        <Receipt className="h-5 w-5 text-teal-600" />
                                        <span className="text-sm font-medium text-teal-700">
                                            خلاصه خرید
                                        </span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-500">
                                                تامین‌کننده:
                                            </span>
                                            <span className="mr-2 font-medium text-gray-800">
                                                {
                                                    suppliers.find(
                                                        (s) =>
                                                            s.id ==
                                                            data.supplier_id,
                                                    )?.company_name
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                تاریخ خرید:
                                            </span>
                                            <span className="mr-2 font-medium text-gray-800">
                                                {data.purchase_date}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                کل مبلغ:
                                            </span>
                                            <span className="mr-2 font-bold text-gray-800">
                                                {Number(
                                                    data.total_amount,
                                                ).toLocaleString()}{' '}
                                                ؋
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                پرداخت شده:
                                            </span>
                                            <span className="mr-2 font-medium text-green-600">
                                                {Number(
                                                    data.paid_amount,
                                                ).toLocaleString()}{' '}
                                                ؋
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-gray-500">
                                                باقی مانده:
                                            </span>
                                            <span className="mr-2 font-bold text-orange-600">
                                                {calculatedRemaining.toLocaleString()}{' '}
                                                ؋
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(2)}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                                >
                                    <ArrowRight className="h-4 w-4 rotate-180" />
                                    مرحله قبل
                                </button>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <SecondaryButton
                                onClick={() => window.history.back()}
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
                                        ذخیره خرید
                                    </>
                                )}
                            </PrimaryButton>
                        </div>

                        {/* Required Fields Note */}
                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>
                                فیلدهای دارای{' '}
                                <span className="text-red-500">*</span> الزامی
                                هستند
                            </span>
                        </div>
                    </form>
                </div>

                {/* Help Card */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Package className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                راهنمای ثبت خرید
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • شرکت تامین‌کننده و تاریخ خرید الزامی هستند
                                <br />
                                • مبلغ کل باید بیشتر از ۰ باشد
                                <br />
                                • مبلغ پرداخت شده می‌تواند کمتر از کل مبلغ باشد
                                <br />
                                • باقی مانده به صورت خودکار محاسبه می‌شود
                                <br />• می‌توانید توضیحات اضافی درباره خرید وارد
                                کنید
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
