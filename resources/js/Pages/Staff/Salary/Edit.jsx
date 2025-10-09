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

export default function Edit({ staff, salary, overTimes }) {
    // اضافه‌کاری‌هایی که مربوط به همین حقوق هستند باید تیک‌خورده باشند
    const preSelectedOvertimes = overTimes
        .filter((ot) => ot.salary_id === salary.id)
        .map((ot) => ot.id);

    // محاسبه مجموع اولیه اضافه‌کاری‌ها
    const totalInitialOvertime = overTimes
        .filter((ot) => ot.salary_id === salary.id)
        .reduce((sum, ot) => sum + parseFloat(ot.total || 0), 0);

    const { data, setData, put, processing, errors } = useForm({
        base_salary: salary.base_salary || staff.base_salary || 0,
        overtime_amount: totalInitialOvertime,
        deductions: salary.deductions || 0,
        total_paid: salary.total_paid,
        salary_month: salary.salary_month || '',
        payment_date: salary.payment_date
            ? new DateObject({
                  date: salary.payment_date,
                  calendar: persian,
                  locale: persian_en,
              }).format('YYYY/MM/DD')
            : new DateObject({ calendar: persian, locale: persian_en }).format(
                  'YYYY/MM/DD',
              ),
        payment_date_gregorian: salary.payment_date_gregorian || '',
        description: salary.description || '',
        selectedOvertimes: preSelectedOvertimes,
    });

    const toggleOvertime = (id, amount) => {
        const selected = [...data.selectedOvertimes];
        const isSelected = selected.includes(id);
        const amountNum = parseFloat(amount);

        let newSelected = [];
        let newOvertime = parseFloat(data.overtime_amount) || 0;
        let newTotalPaid = parseFloat(data.total_paid) || 0;

        if (isSelected) {
            newSelected = selected.filter((sid) => sid !== id);
            newOvertime -= amountNum;
            newTotalPaid -= amountNum;
        } else {
            newSelected = [...selected, id];
            newOvertime += amountNum;
            newTotalPaid += amountNum;
        }

        setData({
            ...data,
            selectedOvertimes: newSelected,
            overtime_amount: newOvertime >= 0 ? newOvertime : 0,
            total_paid: newTotalPaid >= 0 ? newTotalPaid : 0,
        });
    };

    const handleDeductionChange = (value) => {
        const deduction = parseFloat(value) || 0;
        const base = parseFloat(data.base_salary) || 0;
        const overtime = parseFloat(data.overtime_amount) || 0;

        setData({
            ...data,
            deductions: deduction,
            total_paid: base + overtime - deduction,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payment_date_gregorian = moment(
            data.payment_date,
            'jYYYY/jMM/jDD',
        ).format('YYYY-MM-DD');

        data.payment_date_gregorian = payment_date_gregorian;

        put(route('staffs.salary.update', [staff.id, salary.id]), {
            data: {
                ...data,
                payment_date_gregorian,
            },
        });
    };

    return (
        <AuthenticatedLayout title={`ویرایش حقوق ${staff.full_name}`}>
            <Head title={`ویرایش حقوق ${staff.full_name}`} />

            <div className="mx-5 mt-10 max-w-3xl md:mx-auto">
                {overTimes.length > 0 && (
                    <div className="ring-blueGray-200 rounded-2xl bg-white p-6 shadow-md ring-1">
                        <h3 className="text-blueGray-700 mb-2 font-semibold">
                            اضافه‌کاری‌ها
                        </h3>
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
                                {overTimes.map((ot) => (
                                    <tr
                                        key={ot.id}
                                        className={`${
                                            ot.salary_id === salary.id
                                                ? 'bg-green-50'
                                                : ''
                                        } hover:bg-blueGray-50`}
                                    >
                                        <td className="px-4 py-2 text-sm">
                                            <Checkbox
                                                checked={data.selectedOvertimes.includes(
                                                    ot.id,
                                                )}
                                                onChange={() =>
                                                    toggleOvertime(
                                                        ot.id,
                                                        ot.total,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-sm">
                                            {ot.date}
                                        </td>
                                        <td className="px-4 py-2 text-sm">
                                            {ot.total}
                                        </td>
                                        <td className="px-4 py-2 text-sm">
                                            {ot.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="ring-blueGray-200 mt-6 rounded-2xl bg-white p-8 shadow-md ring-1">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <InputLabel value="حقوق پایه" />
                                <TextInput
                                    type="number"
                                    value={data.base_salary}
                                    onChange={(e) =>
                                        setData(
                                            'base_salary',
                                            parseFloat(e.target.value) || 0,
                                        )
                                    }
                                    className="w-full"
                                />
                                <InputError message={errors.base_salary} />
                            </div>

                            <div>
                                <InputLabel value="مبلغ اضافه‌کاری" />
                                <TextInput
                                    type="number"
                                    readOnly
                                    value={data.overtime_amount}
                                    className="bg-blueGray-50 w-full"
                                />
                                <InputError message={errors.overtime_amount} />
                            </div>

                            <div>
                                <InputLabel value="کسرات" />
                                <TextInput
                                    type="number"
                                    value={data.deductions}
                                    onChange={(e) =>
                                        handleDeductionChange(e.target.value)
                                    }
                                    className="w-full"
                                />
                                <InputError message={errors.deductions} />
                            </div>

                            <div>
                                <InputLabel value="مبلغ کل پرداختی" />
                                <TextInput
                                    type="number"
                                    readOnly
                                    value={data.total_paid}
                                    className="bg-blueGray-50 w-full font-semibold"
                                />
                                <InputError message={errors.total_paid} />
                            </div>

                            <div>
                                <InputLabel value="ماه حقوق" />
                                <select
                                    value={data.salary_month}
                                    onChange={(e) =>
                                        setData('salary_month', e.target.value)
                                    }
                                    className="border-blueGray-200 focus:border-blueGray-400 w-full border px-10 py-2 text-sm shadow-sm focus:ring-0"
                                >
                                    <option value="">انتخاب ماه</option>
                                    {afghanMonths.map((m) => (
                                        <option key={m.value} value={m.value}>
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.salary_month} />
                            </div>

                            <div>
                                <InputLabel value="تاریخ پرداخت" />
                                <AfghanDatePicker
                                    value={data.payment_date}
                                    onChange={(val) =>
                                        setData(
                                            'payment_date',
                                            val.format('YYYY/MM/DD'),
                                        )
                                    }
                                />
                                <InputError message={errors.payment_date} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="توضیحات" />
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={3}
                                className="border-blueGray-200 focus:border-blueGray-400 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-0"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="flex justify-start gap-3 pt-4">
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="bg-blueGray-700 hover:bg-blueGray-800 rounded px-6 py-2 text-sm"
                            >
                                ذخیره تغییرات
                            </PrimaryButton>
                            <Link
                                href={route('staffs.salary.index', staff.id)}
                                className="border-blueGray-300 text-blueGray-600 hover:bg-blueGray-50 rounded border px-4 py-2 text-sm transition"
                            >
                                بازگشت
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
