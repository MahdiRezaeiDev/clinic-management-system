import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle,
    Edit3,
    FileText,
    History,
    Mail,
    MapPin,
    Phone,
    Save,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Edit({ supplier }) {
    const { data, setData, put, processing, errors } = useForm({
        company_name: supplier.company_name || '',
        contact_person: supplier.contact_person || '',
        phone: supplier.phone || '',
        email: supplier.email || '',
        address: supplier.address || '',
        description: supplier.description || '',
    });

    const { flash } = usePage().props;
    const [show, setShow] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [formStep, setFormStep] = useState(1);

    useEffect(() => {
        if (flash.success) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    // Check if form has changes compared to original supplier
    useEffect(() => {
        const changes =
            data.company_name != supplier.company_name ||
            data.contact_person != supplier.contact_person ||
            data.phone != supplier.phone ||
            data.email != supplier.email ||
            data.address != supplier.address ||
            data.description != supplier.description;

        setHasChanges(changes);
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        put(route('suppliers.update', supplier.id));
    };

    return (
        <AuthenticatedLayout title="ویرایش شرکت همکار">
            <Head title={`ویرایش شرکت - ${supplier.company_name}`} />

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
                            ویرایش شرکت همکار
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ویرایش اطلاعات شرکت تامین‌کننده
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2">
                        <Edit3 className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                            در حال ویرایش
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

                {/* Original Supplier Info Card */}
                <div className="mb-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                        <History className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            اطلاعات فعلی شرکت
                        </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                        <div>
                            <span className="text-gray-500">نام شرکت:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {supplier.company_name}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">مسئول:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {supplier.contact_person || '-'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">شماره تماس:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {supplier.phone || '-'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">ایمیل:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {supplier.email || '-'}
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
                                    فرم ویرایش شرکت همکار
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    اطلاعات شرکت و مسئول مربوطه را ویرایش کنید
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        {/* Step 1: Company Information */}
                        <div
                            className={`space-y-6 ${formStep !== 1 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Building2 className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات شرکت
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۱ از ۳
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Company Name - Required */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        نام شرکت
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="company_name"
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) =>
                                                setData(
                                                    'company_name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="نام رسمی شرکت"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.company_name} />
                                </div>

                                {/* Phone - Required */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        شماره تماس
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="phone"
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="۰۷۸۶xxxxxx"
                                            dir="ltr"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.phone} />
                                </div>

                                {/* Email - Optional */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        ایمیل
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="info@company.com"
                                            dir="ltr"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Address - Required */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        آدرس
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="آدرس کامل شرکت"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.address} />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setFormStep(2)}
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                                >
                                    مرحله بعد
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Contact Person Information */}
                        <div
                            className={`space-y-6 ${formStep !== 2 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <User className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات مسئول شرکت
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۲ از ۳
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Contact Person */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        نام مسئول
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="contact_person"
                                            type="text"
                                            value={data.contact_person}
                                            onChange={(e) =>
                                                setData(
                                                    'contact_person',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="نام و نام خانوادگی"
                                            required
                                        />
                                    </div>
                                    <InputError
                                        message={errors.contact_person}
                                    />
                                </div>

                                {/* Contact Phone - Optional */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        شماره تماس مسئول
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="contact_phone"
                                            type="text"
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="۰۷۸۶xxxxxx"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                            </div>

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
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
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
                                        id="description"
                                        rows="5"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        placeholder="توضیحات اضافی درباره شرکت، محصولات، شرایط همکاری و ..."
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>

                            {/* Changes Summary */}
                            {hasChanges && (
                                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-amber-600" />
                                        <span className="text-sm font-medium text-amber-700">
                                            تغییرات اعمال شده
                                        </span>
                                    </div>
                                    <div className="mt-3 space-y-1 text-xs">
                                        {data.company_name !=
                                            supplier.company_name && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    نام شرکت:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {supplier.company_name}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {data.company_name}
                                                </span>
                                            </div>
                                        )}
                                        {data.contact_person !=
                                            supplier.contact_person && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    مسئول:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {supplier.contact_person ||
                                                        '-'}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {data.contact_person}
                                                </span>
                                            </div>
                                        )}
                                        {data.phone != supplier.phone && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    شماره تماس:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {supplier.phone || '-'}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {data.phone}
                                                </span>
                                            </div>
                                        )}
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
                                disabled={processing || !hasChanges}
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

                {/* Help Card */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-amber-50 to-teal-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Edit3 className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                نکات ویرایش شرکت
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • تغییرات فقط بر روی این شرکت اعمال می‌شود
                                <br />
                                • نام شرکت، شماره تماس و آدرس الزامی هستند
                                <br />
                                • شماره تماس باید ۱۱ رقمی و با ۰۷۸۶ شروع شود
                                <br />• دکمه ذخیره تا زمانی که تغییری اعمال
                                نکرده‌اید غیرفعال است
                            </p>
                        </div>
                    </div>
                </div>

                {/* Success Toast */}
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
                            <p className="text-sm text-gray-600">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </Transition>
            </div>
        </AuthenticatedLayout>
    );
}
