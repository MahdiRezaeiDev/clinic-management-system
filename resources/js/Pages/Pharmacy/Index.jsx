import AfghanDatePicker from '@/Components/AfghanDatePicker';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';

export default function PharmacySaleInvoiceForm() {
    const [sale, setSale] = useState({
        sale_type: 'cash',
        payment_method: 'cash',
        sale_date: new Date().toISOString().slice(0, 16),
        description: '',
        items: [],
        total_amount: 0,
    });

    const addItem = () => {
        setSale((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { drug_name: '', quantity: 1, unit_price: 0, subtotal: 0 },
            ],
        }));
    };

    const updateItem = (idx, field, value) => {
        const newItems = [...sale.items];
        newItems[idx][field] =
            field === 'quantity' || field === 'unit_price'
                ? Number(value)
                : value;
        newItems[idx].subtotal =
            newItems[idx].quantity * newItems[idx].unit_price;
        const total = newItems.reduce((a, b) => a + b.subtotal, 0);
        setSale({ ...sale, items: newItems, total_amount: total });
    };

    const removeItem = (idx) => {
        const newItems = sale.items.filter((_, i) => i !== idx);
        const total = newItems.reduce((a, b) => a + b.subtotal, 0);
        setSale({ ...sale, items: newItems, total_amount: total });
    };

    const submitSale = () => {
        alert(
            `فروش ثبت شد!\nجمع کل: ${sale.total_amount.toLocaleString()} افغانی`,
        );
    };

    return (
        <AuthenticatedLayout title="ثبت فروش دارو">
            <Head title="ثبت فروش دارو" />

            <div className="mx-auto max-w-4xl space-y-4 py-10 font-sans print:bg-white">
                {/* Header */}
                <div className="flex flex-col items-start justify-between rounded-xl bg-indigo-700 p-6 text-white shadow-md md:flex-row md:items-center print:bg-gray-200 print:text-gray-700">
                    <div>
                        <h1 className="text-3xl font-bold">داروخانه سلامت</h1>
                        <p className="text-sm opacity-80">فاکتور فروش</p>
                    </div>
                    <div className="mt-4 flex flex-col text-right md:mt-0">
                        <span className="text-xl font-bold">فاکتور #1234</span>
                        <AfghanDatePicker
                            value={sale.sale_date}
                            onChange={(v) =>
                                setSale({
                                    ...sale,
                                    sale_date: v.format('YYYY-MM-DD'),
                                })
                            }
                            className="mt-1 rounded border bg-white/20 p-1 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Sale Info & Summary */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
                        <h2 className="mb-3 border-b pb-2 text-lg font-semibold">
                            اطلاعات فروش
                        </h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>نوع فروش:</span>{' '}
                                <span>
                                    {sale.sale_type === 'cash'
                                        ? 'نقدی'
                                        : 'نسیه'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>روش پرداخت:</span>{' '}
                                <span>{sale.payment_method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>توضیحات:</span>{' '}
                                <span>{sale.description || '-'}</span>
                            </div>
                            <div className="mt-2 flex justify-between text-lg font-bold text-indigo-700">
                                <span>جمع کل:</span>
                                <span>
                                    {sale.total_amount.toLocaleString()} افغانی
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
                        <h2 className="mb-3 border-b pb-2 text-lg font-semibold">
                            جزئیات فروش
                        </h2>
                        <div className="flex justify-between text-sm">
                            <span>تعداد اقلام:</span>
                            <span>{sale.items.length}</span>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-indigo-700 text-white">
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
                                        className="border-b border-white p-3 text-center text-sm font-medium"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sale.items.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 text-center text-gray-500"
                                    >
                                        هیچ دارویی اضافه نشده است
                                    </td>
                                </tr>
                            ) : (
                                sale.items.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-indigo-50`}
                                    >
                                        <td className="p-2 text-center">
                                            {idx + 1}
                                        </td>
                                        <td className="p-2 text-center">
                                            <input
                                                type="text"
                                                className="w-full rounded border p-1 text-center"
                                                value={item.drug_name}
                                                onChange={(e) =>
                                                    updateItem(
                                                        idx,
                                                        'drug_name',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-20 rounded border p-1 text-center"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItem(
                                                        idx,
                                                        'quantity',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-24 rounded border p-1 text-center"
                                                value={item.unit_price}
                                                onChange={(e) =>
                                                    updateItem(
                                                        idx,
                                                        'unit_price',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-2 text-center font-bold text-indigo-700">
                                            {item.subtotal.toLocaleString()}
                                        </td>
                                        <td className="p-2 text-center">
                                            <button
                                                onClick={() => removeItem(idx)}
                                                className="flex items-center justify-center gap-1 rounded-full bg-red-100 px-3 py-1 text-red-700 transition hover:bg-red-200"
                                            >
                                                <Trash /> حذف
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Add Item Footer */}
                    <div className="flex items-center justify-between border-t bg-gray-50 p-4">
                        <PrimaryButton
                            onClick={addItem}
                            className="flex items-center gap-2"
                        >
                            <Plus /> افزودن دارو
                        </PrimaryButton>
                        <span className="text-sm text-gray-600">
                            مجموع اقلام: {sale.items.length}
                        </span>
                    </div>
                </div>

                {/* Submit Footer */}
                <div className="mt-4 flex justify-end">
                    <PrimaryButton
                        onClick={submitSale}
                        className="bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        ثبت و چاپ فاکتور
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
