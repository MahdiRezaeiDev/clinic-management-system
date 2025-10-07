import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    CreditCard,
    Edit3,
    Plus,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

export default function PurchasesIndex({ purchases }) {
    const [activeTab, setActiveTab] = useState('remaining');
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const remaining = purchases.filter((p) => p.status === 'unpaid');
    const fullyPaid = purchases.filter((p) => p.status === 'paid');
    const displayed = activeTab === 'remaining' ? remaining : fullyPaid;

    const confirmDelete = (id) => {
        setSelectedId(id);
        setConfirmingDelete(true);
    };

    const closeModal = () => {
        setConfirmingDelete(false);
        setSelectedId(null);
    };

    const deletePurchase = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.delete(route('medicine.destroy', selectedId), {
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                closeModal();
            },
        });
    };

    return (
        <AuthenticatedLayout title="خریدهای ثبت شده">
            <Head title="خریدهای ثبت شده" />

            <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8 md:px-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        لیست خریدها
                    </h1>
                    <Link
                        href={route('medicine.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        ثبت خرید جدید
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex w-fit gap-2 rounded-xl bg-gray-100 p-1">
                    <button
                        onClick={() => setActiveTab('remaining')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                            activeTab === 'remaining'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        <AlertCircle className="h-4 w-4" />
                        باقی مانده
                    </button>
                    <button
                        onClick={() => setActiveTab('fullyPaid')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                            activeTab === 'fullyPaid'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        <CheckCircle className="h-4 w-4" />
                        تسویه شده
                    </button>
                </div>

                {/* Purchases Grid */}
                {displayed.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {displayed.map((purchase) => (
                            <div
                                key={purchase.id}
                                className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:shadow-lg"
                            >
                                <div>
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {purchase.supplier_name}
                                        </h3>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                purchase.status === 'paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {purchase.status === 'paid'
                                                ? 'تسویه شده'
                                                : 'پرداخت نشده'}
                                        </span>
                                    </div>

                                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>تاریخ خرید:</span>
                                            <span>
                                                {purchase.purchase_date}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>کل مبلغ:</span>
                                            <span className="font-semibold text-gray-800">
                                                {Number(
                                                    purchase.total_amount,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>پرداخت شده:</span>
                                            <span className="font-semibold text-green-600">
                                                {Number(
                                                    purchase.paid_amount,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>باقی مانده:</span>
                                            <span className="font-semibold text-red-600">
                                                {Number(
                                                    purchase.remaining_amount,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-5 flex justify-between border-t border-gray-100 pt-3 text-sm font-medium">
                                    <Link
                                        href={route(
                                            'medicine.edit',
                                            purchase.id,
                                        )}
                                        className="flex items-center gap-1 text-blue-600 transition-all hover:text-blue-800 focus:outline-none focus:ring-0 active:scale-95"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        ویرایش
                                    </Link>

                                    <button
                                        onClick={() =>
                                            router.visit(
                                                route(
                                                    'medicine.payment',
                                                    purchase.id,
                                                ),
                                            )
                                        }
                                        className="flex items-center gap-1 text-amber-600 transition-all hover:text-amber-800 focus:outline-none focus:ring-0 active:scale-95"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        پرداخت
                                    </button>

                                    <button
                                        onClick={() =>
                                            confirmDelete(purchase.id)
                                        }
                                        className="flex items-center gap-1 text-red-600 transition-all hover:text-red-800 focus:outline-none focus:ring-0 active:scale-95"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        حذف
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border bg-white py-10 text-center text-gray-500 shadow-sm">
                        <p>هیچ خریدی در این بخش وجود ندارد</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={confirmingDelete} onClose={closeModal}>
                <form onSubmit={deletePurchase} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این خرید را حذف کنید؟
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        بعد از حذف، اطلاعات این خرید و پرداخت‌های مرتبط دیگر
                        قابل بازیابی نخواهد بود.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>

                        <DangerButton
                            className="ms-3 px-4"
                            disabled={processing}
                        >
                            {processing ? 'در حال حذف...' : 'حذف خرید'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
