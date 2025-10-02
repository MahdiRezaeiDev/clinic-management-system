import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

export default function Create({ auth, staff }) {
    const { data, setData, post, processing, errors } = useForm({
        salary: '',
        date: new Date(),
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert Jalali to Gregorian date for Laravel
        const gregorianDate = data.date.toDate().toISOString().split('T')[0];

        post(route('staffs.salary.store', staff.id), {
            data: { ...data, date: gregorianDate },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="ثبت حقوق پرسنل" />

            <div className="mx-auto w-full md:px-10 md:py-16">
                <div className="flex flex-wrap pt-8">
                    <div className="mb-12 w-full px-4">
                        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
                            <div className="mb-0 flex items-center justify-between rounded-t border-0 px-4 py-3">
                                <h3 className="text-blueGray-700 text-lg font-semibold">
                                    ثبت حقوق پرسنل
                                </h3>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 p-4"
                            >
                                {/* Salary */}
                                <div>
                                    <label className="block text-sm font-medium">
                                        حقوق
                                    </label>
                                    <input
                                        type="number"
                                        value={data.salary}
                                        onChange={(e) =>
                                            setData('salary', e.target.value)
                                        }
                                        className="mt-1 w-full rounded border px-3 py-2"
                                    />
                                    {errors.salary && (
                                        <p className="text-sm text-red-500">
                                            {errors.salary}
                                        </p>
                                    )}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium">
                                        تاریخ پرداخت
                                    </label>
                                    <DatePicker
                                        value={data.date}
                                        onChange={(val) => setData('date', val)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        inputClass="mt-1 w-full rounded border px-3 py-2"
                                        format="YYYY/MM/DD"
                                    />
                                    {errors.date && (
                                        <p className="text-sm text-red-500">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium">
                                        توضیحات (اختیاری)
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 w-full rounded border px-3 py-2"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        ثبت
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
