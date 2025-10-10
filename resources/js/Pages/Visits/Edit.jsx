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
        patient_name: visit.patient?.full_name || '',
        patient_phone: visit.patient?.phone || '',
        patient_address: visit.patient?.address || '',
        patient_gender: visit.patient?.gender || '',
        patient_age: visit.patient?.age || '',
        doctor_id: visit.doctor_id || '',
        visit_date:
            moment(visit.visit_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') ||
            new DateObject({ calendar: persian, locale: persian_en }).format(
                'YYYY/MM/DD',
            ),
        fee: visit.fee || '',
        description: visit.description || '',
    });

    const submit = (e) => {
        e.preventDefault();

        const gregorianDate = moment(data.visit_date, 'jYYYY/jMM/jDD').format(
            'YYYY-MM-DD',
        );
        data.visit_date_gregorian = gregorianDate;
        put(route('visits.update', visit.id));
    };

    const inputClass =
        'peer block w-full rounded-sm border border-gray-300 px-3 pt-5 pb-2 text-gray-700 placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    const labelClass =
        'absolute left-3 top-2 bg-white px-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-blue-500';

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
                                    placeholder="نام بیمار"
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

                            {/* Patient Phone */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data.patient_phone}
                                    id="patient_phone"
                                    placeholder="شماره تماس"
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

                            {/* Patient Address */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data.patient_address}
                                    id="patient_address"
                                    placeholder="آدرس"
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

                            {/* Patient Gender */}
                            <div className="relative">
                                <select
                                    value={data.patient_gender}
                                    id="patient_gender"
                                    placeholder="جنسیت"
                                    onChange={(e) =>
                                        setData(
                                            'patient_gender',
                                            e.target.value,
                                        )
                                    }
                                    className="focus:ring-blue-400' peer block w-full rounded-sm border border-gray-300 px-10 text-gray-700 placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2"
                                >
                                    <option value="" disabled hidden />
                                    <option value="male">مرد</option>
                                    <option value="female">زن</option>
                                </select>
                                <label
                                    htmlFor="patient_gender"
                                    className={labelClass}
                                >
                                    جنسیت (اختیاری)
                                </label>
                                <InputError message={errors.patient_gender} />
                            </div>

                            {/* Patient Age */}
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.patient_age}
                                    id="patient_age"
                                    placeholder="سن"
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
                                    placeholder="داکتر"
                                    onChange={(e) =>
                                        setData('doctor_id', e.target.value)
                                    }
                                    className="focus:ring-blue-400' peer block w-full rounded-sm border border-gray-300 px-10 text-gray-700 placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2"
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
                                    placeholder="تاریخ ویزیت"
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
                                    value={data.fee}
                                    id="fee"
                                    placeholder="هزینه"
                                    onChange={(e) =>
                                        setData('fee', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <label htmlFor="fee" className={labelClass}>
                                    هزینه
                                </label>
                                <InputError message={errors.fee} />
                            </div>

                            {/* Description */}
                            <div className="relative col-span-full">
                                <textarea
                                    value={data.description}
                                    id="description"
                                    placeholder="شرح حال"
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
