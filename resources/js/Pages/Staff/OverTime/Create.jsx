import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import { DateObject } from 'react-multi-date-picker';

export default function Create({ staff }) {
    const { data, setData, post, processing, errors } = useForm({
        date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        hours: 0,
        rate: 0,
        total: 500,
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('staffs.overtime.store', staff.id));
    };

    return (
        <AuthenticatedLayout title="ثبت اضافه‌کاری ">
            <Head title={`اضافه‌کاری  - ${staff.full_name}`} />

            <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                    <div className="mb-6 text-sm text-gray-700">
                        <span className="ml-1 font-medium">
                            ثبت اضافه‌کاری برای:
                        </span>
                        {staff.full_name}
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Date */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                تاریخ
                            </label>
                            <AfghanDatePicker
                                id="payment_date"
                                value={data.date}
                                onChange={(val) =>
                                    setData('date', val.format('YYYY/MM/DD'))
                                }
                                placeholder="تاریخ پرداخت را انتخاب کنید"
                            />
                            <InputError message={errors.date} />
                        </div>

                        {/* Hours and Rate */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    ساعت کار (اختیاری)
                                </label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="مثلاً 8"
                                    value={data.hours}
                                    onChange={(e) =>
                                        setData('hours', e.target.value)
                                    }
                                    className="focus:border- teal-500 w-full rounded-xl border-gray-300 text-sm focus:ring-2 focus:ring-teal-700"
                                />
                                <InputError message={errors.hours} />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    نرخ در ساعت (اختیاری)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="مثلاً 100"
                                    value={data.rate}
                                    onChange={(e) =>
                                        setData('rate', e.target.value)
                                    }
                                    className="focus:border- teal-500 w-full rounded-xl border-gray-300 text-sm focus:ring-2 focus:ring-teal-700"
                                />
                                <InputError message={errors.rate} />
                            </div>
                        </div>

                        {/* Total */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                قابل پرداخت
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="مثلاً 500"
                                value={data.total}
                                onChange={(e) =>
                                    setData('total', e.target.value)
                                }
                                className="focus:border- teal-500 w-full rounded-xl border-gray-300 text-sm focus:ring-2 focus:ring-teal-700"
                            />
                            <InputError message={errors.total} />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                توضیحات
                            </label>
                            <textarea
                                rows="3"
                                placeholder="اختیاری..."
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="focus:border- teal-500 w-full border-gray-300 text-sm focus:ring-2 focus:ring-teal-700"
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-start gap-3 pt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                ذخیره
                            </PrimaryButton>
                            <SecondaryButton
                                href={route('staffs.overtime.index', staff.id)}
                                className="flex items-center text-xs text-gray-600 transition hover:text-blue-600"
                            >
                                بازگشت
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
