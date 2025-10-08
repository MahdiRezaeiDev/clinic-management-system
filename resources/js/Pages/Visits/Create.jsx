import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import moment from 'moment-jalaali';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Create({ doctors }) {
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

    const submit = (e) => {
        e.preventDefault();

        // Convert Jalali to Gregorian
        const gregorianDate = moment(data.visit_date, 'jYYYY/jMM/jDD').format(
            'YYYY-MM-DD',
        );
        const formData = { ...data, visit_date_gregorian: gregorianDate };

        post(route('visits.store'), {
            onSuccess: () => {
                // Reset only patient info and visit info, keep doctor selected
                reset(
                    'patient_name',
                    'patient_phone',
                    'patient_address',
                    'patient_gender',
                    'patient_age',
                    'visit_date',
                    'fee',
                    'description',
                );
            },
        });
    };

    const inputClass =
        'peer block w-full rounded-sm border border-gray-300 px-3 pt-5 pb-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    const labelClass =
        'absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500';

    return (
        <AuthenticatedLayout title="ثبت ویزیت">
            <Head title="ثبت ویزیت" />
            <div className="mx-auto flex max-w-2xl flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-xl">
                        <div className="rounded-t-2xl bg-gray-800 p-6">
                            <h2 className="text-xl font-bold text-white">
                                ثبت بیمار و ویزیت
                            </h2>
                        </div>

                        <form
                            onSubmit={submit}
                            className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2"
                        >
                            {/* Patient Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data.patient_name}
                                    placeholder=" "
                                    id="patient_name"
                                    onChange={(e) =>
                                        setData('patient_name', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <label
                                    htmlFor="patient_name"
                                    className={labelClass}
                                >
                                    نام بیمار
                                </label>
                                <InputError message={errors.patient_name} />
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <input
                                    type="tel"
                                    value={data.patient_phone}
                                    placeholder=" "
                                    id="patient_phone"
                                    onChange={(e) =>
                                        setData('patient_phone', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <label
                                    htmlFor="patient_phone"
                                    className={labelClass}
                                >
                                    شماره تماس (اختیاری)
                                </label>
                                <InputError message={errors.patient_phone} />
                            </div>

                            {/* Address */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data.patient_address}
                                    placeholder=" "
                                    id="patient_address"
                                    onChange={(e) =>
                                        setData(
                                            'patient_address',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                                <label
                                    htmlFor="patient_address"
                                    className={labelClass}
                                >
                                    آدرس (اختیاری)
                                </label>
                                <InputError message={errors.patient_address} />
                            </div>

                            {/* Gender */}
                            <div className="relative">
                                <select
                                    value={data.patient_gender}
                                    id="patient_gender"
                                    onChange={(e) =>
                                        setData(
                                            'patient_gender',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option value="" disabled hidden />
                                    <option value="male">مرد</option>
                                    <option value="female">زن</option>
                                    <option value="other">دیگر</option>
                                </select>
                                <label
                                    htmlFor="patient_gender"
                                    className={labelClass}
                                >
                                    جنسیت (اختیاری)
                                </label>
                                <InputError message={errors.patient_gender} />
                            </div>

                            {/* Age */}
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.patient_age}
                                    placeholder=" "
                                    id="patient_age"
                                    onChange={(e) =>
                                        setData('patient_age', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <label
                                    htmlFor="patient_age"
                                    className={labelClass}
                                >
                                    سن (اختیاری)
                                </label>
                                <InputError message={errors.patient_age} />
                            </div>

                            {/* Doctor */}
                            <div className="relative">
                                <select
                                    value={data.doctor_id}
                                    id="doctor_id"
                                    onChange={(e) =>
                                        setData('doctor_id', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                >
                                    <option value="" disabled hidden />
                                    {doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.full_name}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="doctor_id"
                                    className={labelClass}
                                >
                                    داکتر
                                </label>
                                <InputError message={errors.doctor_id} />
                            </div>

                            {/* Visit Date */}
                            <div className="relative">
                                <AfghanDatePicker
                                    value={data.visit_date}
                                    id="visit_date"
                                    onChange={(value) =>
                                        setData(
                                            'visit_date',
                                            value.format('YYYY/MM/DD'),
                                        )
                                    }
                                />
                                <label
                                    htmlFor="visit_date"
                                    className={labelClass}
                                >
                                    تاریخ ویزیت
                                </label>
                                <InputError
                                    message={errors.visit_date_gregorian}
                                />
                            </div>

                            {/* Fee */}
                            <div className="relative">
                                <input
                                    type="number"
                                    id="fee"
                                    value={data.fee}
                                    placeholder=" "
                                    onChange={(e) =>
                                        setData('fee', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <label htmlFor="fee" className={labelClass}>
                                    هزینه
                                </label>
                            </div>

                            {/* Description */}
                            <div className="relative col-span-full">
                                <textarea
                                    id="description"
                                    value={data.description}
                                    placeholder=" "
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={`${inputClass} min-h-[100px]`}
                                />
                                <label
                                    htmlFor="description"
                                    className={labelClass}
                                >
                                    شرح حال (اختیاری)
                                </label>
                                <InputError message={errors.description} />
                            </div>

                            {/* Buttons */}
                            <div className="col-span-full flex items-center gap-3">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    ذخیره
                                </PrimaryButton>
                                <SecondaryButton
                                    onClick={() => window.history.back()}
                                >
                                    بازگشت
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
