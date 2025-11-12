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
import { Settings, Trash } from 'lucide-react';
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
    let typingTimer;

    const handleDrugInput = (e, idx) => {
        const value = e.target.value;
        updateItem(idx, 'brand_name', value);

        clearTimeout(typingTimer);
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        typingTimer = setTimeout(async () => {
            try {
                const response = await axios.get(
                    route('pharmacy.search-drugs', { q: value }),
                );
                setSuggestions(response.data); // [{ brand_name, brand_name_fa }]
                setActiveIndex(idx);
            } catch (err) {
                console.error(err);
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

    const submitSale = (e) => {
        e.preventDefault();
        console.log('here');
        
        console.log(data.items);

        post(route('pharmacy.store'), { onSuccess: () => reset() });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey) addItem();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addItem]);

    return (
        <AuthenticatedLayout title="ثبت فروش دارو">
            <Head title="ثبت فروش دارو" />

            <div className="relative m-6 mx-auto max-w-4xl bg-gray-100 font-sans print:bg-white">
                {/* Watermark */}
                <img
                    src={logo}
                    alt="Watermark"
                    className="pointer-events-none absolute inset-0 m-auto h-64 w-64 select-none object-contain opacity-10"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Header */}
                <header className="relative bg-teal-700">
                    <div className="flex justify-between">
                        <div className="w-1/2 p-4 text-right text-white">
                            <h1 className="text-xl font-bold">
                                کلینیک ۲۴ ساعته کودک و مادر
                            </h1>
                            <p className="text-xs">
                                مرکز صحی جامع برای مراقبت از اطفال و مادران
                            </p>
                        </div>
                        <div className="parallelogram w-1/2 bg-teal-600 p-4 text-left text-white">
                            <h1 className="text-xl font-bold">
                                Mother & Child Clinic
                            </h1>
                            <p className="text-xs">
                                A comprehensive Health Center for Children and
                                Mothers
                            </p>
                        </div>
                    </div>
                </header>

                {/* Patient Info */}
                <section className="border-b-4 border-dashed border-gray-400 px-4 py-3">
                    <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="flex flex-col">
                            <InputLabel
                                value="نام بیمار:"
                                className="font-semibold"
                            />
                            <TextInput
                                value={data.patient_name}
                                onChange={(e) =>
                                    setData('patient_name', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1 text-right"
                            />
                            <InputError
                                message={errors.patient_name}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel value="سن:" className="font-semibold" />
                            <TextInput
                                value={data.patient_age}
                                onChange={(e) =>
                                    setData('patient_age', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1 text-right"
                            />
                            <InputError
                                message={errors.patient_age}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel
                                value="جنسیت:"
                                className="font-semibold"
                            />
                            <select
                                value={data.patient_gender}
                                onChange={(e) =>
                                    setData('patient_gender', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 px-8 py-2 text-right text-xs shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">-- جنسیت --</option>
                                <option value="male">مذکر</option>
                                <option value="female">مونث</option>
                            </select>
                            <InputError
                                message={errors.patient_gender}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel
                                value="داکتر معالج:"
                                className="font-semibold"
                            />
                            <select
                                value={data.doctor}
                                onChange={(e) =>
                                    setData('doctor', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 px-8 py-2 text-right text-xs shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">-- انتخاب داکتر --</option>
                                {staff.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.full_name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.doctor}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel
                                value="تاریخ:"
                                className="font-semibold"
                            />
                            <AfghanDatePicker
                                value={data.sale_date}
                                onChange={(date) =>
                                    setData(
                                        'sale_date',
                                        date.format('YYYY/MM/DD'),
                                    )
                                }
                                className="w-full rounded-md border border-gray-300 px-8 py-2 text-right text-xs shadow-sm"
                            />
                            <InputError
                                message={errors.sale_date}
                                className="mt-1"
                            />
                        </div>
                    </div>
                </section>

                {/* Items Table */}
                <form onSubmit={submitSale}>
                    <div className="mt-4 overflow-hidden rounded-b-xl border-x-4 border-b-4 border-teal-700 shadow-sm print:border-0">
                        <table className="min-w-full border-collapse text-sm">
                            <thead className="border-2 border-teal-700 bg-teal-700 text-white">
                                <tr>
                                    <th className="p-2 text-right font-medium">
                                        #
                                    </th>
                                    <th className="p-2 text-right font-medium">
                                        نام دارو
                                    </th>
                                    <th className="w-20 p-2 text-center font-medium">
                                        تعداد
                                    </th>
                                    <th className="w-32 p-2 text-center font-medium">
                                        قیمت
                                    </th>
                                    <th className="p-2 text-center font-medium">
                                        مجموع
                                    </th>
                                    <th className="p-2 text-center font-medium">
                                        <Settings className="inline h-4 w-4" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-2 text-center text-gray-500"
                                        >
                                            هیچ دارویی اضافه نشده است
                                        </td>
                                    </tr>
                                ) : (
                                    data.items.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className="text-xs even:bg-teal-50"
                                        >
                                            <td className="border-2 border-gray-500 text-center">
                                                {idx + 1}
                                            </td>

                                            {/* Drug Name with Suggestions */}
                                            <td className="relative border-2 border-gray-500 text-right">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={
                                                            item.brand_name ??
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            handleDrugInput(
                                                                e,
                                                                idx,
                                                            )
                                                        }
                                                        autoComplete="off"
                                                        className="w-full border-none bg-transparent px-1 text-xs font-semibold focus:outline-none"
                                                        onFocus={() =>
                                                            setActiveIndex(idx)
                                                        }
                                                    />
                                                    {activeIndex === idx &&
                                                        suggestions.length >
                                                            0 && (
                                                            <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded border border-gray-300 bg-white text-xs shadow-lg">
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
                                                                            className="flex cursor-pointer flex-col px-2 py-2 hover:bg-teal-100"
                                                                        >
                                                                            <span className="font-semibold">
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
                                            <td className="border-2 border-gray-500 text-center">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity ?? 1}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            idx,
                                                            'quantity',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full border-none bg-transparent px-1 text-center text-xs font-semibold focus:outline-none"
                                                />
                                            </td>

                                            {/* Price */}
                                            <td className="border-2 border-gray-500 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.price ?? 0}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            idx,
                                                            'price',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full border-none bg-transparent px-1 text-center text-xs font-semibold focus:outline-none"
                                                />
                                            </td>

                                            {/* Subtotal */}
                                            <td className="border-2 border-gray-500 text-center font-medium">
                                                {item.subtotal.toLocaleString()}
                                            </td>

                                            {/* Remove */}
                                            <td className="border-2 border-gray-500 text-center">
                                                <Trash
                                                    onClick={() =>
                                                        removeItem(idx)
                                                    }
                                                    className="mx-auto h-4 w-4 cursor-pointer text-red-600"
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <InputError
                            message={errors.items}
                            className="m-2 text-right"
                        />

                        {/* Discount + Totals */}
                        <div className="flex flex-wrap items-center bg-teal-700 text-xs text-white">
                            <div className="flex-1 border-2 border-teal-700 text-center font-bold">
                                مجموع قبل از تخفیف
                            </div>
                            <div className="flex-1 border-2 border-teal-700 text-center">
                                {data.total_amount.toLocaleString()}
                            </div>
                            <div className="flex-1 border-2 border-teal-700 text-center font-bold">
                                تخفیف
                            </div>
                            <div className="flex-1 border-2 border-teal-700 text-center font-medium">
                                <input
                                    type="number"
                                    min="0"
                                    value={data.discount ?? 0}
                                    onChange={(e) =>
                                        updateDiscount(e.target.value)
                                    }
                                    className="w-full px-2 py-1 text-right text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                            <div className="flex-1 border-2 border-teal-700 text-center font-bold">
                                جمع کل پس از تخفیف
                            </div>
                            <div className="flex-1 border-2 border-teal-700 text-center font-medium">
                                {totalAfterDiscount.toLocaleString()}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-4 flex-1 border-t border-gray-300 px-4 py-2">
                            <h3 className="mb-2 text-sm font-bold text-teal-700">
                                توصیه‌های پزشک:
                            </h3>
                            <textarea
                                value={data.description ?? ''}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                rows={4}
                                placeholder="توصیه‌ها و یادداشت‌های پزشک را اینجا وارد کنید..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-2 px-4 py-1">
                            <PrimaryButton type="submit" disabled={processing}>
                                ثبت و نمایش فاکتور
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
