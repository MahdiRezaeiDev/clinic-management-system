import AfghanDatePicker from '@/Components/AfghanDatePicker';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Purchase({ suppliers }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        supplier_id: '',
        total_amount: '',
        paid_amount: '',
        remaining_amount: '',
        purchase_date: new Date().toISOString().split('T')[0], // default today
        description: '',
        status: 'unpaid',
        user_id: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('purchases.store'), {
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
        'peer block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    return (
        <AuthenticatedLayout title="ثبت خرید جدید">
            <Head title="ثبت خرید جدید" />
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-6 text-xl font-bold">ثبت خرید جدید</h2>
                <form onSubmit={submit} className="space-y-4">
                    {/* Supplier */}
                    <div className="relative">
                        <select
                            value={data.supplier_id}
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
                        <label className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500">
                            شرکت همکار
                        </label>
                        {errors.supplier_id && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.supplier_id}
                            </p>
                        )}
                    </div>

                    {/* Total Amount */}
                    <div className="relative">
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
                        <label className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500">
                            کل مبلغ
                        </label>
                        {errors.total_amount && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.total_amount}
                            </p>
                        )}
                    </div>

                    {/* Paid Amount */}
                    <div className="relative">
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
                            placeholder="پرداخت شده"
                        />
                        <label className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500">
                            پرداخت شده
                        </label>
                        {errors.paid_amount && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.paid_amount}
                            </p>
                        )}
                    </div>

                    {/* Remaining Amount */}
                    <div className="relative">
                        <input
                            type="number"
                            value={data.remaining_amount}
                            className={inputClass + ' bg-gray-100'}
                            disabled
                        />
                        <label className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500">
                            باقی مانده
                        </label>
                    </div>

                    {/* Purchase Date */}
                    <div className="relative">
                        <AfghanDatePicker
                            value={data.purchase_date}
                            onChange={(value) =>
                                setData(
                                    'purchase_date',
                                    value.format('YYYY-MM-DD'),
                                )
                            }
                            className={inputClass}
                        />
                        <label className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500">
                            تاریخ خرید
                        </label>
                        {errors.purchase_date && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.purchase_date}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div className="relative">
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className={inputClass}
                        >
                            <option value="unpaid">پرداخت نشده</option>
                            <option value="paid">تسویه شده</option>
                        </select>
                        <label className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500">
                            وضعیت
                        </label>
                        {errors.status && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            rows={3}
                            className={inputClass}
                            placeholder="توضیحات (اختیاری)"
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-green-500 px-6 py-2 font-bold text-white transition hover:bg-green-600"
                        >
                            ثبت خرید
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
