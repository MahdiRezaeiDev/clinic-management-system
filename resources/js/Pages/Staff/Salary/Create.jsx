import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

export default function Create({ auth, staff }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        date: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert Persian date to Gregorian for backend
        const gregorianDate = data.date
            ? data.date.toDate().toISOString().split('T')[0]
            : '';

        post(route('staffs.salary.store', staff.id), {
            data: { ...data, date: gregorianDate },
            onSuccess: () => {
                // optionally reset form
                setData({ amount: '', date: '', description: '' });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={`افزودن حقوق ${staff.full_name}`}
        >
            <Head title="افزودن حقوق پرسنل" />

            <div className="mx-auto w-full md:px-10 md:py-16">
                <div className="flex flex-wrap pt-8">
                    <div className="mb-12 w-full px-4">
                        <div className="relative flex w-full flex-col break-words rounded bg-white p-6 shadow-lg">
                            <div className="mb-6 flex items-center justify-between border-b pb-3">
                                <h3 className="text-blueGray-700 text-lg font-semibold">
                                    افزودن حقوق برای {staff.full_name}
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Amount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        مبلغ حقوق
                                    </label>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData('amount', e.target.value)
                                        }
                                        className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="مبلغ را وارد کنید"
                                    />
                                    {errors.amount && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        تاریخ پرداخت
                                    </label>
                                    <DatePicker
                                        value={data.date}
                                        onChange={(val) => setData('date', val)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        format="YYYY/MM/DD"
                                        render={(value, openCalendar) => (
                                            <input
                                                onFocus={openCalendar}
                                                value={value}
                                                readOnly
                                                placeholder="تاریخ را انتخاب کنید"
                                                className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        )}
                                    />
                                    {errors.date && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        توضیحات
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="توضیح کوتاه درباره پرداخت"
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        ذخیره
                                    </button>
                                    <a
                                        href={route(
                                            'staffs.salary.index',
                                            staff.id,
                                        )}
                                        className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        بازگشت
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
