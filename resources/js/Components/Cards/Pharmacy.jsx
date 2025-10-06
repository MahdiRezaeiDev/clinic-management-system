import { useForm } from '@inertiajs/react';
import AfghanDatePicker from '../AfghanDatePicker';

export default function DrugSellCard() {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        amount: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pharmacy.noprescription.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="w-full rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">فروش دارو بدون نسخه</h2>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 items-end gap-4 md:grid-cols-3"
            >
                {/* Date */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">تاریخ</label>
                    <AfghanDatePicker
                        value={data.date}
                        onChange={(value) => setData('date', value)}
                    />
                    {errors.date && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.date}
                        </p>
                    )}
                </div>

                {/* Amount */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">
                        مبلغ (ریال)
                    </label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className="w-full rounded border-gray-300 p-2 shadow-sm focus:ring focus:ring-blue-200"
                        required
                    />
                    {errors.amount && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.amount}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col md:items-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded bg-green-500 px-6 py-2 font-bold text-white hover:bg-green-600 md:w-auto"
                    >
                        ثبت فروش
                    </button>
                </div>

                {/* Description (full width below) */}
                <div className="mt-2 flex flex-col md:col-span-3">
                    <label className="mb-1 text-sm font-medium">توضیحات</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full rounded border-gray-300 p-2 shadow-sm focus:ring focus:ring-blue-200"
                        rows="2"
                    ></textarea>
                    {errors.description && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.description}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
