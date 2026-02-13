/* eslint-disable react-hooks/exhaustive-deps */
import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import '@/css/factor.css';
import logo from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
    AlertCircle,
    Baby,
    Calendar,
    CreditCard,
    DollarSign,
    FileText,
    Package,
    Pill,
    Plus,
    Printer,
    Receipt,
    Save,
    Search,
    Settings,
    Stethoscope,
    Trash,
    User,
    UserCircle,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function PharmacySaleInvoiceForm({ staff }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        check: 'check',
        patient_name: '',
        patient_age: '',
        patient_gender: '',
        doctor: '',
        sale_type: 'cash',
        payment_method: 'cash',
        sale_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        description: '',
        items: [{ brand_name: '', quantity: 1, price: 0, subtotal: 0 }],
        total_amount: 0,
        discount: 0,
    });

    // --- Suggestions ---
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    let typingTimer;

    const handleDrugInput = (e, idx) => {
        const value = e.target.value;
        updateItem(idx, 'brand_name', value);

        clearTimeout(typingTimer);
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        typingTimer = setTimeout(async () => {
            try {
                const response = await axios.get(
                    route('pharmacy.search-drugs', { q: value }),
                );
                setSuggestions(response.data);
                setActiveIndex(idx);
                setIsSearching(false);
            } catch (err) {
                console.error(err);
                setIsSearching(false);
            }
        }, 300);
    };

    const selectDrug = (drug, idx) => {
        updateItem(idx, 'brand_name', drug.brand_name);
        setSuggestions([]);
        setActiveIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setActiveIndex(null);
            setSuggestions([]);
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    // --- Items logic ---
    const addItem = () => {
        setData('items', [
            ...data.items,
            { brand_name: '', quantity: 1, price: 0, subtotal: 0 },
        ]);
    };

    const updateItem = (idx, field, value) => {
        const newItems = [...data.items];
        if (field === 'quantity' || field === 'price') {
            newItems[idx][field] = Number(value) || 0;
        } else {
            newItems[idx][field] = value ?? '';
        }
        newItems[idx].subtotal = newItems[idx].quantity * newItems[idx].price;

        const totalAmount = newItems.reduce((a, b) => a + b.subtotal, 0);
        setData({ ...data, items: newItems, total_amount: totalAmount });
    };

    const removeItem = (idx) => {
        const newItems = data.items.filter((_, i) => i !== idx);
        const totalAmount = newItems.reduce((a, b) => a + b.subtotal, 0);
        setData({ ...data, items: newItems, total_amount: totalAmount });
    };

    const updateDiscount = (value) => {
        const num = Number(value);
        setData('discount', isNaN(num) ? 0 : num);
    };

    const totalAfterDiscount = Math.max(data.total_amount - data.discount, 0);
    const discountPercentage =
        data.total_amount > 0
            ? Math.round((data.discount / data.total_amount) * 100)
            : 0;

    const submitSale = (e) => {
        e.preventDefault();
        post(route('pharmacy.store'), { onSuccess: () => reset() });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey) {
                e.preventDefault();
                addItem();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addItem]);

    // Calculate summary statistics
    const totalItems = data.items.length;
    const totalQuantity = data.items.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0,
    );

    return (
        <AuthenticatedLayout title="ثبت فروش دارو">
            <Head title="ثبت فروش دارو" />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Header Section */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            ثبت فاکتور فروش دارو
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            اطلاعات بیمار و داروهای تجویز شده را وارد کنید
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2">
                        <Receipt className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                            فاکتور جدید #{Math.floor(Math.random() * 10000)}
                        </span>
                    </div>
                </div>

                {/* Main Invoice Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl print:shadow-none">
                    {/* Watermark */}
                    <img
                        src={logo}
                        alt="Watermark"
                        className="pointer-events-none absolute inset-0 m-auto h-64 w-64 select-none object-contain opacity-5"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />

                    {/* Clinic Header */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                                    <Baby className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        کلینیک ۲۴ ساعته کودک و مادر
                                    </h2>
                                    <p className="mt-1 text-sm text-teal-100">
                                        مرکز صحی جامع برای مراقبت از اطفال و
                                        مادران
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white/10 px-4 py-2 text-left backdrop-blur-sm">
                                <p className="text-xs text-teal-100">
                                    Mother & Child Clinic
                                </p>
                                <p className="text-xs text-teal-100">
                                    A comprehensive Health Center
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submitSale} className="p-6">
                        {/* Patient Information Section */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <UserCircle className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    اطلاعات بیمار
                                </h3>
                                <span className="mr-2 text-xs text-gray-500">
                                    * تمام فیلدها الزامی هستند
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                                <div className="space-y-1.5">
                                    <InputLabel
                                        value="نام بیمار"
                                        className="text-xs font-medium text-gray-600"
                                    />
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <TextInput
                                            value={data.patient_name}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="نام کامل بیمار"
                                        />
                                    </div>
                                    <InputError message={errors.patient_name} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel
                                        value="سن"
                                        className="text-xs font-medium text-gray-600"
                                    />
                                    <div className="relative">
                                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <TextInput
                                            value={data.patient_age}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_age',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                            placeholder="مثلاً: ۲۵ سال"
                                        />
                                    </div>
                                    <InputError message={errors.patient_age} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel
                                        value="جنسیت"
                                        className="text-xs font-medium text-gray-600"
                                    />
                                    <div className="relative">
                                        <UserCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={data.patient_gender}
                                            onChange={(e) =>
                                                setData(
                                                    'patient_gender',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        >
                                            <option value="">
                                                انتخاب جنسیت
                                            </option>
                                            <option value="male">مذکر</option>
                                            <option value="female">مونث</option>
                                        </select>
                                    </div>
                                    <InputError
                                        message={errors.patient_gender}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel
                                        value="تاریخ"
                                        className="text-xs font-medium text-gray-600"
                                    />
                                    <div className="relative">
                                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <AfghanDatePicker
                                            value={data.sale_date}
                                            onChange={(date) =>
                                                setData(
                                                    'sale_date',
                                                    date.format('YYYY/MM/DD'),
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm"
                                        />
                                    </div>
                                    <InputError message={errors.sale_date} />
                                </div>
                            </div>

                            <div className="mt-4 grid gap-5 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <InputLabel
                                        value="داکتر معالج"
                                        className="text-xs font-medium text-gray-600"
                                    />
                                    <div className="relative">
                                        <Stethoscope className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={data.doctor}
                                            onChange={(e) =>
                                                setData(
                                                    'doctor',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        >
                                            <option value="">
                                                انتخاب داکتر معالج
                                            </option>
                                            {staff.map((member) => (
                                                <option
                                                    key={member.id}
                                                    value={member.id}
                                                >
                                                    {member.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError message={errors.doctor} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel
                                        value="روش پرداخت"
                                        className="text-xs font-medium text-gray-600"
                                    />
                                    <div className="relative">
                                        <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={data.payment_method}
                                            onChange={(e) =>
                                                setData(
                                                    'payment_method',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                        >
                                            <option value="cash">نقد</option>
                                            <option value="card">
                                                کارت بانکی
                                            </option>
                                            <option value="insurance">
                                                بیمه
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-lg bg-teal-100 p-2">
                                        <Pill className="h-5 w-5 text-teal-700" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        داروهای تجویز شده
                                    </h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-xs text-gray-500">
                                        <span className="font-medium text-gray-700">
                                            {totalItems}
                                        </span>{' '}
                                        قلم دارو •
                                        <span className="mr-1 font-medium text-gray-700">
                                            {totalQuantity}
                                        </span>{' '}
                                        عدد
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-teal-700 hover:shadow-md"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        افزودن دارو (Ctrl+Shift+A)
                                    </button>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="overflow-hidden rounded-xl border border-gray-200">
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
                                                    قیمت (؋)
                                                </div>
                                            </th>
                                            <th className="w-28 px-3 py-3 text-center text-xs font-medium text-white">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <Receipt className="h-3.5 w-3.5" />
                                                    مجموع
                                                </div>
                                            </th>
                                            <th className="w-12 px-3 py-3 text-center text-xs font-medium text-white">
                                                <Settings className="h-3.5 w-3.5" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data.items.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="py-8 text-center"
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="rounded-full bg-gray-100 p-3">
                                                            <Pill className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            هیچ دارویی اضافه
                                                            نشده است
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

                                                    {/* Drug Name with Suggestions */}
                                                    <td className="px-3 py-3">
                                                        <div className="relative">
                                                            <div className="flex items-center gap-1.5">
                                                                <Search className="h-3.5 w-3.5 text-gray-400" />
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        item.brand_name ??
                                                                        ''
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleDrugInput(
                                                                            e,
                                                                            idx,
                                                                        )
                                                                    }
                                                                    autoComplete="off"
                                                                    className="w-full border-0 bg-transparent p-0 text-xs font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                                                                    placeholder="جستجوی دارو..."
                                                                    onFocus={() =>
                                                                        setActiveIndex(
                                                                            idx,
                                                                        )
                                                                    }
                                                                />
                                                                {isSearching &&
                                                                    activeIndex ===
                                                                        idx && (
                                                                        <div className="absolute left-0 top-full mt-1 flex items-center gap-1.5 rounded-lg bg-gray-50 px-2 py-1 text-[10px] text-gray-500">
                                                                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-teal-600"></div>
                                                                            در
                                                                            حال
                                                                            جستجو...
                                                                        </div>
                                                                    )}
                                                            </div>
                                                            {activeIndex ===
                                                                idx &&
                                                                suggestions.length >
                                                                    0 && (
                                                                    <ul className="absolute right-0 z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 text-xs shadow-xl">
                                                                        {suggestions.map(
                                                                            (
                                                                                drug,
                                                                                i,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    onClick={() =>
                                                                                        selectDrug(
                                                                                            drug,
                                                                                            idx,
                                                                                        )
                                                                                    }
                                                                                    className="flex cursor-pointer flex-col px-3 py-2 hover:bg-teal-50"
                                                                                >
                                                                                    <span className="font-medium text-gray-800">
                                                                                        {
                                                                                            drug.brand_name
                                                                                        }
                                                                                    </span>
                                                                                    {drug.brand_name_fa && (
                                                                                        <span className="text-[10px] text-gray-500">
                                                                                            {
                                                                                                drug.brand_name_fa
                                                                                            }
                                                                                        </span>
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                )}
                                                        </div>
                                                    </td>

                                                    {/* Quantity */}
                                                    <td className="px-3 py-3">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                item.quantity ??
                                                                1
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    idx,
                                                                    'quantity',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-center text-xs font-medium focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200"
                                                        />
                                                    </td>

                                                    {/* Price */}
                                                    <td className="px-3 py-3">
                                                        <div className="relative">
                                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                                                ؋
                                                            </span>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    item.price ??
                                                                    0
                                                                }
                                                                onChange={(e) =>
                                                                    updateItem(
                                                                        idx,
                                                                        'price',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full rounded-lg border border-gray-200 px-2 py-1.5 pl-6 text-center text-xs font-medium focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200"
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* Subtotal */}
                                                    <td className="px-3 py-3 text-center">
                                                        <span className="text-xs font-bold text-gray-800">
                                                            {item.subtotal.toLocaleString()}
                                                        </span>
                                                        <span className="mr-0.5 text-[10px] text-gray-500">
                                                            ؋
                                                        </span>
                                                    </td>

                                                    {/* Remove */}
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
                            <InputError
                                message={errors.items}
                                className="mt-2"
                            />
                        </div>

                        {/* Summary Section */}
                        <div className="mb-6 grid gap-6 md:grid-cols-2">
                            {/* Prescription Notes */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="rounded-lg bg-teal-100 p-1.5">
                                        <FileText className="h-4 w-4 text-teal-700" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        توصیه‌های پزشک
                                    </h3>
                                </div>
                                <textarea
                                    value={data.description ?? ''}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                                    rows={4}
                                    placeholder="دوز مصرف، نکات احتیاطی و توصیه‌های پزشک را وارد کنید..."
                                />
                            </div>

                            {/* Payment Summary */}
                            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-teal-50 to-blue-50 p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="rounded-lg bg-teal-100 p-1.5">
                                        <DollarSign className="h-4 w-4 text-teal-700" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        خلاصه پرداخت
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            مجموع قبل از تخفیف:
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            {data.total_amount.toLocaleString()}{' '}
                                            <span className="text-xs font-normal text-gray-500">
                                                ؋
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">
                                                تخفیف:
                                            </span>
                                            <div className="relative w-24">
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                                    ؋
                                                </span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={data.discount ?? 0}
                                                    onChange={(e) =>
                                                        updateDiscount(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-gray-200 px-2 py-1.5 pl-6 text-left text-sm font-medium focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200"
                                                />
                                            </div>
                                            {discountPercentage > 0 && (
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                                    {discountPercentage}%
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-red-600">
                                            - {data.discount.toLocaleString()}{' '}
                                            <span className="text-xs">؋</span>
                                        </span>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between border-t border-teal-200 pt-3">
                                        <span className="text-base font-semibold text-gray-800">
                                            جمع کل قابل پرداخت:
                                        </span>
                                        <span className="text-xl font-bold text-teal-700">
                                            {totalAfterDiscount.toLocaleString()}{' '}
                                            <span className="text-sm font-normal">
                                                ؋
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                <Printer className="h-4 w-4" />
                                چاپ فاکتور
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                            >
                                <X className="h-4 w-4" />
                                پاک کردن فرم
                            </button>
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl"
                            >
                                {processing ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        در حال ثبت...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        ثبت و نمایش فاکتور
                                    </>
                                )}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* Keyboard Shortcut Hint */}
                <div className="mt-4 rounded-lg bg-teal-50 p-3 text-xs text-teal-700">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                            راهنما: برای افزودن سریع دارو از کلیدهای{' '}
                            <kbd className="rounded bg-teal-200 px-1.5 py-0.5 text-xs font-semibold">
                                Ctrl
                            </kbd>{' '}
                            +{' '}
                            <kbd className="rounded bg-teal-200 px-1.5 py-0.5 text-xs font-semibold">
                                Shift
                            </kbd>{' '}
                            +{' '}
                            <kbd className="rounded bg-teal-200 px-1.5 py-0.5 text-xs font-semibold">
                                A
                            </kbd>{' '}
                            استفاده کنید
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
