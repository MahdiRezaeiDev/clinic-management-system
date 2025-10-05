import axios from 'axios';
import { useState } from 'react';

export default function PharmacySaleInvoiceForm({ currentUser }) {
    const [sale, setSale] = useState({
        sale_type: 'cash',
        patient_id: '',
        doctor_id: '',
        pharmacist_id: '',
        user_id: 1,
        sale_date: new Date().toISOString().slice(0, 16),
        total_amount: 0,
        payment_method: 'cash',
        description: '',
        items: [],
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
        setSale({
            ...sale,
            items: newItems,
            total_amount: newItems.reduce((a, b) => a + b.subtotal, 0),
        });
    };

    const removeItem = (idx) => {
        const newItems = sale.items.filter((_, i) => i !== idx);
        setSale({
            ...sale,
            items: newItems,
            total_amount: newItems.reduce((a, b) => a + b.subtotal, 0),
        });
    };

    const submitSale = async () => {
        try {
            await axios.post('/api/pharmacy_sales', sale);
            alert('✅ فروش با موفقیت ثبت شد');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('❌ خطا در ثبت فروش');
        }
    };

    return (
        <div className="mx-auto my-8 max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-xl print:border-0 print:shadow-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">
                        داروخانه سلامت
                    </h1>
                    <p className="text-sm text-gray-500">
                        شماره تماس: ۰۷۹۹۰۰۰۰۰۰
                    </p>
                </div>
                <div className="text-right">
                    <h2 className="text-lg font-semibold text-gray-800">
                        فاکتور فروش
                    </h2>
                    <p className="text-sm text-gray-500">
                        تاریخ:{' '}
                        {new Date(sale.sale_date).toLocaleDateString('fa-IR')}
                    </p>
                </div>
            </div>

            {/* Sale Info */}
            <div className="grid grid-cols-2 gap-6 p-6">
                <div>
                    <label className="mb-1 block text-sm text-gray-600">
                        نوع فروش
                    </label>
                    <select
                        value={sale.sale_type}
                        onChange={(e) =>
                            setSale({ ...sale, sale_type: e.target.value })
                        }
                        className="w-full rounded-md border p-2"
                    >
                        <option value="cash">نقدی (بدون نسخه)</option>
                        <option value="credit">با نسخه (نسیه)</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600">
                        روش پرداخت
                    </label>
                    <select
                        value={sale.payment_method}
                        onChange={(e) =>
                            setSale({ ...sale, payment_method: e.target.value })
                        }
                        className="w-full rounded-md border p-2"
                    >
                        <option value="cash">نقد</option>
                        <option value="card">کارت</option>
                        <option value="insurance">بیمه</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600">
                        تاریخ فروش
                    </label>
                    <input
                        type="datetime-local"
                        className="w-full rounded-md border p-2"
                        value={sale.sale_date}
                        onChange={(e) =>
                            setSale({ ...sale, sale_date: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600">
                        توضیحات
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-md border p-2"
                        placeholder="توضیحات (اختیاری)"
                        value={sale.description}
                        onChange={(e) =>
                            setSale({ ...sale, description: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Items Table */}
            <div className="p-6 pt-0">
                <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-sm">
                    <thead>
                        <tr className="bg-blue-50 text-center text-gray-700">
                            <th className="border p-2">#</th>
                            <th className="border p-2">نام دارو</th>
                            <th className="border p-2">تعداد</th>
                            <th className="border p-2">قیمت واحد (افغانی)</th>
                            <th className="border p-2">جمع جزء</th>
                            <th className="border p-2">حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sale.items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="p-4 text-center text-gray-400"
                                >
                                    هیچ دارویی اضافه نشده است
                                </td>
                            </tr>
                        ) : (
                            sale.items.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="text-center transition hover:bg-gray-50"
                                >
                                    <td className="border p-2">{idx + 1}</td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            className="w-full rounded-md border p-1 text-center"
                                            placeholder="نام دارو"
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
                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-20 rounded-md border p-1 text-center"
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
                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-24 rounded-md border p-1 text-center"
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
                                    <td className="border p-2 font-semibold">
                                        {item.subtotal.toLocaleString()}
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            className="rounded-full px-2 text-red-600 hover:bg-red-50"
                                            onClick={() => removeItem(idx)}
                                        >
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="mt-4 flex items-center justify-between">
                    <button
                        className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        onClick={addItem}
                    >
                        + افزودن دارو
                    </button>

                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-700">
                            مجموع کل:{' '}
                            <span className="text-xl font-bold text-blue-700">
                                {sale.total_amount.toLocaleString()} افغانی
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t p-6">
                <p className="text-sm text-gray-500">
                    ثبت توسط: {currentUser.name}
                </p>
                <button
                    className="rounded-md bg-blue-700 px-6 py-2 text-white hover:bg-blue-800"
                    onClick={submitSale}
                >
                    ثبت و چاپ فاکتور
                </button>
            </div>
        </div>
    );
}
