import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MoreVertical, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PharmacySalesIndex({ sales }) {
    const [activeTab, setActiveTab] = useState('with');
    const { with: withPrescription, without: withoutPrescription } = sales;
    const displayed =
        activeTab === 'with' ? withPrescription : withoutPrescription;

    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    const [saleId, setSaleId] = useState(null);
    const [confirmingSaleDeletion, setConfirmingSaleDeletion] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

    const { delete: destroy, reset, clearErrors, processing } = useForm({});

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmSaleDeletion = (id) => {
        setConfirmingSaleDeletion(true);
        setSaleId(id);
    };

    const deleteSale = (e) => {
        e.preventDefault();
        destroy(route('pharmacy.destroy', saleId), {
            preserveScroll: true,
            onSuccess: closeModal,
            onFinish: reset,
        });
    };

    const closeModal = () => {
        setConfirmingSaleDeletion(false);
        setShowInvoiceModal(false);
        setSaleId(null);
        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout title="فروش دارو">
            <Head title="فروش دارو" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 pt-8 md:px-10">
                {/* Header */}
                <div className="bg-blueGray-600 flex flex-col items-center justify-between rounded-lg p-6 text-white shadow-sm md:flex-row">
                    <h1 className="text-2xl font-bold">لیست فروش دارو</h1>
                    <Link
                        href={route('pharmacy.create')}
                        className="text-blueGray-600 inline-flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-semibold shadow transition hover:bg-gray-100"
                    >
                        <Plus className="h-4 w-4" /> ثبت فروش جدید
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
                    <button
                        onClick={() => setActiveTab('with')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeTab === 'with'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        با نسخه
                    </button>
                    <button
                        onClick={() => setActiveTab('without')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeTab === 'without'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        بدون نسخه
                    </button>
                </div>

                {/* Sales Table */}
                <div className="rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blueGray-600 text-white">
                            <tr>
                                <th className="p-3 text-right text-sm font-semibold">
                                    تاریخ فروش
                                </th>
                                <th className="p-3 text-right text-sm font-semibold">
                                    نوع فروش
                                </th>
                                <th className="p-3 text-right text-sm font-semibold">
                                    جمع کل
                                </th>
                                <th className="p-3 text-center text-xs font-semibold">
                                    عملیات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {displayed.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-3 text-center text-gray-500"
                                    >
                                        هیچ فروشی در این بخش وجود ندارد
                                    </td>
                                </tr>
                            ) : (
                                displayed.map((sale) => (
                                    <tr
                                        key={sale.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="p-3 text-right text-sm font-semibold text-gray-800">
                                            {sale.sale_date}
                                        </td>
                                        <td className="p-3 text-right text-sm font-semibold text-gray-700">
                                            {sale.has_prescription
                                                ? 'با نسخه'
                                                : 'بدون نسخه'}
                                        </td>
                                        <td className="p-3 text-right text-sm font-semibold text-gray-800">
                                            {sale.total_amount.toLocaleString()}{' '}
                                            افغانی
                                        </td>
                                        <td className="p-3 text-center text-xs">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button className="bg-blueGray-600 hover:bg-blueGray-700 flex items-center gap-1 rounded px-3 py-1 text-xs text-white transition">
                                                        <MoreVertical className="h-4 w-4" />{' '}
                                                        عملیات
                                                    </button>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Link
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        href={route(
                                                            'pharmacy.edit',
                                                            sale.id,
                                                        )}
                                                    >
                                                        ویرایش
                                                    </Link>
                                                    <button
                                                        className="block w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                                                        onClick={() =>
                                                            confirmSaleDeletion(
                                                                sale.id,
                                                            )
                                                        }
                                                    >
                                                        حذف
                                                    </button>
                                                    <button
                                                        className="block w-full px-4 py-2 text-right text-sm text-green-600 hover:bg-gray-100"
                                                        onClick={() => {
                                                            setSaleId(sale.id);
                                                            setShowInvoiceModal(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        نمایش فاکتور
                                                    </button>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingSaleDeletion} onClose={closeModal}>
                <form onSubmit={deleteSale} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این فروش را حذف کنید؟
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        بعد از حذف، اطلاعات فروش دیگر در دسترس نخواهد بود.
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
