import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';

import {
    AlertCircle,
    Ambulance,
    Baby,
    Briefcase,
    CheckCircle,
    DollarSign,
    Edit3,
    FlaskConical,
    History,
    Hotel,
    Phone,
    Pill,
    Save,
    Stethoscope,
    File as Tooth,
    User,
    UserCircle,
    Wrench,
} from 'lucide-react';
import { useState } from 'react';

export default function Edit({ staff }) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: staff.full_name || '',
        phone: staff.phone || '',
        role: staff.role || '',
        base_salary: staff.base_salary || '',
    });

    const [activeTab, setActiveTab] = useState('info');
    const [showSuccess, setShowSuccess] = useState(false);

    // Role configuration with icons and colors (matching Create form)
    const roleConfig = {
        doctor: {
            label: 'داکتر',
            icon: Stethoscope,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
        },
        nurse: {
            label: 'پرستار',
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
            label: 'دندان‌پزشک',
            icon: Tooth,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
        },
        emergency: {
            label: 'ایمرجنسی',
            icon: Ambulance,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
        },
        gynecology: {
            label: 'نسایی ولادی',
            icon: Baby,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
        },
        inpatient: {
            label: 'بخش بستری',
            icon: Hotel,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
        },
        service: {
            label: 'خدمات',
            icon: Wrench,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200',
        },
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('staffs.update', staff.id), {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    const selectedRole = roleConfig[data.role] || roleConfig[staff.role];

    return (
        <AuthenticatedLayout title="ویرایش پرسنل">
            <Head title="ویرایش پرسنل" />

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
                            ویرایش اطلاعات پرسنل
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            اطلاعات پرسنل را ویرایش کنید
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2">
                        <Edit3 className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                            ویرایش پرسنل
                        </span>
                    </div>
                </div>

                {/* Staff Summary Card */}
                <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <UserCircle className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold">
                                    {staff.full_name}
                                </h2>
                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                    ID: {staff.id}
                                </span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-4">
                                <div className="flex items-center gap-1.5 text-sm text-teal-100">
                                    <Briefcase className="h-4 w-4" />
                                    {selectedRole?.label || staff.role}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-teal-100">
                                    <Phone className="h-4 w-4" />
                                    {staff.phone || 'شماره ثبت نشده'}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-teal-100">
                                    <DollarSign className="h-4 w-4" />
                                    {staff.base_salary?.toLocaleString() ||
                                        '۰'}{' '}
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
                                <Edit3 className="h-5 w-5 text-teal-700" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    فرم ویرایش اطلاعات
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    اطلاعات مورد نیاز را با دقت ویرایش کنید
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <User className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات شخصی
                                </h3>
                                <span className="mr-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                    در حال ویرایش
                                </span>
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
                            </div>
                        </div>

                        {/* Role Selection Section */}
                        <div className="mt-8 space-y-6">
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Briefcase className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    نقش پرسنل
                                </h3>
                            </div>

                            {/* Current Role Indicator */}
                            {staff.role && (
                                <div className="rounded-xl bg-teal-50 p-4">
                                    <div className="flex items-center gap-2">
                                        <History className="h-4 w-4 text-teal-600" />
                                        <span className="text-sm text-gray-600">
                                            نقش فعلی:
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                                            {selectedRole?.icon && (
                                                <selectedRole.icon className="h-3.5 w-3.5" />
                                            )}
                                            {selectedRole?.label || staff.role}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Role Selection Cards */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    انتخاب نقش جدید
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
                                                className={`relative flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
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
                                                {staff.role === key &&
                                                    data.role !== key && (
                                                        <span className="absolute right-2 top-2 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                                                            فعلی
                                                        </span>
                                                    )}
                                            </button>
                                        ),
                                    )}
                                </div>
                                <InputError message={errors.role} />
                            </div>
                        </div>

                        {/* Financial Information Section */}
                        <div className="mt-8 space-y-6">
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
                            </div>

                            {/* Salary Comparison */}
                            {staff.base_salary > 0 &&
                                data.base_salary != staff.base_salary && (
                                    <div className="rounded-xl bg-amber-50 p-4">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-amber-600" />
                                            <span className="text-xs font-medium text-amber-700">
                                                تغییر حقوق پایه
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                قبلی:
                                            </span>
                                            <span className="font-medium text-gray-800">
                                                {Number(
                                                    staff.base_salary,
                                                ).toLocaleString()}{' '}
                                                افغانی
                                            </span>
                                            <span className="text-gray-600">
                                                جدید:
                                            </span>
                                            <span className="font-bold text-teal-700">
                                                {Number(
                                                    data.base_salary,
                                                ).toLocaleString()}{' '}
                                                افغانی
                                            </span>
                                        </div>
                                    </div>
                                )}
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
                                <span className="text-red-500">*</span> الزامی
                                هستند
                            </span>
                        </div>
                    </form>
                </div>

                {/* Success Toast */}
                <Transition
                    show={showSuccess}
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
                                اطلاعات پرسنل با موفقیت به‌روزرسانی شد
                            </p>
                        </div>
                    </div>
                </Transition>

                {/* Help Card */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Edit3 className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                نکات ویرایش اطلاعات
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • تغییرات فقط بر روی اطلاعات این پرسنل اعمال
                                می‌شود
                                <br />
                                • شماره تماس باید ۱۱ رقمی و با ۰۷۸۶ شروع شود
                                <br />
                                • در صورت تغییر نقش، دسترسی‌های پرسنل
                                به‌روزرسانی خواهد شد
                                <br />• تغییر حقوق پایه در محاسبات حقوق ماه
                                آینده اعمال می‌شود
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
