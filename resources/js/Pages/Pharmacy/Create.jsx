import AfghanDatePicker from '@/Components/AfghanDatePicker';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import '@/css/factor.css';
import logo from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Settings, Trash } from 'lucide-react';
import { useEffect } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function PharmacySaleInvoiceForm({ staff }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        patient_name: '',
        doctor_name: '',
        sale_type: 'cash',
        payment_method: 'cash',
        sale_date: new DateObject({
            calendar: persian,
            locale: persian_en,
        }).format('YYYY/MM/DD'),
        description: '',
        items: [{ drug_name: '', quantity: 1, unit_price: 0, subtotal: 0 }],
        total_amount: 0,
        discount: 0,
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            { drug_name: '', quantity: 1, unit_price: 0, subtotal: 0 },
        ]);
    };

    const updateItem = (idx, field, value) => {
        const newItems = [...data.items];
        newItems[idx][field] =
            field === 'quantity' || field === 'unit_price'
                ? Number(value)
                : value;
        newItems[idx].subtotal =
            newItems[idx].quantity * newItems[idx].unit_price;

        const totalAmount = newItems.reduce((a, b) => a + b.subtotal, 0);
        setData({
            ...data,
            items: newItems,
            total_amount: totalAmount,
        });
    };

    const removeItem = (idx) => {
        const newItems = data.items.filter((_, i) => i !== idx);
        const totalAmount = newItems.reduce((a, b) => a + b.subtotal, 0);
        setData({
            ...data,
            items: newItems,
            total_amount: totalAmount,
        });
    };

    const updateDiscount = (value) => {
        const num = Number(value);
        setData('discount', isNaN(num) ? 0 : num);
    };

    const totalAfterDiscount = Math.max(data.total_amount - data.discount, 0);

    const submitSale = (e) => {
        e.preventDefault();
        post(route('pharmacy.store'), {
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey) {
                addItem();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
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
                        </div>
                        <div className="flex flex-col">
                            <InputLabel value="سن:" className="font-semibold" />
                            <TextInput
                                value={data.age}
                                onChange={(e) => setData('age', e.target.value)}
                                className="w-full rounded border px-2 py-1 text-right"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel
                                value="جنسیت:"
                                className="font-semibold"
                            />
                            <TextInput
                                value={data.gender}
                                onChange={(e) =>
                                    setData('gender', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1 text-right"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel
                                value="داکتر معالج:"
                                className="font-semibold"
                            />
                            <select
                                value={data.doctor_name}
                                onChange={(e) =>
                                    setData('doctor_name', e.target.value)
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
                        </div>
                    </div>
                </section>

                {/* Items Table */}
                <form onSubmit={submitSale}>
                    <div className="mx-3 mt-4 overflow-hidden rounded-b-xl border-x-4 border-b-4 border-teal-700 shadow-sm print:border-0">
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
                                        قیمت جزء
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
                                            <td className="border-2 border-gray-500 text-right">
                                                <input
                                                    type="text"
                                                    name="drug"
                                                    className="w-full border-none bg-transparent px-1 text-xs font-semibold focus:outline-none"
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
                                            <td className="border-2 border-gray-500 text-center">
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    min="1"
                                                    className="w-full rounded border-none bg-transparent px-1 text-center text-xs font-semibold focus:outline-none"
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
                                            <td className="border-2 border-gray-500 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    name="price"
                                                    className="w-full rounded border-none px-1 text-center text-xs font-semibold"
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
                                            <td className="border-2 border-gray-500 text-center font-medium">
                                                {item.subtotal.toLocaleString()}
                                            </td>
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

                        {/* تخفیف و جمع کل */}
                        <div className="mt-2 px-4 py-1 text-right font-semibold text-gray-800">
                            جمع کل:{' '}
                            <span className="font-bold text-blue-700">
                                {data.total_amount.toLocaleString()} افغانی
                            </span>
                            <br />
                            تخفیف:{' '}
                            <input
                                type="number"
                                min="0"
                                className="ml-2 w-20 rounded border px-1 text-right text-xs font-semibold"
                                value={data.discount}
                                onChange={(e) => updateDiscount(e.target.value)}
                            />
                            <br />
                            جمع پس از تخفیف:{' '}
                            <span className="font-bold text-blue-700">
                                {totalAfterDiscount.toLocaleString()} افغانی
                            </span>
                        </div>

                        {/* Doctor Notes */}
                        <div className="mt-4 border-t border-gray-300 px-4 py-2">
                            <h3 className="mb-2 text-sm font-bold text-teal-700">
                                توصیه‌های پزشک:
                            </h3>
                            <ul className="list-inside list-disc space-y-1 text-[11px] text-gray-700">
                                <li>
                                    مصرف داروها را طبق دستور پزشک ادامه دهید.
                                </li>
                                <li>
                                    در صورت بروز حساسیت یا تب بالا، مراجعه کنید.
                                </li>
                                <li>
                                    استراحت کافی و تغذیه سالم برای کودک رعایت
                                    شود.
                                </li>
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-2 px-4 py-1">
                            <PrimaryButton type="button" onClick={addItem}>
                                + افزودن دارو
                            </PrimaryButton>
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
