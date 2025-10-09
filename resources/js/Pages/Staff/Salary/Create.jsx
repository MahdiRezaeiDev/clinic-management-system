import AfghanDatePicker from '@/Components/AfghanDatePicker';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import moment from 'moment-jalaali';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

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

export default function Create({ staff, unpaidOvertimes }) {
    const { data, setData, post, processing, errors } = useForm({
        base_salary: staff.base_salary || 0,
        overtime_amount: 0,
        deductions: 0,
        total_paid: staff.base_salary || 0,
        salary_month: '',
        payment_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),

        payment_date_gregorian: '',
        description: '',
        selectedOvertimes: [],
    });

    // Toggle overtime selection
    const toggleOvertime = (id, amount) => {
        const selected = [...data.selectedOvertimes];
        let newSelected, newOvertimeAmount, newTotalPaid;

        amount = parseFloat(amount);

        if (selected.includes(id)) {
            newSelected = selected.filter((i) => i !== id);
            newOvertimeAmount =
                (parseFloat(data.overtime_amount) || 0) - amount;
            newTotalPaid = (parseFloat(data.total_paid) || 0) - amount;
        } else {
            newSelected = [...selected, id];
            newOvertimeAmount =
                (parseFloat(data.overtime_amount) || 0) + amount;
            newTotalPaid = (parseFloat(data.total_paid) || 0) + amount;
        }

        setData({
            ...data,
            selectedOvertimes: newSelected,
            overtime_amount: newOvertimeAmount,
            total_paid: newTotalPaid >= 0 ? newTotalPaid : 0,
        });
    };

    console.log(errors);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payment_date_gregorian = moment(
            data.payment_date,
            'jYYYY/jMM/jDD',
        ).format('YYYY-MM-DD');

        data.payment_date_gregorian = payment_date_gregorian;

        post(route('staffs.salary.store', staff.id), {
            onSuccess: () => {
                setData({
                    base_salary: staff.base_salary || 0,
                    overtime_amount: 0,
                    deductions: 0,
                    total_paid: 0,
                    salary_month: '',
                    payment_date: '',
                    description: '',
                    selectedOvertimes: [],
                });
            },
        });
    };

    return (
        <AuthenticatedLayout title={`افزودن حقوق ${staff.full_name}`}>
            <Head title={`افزودن حقوق برای ${staff.full_name}`} />

            <div className="mx-5 mt-10 max-w-3xl md:mx-auto">
                {/* Unpaid Overtime Table */}
                {unpaidOvertimes.length > 0 && (
                    <div className="ring-blueGray-200 mb-6 rounded-2xl bg-white p-6 shadow-md ring-1">
                        <h3 className="text-blueGray-700 mb-2 font-semibold">
                            اضافه‌کاری‌های پرداخت نشده
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="divide-blueGray-200 min-w-full divide-y border">
                                <thead className="bg-blueGray-600 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-right text-sm">
                                            انتخاب
                                        </th>
                                        <th className="px-4 py-2 text-right text-sm">
                                            تاریخ
                                        </th>
                                        <th className="px-4 py-2 text-right text-sm">
                                            مقدار
                                        </th>
                                        <th className="px-4 py-2 text-right text-sm">
                                            توضیحات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-blueGray-200 divide-y">
                                    {unpaidOvertimes.map((overTime) => (
                                        <tr
                                            key={overTime.id}
                                            className="hover:bg-blueGray-50"
                                        >
                                            <td className="text-smr px-4 py-2">
                                                <Checkbox
                                                    checked={data.selectedOvertimes.includes(
                                                        overTime.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleOvertime(
                                                            overTime.id,
                                                            overTime.total,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                {overTime.date}
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                {overTime.total}
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                {overTime.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Salary Form */}
                <div className="ring-blueGray-200 rounded-2xl bg-white p-8 shadow-md ring-1">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Base Salary */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <InputLabel
                                    htmlFor="base_salary"
                                    value="حقوق پایه"
                                    className="text-blueGray-600 sm:w-20"
                                />
                                <div className="flex-1">
                                    <TextInput
                                        type="number"
                                        id="base_salary"
                                        value={data.base_salary}
                                        onChange={(e) =>
                                            setData(
                                                'base_salary',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full pr-10"
                                        min={0}
                                    />
                                    <InputError message={errors.base_salary} />
                                </div>
                            </div>

                            {/* Overtime Amount (readonly) */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <InputLabel
                                    htmlFor="overtime_amount"
                                    value="اضافه کاری"
                                    className="text-blueGray-600 sm:w-20"
                                />
                                <div className="flex-1">
                                    <TextInput
                                        type="number"
                                        id="overtime_amount"
                                        value={data.overtime_amount}
                                        readOnly
                                        className="bg-blueGray-50 text-blueGray-700 w-full pr-10"
                                    />
                                    <InputError
                                        message={errors.overtime_amount}
                                    />
                                </div>
                            </div>

                            {/* Deductions */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <InputLabel
                                    htmlFor="deductions"
                                    value="کسرات"
                                    className="text-blueGray-600 sm:w-20"
                                />
                                <div className="flex-1">
                                    <TextInput
                                        type="number"
                                        id="deductions"
                                        value={data.deductions}
                                        onChange={(e) =>
                                            setData(
                                                'deductions',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full pr-10"
                                        min={0}
                                    />
                                    <InputError message={errors.deductions} />
                                </div>
                            </div>

                            {/* Total Paid */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <InputLabel
                                    htmlFor="total_paid"
                                    value="مبلغ پرداختی کل"
                                    className="text-blueGray-600 sm:w-20"
                                />
                                <div className="flex-1">
                                    <TextInput
                                        type="number"
                                        id="total_paid"
                                        value={data.total_paid}
                                        readOnly
                                        className="bg-blueGray-50 text-blueGray-700 w-full pr-10 font-semibold"
                                    />
                                    <InputError message={errors.total_paid} />
                                </div>
                            </div>

                            {/* Salary Month */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <InputLabel
                                    htmlFor="salary_month"
                                    value="ماه حقوق"
                                    className="text-blueGray-600 sm:w-20"
                                />
                                <div className="flex-1">
                                    <select
                                        id="salary_month"
                                        value={data.salary_month}
                                        onChange={(e) =>
                                            setData(
                                                'salary_month',
                                                e.target.value,
                                            )
                                        }
                                        className="border-blueGray-200 text-blueGray-700 focus:border-blueGray-400 w-full border px-10 py-2 text-sm shadow-sm focus:ring-0"
                                    >
                                        <option value="">
                                            ماه را انتخاب کنید
                                        </option>
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
                            </div>

                            {/* Payment Date */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <InputLabel
                                    htmlFor="payment_date"
                                    value="تاریخ پرداخت"
                                    className="text-blueGray-600 sm:w-20"
                                />
                                <div className="flex-1">
                                    <AfghanDatePicker
                                        id="payment_date"
                                        value={data.payment_date}
                                        onChange={(val) =>
                                            setData(
                                                'payment_date',
                                                val.format('YYYY/MM/DD'),
                                            )
                                        }
                                        placeholder="تاریخ پرداخت را انتخاب کنید"
                                    />
                                    <InputError message={errors.payment_date} />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                            <InputLabel
                                htmlFor="description"
                                value="توضیحات"
                                className="text-blueGray-600 pt-2 sm:w-20"
                            />
                            <div className="flex-1">
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows={3}
                                    className="border-blueGray-200 text-blueGray-700 placeholder-blueGray-400 focus:border-blueGray-400 w-full resize-none rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-0"
                                    placeholder="توضیحات مربوط به پرداخت..."
                                />
                                <InputError message={errors.description} />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-start gap-3 pt-4">
                            <Link
                                href={route('staffs.salary.index', staff.id)}
                                className="border-blueGray-300 text-blueGray-600 hover:bg-blueGray-50 rounded border px-4 py-2 text-sm transition"
                            >
                                بازگشت
                            </Link>
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
