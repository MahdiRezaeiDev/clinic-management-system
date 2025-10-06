import { useForm } from '@inertiajs/react';
import moment from 'moment-jalaali';
import AfghanDatePicker from '../AfghanDatePicker';

export default function RegisterVisitCard({ doctors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        // Patient info
        patient_name: '',
        patient_phone: '',
        patient_address: '',
        patient_gender: '',
        patient_birthdate: '', // keep as number (age)

        // Visit info
        doctor_id: '',
        visit_date: moment(), // Jalali moment
        fee: '',
        description: '',
    });
    console.log(errors);

    const submit = (e) => {
        e.preventDefault();
        post(route('visits.store'), {
            data: {
                ...data,
                visit_date: data.visit_date.format('jYYYY-jMM-jDD'), // submit as Jalali string
            },
            onSuccess: () => reset(),
        });
    };

    const inputClass =
        'peer block w-full rounded-sm border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    return (
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
                        id="patient_name"
                        onChange={(e) =>
                            setData('patient_name', e.target.value)
                        }
                        className={inputClass}
                        required
                    />
                    <label
                        htmlFor="patient_name"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        نام بیمار
                    </label>
                    {errors.patient_name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.patient_name}
                        </p>
                    )}
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
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        شماره تماس (اختیاری)
                    </label>
                </div>

                {/* Address */}
                <div className="relative">
                    <input
                        type="text"
                        value={data.patient_address}
                        id="patient_address"
                        onChange={(e) =>
                            setData('patient_address', e.target.value)
                        }
                        className={inputClass}
                    />
                    <label
                        htmlFor="patient_address"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        آدرس (اختیاری)
                    </label>
                </div>

                {/* Gender */}
                <div className="relative">
                    <select
                        value={data.patient_gender}
                        id="patient_gender"
                        onChange={(e) =>
                            setData('patient_gender', e.target.value)
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
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        جنسیت (اختیاری)
                    </label>
                </div>

                {/* Birthdate (age) */}
                <div className="relative">
                    <input
                        type="number"
                        value={data.patient_birthdate}
                        id="patient_birthdate"
                        onChange={(e) =>
                            setData('patient_birthdate', e.target.value)
                        }
                        className={inputClass}
                    />
                    <label
                        htmlFor="patient_birthdate"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-400 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        سن (اختیاری)
                    </label>
                </div>

                {/* Doctor */}
                <div className="relative">
                    <select
                        value={data.doctor_id}
                        id="doctor_id"
                        onChange={(e) => setData('doctor_id', e.target.value)}
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
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        داکتر
                    </label>
                </div>

                {/* Visit Date */}
                <div className="relative">
                    <AfghanDatePicker
                        value={data.visit_date}
                        onChange={(value) => setData('visit_date', value)}
                        className={inputClass}
                    />
                    <label
                        htmlFor="visit_date"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        تاریخ ویزیت
                    </label>
                </div>

                {/* Fee */}
                <div className="relative">
                    <input
                        type="number"
                        id="fee"
                        value={data.fee}
                        onChange={(e) => setData('fee', e.target.value)}
                        className={inputClass}
                        required
                    />
                    <label
                        htmlFor="fee"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        هزینه (افغانی)
                    </label>
                </div>

                {/* Description (full width) */}
                <div className="relative md:col-span-2">
                    <textarea
                        value={data.description}
                        id="description"
                        onChange={(e) => setData('description', e.target.value)}
                        rows={3}
                        className={inputClass}
                    />
                    <label
                        htmlFor="description"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        توضیحات
                    </label>
                </div>

                {/* Submit button (full width) */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
                    >
                        ثبت بیمار و ویزیت
                    </button>
                </div>
            </form>
        </div>
    );
}
