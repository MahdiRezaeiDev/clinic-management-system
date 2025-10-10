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
        }).format('YYYY/MM/DD'),
        description: '',
        user_id: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('medicine.store'), {
            onSuccess: () => reset(),
        });
    };

    // Auto-calculate remaining
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
        'peer block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none transition';

    return (
        <AuthenticatedLayout title="ثبت خرید جدید">
            <Head title="ثبت خرید جدید" />

            <div className="mx-auto mt-10 max-w-3xl">
                <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4">
                        <h2 className="text-lg font-semibold text-white">
                            ثبت خرید جدید
                        </h2>
                    </div>

                    {/* Form Body */}
                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2"
                    >
                        {/* Supplier */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="supplier_id"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                شرکت همکار
                            </label>
                            <select
                                id="supplier_id"
                                value={data.supplier_id}
                                onChange={(e) =>
                                    setData('supplier_id', e.target.value)
                                }
                                className="peer block w-full rounded-lg border border-gray-200 bg-white px-10 py-2 text-sm text-gray-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            >
                                <option value="" disabled hidden>
                                    انتخاب شرکت همکار
                                </option>
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.company_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.supplier_id} />
                        </div>

                        {/* Purchase Date */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
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

                        {/* Total Amount */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                                placeholder="مثلاً 20000"
                                required
                            />
                            <InputError message={errors.total_amount} />
                        </div>

                        {/* Paid Amount */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                باقی مانده
                            </label>
                            <input
                                type="number"
                                value={data.remaining_amount}
                                disabled
                                className={`${inputClass} bg-gray-100 text-gray-500`}
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                توضیحات (اختیاری)
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={3}
                                className={`${inputClass} resize-none`}
                                placeholder="در صورت نیاز توضیحی اضافه کنید..."
                            ></textarea>
                            <InputError message={errors.description} />
                        </div>

                        {/* Submit Buttons */}
                        <div className="col-span-2 mt-4 flex items-center justify-end gap-3">
                            <SecondaryButton
                                type="button"
                                onClick={() => window.history.back()}
                            >
                                بازگشت
                            </SecondaryButton>
                            <PrimaryButton type="submit" disabled={processing}>
                                ذخیره خرید
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
