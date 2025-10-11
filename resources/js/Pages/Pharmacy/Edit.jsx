import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import log from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import moment from 'moment-jalaali';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function PharmacySaleUpdate({ sale }) {
    const { data, setData, put, processing, errors } = useForm({
        sale_type: sale.sale_type || 'with_prescription',
        sale_date:
            sale.sale_date ||
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

    const totalAmount = data.items.reduce(
        (acc, item) => acc + (item.subtotal || 0),
        0,
    );
    const totalAfterDiscount = Math.max(totalAmount - (data.discount || 0), 0);

    const submitSale = (e) => {
        e.preventDefault();
        const sale_date_gregorian = moment(
            data.sale_date,
            'jYYYY/jMM/jDD',
        ).format('YYYY-MM-DD');
        data.sale_date_gregorian = sale_date_gregorian;

        put(route('pharmacy.update', sale.id));
    };

    return (
        <AuthenticatedLayout title="ویرایش فروش دارو">
            <Head title="ویرایش فروش دارو" />

            <div className="m-6 mx-auto max-w-4xl font-sans print:bg-white">
                {/* Header */}
                <div className="bg-blueGray-600 mx-3 flex flex-col justify-between rounded-t-xl p-6 text-white shadow-sm print:mb-4 print:rounded-none print:bg-gray-200 print:text-gray-700">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={log}
                                alt="Logo"
                                className="h-16 w-16 rounded-full border border-gray-500 bg-white shadow-sm"
                            />
                            <div>
                                <h1 className="text-2xl font-bold leading-tight">
                                    کلینیک صحت مادر
                                </h1>
                                <p className="text-sm opacity-80">
                                    نسخه فروش دارو
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center text-right">
                            <p className="text-sm">تاریخ:</p>
                            <span className="px-2 text-sm">
                                {data.sale_date}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sale Info */}
                <div className="border-blueGray-600 mx-3 border-x-4 bg-white/80 p-3 text-sm shadow-sm">
                    <h2 className="mb-2 border-b pb-1 font-semibold text-gray-700">
                        اطلاعات فاکتور
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="whitespace-nowrap border-2 border-l-0 px-2 font-medium text-gray-700">
                                    جمع کل:
                                </td>
                                <td className="border-2">
                                    <span className="w-full p-2 text-sm">
                                        {totalAmount.toLocaleString()}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap border-2 border-x-0 px-2 font-medium text-gray-700">
                                    تخفیف:
                                </td>
                                <td className="border-2">
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full border-none p-2 text-sm"
                                        value={data.discount}
                                        onChange={(e) =>
                                            updateDiscount(e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.discount}
                                        className="mt-1 text-xs text-red-500"
                                    />
                                </td>
                                <td className="whitespace-nowrap border-2 border-x-0 px-2 font-medium text-gray-700">
                                    تاریخ فروش:
                                </td>
                                <td className="border-2">
                                    <AfghanDatePicker
                                        value={data.sale_date}
                                        onChange={(v) =>
                                            setData(
                                                'sale_date',
                                                v.format('YYYY/MM/DD'),
                                            )
                                        }
                                        className="rounded-md p-2 text-center text-sm"
                                    />
                                    <InputError
                                        message={errors.sale_date}
                                        className="mt-1 text-xs text-red-500"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Items Table */}
                <form onSubmit={submitSale}>
                    <div className="border-blueGray-600 mx-3 overflow-hidden rounded-b-xl border-x-4 border-b-4 shadow-sm">
                        <table className="min-w-full border-collapse text-sm">
                            <thead className="bg-blueGray-600 text-white">
                                <tr>
                                    {[
                                        '#',
                                        'نام دارو',
                                        'تعداد',
                                        'قیمت واحد',
                                        'جمع جزء',
                                        'عملیات',
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="border-b border-gray-400 p-2 text-right font-medium"
                                        >
                                            {h}
                                        </th>
                                    ))}
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
                                            className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors hover:bg-blue-50/60`}
                                        >
                                            <td className="p-2 text-right">
                                                {idx + 1}
                                            </td>
                                            <td className="p-2 text-right">
                                                <input
                                                    type="text"
                                                    className="w-full rounded border px-1 text-right text-xs font-semibold"
                                                    value={item.drug_name}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            idx,
                                                            'drug_name',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `items.${idx}.drug_name`
                                                        ]
                                                    }
                                                    className="mt-1 text-xs text-red-500"
                                                />
                                            </td>
                                            <td className="p-2 text-right">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="w-16 rounded border px-1 text-right text-xs font-semibold"
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
                                                    className="mt-1 text-xs text-red-500"
                                                />
                                            </td>
                                            <td className="p-2 text-right">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="w-20 rounded border px-1 text-right text-xs font-semibold"
                                                    value={item.unit_price}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            idx,
                                                            'unit_price',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `items.${idx}.unit_price`
                                                        ]
                                                    }
                                                    className="mt-1 text-xs text-red-500"
                                                />
                                            </td>
                                            <td className="p-2 text-right font-medium">
                                                {item.subtotal.toLocaleString()}
                                            </td>
                                            <td className="p-2 text-center">
                                                <Trash
                                                    onClick={() =>
                                                        removeItem(idx)
                                                    }
                                                    className="h-4 w-4 cursor-pointer text-red-600"
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="mt-2 px-4 py-1 text-right font-semibold text-gray-800">
                            جمع کل پس از تخفیف:{' '}
                            <span className="font-bold text-blue-700">
                                {totalAfterDiscount.toLocaleString()} افغانی
                            </span>
                        </div>

                        <div className="mt-2 flex justify-end gap-2 px-4 py-1">
                            <PrimaryButton type="button" onClick={addItem}>
                                + افزودن دارو
                            </PrimaryButton>
                            <PrimaryButton type="submit" disabled={processing}>
                                ویرایش و نمایش فاکتور
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
