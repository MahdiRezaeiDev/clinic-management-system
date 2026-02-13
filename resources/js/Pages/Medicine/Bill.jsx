import logo from '@/img/factory.svg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    Hash,
    MapPin,
    Package,
    Phone,
    Printer,
    Receipt,
} from 'lucide-react';
import moment from 'moment-jalaali';

export default function BillShow({ purchase }) {
    // Calculate totals
    const totalItems =
        purchase.items?.reduce((sum, item) => sum + Number(item.quantity), 0) ||
        0;
    const paymentPercentage =
        purchase.total_amount > 0
            ? Math.round((purchase.paid_amount / purchase.total_amount) * 100)
            : 0;

    return (
        <AuthenticatedLayout title={`جزئیات فاکتور #${purchase.id}`}>
            <Head title={`جزئیات فاکتور #${purchase.id}`} />

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
                {/* Header with Back Button */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href={route('medicine.index')}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition-all hover:bg-gray-50 hover:shadow-md"
                    >
                        <ArrowRight className="h-4 w-4" />
                        بازگشت به لیست خریدها
                    </Link>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition-all hover:bg-gray-50 hover:shadow-md"
                        >
                            <Printer className="h-4 w-4" />
                            چاپ فاکتور
                        </button>
                        <Link
                            href={route('medicine.payments.index', purchase.id)}
                            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition-all hover:bg-teal-700 hover:shadow-md"
                        >
                            <Eye className="h-4 w-4" />
                            مشاهده پرداخت‌ها
                        </Link>
                    </div>
                </div>

                {/* Main Invoice Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl print:shadow-none">
                    {/* Invoice Header */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-6 text-white">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 overflow-hidden rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {purchase.supplier.company_name ||
                                            'نام شرکت ثبت نشده'}
                                    </h1>
                                    <p className="mt-1 text-sm text-teal-100">
                                        فاکتور خرید دارو و تجهیزات پزشکی
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-left backdrop-blur-sm">
                                <p className="text-sm text-teal-100">
                                    شماره فاکتور
                                </p>
                                <p className="text-3xl font-bold">
                                    #{purchase.id}
                                </p>
                                <p className="mt-1 text-xs text-teal-100">
                                    تاریخ چاپ:{' '}
                                    {moment().format('jDD jMMMM jYYYY')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Info Cards */}
                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        {/* Supplier Info */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Building2 className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="font-semibold text-gray-800">
                                    اطلاعات تأمین‌کننده
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Building2 className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">شرکت:</span>
                                    <span className="font-medium text-gray-800">
                                        {purchase.supplier.company_name ||
                                            'ثبت نشده'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        شماره تماس:
                                    </span>
                                    <span
                                        className="font-medium text-gray-800"
                                        dir="ltr"
                                    >
                                        {purchase.supplier.phone || '-'}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">آدرس:</span>
                                    <span className="flex-1 font-medium text-gray-800">
                                        {purchase.supplier.address ||
                                            'آدرس ثبت نشده'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Info */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-teal-100 p-2">
                                    <Receipt className="h-5 w-5 text-teal-700" />
                                </div>
                                <h3 className="font-semibold text-gray-800">
                                    اطلاعات فاکتور
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Hash className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        شماره فاکتور:
                                    </span>
                                    <span className="font-bold text-gray-800">
                                        #{purchase.id}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        تاریخ خرید:
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {moment(purchase.purchase_date).format(
                                            'jDD jMMMM jYYYY',
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FileText className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">
                                        توضیحات:
                                    </span>
                                    <span className="line-clamp-1 font-medium text-gray-800">
                                        {purchase.description || 'بدون توضیحات'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status & Progress Section */}
                    <div className="mx-6 mb-6 grid gap-4 md:grid-cols-3">
                        {/* Status Badge */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4">
                            <p className="mb-2 text-xs text-gray-500">
                                وضعیت پرداخت
                            </p>
                            {purchase.status === 'paid' ? (
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-green-100 p-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-green-700">
                                            تسویه شده
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            کاملاً پرداخت شده
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-orange-100 p-2">
                                        <Clock className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-orange-700">
                                            پرداخت نشده
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {paymentPercentage}% پرداخت شده
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Progress */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 md:col-span-2">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    پیشرفت پرداخت
                                </p>
                                <p className="text-sm font-bold text-teal-700">
                                    {paymentPercentage}%
                                </p>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
                                    style={{ width: `${paymentPercentage}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs">
                                <span>
                                    پرداخت شده:{' '}
                                    {purchase.paid_amount.toLocaleString()} ؋
                                </span>
                                <span>
                                    باقی مانده:{' '}
                                    {purchase.remaining_amount.toLocaleString()}{' '}
                                    ؋
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    {purchase.items?.length > 0 && (
                        <div className="px-6 pb-6">
                            <div className="mb-3 flex items-center gap-2">
                                <Package className="h-5 w-5 text-teal-600" />
                                <h3 className="text-sm font-semibold text-gray-800">
                                    جزئیات اقلام خریداری‌شده
                                </h3>
                                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                    {purchase.items.length} قلم
                                </span>
                            </div>
                            <div className="overflow-hidden rounded-xl border border-gray-200">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-teal-700 to-teal-600">
                                            <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                                #
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-white">
                                                نام محصول
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-white">
                                                تعداد
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-white">
                                                قیمت واحد
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-white">
                                                مجموع
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {purchase.items.map((item, index) => {
                                            const itemTotal =
                                                Number(item.quantity) *
                                                Number(item.unit_price);
                                            return (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-teal-50/50"
                                                >
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-600">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3">
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {item.name}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-center">
                                                        <span className="text-sm text-gray-600">
                                                            {item.quantity}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-left">
                                                        <span className="text-sm text-gray-600">
                                                            {Number(
                                                                item.unit_price,
                                                            ).toLocaleString()}
                                                        </span>
                                                        <span className="mr-1 text-xs text-gray-400">
                                                            ؋
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-left">
                                                        <span className="text-sm font-bold text-gray-800">
                                                            {itemTotal.toLocaleString()}
                                                        </span>
                                                        <span className="mr-1 text-xs text-gray-400">
                                                            ؋
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                                            >
                                                مجموع کل اقلام
                                            </td>
                                            <td className="px-4 py-3 text-left text-sm font-bold text-gray-800">
                                                {totalItems} عدد
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Financial Summary */}
                    <div className="mx-6 mb-6 rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 p-5">
                        <h3 className="mb-4 text-sm font-semibold text-gray-800">
                            خلاصه مالی
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg bg-white p-4">
                                <p className="mb-1 text-xs text-gray-500">
                                    مجموع کل
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {purchase.total_amount.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">افغانی</p>
                            </div>
                            <div className="rounded-lg bg-white p-4">
                                <p className="mb-1 text-xs text-gray-500">
                                    پرداخت شده
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                    {purchase.paid_amount.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">افغانی</p>
                            </div>
                            <div className="rounded-lg bg-white p-4">
                                <p className="mb-1 text-xs text-gray-500">
                                    باقی مانده
                                </p>
                                <p
                                    className={`text-xl font-bold ${
                                        purchase.remaining_amount > 0
                                            ? 'text-orange-600'
                                            : 'text-green-600'
                                    }`}
                                >
                                    {purchase.remaining_amount.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">افغانی</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="border-t border-gray-200 px-6 py-4 text-center text-xs text-gray-500">
                        <p>این سند به عنوان فاکتور رسمی خرید می‌باشد.</p>
                        <p className="mt-1">
                            سیستم مدیریت داروخانه - {moment().format('jYYYY')}
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// ArrowRight component (since it might not be imported)
function ArrowRight(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
