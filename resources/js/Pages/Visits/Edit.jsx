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

export default function Edit({ visit, doctors }) {
    const { data, setData, put, processing, errors } = useForm({
        // Patient info
        patient_name: visit.patient?.full_name || '',
        patient_phone: visit.patient?.phone || '',
        patient_address: visit.patient?.address || '',
        patient_gender: visit.patient?.gender || '',
        patient_age: visit.patient?.age || '',

        // Visit info
        doctor_id: visit.doctor_id || '',
        visit_date:
            moment(visit.visit_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') ||
            new DateObject({
                calendar: persian,
                locale: persian_en,
            }).format('YYYY/MM/DD'),
        fee: visit.fee || '',
        description: visit.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        const gregorianDate = moment(data.visit_date, 'jYYYY/jMM/jDD').format(
            'YYYY-MM-DD',
        );

        put(route('visits.update', visit.id), {
            data: { ...data, visit_date_gregorian: gregorianDate },
        });
    };

    const inputClass =
        'peer block w-full rounded-sm border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    return (
        <AuthenticatedLayout title="ویرایش ویزیت">
            <Head title="ویرایش ویزیت" />
            <div className="mx-auto flex max-w-2xl flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-xl">
                        <div className="rounded-t-2xl bg-gray-800 p-6">
                            <h2 className="text-xl font-bold text-white">
                                ویرایش بیمار و ویزیت
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
                                    id="patient_name"
                                    onChange={(e) =>
                                        setData('patient_name', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <label
                                    htmlFor="patient_name"
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all ${
                                        data.patient_name
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
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
                                    id="patient_phone"
                                    onChange={(e) =>
                                        setData('patient_phone', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <label
                                    htmlFor="patient_phone"
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all ${
                                        data.patient_phone
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
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
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all ${
                                        data.patient_address
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
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
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all ${
                                        data.patient_gender
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
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
                                    id="patient_age"
                                    onChange={(e) =>
                                        setData('patient_age', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <label
                                    htmlFor="patient_age"
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all ${
                                        data.patient_age
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
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
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all ${
                                        data.doctor_id
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
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
                                    className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
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
                                    onChange={(e) =>
                                        setData('fee', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <label
                                    htmlFor="fee"
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all ${
                                        data.fee
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
                                >
                                    هزینه
                                </label>
                                <InputError message={errors.fee} />
                            </div>

                            {/* Description */}
                            <div className="relative col-span-full">
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={`${inputClass} min-h-[100px]`}
                                />
                                <label
                                    htmlFor="description"
                                    className={`absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all ${
                                        data.description
                                            ? '-top-3 text-xs text-blue-500'
                                            : 'peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500'
                                    }`}
                                >
                                    شرح حال (اختیاری)
                                </label>
                                <InputError message={errors.description} />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    بروزرسانی
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
