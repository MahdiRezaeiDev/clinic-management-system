import { useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    DollarSign,
    FileText,
    Package,
    Pill,
    Save,
} from 'lucide-react';
import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import { DateObject } from 'react-multi-date-picker';
import AfghanDatePicker from '../AfghanDatePicker';
import InputError from '../InputError';
import PrimaryButton from '../PrimaryButton';

export default function DrugSellCard() {
    const { data, setData, post, processing, errors, reset } = useForm({
        sale_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        total_amount: '',
        description: '',
        sale_type: 'without_prescription',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('pharmacy.store'), {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-32 w-32 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-32 w-32 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                        <Pill className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            فروش دارو بدون نسخه
                        </h2>
                        <p className="text-xs text-teal-100">
                            ثبت فروش سریع داروهای OTC
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="p-6">
                {/* Sale Date Field */}
                <div className="mb-5 space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">
                        تاریخ فروش
                    </label>
                    <div className="relative">
                        <Calendar className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <AfghanDatePicker
                            value={data.sale_date}
                            id="sale_date"
                            onChange={(value) =>
                                setData('sale_date', value.format('YYYY/MM/DD'))
                            }
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                        />
                    </div>
                    <InputError message={errors.sale_date} />
                </div>

                {/* Amount Field */}
                <div className="mb-5 space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">
                        مبلغ (افغانی)
                        <span className="mr-1 text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                            ؋
                        </span>
                        <DollarSign className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="number"
                            id="total_amount"
                            value={data.total_amount}
                            onChange={(e) =>
                                setData('total_amount', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                            placeholder="مثلاً ۵۰۰۰"
                            min="0"
                            step="10"
                            required
                        />
                    </div>
                    <InputError message={errors.total_amount} />
                </div>

                {/* Description Field */}
                <div className="mb-6 space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">
                        توضیحات
                        <span className="mr-1 text-gray-400">(اختیاری)</span>
                    </label>
                    <div className="relative">
                        <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                            value={data.description}
                            id="description"
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            rows={3}
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                            placeholder="توضیحات فروش (اختیاری)"
                        />
                    </div>
                    <InputError message={errors.description} />
                </div>

                {/* Quick Amount Buttons */}
                <div className="mb-6 grid grid-cols-3 gap-2">
                    <button
                        type="button"
                        onClick={() => setData('total_amount', '1000')}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100"
                    >
                        ۱,۰۰۰ ؋
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('total_amount', '5000')}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100"
                    >
                        ۵,۰۰۰ ؋
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('total_amount', '10000')}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100"
                    >
                        ۱۰,۰۰۰ ؋
                    </button>
                </div>

                {/* Summary Preview */}
                {data.total_amount > 0 && (
                    <div className="mb-6 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 p-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">مبلغ فروش:</span>
                            <span className="font-bold text-teal-700">
                                {Number(data.total_amount).toLocaleString()}{' '}
                                افغانی
                            </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                            <span>تاریخ:</span>
                            <span>{data.sale_date}</span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between gap-3">
                    <PrimaryButton
                        type="submit"
                        disabled={processing}
                        className="flex-1 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                در حال ثبت...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Save className="h-4 w-4" />
                                ثبت فروش
                            </span>
                        )}
                    </PrimaryButton>
                </div>

                {/* Quick Stats */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        <span>بدون نسخه</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>فروش سریع</span>
                    </div>
                </div>
            </form>

            {/* Success Toast */}
            <div
                className={`fixed bottom-6 left-6 z-50 transform transition-all duration-300 ${
                    showSuccess
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}
            >
                <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-2xl">
                    <div className="rounded-full bg-green-100 p-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-800">موفقیت!</p>
                        <p className="text-sm text-gray-600">
                            فروش با موفقیت ثبت شد
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
