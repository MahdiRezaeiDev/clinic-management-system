import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Purchase({ suppliers }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        supplier_id: '',
        total_amount: '',
        paid_amount: '',
        remaining_amount: '',
        purchase_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'), // default today
        description: '',
        status: 'unpaid',
        user_id: 1,
    });

    console.log(errors);

    const submit = (e) => {
        e.preventDefault();
        post(route('medicine.store'), {
            onSuccess: () => reset(),
        });
    };

    // Auto calculate remaining
    const handleAmountChange = (field, value) => {
        setData(field, value);
        const total =
            parseFloat(field === 'total_amount' ? value : data.total_amount) ||
            0;
        const paid =
            parseFloat(field === 'paid_amount' ? value : data.paid_amount) || 0;
        setData('remaining_amount', total - paid);
    };

    const inputClass =
        'peer block w-full rounded-md border border-gray-300 bg-white px-9 py-2.5 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition';

    return (
        <AuthenticatedLayout title="ثبت خرید جدید">
            <Head title="ثبت خرید جدید" />
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-8 text-xl font-semibold text-gray-700">
                    ثبت خرید جدید
                </h2>

                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                    {/* Supplier */}
                    <div className="relative">
                        <label
                            htmlFor="supplier_id"
                            className="mb-1 block text-sm font-medium text-gray-600"
                        >
                            شرکت همکار
                        </label>
                        <select
                            value={data.supplier_id}
                            id="supplier_id"
                            onChange={(e) =>
                                setData('supplier_id', e.target.value)
                            }
                            className={inputClass}
                            required
                        >
                            <option value="" disabled hidden>
                                انتخاب شرکت همکار
                            </option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.company_name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.supplier_id} />
                    </div>

                    {/* Total Amount */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            کل مبلغ
                        </label>
                        <input
                            type="number"
                            value={data.total_amount}
                            onChange={(e) =>
                                handleAmountChange(
                                    'total_amount',
                                    e.target.value,
                                )
                            }
                            className={inputClass}
                            placeholder="کل مبلغ"
                            required
                        />
                        <InputError message={errors.total_amount} />
                    </div>

                    {/* Paid Amount */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            پرداخت شده
                        </label>
                        <input
                            type="number"
                            value={data.paid_amount}
                            onChange={(e) =>
                                handleAmountChange(
                                    'paid_amount',
                                    e.target.value,
                                )
                            }
                            className={inputClass}
                            placeholder="مبلغ پرداختی"
                        />
                        <InputError message={errors.paid_amount} />
                    </div>

                    {/* Remaining Amount */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            باقی مانده
                        </label>
                        <input
                            type="number"
                            value={data.remaining_amount}
                            className={`${inputClass} bg-gray-100`}
                            disabled
                        />
                    </div>

                    {/* Purchase Date */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            تاریخ خرید
                        </label>
                        <AfghanDatePicker
                            value={data.purchase_date}
                            onChange={(value) =>
                                setData(
                                    'purchase_date',
                                    value.format('YYYY-MM-DD'),
                                )
                            }
                        />
                        <InputError message={errors.purchase_date} />
                    </div>

                    {/* Status */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            وضعیت پرداخت
                        </label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className={inputClass}
                        >
                            <option value="unpaid">پرداخت نشده</option>
                            <option value="paid">تسویه شده</option>
                        </select>
                        <InputError message={errors.status} />
                    </div>

                    {/* Description */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            توضیحات (اختیاری)
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            rows={3}
                            className={inputClass}
                            placeholder="توضیحات"
                        ></textarea>
                        <InputError message={errors.description} />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-3">
                        <PrimaryButton type="submit" disabled={processing}>
                            ذخیره
                        </PrimaryButton>
                        <SecondaryButton onClick={() => window.history.back()}>
                            بازگشت
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
