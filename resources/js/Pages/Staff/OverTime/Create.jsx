import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import moment from 'moment-jalaali';
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
        const date_gregorian = moment(data.date, 'jYYYY/jMM/jDD').format(
            'YYYY-MM-DD',
        );

        data.date_gregorian = date_gregorian;
        post(route('staffs.overtime.store', staff.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`اضافه‌کاری جدید - ${staff.full_name}`} />

            <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        ثبت اضافه‌کاری جدید
                    </h1>
                    <Link
                        href={route('staffs.overtime.index', staff.id)}
                        className="flex items-center text-sm text-gray-600 transition hover:text-blue-600"
                    >
                        بازگشت
                        <ArrowRight className="mr-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                    <div className="mb-6 text-sm text-gray-700">
                        <span className="font-medium">کارمند:</span>{' '}
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
                                    setData(
                                        'payment_date',
                                        val.format('YYYY/MM/DD'),
                                    )
                                }
                                placeholder="تاریخ پرداخت را انتخاب کنید"
                            />
                            <InputError message={errors.date} />
                        </div>

                        {/* Hours and Rate */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    ساعت کار
                                </label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="مثلاً 8"
                                    value={data.hours}
                                    onChange={(e) =>
                                        setData('hours', e.target.value)
                                    }
                                    className="w-full rounded-xl border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                                <InputError message={errors.hours} />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    نرخ در ساعت (افغانی)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="مثلاً 100"
                                    value={data.rate}
                                    onChange={(e) =>
                                        setData('rate', e.target.value)
                                    }
                                    className="w-full rounded-xl border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                className="w-full rounded-xl border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                className="w-full rounded-xl border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-start gap-3 pt-4">
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="bg-blueGray-700 hover:bg-blueGray-800 rounded px-6 py-2 text-sm"
                            >
                                ذخیره
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
