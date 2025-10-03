import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

export default function Create({ staff }) {
    const { data, setData, post, processing, errors } = useForm({
        amount_paid: 0,
        salary_month: Date.now(),
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('staffs.salary.store', staff.id), {
            onSuccess: () => {
                setData({ amount_paid: '', salary_month: '', description: '' });
                setJalaliDate(null);
            },
        });
    };

    return (
        <AuthenticatedLayout title={`افزودن حقوق ${staff.full_name}`}>
            <Head title="افزودن حقوق پرسنل" />

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
                                <InputLabel
                                    htmlFor="amount"
                                    value="مبلغ حقوق"
                                />
                                <TextInput
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={data.amount_paid}
                                    onChange={(e) =>
                                        setData('amount_paid', e.target.value)
                                    }
                                    className="mt-1 w-full"
                                    placeholder="مبلغ را وارد کنید"
                                    min={0}
                                    max={staff.base_salary}
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
                                <InputLabel
                                    htmlFor="description"
                                    value="توضیحات"
                                />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                    ذخیره
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
