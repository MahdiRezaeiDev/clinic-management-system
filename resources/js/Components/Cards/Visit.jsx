import { useForm } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Baby,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    File as Female,
    FileText,
    File as Male,
    MapPin,
    Phone,
    Save,
    Stethoscope,
    User,
    UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import AfghanDatePicker from '../AfghanDatePicker';
import InputError from '../InputError';
import PrimaryButton from '../PrimaryButton';

export default function RegisterVisitCard({ doctors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        // Patient info
        patient_name: '',
        patient_phone: '',
        patient_address: '',
        patient_gender: '',
        patient_age: '',

        // Visit info
        doctor_id: '',
        visit_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        fee: '',
        description: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [formStep, setFormStep] = useState(1);

    const submit = (e) => {
        e.preventDefault();
        post(route('visits.store'), {
            onSuccess: () => {
                reset();
                setFormStep(1);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    // Calculate if form is valid for current step
    const isStepValid = () => {
        if (formStep === 1) {
            return data.patient_name && data.doctor_id;
        }
        if (formStep === 2) {
            return data.visit_date && data.fee;
        }
        return true;
    };

    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-32 w-32 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-32 w-32 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                        <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            ثبت بیمار و ویزیت
                        </h2>
                        <p className="text-xs text-teal-100">
                            اطلاعات بیمار و ویزیت جدید را وارد کنید
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3">
                <div className="flex items-center justify-center gap-2">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                            formStep >= 1
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        1
                    </div>
                    <div
                        className={`h-1 w-12 ${
                            formStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'
                        }`}
                    ></div>
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                            formStep >= 2
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        2
                    </div>
                    <div
                        className={`h-1 w-12 ${
                            formStep >= 3 ? 'bg-teal-600' : 'bg-gray-200'
                        }`}
                    ></div>
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                            formStep >= 3
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        3
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="p-6">
                {/* Step 1: Patient Information */}
                {formStep === 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <UserCircle className="h-5 w-5 text-teal-600" />
                            <h3 className="text-sm font-semibold text-gray-800">
                                اطلاعات بیمار
                            </h3>
                        </div>

                        {/* Patient Name - Required */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
                                نام بیمار
                                <span className="mr-1 text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={data.patient_name}
                                    onChange={(e) =>
                                        setData('patient_name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="نام کامل بیمار"
                                    required
                                />
                            </div>
                            <InputError message={errors.patient_name} />
                        </div>

                        {/* Patient Phone - Optional */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
                                شماره تماس
                                <span className="mr-1 text-gray-400">
                                    (اختیاری)
                                </span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    value={data.patient_phone}
                                    onChange={(e) =>
                                        setData('patient_phone', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="۰۷۸۶xxxxxx"
                                    dir="ltr"
                                />
                            </div>
                            <InputError message={errors.patient_phone} />
                        </div>

                        {/* Patient Age - Optional */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
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
                                        setData('patient_age', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="مثلاً: ۳۵ سال"
                                />
                            </div>
                            <InputError message={errors.patient_age} />
                        </div>

                        {/* Patient Gender - Optional */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
                                جنسیت
                                <span className="mr-1 text-gray-400">
                                    (اختیاری)
                                </span>
                            </label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData('patient_gender', 'male')
                                    }
                                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 p-2.5 transition-all ${
                                        data.patient_gender === 'male'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <Male
                                        className={`h-4 w-4 ${
                                            data.patient_gender === 'male'
                                                ? 'text-blue-600'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                    <span
                                        className={`text-xs font-medium ${
                                            data.patient_gender === 'male'
                                                ? 'text-blue-700'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        مرد
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData('patient_gender', 'female')
                                    }
                                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 p-2.5 transition-all ${
                                        data.patient_gender === 'female'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <Female
                                        className={`h-4 w-4 ${
                                            data.patient_gender === 'female'
                                                ? 'text-pink-600'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                    <span
                                        className={`text-xs font-medium ${
                                            data.patient_gender === 'female'
                                                ? 'text-pink-700'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        زن
                                    </span>
                                </button>
                            </div>
                            <InputError message={errors.patient_gender} />
                        </div>

                        {/* Patient Address - Optional */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
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
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="آدرس کامل بیمار"
                                />
                            </div>
                            <InputError message={errors.patient_address} />
                        </div>
                    </div>
                )}

                {/* Step 2: Visit Information */}
                {formStep === 2 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Stethoscope className="h-5 w-5 text-teal-600" />
                            <h3 className="text-sm font-semibold text-gray-800">
                                اطلاعات ویزیت
                            </h3>
                        </div>

                        {/* Doctor - Required */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
                                داکتر معالج
                                <span className="mr-1 text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Stethoscope className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={data.doctor_id}
                                    onChange={(e) =>
                                        setData('doctor_id', e.target.value)
                                    }
                                    className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    required
                                >
                                    <option value="" disabled>
                                        انتخاب داکتر
                                    </option>
                                    {doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <InputError message={errors.doctor_id} />
                        </div>

                        {/* Visit Date - Required */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
                                تاریخ ویزیت
                                <span className="mr-1 text-red-500">*</span>
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
                            <InputError message={errors.visit_date_gregorian} />
                        </div>

                        {/* Fee - Required */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
                                هزینه ویزیت (افغانی)
                                <span className="mr-1 text-red-500">*</span>
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
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
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
                            <label className="block text-xs font-medium text-gray-600">
                                زمان ویزیت
                                <span className="mr-1 text-gray-400">
                                    (اختیاری)
                                </span>
                            </label>
                            <div className="relative">
                                <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="time"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="--:--"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Additional Information */}
                {formStep === 3 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <FileText className="h-5 w-5 text-teal-600" />
                            <h3 className="text-sm font-semibold text-gray-800">
                                اطلاعات تکمیلی
                            </h3>
                        </div>

                        {/* Description - Optional */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-600">
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
                                        setData('description', e.target.value)
                                    }
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    placeholder="شرح حال بیمار، علائم، تشخیص و توصیه‌های پزشک..."
                                />
                            </div>
                            <InputError message={errors.description} />
                        </div>

                        {/* Summary Preview */}
                        {data.patient_name && data.doctor_id && data.fee && (
                            <div className="rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 p-4">
                                <div className="flex items-center gap-2 text-xs text-teal-700">
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="font-medium">
                                        خلاصه ویزیت
                                    </span>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-500">
                                            بیمار:
                                        </span>
                                        <span className="mr-1 font-medium text-gray-800">
                                            {data.patient_name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            داکتر:
                                        </span>
                                        <span className="mr-1 font-medium text-gray-800">
                                            {
                                                doctors.find(
                                                    (d) =>
                                                        d.id == data.doctor_id,
                                                )?.full_name
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            تاریخ:
                                        </span>
                                        <span className="mr-1 font-medium text-gray-800">
                                            {data.visit_date}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            هزینه:
                                        </span>
                                        <span className="mr-1 font-bold text-teal-700">
                                            {Number(data.fee).toLocaleString()}{' '}
                                            ؋
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex items-center justify-between gap-3">
                    {formStep > 1 && (
                        <button
                            type="button"
                            onClick={() => setFormStep(formStep - 1)}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
                        >
                            مرحله قبل
                        </button>
                    )}
                    {formStep < 3 ? (
                        <button
                            type="button"
                            onClick={() => setFormStep(formStep + 1)}
                            disabled={!isStepValid()}
                            className="mr-auto rounded-lg bg-teal-600 px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            مرحله بعد
                        </button>
                    ) : (
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className="mr-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-2.5 text-xs font-medium text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    در حال ثبت...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    ثبت ویزیت
                                </>
                            )}
                        </PrimaryButton>
                    )}
                </div>

                {/* Required Fields Note */}
                <div className="mt-4 flex items-center gap-1.5 text-[10px] text-gray-400">
                    <AlertCircle className="h-3 w-3" />
                    <span>
                        فیلدهای دارای <span className="text-red-500">*</span>{' '}
                        الزامی هستند
                    </span>
                </div>
            </form>

            {/* Success Toast */}
            <div
                className={`fixed bottom-6 left-6 z-50 transform transition-all duration-300 ${
                    showSuccess
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}
            >
                <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-2xl">
                    <div className="rounded-full bg-green-100 p-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-800">موفقیت!</p>
                        <p className="text-sm text-gray-600">
                            ویزیت با موفقیت ثبت شد
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
