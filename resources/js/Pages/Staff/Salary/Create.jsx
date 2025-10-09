import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import { DateObject } from 'react-multi-date-picker';

const afghanMonths = [
    { value: '1', label: 'حمل' },
    { value: '2', label: 'ثور' },
    { value: '3', label: 'جوزا' },
    { value: '4', label: 'سرطان' },
    { value: '5', label: 'اسد' },
    { value: '6', label: 'سنبله' },
    { value: '7', label: 'میزان' },
    { value: '8', label: 'عقرب' },
    { value: '9', label: 'قوس' },
    { value: '10', label: 'جدی' },
    { value: '11', label: 'دلو' },
    { value: '12', label: 'حوت' },
];

export default function Create({ staff }) {
    const { data, setData, post, processing, errors } = useForm({
        base_salary: staff.base_salary || 0,
        overtime_amount: 0,
        deductions: 0,
        total_paid: 0,
        salary_month: '',
        payment_date: '',
        payment_date_gregorian: '',
        description: '',
    });

    // Auto-calculate total_paid
    useEffect(() => {
        const total =
            (parseFloat(data.base_salary) || 0) +
            (parseFloat(data.overtime_amount) || 0) -
            (parseFloat(data.deductions) || 0);
        setData('total_paid', total >= 0 ? total : 0);
    }, [data.base_salary, data.overtime_amount, data.deductions, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payment_date_gregorian = moment(
            data.visit_date,
            'jYYYY/jMM/jDD',
        ).format('YYYY-MM-DD');

        setData('payment_date_gregorian', payment_date_gregorian);

        post(route('staffs.salary.store', staff.id), {
            onSuccess: () => {
                setData({
                    base_salary: staff.base_salary || 0,
                    overtime_amount: 0,
                    deductions: 0,
                    total_paid: 0,
                    salary_month: '',
                    payment_date: new DateObject({
                        calendar: persian,
                        locale: persian_en,
                    }).format('YYYY/MM/DD'),
                    description: '',
                });
            },
        });
    };

    return (
        <AuthenticatedLayout title={`افزودن حقوق ${staff.full_name}`}>
            <Head title={`افزودن حقوق برای ${staff.full_name}`} />

            <div className="ring-blueGray-200 mx-5 mt-10 max-w-3xl rounded-2xl bg-white p-8 shadow-md ring-1 md:mx-auto">
                <div className="border-blueGray-100 mb-6 border-b pb-3">
                    <h2 className="text-blueGray-700 text-xl font-bold">
                        ثبت پرداخت حقوق
                    </h2>
                    <p className="text-blueGray-500 mt-1 text-sm">
                        برای {staff.full_name}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Grid for two columns */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Base Salary */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <InputLabel
                                htmlFor="base_salary"
                                value="حقوق پایه"
                                className="text-blueGray-600 sm:w-20"
                            />
                            <div className="relative flex-1">
                                <TextInput
                                    type="number"
                                    id="base_salary"
                                    value={data.base_salary}
                                    onChange={(e) =>
                                        setData('base_salary', e.target.value)
                                    }
                                    className="w-full pr-10"
                                    min={0}
                                />
                            </div>
                            <InputError message={errors.base_salary} />
                        </div>

                        {/* Overtime */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <InputLabel
                                htmlFor="overtime_amount"
                                value="اضافه کاری"
                                className="text-blueGray-600 sm:w-20"
                            />
                            <div className="relative flex-1">
                                <TextInput
                                    type="number"
                                    id="overtime_amount"
                                    value={data.overtime_amount}
                                    onChange={(e) =>
                                        setData(
                                            'overtime_amount',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full pr-10"
                                    min={0}
                                />
                            </div>
                            <InputError message={errors.overtime_amount} />
                        </div>

                        {/* Deductions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <InputLabel
                                htmlFor="deductions"
                                value="کسرات"
                                className="text-blueGray-600 sm:w-20"
                            />
                            <div className="relative flex-1">
                                <TextInput
                                    type="number"
                                    id="deductions"
                                    value={data.deductions}
                                    onChange={(e) =>
                                        setData('deductions', e.target.value)
                                    }
                                    className="w-full pr-10"
                                    min={0}
                                />
                            </div>
                            <InputError message={errors.deductions} />
                        </div>

                        {/* Total Paid */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <InputLabel
                                htmlFor="total_paid"
                                value="مبلغ پرداختی کل"
                                className="text-blueGray-600 sm:w-20"
                            />
                            <div className="relative flex-1">
                                <TextInput
                                    type="number"
                                    id="total_paid"
                                    value={data.total_paid}
                                    readOnly
                                    className="bg-blueGray-50 text-blueGray-700 w-full pr-10 font-semibold"
                                />
                            </div>
                        </div>

                        {/* Salary Month */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <InputLabel
                                htmlFor="salary_month"
                                value="ماه حقوق"
                                className="text-blueGray-600 sm:w-32"
                            />
                            <select
                                id="salary_month"
                                value={data.salary_month}
                                onChange={(e) =>
                                    setData('salary_month', e.target.value)
                                }
                                className="border-blueGray-200 text-blueGray-700 focus:border-blueGray-400 w-full border px-10 py-2 text-sm shadow-sm focus:ring-0"
                            >
                                <option value="">ماه را انتخاب کنید</option>
                                {afghanMonths.map((month) => (
                                    <option
                                        key={month.value}
                                        value={month.value}
                                    >
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.salary_month} />
                        </div>

                        {/* Payment Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <InputLabel
                                htmlFor="payment_date"
                                value="تاریخ پرداخت"
                                className="text-blueGray-600 sm:w-20"
                            />
                            <div className="relative flex-1">
                                <AfghanDatePicker
                                    id="payment_date"
                                    onChange={(val) =>
                                        setData(
                                            'payment_date',
                                            val
                                                .toDate()
                                                .toISOString()
                                                .split('T')[0],
                                        )
                                    }
                                    placeholder="تاریخ پرداخت را انتخاب کنید"
                                />
                            </div>
                            <InputError message={errors.payment_date} />
                        </div>
                    </div>

                    {/* Description (full width) */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                        <InputLabel
                            htmlFor="description"
                            value="توضیحات"
                            className="text-blueGray-600 pt20 sm:w-20"
                        />
                        <div className="relative flex-1">
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={3}
                                className="border-blueGray-200 text-blueGray-700 placeholder-blueGray-400 focus:border-blueGray-400 w-full resize-none rounded-xl border px-3 py-2 shadow-sm focus:ring-0"
                                placeholder="توضیحات مربوط به پرداخت..."
                            />
                        </div>
                        <InputError message={errors.description} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            href={route('staffs.salary.index', staff.id)}
                            className="border-blueGray-300 text-blueGray-600 hover:bg-blueGray-50 rounded-xl border px-4 py-2 transition"
                        >
                            بازگشت
                        </Link>
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className="bg-blueGray-700 hover:bg-blueGray-800 rounded-xl px-6 py-2"
                        >
                            ذخیره
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
