import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import logo from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Calculator,
    Calendar,
    DollarSign,
    Edit3,
    FileText,
    History,
    Package,
    Percent,
    Pill,
    Plus,
    Receipt,
    Save,
    Trash,
} from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function PharmacySaleUpdate({ sale }) {
    const { data, setData, put, processing, errors } = useForm({
        sale_type: sale.sale_type || 'with_prescription',
        sale_date:
            new DateObject({
                date: sale.sale_date,
                calendar: persian,
                locale: persian_en,
            }).format('YYYY/MM/DD') ||
            new DateObject({ calendar: persian, locale: persian_en }).format(
                'YYYY/MM/DD',
            ),
        description: sale.description || '',
        items:
            sale.items?.map((item) => ({
                id: item.id,
                drug_name: item.drug_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: parseInt(
                    item.subtotal || item.quantity * item.unit_price,
                ),
            })) || [],
        discount: sale.discount || 0,
        total_amount: sale.total_amount,
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [formStep, setFormStep] = useState(1);

    const addItem = () => {
        setData('items', [
            ...data.items,
            { drug_name: '', quantity: 1, unit_price: 0, subtotal: 0 },
        ]);
    };

    const updateItem = (idx, field, value) => {
        const newItems = [...data.items];

        if (field === 'quantity' || field === 'unit_price') {
            const num = parseFloat(value) || 0;
            newItems[idx][field] = num;
        } else {
            newItems[idx][field] = value;
        }

        newItems[idx].subtotal =
            Number(newItems[idx].quantity || 0) *
            Number(newItems[idx].unit_price || 0);

        setData({ ...data, items: newItems });
    };

    const removeItem = (idx) => {
        const newItems = data.items.filter((_, i) => i !== idx);
        setData({ ...data, items: newItems });
    };

    const updateDiscount = (value) => {
        const num = parseFloat(value);
        setData('discount', isNaN(num) ? 0 : num);
    };

    // Recalculate total amount based on items
    useEffect(() => {
        const itemsTotal = data.items.reduce(
            (sum, item) => sum + (item.subtotal || 0),
            0,
        );
        if (itemsTotal !== data.total_amount) {
            setData('total_amount', itemsTotal);
        }
    }, [data.items]);

    const totalAmount = data.total_amount;
    const totalAfterDiscount = Math.max(totalAmount - (data.discount || 0), 0);
    const discountPercentage =
        totalAmount > 0 ? Math.round((data.discount / totalAmount) * 100) : 0;

    // Check if form has changes
    useEffect(() => {
        const originalItems =
            sale.items?.map((item) => ({
                drug_name: item.drug_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.subtotal,
            })) || [];

        const currentItems = data.items.map((item) => ({
            drug_name: item.drug_name,
            quantity: item.quantity,
            unit_price: item.unit_price,
            subtotal: item.subtotal,
        }));

        const changes =
            JSON.stringify(originalItems) !== JSON.stringify(currentItems) ||
            data.discount != sale.discount ||
            data.description != sale.description ||
            data.sale_date != sale.sale_date;

        setHasChanges(changes);
    }, [data]);

    const submitSale = (e) => {
        e.preventDefault();
        put(route('pharmacy.update', sale.id));
    };

    // Calculate summary
    const totalItems = data.items.length;
    const totalQuantity = data.items.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0,
    );

    return (
        <AuthenticatedLayout title={`ویرایش فروش - فاکتور #${sale.id}`}>
            <Head title={`ویرایش فروش - فاکتور #${sale.id}`} />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            ویرایش فروش دارو
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            فاکتور #{sale.id} - ویرایش اطلاعات فروش
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2">
                        <Edit3 className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                            در حال ویرایش
                        </span>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 flex items-center justify-center gap-2">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formStep >= 1
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        1
                    </div>
                    <div
                        className={`h-1 w-16 ${
                            formStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'
                        }`}
                    ></div>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formStep >= 2
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        2
                    </div>
                    <div
                        className={`h-1 w-16 ${
                            formStep >= 3 ? 'bg-teal-600' : 'bg-gray-200'
                        }`}
                    ></div>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            formStep >= 3
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        3
                    </div>
                </div>

                {/* Original Invoice Info Card */}
                <div className="mb-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                        <History className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            اطلاعات فعلی فاکتور
                        </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                        <div>
                            <span className="text-gray-500">شماره فاکتور:</span>
                            <span className="mr-1 font-bold text-gray-800">
                                #{sale.id}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">تاریخ فروش:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {sale.sale_date}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">تعداد اقلام:</span>
                            <span className="mr-1 font-medium text-gray-800">
                                {sale.items?.length || 0} قلم
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">مبلغ کل:</span>
                            <span className="mr-1 font-bold text-teal-700">
                                {sale.total_amount.toLocaleString()} ؋
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Invoice Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Invoice Header */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6 text-white">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-xl bg-white/10 p-2 backdrop-blur-sm">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">
                                        کلینیک صحت مادر
                                    </h2>
                                    <p className="mt-1 text-sm text-teal-100">
                                        ویرایش فاکتور فروش دارو
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white/10 p-3 text-left backdrop-blur-sm">
                                <p className="text-xs text-teal-100">
                                    شماره فاکتور
                                </p>
                                <p className="text-2xl font-bold">#{sale.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Invoice Information */}
                    <div className={`p-6 ${formStep !== 1 ? 'hidden' : ''}`}>
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                            <div className="rounded-lg bg-teal-100 p-2">
                                <Receipt className="h-5 w-5 text-teal-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                اطلاعات فاکتور
                            </h3>
                            <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                مرحله ۱ از ۳
                            </span>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {/* Sale Date */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    تاریخ فروش
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <AfghanDatePicker
                                        value={data.sale_date}
                                        onChange={(v) =>
                                            setData(
                                                'sale_date',
                                                v.format('YYYY/MM/DD'),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm"
                                    />
                                </div>
                                <InputError message={errors.sale_date} />
                            </div>

                            {/* Total Amount */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    جمع کل
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <DollarSign className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-8 pr-10 text-sm font-bold text-gray-800"
                                        value={data.total_amount}
                                        onChange={(e) =>
                                            setData(
                                                'total_amount',
                                                e.target.value,
                                            )
                                        }
                                        readOnly
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    جمع کل بر اساس اقلام محاسبه می‌شود
                                </p>
                                <InputError message={errors.total_amount} />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setFormStep(2)}
                                className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                            >
                                مرحله بعد
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Step 2: Items */}
                    <div className={`p-6 ${formStep !== 2 ? 'hidden' : ''}`}>
                        <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Package className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اقلام فروش
                                </h3>
                                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    مرحله ۲ از ۳
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500">
                                    {totalItems} قلم • {totalQuantity} عدد
                                </span>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    افزودن دارو
                                </button>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                        <th className="w-12 px-3 py-3 text-center text-xs font-medium text-white">
                                            #
                                        </th>
                                        <th className="px-3 py-3 text-right text-xs font-medium text-white">
                                            <div className="flex items-center gap-1.5">
                                                <Pill className="h-3.5 w-3.5" />
                                                نام دارو
                                            </div>
                                        </th>
                                        <th className="w-20 px-3 py-3 text-center text-xs font-medium text-white">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Package className="h-3.5 w-3.5" />
                                                تعداد
                                            </div>
                                        </th>
                                        <th className="w-28 px-3 py-3 text-center text-xs font-medium text-white">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <DollarSign className="h-3.5 w-3.5" />
                                                قیمت واحد (؋)
                                            </div>
                                        </th>
                                        <th className="w-28 px-3 py-3 text-center text-xs font-medium text-white">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Receipt className="h-3.5 w-3.5" />
                                                جمع جزء
                                            </div>
                                        </th>
                                        <th className="w-12 px-3 py-3 text-center text-xs font-medium text-white">
                                            <span>عملیات</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.items.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="py-8 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="rounded-full bg-gray-100 p-3">
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        هیچ دارویی اضافه نشده
                                                        است
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={addItem}
                                                        className="mt-3 flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                        افزودن اولین دارو
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        data.items.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-teal-50/50"
                                            >
                                                <td className="px-3 py-3 text-center text-xs font-medium text-gray-600">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <input
                                                        type="text"
                                                        className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200"
                                                        value={item.drug_name}
                                                        onChange={(e) =>
                                                            updateItem(
                                                                idx,
                                                                'drug_name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="نام دارو"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors[
                                                                `items.${idx}.drug_name`
                                                            ]
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-3">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-center text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateItem(
                                                                idx,
                                                                'quantity',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            errors[
                                                                `items.${idx}.quantity`
                                                            ]
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-3">
                                                    <div className="relative">
                                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                                            ؋
                                                        </span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            className="w-full rounded-lg border border-gray-200 px-2 py-1.5 pl-6 text-center text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200"
                                                            value={
                                                                item.unit_price
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    idx,
                                                                    'unit_price',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors[
                                                                `items.${idx}.unit_price`
                                                            ]
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-3 text-center">
                                                    <span className="text-xs font-bold text-gray-800">
                                                        {item.subtotal.toLocaleString()}
                                                    </span>
                                                    <span className="mr-0.5 text-[10px] text-gray-500">
                                                        ؋
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeItem(idx)
                                                        }
                                                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                                                    >
                                                        <Trash className="h-3.5 w-3.5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setFormStep(1)}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                مرحله قبل
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormStep(3)}
                                disabled={data.items.length === 0}
                                className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                مرحله بعد
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Step 3: Discount & Description */}
                    <div className={`p-6 ${formStep !== 3 ? 'hidden' : ''}`}>
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                            <div className="rounded-lg bg-teal-100 p-2">
                                <FileText className="h-5 w-5 text-teal-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                تخفیف و توضیحات
                            </h3>
                            <span className="mr-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                مرحله ۳ از ۳
                            </span>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {/* Discount */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    تخفیف (افغانی)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        value={data.discount}
                                        onChange={(e) =>
                                            updateDiscount(e.target.value)
                                        }
                                        placeholder="۰"
                                    />
                                </div>
                                {discountPercentage > 0 && (
                                    <p className="text-xs text-green-600">
                                        {discountPercentage}% تخفیف
                                    </p>
                                )}
                                <InputError message={errors.discount} />
                            </div>

                            {/* Total After Discount */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    جمع کل پس از تخفیف
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ؋
                                    </span>
                                    <Calculator className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-200 bg-teal-50 px-4 py-3 pl-8 pr-10 text-sm font-bold text-teal-700"
                                        value={totalAfterDiscount.toLocaleString()}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    توضیحات
                                    <span className="mr-1 text-gray-400">
                                        (اختیاری)
                                    </span>
                                </label>
                                <div className="relative">
                                    <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                                    <textarea
                                        rows="4"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="توضیحات اضافی درباره فروش..."
                                    />
                                </div>
                                <InputError message={errors.description} />
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/50 p-4">
                            <div className="flex items-center gap-2">
                                <Receipt className="h-5 w-5 text-teal-600" />
                                <span className="text-sm font-medium text-teal-700">
                                    خلاصه فاکتور
                                </span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-500">
                                        تاریخ فروش:
                                    </span>
                                    <span className="mr-2 font-medium text-gray-800">
                                        {data.sale_date}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">
                                        تعداد اقلام:
                                    </span>
                                    <span className="mr-2 font-medium text-gray-800">
                                        {totalItems} قلم
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">
                                        جمع کل:
                                    </span>
                                    <span className="mr-2 font-bold text-gray-800">
                                        {totalAmount.toLocaleString()} ؋
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">
                                        قابل پرداخت:
                                    </span>
                                    <span className="mr-2 font-bold text-teal-700">
                                        {totalAfterDiscount.toLocaleString()} ؋
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Changes Summary */}
                        {hasChanges && (
                            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-amber-600" />
                                    <span className="text-sm font-medium text-amber-700">
                                        تغییرات اعمال شده
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-amber-600">
                                    فاکتور نسبت به نسخه اصلی تغییر کرده است
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setFormStep(2)}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                مرحله قبل
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                انصراف
                            </button>
                            <PrimaryButton
                                type="submit"
                                onClick={submitSale}
                                disabled={
                                    processing ||
                                    !hasChanges ||
                                    data.items.length === 0
                                }
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        در حال ذخیره...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        ذخیره تغییرات
                                    </>
                                )}
                            </PrimaryButton>
                        </div>

                        {/* Required Fields Note */}
                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>
                                فیلدهای دارای{' '}
                                <span className="text-red-500">*</span> الزامی
                                هستند
                            </span>
                        </div>
                    </div>
                </div>

                {/* Help Card */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-amber-50 to-teal-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Edit3 className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                نکات ویرایش فاکتور
                            </h4>
                            <p className="mt-1 text-xs text-gray-600">
                                • تغییرات فقط بر روی این فاکتور اعمال می‌شود
                                <br />
                                • جمع کل بر اساس اقلام محاسبه می‌شود
                                <br />
                                • تخفیف به صورت دستی وارد می‌شود
                                <br />• دکمه ذخیره تا زمانی که تغییری اعمال
                                نکرده‌اید غیرفعال است
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
