import PrimaryButton from '@/Components/PrimaryButton';
import log from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PurchasePayments({ medicine, payments }) {
    const totalPaid = payments.reduce(
        (sum, p) => sum + parseFloat(p.amount),
        0,
    );
    const remaining = medicine.total_amount - totalPaid;

    return (
        <AuthenticatedLayout title="صورتحساب پرداخت‌ها">
            <Head title="صورتحساب پرداخت‌ها" />

            <div className="mx-auto max-w-5xl px-4 py-8 font-sans md:px-0">
                {/* Header / Branding */}
                <div className="bg-blueGray-600 flex items-center justify-between rounded-t-lg p-6 text-white shadow-md print:bg-white print:text-black print:shadow-none">
                    <div>
                        <h1 className="text-2xl font-bold">فروشگاه دارو</h1>
                        <p className="text-sm opacity-80">صورتحساب خرید</p>
                    </div>
                    <img
                        src={log}
                        alt="Logo"
                        className="h-12 w-12 rounded-full"
                    />
                </div>

                {/* Invoice Summary Cards */}
                <div className="-mt-6 mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 print:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 text-center shadow print:shadow-none">
                        <p className="text-sm text-gray-500">جمع کل</p>
                        <p className="text-xl font-bold">
                            {medicine.total_amount.toLocaleString()} AFN
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 text-center shadow print:shadow-none">
                        <p className="text-sm text-gray-500">پرداخت شده</p>
                        <p className="text-xl font-bold text-green-600">
                            {totalPaid.toLocaleString()}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 text-center shadow print:shadow-none">
                        <p className="text-sm text-gray-500">باقی مانده</p>
                        <p className="text-xl font-bold text-red-600">
                            {remaining.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow print:shadow-none">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-100 print:bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-right">
                                    تاریخ پرداخت
                                </th>
                                <th className="px-4 py-2 text-right">مبلغ</th>
                                <th className="px-4 py-2 text-right">
                                    روش پرداخت
                                </th>
                                <th className="px-4 py-2 text-right">
                                    توضیحات
                                </th>
                                <th className="px-4 py-2 text-center">وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, idx) => (
                                <tr
                                    key={p.id}
                                    className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 print:bg-white`}
                                >
                                    <td className="px-4 py-2 text-right">
                                        {p.payment_date}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {p.amount.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {p.payment_method || '-'}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {p.description || '-'}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                p.amount === remaining
                                                    ? 'bg-red-200 text-red-800'
                                                    : 'bg-green-200 text-green-800'
                                            }`}
                                        >
                                            {p.amount === remaining
                                                ? 'پرداخت نشده'
                                                : 'پرداخت شده'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-200 font-semibold print:bg-gray-300">
                            <tr>
                                <td className="px-4 py-2 text-right">
                                    جمع کل پرداخت‌ها
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {totalPaid.toLocaleString()}
                                </td>
                                <td className="px-4 py-2" colSpan={3}></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Print Button */}
                <div className="mt-6 flex justify-end print:hidden">
                    <PrimaryButton onClick={() => window.print()}>
                        چاپ صورتحساب
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
