import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Baby,
    Calendar,
    Clock,
    DollarSign,
    Edit3,
    File as Female,
    FileText,
    History,
    File as Male,
    MapPin,
    Phone,
    Save,
    Stethoscope,
    User,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Edit({ visit, doctors }) {
    const { data, setData, put, processing, errors } = useForm({
        patient_name: visit.patient?.full_name || '',
        patient_phone: visit.patient?.phone || '',
        patient_address: visit.patient?.address || '',
        patient_gender: visit.patient?.gender || '',
        patient_age: visit.patient?.age || '',
        doctor_id: visit.doctor_id || '',
        visit_date:
            moment(visit.visit_date).format('jYYYY/jMM/jDD') ||
            new DateObject({ calendar: persian, locale: persian_en }).format(
                'YYYY/MM/DD',
            ),
        fee: visit.fee || '',
        description: visit.description || '',
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [formStep, setFormStep] = useState(1);

    // Check if form has changes compared to original visit
    useEffect(() => {
        const hasChanges =
            data.patient_name != visit.patient?.full_name ||
            data.patient_phone != visit.patient?.phone ||
            data.patient_address != visit.patient?.address ||
            data.patient_gender != visit.patient?.gender ||
            data.patient_age != visit.patient?.age ||
            data.doctor_id != visit.doctor_id ||
            data.visit_date !=
                moment(visit.visit_date).format('jYYYY/jMM/jDD') ||
            data.fee != visit.fee ||
            data.description != visit.description;

        setHasChanges(hasChanges);
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        put(route('visits.update', visit.id));
    };

    // Gender badge for display
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
        return null;
    };

    return (
        <AuthenticatedLayout title="ویرایش ویزیت">
            <Head title="ویرایش ویزیت" />

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
                            ویرایش ویزیت
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            ویرایش اطلاعات بیمار و ویزیت
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

                {/* Original Visit Info Card */}
                <div className="mb-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                        <History className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            اطلاعات فعلی ویزیت
                        </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                        <div>
                            <span className="text-gray-500">بیمار:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {visit.patient?.full_name}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">داکتر:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {visit.doctor?.full_name}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">تاریخ:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {moment(visit.visit_date).format(
                                    'jYYYY/jMM/jDD',
                                )}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">هزینه:</span>
                            <span className="mr-1 font-bold text-teal-700">
                                {Number(visit.fee).toLocaleString()} ؋
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
                                    فرم ویرایش ویزیت
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    اطلاعات بیمار و ویزیت را ویرایش کنید
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6">
                        {/* Step 1: Patient Information */}
                        <div
                            className={`space-y-6 ${formStep !== 1 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <User className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات بیمار
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۱ از ۳
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Patient Name - Required */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        نام بیمار
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.patient_name}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="نام کامل بیمار"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.patient_name} />
                                </div>

                                {/* Patient Phone - Optional */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        شماره تماس
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.patient_phone}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_phone',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="۰۷۸۶xxxxxx"
                                            dir="ltr"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.patient_phone}
                                    />
                                </div>

                                {/* Patient Age - Optional */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        سن
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Baby className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.patient_age}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_age',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="مثلاً: ۳۵ سال"
                                        />
                                    </div>
                                    <InputError message={errors.patient_age} />
                                </div>

                                {/* Patient Gender - Optional */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        جنسیت
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    'patient_gender',
                                                    'male',
                                                )
                                            }
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                                                data.patient_gender === 'male'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Male
                                                className={`h-5 w-5 ${
                                                    data.patient_gender ===
                                                    'male'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                            <span className="text-sm font-medium">
                                                مرد
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    'patient_gender',
                                                    'female',
                                                )
                                            }
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                                                data.patient_gender === 'female'
                                                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Female
                                                className={`h-5 w-5 ${
                                                    data.patient_gender ===
                                                    'female'
                                                        ? 'text-pink-600'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                            <span className="text-sm font-medium">
                                                زن
                                            </span>
                                        </button>
                                    </div>
                                    <InputError
                                        message={errors.patient_gender}
                                    />
                                </div>

                                {/* Patient Address - Optional */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        آدرس
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.patient_address}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_address',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="آدرس کامل بیمار"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.patient_address}
                                    />
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

                        {/* Step 2: Visit Information */}
                        <div
                            className={`space-y-6 ${formStep !== 2 ? 'hidden' : ''}`}
                        >
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Stethoscope className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات ویزیت
                                </h3>
                                <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۲ از ۳
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Doctor - Required */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        داکتر معالج
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Stethoscope className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={data.doctor_id}
                                            onChange={(e) =>
                                                setData(
                                                    'doctor_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            required
                                        >
                                            <option value="" disabled>
                                                انتخاب داکتر
                                            </option>
                                            {doctors.map((doc) => (
                                                <option
                                                    key={doc.id}
                                                    value={doc.id}
                                                >
                                                    {doc.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError message={errors.doctor_id} />
                                </div>

                                {/* Visit Date - Required */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        تاریخ ویزیت
                                        <span className="mr-1 text-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <AfghanDatePicker
                                            value={data.visit_date}
                                            onChange={(value) =>
                                                setData(
                                                    'visit_date',
                                                    value.format('YYYY/MM/DD'),
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm"
                                        />
                                    </div>
                                    <InputError message={errors.visit_date} />
                                </div>

                                {/* Fee - Required */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        هزینه ویزیت (افغانی)
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
                                            value={data.fee}
                                            onChange={(e) =>
                                                setData('fee', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="۰"
                                            min="0"
                                            step="10"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.fee} />
                                </div>

                                {/* Visit Time - Optional */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        زمان ویزیت
                                        <span className="mr-1 text-gray-400">
                                            (اختیاری)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="time"
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="--:--"
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
                                    شرح حال و توضیحات
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
                                        placeholder="شرح حال بیمار، علائم، تشخیص و توصیه‌های پزشک..."
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
                                        {data.patient_name !=
                                            visit.patient?.full_name && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    نام بیمار:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {visit.patient?.full_name}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {data.patient_name}
                                                </span>
                                            </div>
                                        )}
                                        {data.doctor_id != visit.doctor_id && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    داکتر:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {visit.doctor?.full_name}
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-medium text-amber-700">
                                                    {
                                                        doctors.find(
                                                            (d) =>
                                                                d.id ==
                                                                data.doctor_id,
                                                        )?.full_name
                                                    }
                                                </span>
                                            </div>
                                        )}
                                        {data.fee != visit.fee && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    هزینه:
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {Number(
                                                        visit.fee,
                                                    ).toLocaleString()}{' '}
                                                    ؋
                                                </span>
                                                <ArrowRight className="h-3 w-3 text-amber-500" />
                                                <span className="font-bold text-amber-700">
                                                    {Number(
                                                        data.fee,
                                                    ).toLocaleString()}{' '}
                                                    ؋
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
                                نکات ویرایش ویزیت
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • تغییرات فقط بر روی این ویزیت اعمال می‌شود
                                <br />
                                • نام بیمار و داکتر معالج و هزینه ویزیت الزامی
                                است
                                <br />
                                • شماره تماس باید ۱۱ رقمی و با ۰۷۸۶ شروع شود
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
