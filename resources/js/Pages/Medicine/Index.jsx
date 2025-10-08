import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MoreVertical, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PurchasesIndex({ purchases }) {
    const [activeTab, setActiveTab] = useState('remaining');
    const remaining = purchases.filter((p) => p.status === 'unpaid');
    const fullyPaid = purchases.filter((p) => p.status === 'paid');
    const displayed = activeTab === 'remaining' ? remaining : fullyPaid;

    const { flash } = usePage().props;
    const [purchaseId, setPurchaseId] = useState(null);
    const [showFlash, setShowFlash] = useState(false);
    const [confirmingPurchaseDeletion, setConfirmingPurchaseDeletion] =
        useState(false);

    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm();

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmPurchaseDeletion = (id) => {
        setConfirmingPurchaseDeletion(true);
        setPurchaseId(id);
    };

    const deletePurchase = (e) => {
        e.preventDefault();
        destroy(route('medicine.destroy', purchaseId), {
            preserveScroll: true,
            onSuccess: closeModal,
            onError: () => console.log(errors),
            onFinish: reset,
        });
    };

    const closeModal = () => {
        setConfirmingPurchaseDeletion(false);
        setPurchaseId(null);
        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout title="خریدهای ثبت شده">
            <Head title="خریدهای ثبت شده" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 pt-8 md:px-10">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        لیست خریدها
                    </h1>
                    <Link
                        href={route('medicine.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow transition hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" /> ثبت خرید جدید
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
                    <button
                        onClick={() => setActiveTab('remaining')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeTab === 'remaining'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        باقی مانده
                    </button>
                    <button
                        onClick={() => setActiveTab('fullyPaid')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeTab === 'fullyPaid'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        تسویه شده
                    </button>
                </div>

                {/* Purchases Table */}
                <div className="rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blueGray-600 text-white">
                            <tr>
                                <th className="p-3 text-right text-sm font-medium">
                                    شرکت
                                </th>
                                <th className="p-3 text-right text-sm font-medium">
                                    توضیحات
                                </th>
                                <th className="p-3 text-center text-sm font-medium">
                                    تاریخ
                                </th>
                                <th className="p-3 text-center text-sm font-medium">
                                    کل مبلغ
                                </th>
                                <th className="p-3 text-center text-sm font-medium">
                                    پرداخت شده
                                </th>
                                <th className="p-3 text-center text-sm font-medium">
                                    باقی مانده
                                </th>
                                <th className="p-3 text-center text-sm font-medium">
                                    وضعیت
                                </th>
                                <th className="p-3"></th>
                                <th className="p-3 text-center text-xs font-medium">
                                    اقدامات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {displayed.map((purchase) => (
                                <tr
                                    key={purchase.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="p-3 text-right text-sm font-semibold text-gray-800">
                                        {purchase.supplier_name}
                                    </td>
                                    <td className="line-clamp-2 p-2 text-right text-xs font-semibold text-gray-500">
                                        {purchase.description || '-'}
                                    </td>
                                    <td className="p-3 text-center text-xs font-semibold text-gray-700">
                                        {purchase.purchase_date}
                                    </td>
                                    <td className="p-3 text-center text-xs font-semibold text-gray-800">
                                        {purchase.total_amount.toLocaleString()}
                                    </td>
                                    <td className="p-3 text-center text-xs font-semibold text-green-600">
                                        {purchase.paid_amount.toLocaleString()}
                                    </td>
                                    <td className="p-3 text-center text-xs font-semibold text-red-600">
                                        {purchase.remaining_amount.toLocaleString()}
                                    </td>
                                    <td className="p-3 text-center text-xs font-semibold">
                                        <span className="flex items-center justify-center gap-2">
                                            <span
                                                className={`h-3 w-3 rounded-full ${purchase.status === 'paid' ? 'bg-green-500' : 'bg-gray-400'}`}
                                            ></span>
                                            <span className="text-gray-700">
                                                {purchase.status === 'paid'
                                                    ? 'تسویه شده'
                                                    : 'پرداخت نشده'}
                                            </span>
                                        </span>
                                    </td>

                                    {/* Quick Payment */}
                                    <td className="p-3 text-xs font-semibold">
                                        <Link
                                            className="rounded-md bg-green-50 px-3 py-1 font-medium text-green-600 transition hover:bg-green-100"
                                            href={route(
                                                'medicine.index',
                                                purchase.id,
                                            )}
                                        >
                                            پرداخت
                                        </Link>
                                    </td>

                                    {/* Dropdown Actions */}
                                    <td className="flex justify-center p-2 text-xs">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className="bg-blueGray-600 hover:bg-blueGray-700 flex items-center gap-1 rounded px-3 py-1 text-xs text-white transition">
                                                    <MoreVertical className="h-4 w-4" />
                                                    عملیات
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Link
                                                    href={route(
                                                        'medicine.edit',
                                                        purchase.id,
                                                    )}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    ویرایش
                                                </Link>
                                                <button
                                                    className="block w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                                                    onClick={() =>
                                                        confirmPurchaseDeletion(
                                                            purchase.id,
                                                        )
                                                    }
                                                >
                                                    حذف
                                                </button>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {displayed.length === 0 && (
                    <div className="rounded-lg border bg-white py-10 text-center text-gray-500 shadow-sm">
                        <p>هیچ خریدی در این بخش وجود ندارد</p>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingPurchaseDeletion} onClose={closeModal}>
                <form onSubmit={deletePurchase} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این خرید را حذف کنید؟
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        بعد از حذف خرید، اطلاعات مرتبط با آن دیگر در دسترس
                        نخواهد بود.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>
                        <DangerButton disabled={processing}>حذف</DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Flash Message */}
            <Transition
                show={showFlash}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="rounded bg-green-600 p-3 text-sm text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
