import { useForm } from '@inertiajs/react';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import { DateObject } from 'react-multi-date-picker';
import AfghanDatePicker from '../AfghanDatePicker';
import InputError from '../InputError';

export default function DrugSellCard() {
    const { data, setData, post, processing, errors, reset, defaults } =
        useForm({
            date: new DateObject({
                calendar: persian,
                locale: persian_en,
            }).format('YYYY/MM/DD'),
            amount: '',
            description: '',
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('pharmacy.noprescription.store'), {
            data: {
                ...data,
            },
            onSuccess: () => {
                // set new defaults, so reset will go to current values
                defaults({
                    date: new DateObject({
                        calendar: persian,
                        locale: persian_en,
                    }).format('YYYY/MM/DD'),
                    amount: '',
                    description: '',
                });
                reset();
            },
        });
    };

    const inputClass =
        'peer block w-full rounded-sm border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    return (
        <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-xl">
            <div className="rounded-t-2xl bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-white">
                    فروش دارو بدون نسخه
                </h2>
            </div>

            <form onSubmit={submit} className="p-6">
                {/* Date */}
                <div className="relative mb-4">
                    <AfghanDatePicker
                        value={data.date}
                        id="date"
                        onChange={(value) =>
                            setData('date', value.format('YYYY-MM-DD'))
                        }
                    />
                    <label
                        htmlFor="date"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        تاریخ فروش
                    </label>
                    <InputError message={errors.date} />
                </div>

                {/* Amount */}
                <div className="relative mb-4">
                    <input
                        type="number"
                        id="amount"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className={inputClass}
                        required
                    />
                    <label
                        htmlFor="amount"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        مبلغ (ریال)
                    </label>
                    <InputError message={errors.amount} />
                </div>

                {/* Description */}
                <div className="relative mb-4">
                    <textarea
                        value={data.description}
                        id="description"
                        onChange={(e) => setData('description', e.target.value)}
                        rows={3}
                        className={inputClass}
                    />
                    <label
                        htmlFor="description"
                        className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        توضیحات
                    </label>
                    <InputError message={errors.description} />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-green-500 px-6 py-2 font-semibold text-white transition-all duration-200 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                    >
                        ثبت فروش
                    </button>
                </div>
            </form>
        </div>
    );
}
