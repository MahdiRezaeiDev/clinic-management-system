import logo from '@/img/factory.svg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function BillShow({ purchase }) {
    console.log(purchase);

    return (
        <AuthenticatedLayout title="جزئیات بل">
            <Head title="جزئیات بل" />

            <div className="border-blueGray-200 mx-auto mt-10 max-w-4xl rounded-lg border p-6 text-right shadow-md md:p-8">
                {/* Header */}
                <div className="border-blueGray-200 mb-6 flex items-center justify-between border-b pb-3">
                    <div className="text-right">
                        <h1 className="text-blueGray-700 mb-1 text-lg font-bold">
                            {purchase.supplier.company_name ||
                                'نام شرکت ثبت نشده'}
                        </h1>
                        <p className="text-blueGray-600 mb-1 text-sm">
                            {purchase.supplier.address || 'آدرس ثبت نشده'}
                        </p>
                        <p className="text-blueGray-600 text-sm">
                            شماره تماس: {purchase.supplier.phone || '-'}
                        </p>
                    </div>
                    <img
                        src={logo}
                        alt="لوگو"
                        className="w-24 opacity-80 md:w-32"
                    />
                </div>

                {/* Bill Info */}
                <div className="border-blueGray-200 mb-6 overflow-hidden rounded border">
                    <table className="w-full text-right text-sm">
                        <tbody>
                            <tr className="border-blueGray-200 border-b">
                                <td className="bg-blueGray-50 w-32 px-3 py-2 font-semibold">
                                    شماره بل
                                </td>
                                <td className="px-3 py-2">{purchase.id}</td>
                                <td className="bg-blueGray-50 w-32 px-3 py-2 font-semibold">
                                    تاریخ خرید
                                </td>
                                <td className="px-3 py-2" dir="ltr">
                                    {purchase.purchase_date}
                                </td>
                            </tr>
                            <tr>
                                <td className="bg-blueGray-50 px-3 py-2 font-semibold">
                                    وضعیت پرداخت
                                </td>
                                <td className="px-3 py-2" colSpan="3">
                                    <span
                                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                                            purchase.status === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {purchase.status === 'paid'
                                            ? 'پرداخت شده'
                                            : 'پرداخت نشده'}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Items Table (only if exist) */}
                {purchase.items?.length > 0 && (
                    <>
                        <h2 className="text-blueGray-700 mb-2 text-sm font-semibold">
                            جزئیات اقلام خریداری‌شده
                        </h2>
                        <table className="border-blueGray-200 mb-6 w-full rounded border text-right text-xs">
                            <thead className="bg-blueGray-50">
                                <tr>
                                    <th className="border-blueGray-200 border-l px-2 py-1 font-semibold">
                                        نام محصول
                                    </th>
                                    <th className="border-blueGray-200 border-l px-2 py-1 font-semibold">
                                        تعداد
                                    </th>
                                    <th className="border-blueGray-200 border-l px-2 py-1 font-semibold">
                                        قیمت واحد (افغانی)
                                    </th>
                                    <th className="px-2 py-1 font-semibold">
                                        مجموع (افغانی)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchase.items.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="border-blueGray-200 border-t"
                                    >
                                        <td className="border-blueGray-200 border-l px-2 py-1">
                                            {item.name}
                                        </td>
                                        <td className="border-blueGray-200 border-l px-2 py-1 text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="border-blueGray-200 border-l px-2 py-1 text-left">
                                            {Number(
                                                item.unit_price,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-2 py-1 text-left font-semibold">
                                            {(
                                                Number(item.quantity) *
                                                Number(item.unit_price)
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {/* Totals */}
                <div className="border-blueGray-200 border-t pt-4 text-sm">
                    <div className="mb-1 flex justify-between">
                        <span className="text-blueGray-700 font-semibold">
                            مجموع کل
                        </span>
                        <span className="text-blueGray-800">
                            {Number(purchase.total_amount).toLocaleString()}{' '}
                            افغانی
                        </span>
                    </div>
                    <div className="mb-1 flex justify-between">
                        <span className="text-blueGray-700 font-semibold">
                            پرداخت شده
                        </span>
                        <span className="text-blueGray-800">
                            {Number(purchase.paid_amount).toLocaleString()}{' '}
                            افغانی
                        </span>
                    </div>
                    {purchase.remaining_amount > 0 && (
                        <div className="flex justify-between font-semibold text-red-700">
                            <span>باقی‌مانده</span>
                            <span>
                                {Number(
                                    purchase.remaining_amount,
                                ).toLocaleString()}{' '}
                                افغانی
                            </span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <Link
                        href={route('medicine.payments.index', purchase.id)}
                        className="rounded bg-yellow-600 px-3 py-1.5 text-xs text-white shadow transition hover:bg-yellow-700"
                    >
                        مشاهده پرداخت‌ها
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="bg-blueGray-700 hover:bg-blueGray-800 rounded px-3 py-1.5 text-xs text-white shadow transition"
                    >
                        چاپ بل
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
