import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

export default function Edit({ staff, salary }) {
    const { data, setData, put, processing, errors } = useForm({
        amount_paid: salary.amount_paid ? parseInt(salary.amount_paid, 10) : 0,
        salary_month: salary.salary_month || '',
        description: salary.description || '',
    });

    // Keep Jalali date separately (convert from gregorian)
    const [jalaliDate, setJalaliDate] = useState(
        salary.salary_month ? new Date(salary.salary_month) : null,
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('staffs.salary.update', [staff.id, salary.id]), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout title={`ویرایش حقوق ${staff.full_name}`}>
            <Head title="ویرایش حقوق پرسنل" />

            <div className="flex flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="relative flex w-full flex-col break-words rounded bg-white p-6 shadow-lg">
                        <div className="mb-6 flex items-center justify-between border-b pb-3">
                            <h3 className="text-blueGray-700 text-lg font-semibold">
                                ویرایش حقوق برای {staff.full_name}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Amount */}
                            <div>
                                <InputLabel value="مبلغ حقوق" />
                                <TextInput
                                    type="number"
                                    value={data.amount_paid}
                                    onChange={(e) =>
                                        setData('amount_paid', e.target.value)
                                    }
                                    className="mt-1 w-full"
                                    placeholder="مبلغ را وارد کنید"
                                />
                                <InputError message={errors.amount_paid} />
                            </div>

                            {/* Date */}
                            <div>
                                <InputLabel
                                    htmlFor="date"
                                    value="تاریخ پرداخت"
                                />
                                <DatePicker
                                    id="date"
                                    onChange={(val) => {
                                        setData(
                                            'salary_month',
                                            val
                                                .toDate()
                                                .toISOString()
                                                .split('T')[0],
                                        );
                                    }}
                                    value={jalaliDate}
                                    calendar={persian}
                                    locale={persian_fa}
                                    format="YYYY/MM/DD"
                                    containerClassName="w-full" // wrapper full width
                                    inputClass="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" // input full width
                                    placeholder="تاریخ را انتخاب کنید"
                                />
                                <InputError message={errors.salary_month} />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel value="توضیحات" />
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="توضیح کوتاه درباره پرداخت"
                                ></textarea>
                                <InputError message={errors.description} />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end gap-3">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    ذخیره تغییرات
                                </PrimaryButton>
                                <Link
                                    href={route(
                                        'staffs.salary.index',
                                        staff.id,
                                    )}
                                    className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    بازگشت
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
