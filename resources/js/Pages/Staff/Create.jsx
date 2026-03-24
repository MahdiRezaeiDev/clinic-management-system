import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Ambulance,
    ArrowLeft,
    ArrowRight,
    Baby,
    Briefcase,
    CheckCircle,
    DollarSign,
    FlaskConical,
    Hotel,
    Phone,
    Pill,
    Save,
    Stethoscope,
    File as Tooth,
    User,
    UserPlus,
    Wrench,
} from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        phone: '',
        role: '',
        base_salary: 0,
    });

    const [formStep, setFormStep] = useState(1);

    const submit = (e) => {
        e.preventDefault();
        post(route('staffs.store'), {
            onSuccess: () => reset(),
        });
    };

    // Role configuration with icons and colors
    const roleConfig = {
        doctor: {
            label: 'داکتر',
            icon: Stethoscope,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
        },
        nurse: {
            label: 'نرس',
            icon: Briefcase,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
        },
        pharmacist: {
            label: 'فارمسیست',
            icon: Pill,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
        },
        lab: {
            label: 'لابراتوار',
            icon: FlaskConical,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
        },
        dentist: {
            label: 'دندانپزشک',
            icon: Tooth,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
        },
        emergency: {
            label: 'عاجل',
            icon: Ambulance,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
        },
        gynecology: {
            label: 'نسایی',
            icon: Baby,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
        },
        inpatient: {
            label: 'بستری',
            icon: Hotel,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
        },
        service: {
            label: 'خدمات / سایر',
            icon: Wrench,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200',
        },
    };

    return (
        <AuthenticatedLayout title="افزودن پرسنل جدید">
            <Head title="افزودن پرسنل جدید" />

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
                            افزودن پرسنل جدید
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            اطلاعات پرسنل جدید را وارد کنید
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2">
                        <UserPlus className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                            فرم ثبت پرسنل
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
                                <UserPlus className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    فرم افزودن پرسنل جدید
                                </h2>
                                <p className="mt-1 text-sm text-teal-100">
                                    اطلاعات مورد نیاز را با دقت وارد کنید
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        {/* Step 1: Personal Information */}
                        <div
                            className={`space-y-6 ${formStep !== 1 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <User className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات شخصی
                                </h3>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    نام و نام خانوادگی
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) =>
                                            setData('full_name', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="مثال: علی محمدی"
                                    />
                                </div>
                                <InputError message={errors.full_name} />
                                <p className="text-xs text-gray-500">
                                    نام و نام خانوادگی کامل وارد کنید
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    شماره تماس
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="مثال: ۰۷۸۶xxxxxx"
                                        dir="ltr"
                                    />
                                </div>
                                <InputError message={errors.phone} />
                                <p className="text-xs text-gray-500">
                                    شماره تماس معتبر وارد کنید
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(2)}
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                                >
                                    مرحله بعد
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Role Selection */}
                        <div
                            className={`space-y-6 ${formStep !== 2 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Briefcase className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    انتخاب نقش
                                </h3>
                            </div>

                            {/* Role Selection Cards */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    نقش پرسنل
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                    {Object.entries(roleConfig).map(
                                        ([
                                            key,
                                            {
                                                label,
                                                icon: Icon,
                                                color,
                                                bgColor,
                                                borderColor,
                                            },
                                        ]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() =>
                                                    setData('role', key)
                                                }
                                                className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                                                    data.role === key
                                                        ? `${borderColor} ${bgColor} border-2 shadow-md`
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div
                                                    className={`rounded-lg p-2 ${bgColor}`}
                                                >
                                                    <Icon
                                                        className={`h-6 w-6 ${color}`}
                                                    />
                                                </div>
                                                <span
                                                    className={`mt-2 text-xs font-medium ${color}`}
                                                >
                                                    {label}
                                                </span>
                                                {data.role === key && (
                                                    <CheckCircle className="absolute left-2 top-2 h-4 w-4 text-teal-600" />
                                                )}
                                            </button>
                                        ),
                                    )}
                                </div>
                                <InputError message={errors.role} />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(1)}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                    مرحله قبل
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormStep(3)}
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                                >
                                    مرحله بعد
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Step 3: Financial Information */}
                        <div
                            className={`space-y-6 ${formStep !== 3 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <DollarSign className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات مالی
                                </h3>
                            </div>

                            {/* Base Salary */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    حقوق پایه (افغانی)
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <input
                                        type="number"
                                        value={data.base_salary}
                                        onChange={(e) =>
                                            setData(
                                                'base_salary',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="۰"
                                        min="0"
                                        step="1000"
                                    />
                                </div>
                                <InputError message={errors.base_salary} />
                                <p className="text-xs text-gray-500">
                                    حقوق پایه ماهیانه را به افغانی وارد کنید
                                </p>
                            </div>

                            {/* Salary Preview */}
                            {data.base_salary > 0 && (
                                <div className="rounded-xl bg-teal-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            حقوق پایه:
                                        </span>
                                        <span className="text-lg font-bold text-teal-700">
                                            {Number(
                                                data.base_salary,
                                            ).toLocaleString()}
                                            <span className="mr-1 text-sm font-normal">
                                                افغانی
                                            </span>
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            پرداخت ماهیانه:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {Number(
                                                data.base_salary,
                                            ).toLocaleString()}{' '}
                                            افغانی
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(2)}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                                >
                                    <ArrowLeft className="h-4 w-4 rotate-180" />
                                    مرحله قبل
                                </button>
                            </div>
                        </div>

                        {/* Form Summary */}
                        {formStep === 3 && data.full_name && data.role && (
                            <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/50 p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-teal-600" />
                                    <span className="text-sm font-medium text-teal-700">
                                        خلاصه اطلاعات وارد شده
                                    </span>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">
                                            نام:
                                        </span>
                                        <span className="mr-2 font-medium text-gray-800">
                                            {data.full_name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            شماره تماس:
                                        </span>
                                        <span className="mr-2 font-medium text-gray-800">
                                            {data.phone || '-'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            نقش:
                                        </span>
                                        <span className="mr-2 font-medium text-gray-800">
                                            {roleConfig[data.role]?.label ||
                                                data.role}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            حقوق پایه:
                                        </span>
                                        <span className="mr-2 font-medium text-gray-800">
                                            {data.base_salary > 0
                                                ? `${Number(data.base_salary).toLocaleString()} ؋`
                                                : '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <SecondaryButton
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm"
                            >
                                انصراف
                            </SecondaryButton>
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
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
                                        ذخیره پرسنل
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
                            <UserPlus className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                راهنمای ثبت پرسنل
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • نام و نام خانوادگی باید کامل و دقیق وارد شود
                                <br />
                                • شماره تماس باید ۱۱ رقمی و با ۰۷۸۶ شروع شود
                                <br />
                                • نقش پرسنل را با دقت انتخاب کنید
                                <br />• حقوق پایه باید حداقل ۵۰۰۰ افغانی باشد
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
