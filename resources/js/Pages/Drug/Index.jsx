import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function DrugIndex({ drugs, search }) {
    const [data, setData] = useState({
        brand_name: '',
        brand_name_fa: '',
        composition: '',
        composition_fa: '',
        dosage_form: '',
        dosage_form_fa: '',
    });
    const [processing, setProcessing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editDrug, setEditDrug] = useState(null);
    const [deleteDrug, setDeleteDrug] = useState(null);
    const [errors, setErrors] = useState({});

    const openAddModal = () => {
        setData({
            brand_name: '',
            brand_name_fa: '',
            composition: '',
            composition_fa: '',
            dosage_form: '',
            dosage_form_fa: '',
        });
        setShowAddModal(true);
    };

    const openEditModal = (drug) => {
        setData({
            brand_name: drug.brand_name,
            brand_name_fa: drug.brand_name_fa,
            composition: drug.composition,
            composition_fa: drug.composition_fa,
            dosage_form: drug.dosage_form,
            dosage_form_fa: drug.dosage_form_fa,
        });
        setEditDrug(drug);
        setShowEditModal(true);
    };

    const openDeleteModal = (drug) => {
        setDeleteDrug(drug);
        setShowDeleteModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setErrors({});
        setEditDrug(null);
        setDeleteDrug(null);
    };

    const submitAdd = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post('/drugs', data, {
            onSuccess: () => {
                toast.success('دارو با موفقیت اضافه شد!');
                setProcessing(false);
                closeModals();
            },
            onError: (err) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.put(`/drugs/${editDrug.id}`, data, {
            onSuccess: () => {
                toast.success('دارو با موفقیت ویرایش شد!');
                setProcessing(false);
                closeModals();
            },
            onError: (err) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    const submitDelete = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.delete(`/drugs/${deleteDrug.id}`, {
            onSuccess: () => {
                toast.success('دارو با موفقیت حذف شد!');
                setProcessing(false);
                closeModals();
            },
            onError: () => setProcessing(false),
        });
    };

    return (
        <AuthenticatedLayout title="لیست داروها">
            <Head title="لیست داروها" />
            <div className="p-6 text-right font-sans" dir="rtl">
                <Toaster position="top-left" richColors />

                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">مدیریت داروها</h1>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="جستجوی دارو..."
                            className="rounded border border-gray-300 px-3 py-2 text-sm"
                            onChange={(e) => {
                                const value = e.target.value;

                                router.get(
                                    '/drugs',
                                    { search: value },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    },
                                );
                            }}
                            defaultValue={search}
                        />

                        <PrimaryButton onClick={openAddModal}>
                            افزودن دارو
                        </PrimaryButton>
                    </div>
                </div>

                {/* Drugs Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full overflow-hidden rounded-lg bg-white text-sm shadow">
                        <thead className="bg-teal-700 text-white">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">نام (EN)</th>
                                <th className="px-4 py-2">نام (FA)</th>
                                <th className="px-4 py-2">شکل دارویی (EN)</th>
                                <th className="px-4 py-2">شکل دارویی (FA)</th>
                                <th className="px-4 py-2">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugs.data.map((drug, idx) => (
                                <tr
                                    key={drug.id}
                                    className="border-b even:bg-teal-50 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">
                                        {idx +
                                            1 +
                                            (drugs.current_page - 1) *
                                                drugs.per_page}
                                    </td>
                                    <td className="px-4 py-2">
                                        {drug.brand_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {drug.brand_name_fa}
                                    </td>
                                    <td className="px-4 py-2">
                                        {drug.dosage_form}
                                    </td>
                                    <td className="px-4 py-2">
                                        {drug.dosage_form_fa}
                                    </td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Edit
                                            className="h-5 w-5 text-teal-700"
                                            onClick={() => openEditModal(drug)}
                                        />
                                        <Trash
                                            className="h-5 w-5 text-red-700"
                                            onClick={() =>
                                                openDeleteModal(drug)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {drugs.links.length > 0 && (
                    <div className="mt-4 flex justify-center gap-2">
                        {drugs.links.map((link, idx) => {
                            const isActive = link.active;
                            return (
                                <button
                                    key={idx}
                                    className={`rounded px-3 py-1 text-sm ${
                                        isActive
                                            ? 'bg-teal-700 text-white'
                                            : 'border bg-white text-teal-700 hover:bg-teal-100'
                                    }`}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.get(link.url)
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: link.label
                                            .replace('Next', 'بعدی')
                                            .replace('Previous', 'قبلی'),
                                    }}
                                ></button>
                            );
                        })}
                    </div>
                )}

                {/* Add/Edit/Delete Modals */}
                <Modal
                    show={showAddModal || showEditModal}
                    onClose={closeModals}
                >
                    <form
                        onSubmit={showAddModal ? submitAdd : submitEdit}
                        className="space-y-4"
                    >
                        <h2 className="rounded-t-md bg-teal-700 p-6 text-lg font-medium text-white">
                            {showAddModal ? 'افزودن دارو' : 'ویرایش دارو'}
                        </h2>

                        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                            {[
                                { label: 'نام (EN)', field: 'brand_name' },
                                { label: 'نام (FA)', field: 'brand_name_fa' },
                                { label: 'ترکیب (EN)', field: 'composition' },
                                {
                                    label: 'ترکیب (FA)',
                                    field: 'composition_fa',
                                },
                                {
                                    label: 'شکل دارویی (EN)',
                                    field: 'dosage_form',
                                },
                                {
                                    label: 'شکل دارویی (FA)',
                                    field: 'dosage_form_fa',
                                },
                            ].map(({ label, field }) => (
                                <div key={field} className="flex flex-col">
                                    <label className="mb-1 text-sm">
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        className="rounded border border-gray-300 px-3 py-2 text-sm"
                                        value={data[field]}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [field]: e.target.value,
                                            })
                                        }
                                        required={field === 'brand_name'}
                                    />
                                    <InputError message={errors[field]} />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-start gap-3 p-6">
                            <PrimaryButton disabled={processing}>
                                {showAddModal ? 'ثبت' : 'ویرایش'}
                            </PrimaryButton>
                            <SecondaryButton onClick={closeModals}>
                                انصراف
                            </SecondaryButton>
                        </div>
                    </form>
                </Modal>

                <Modal show={showDeleteModal} onClose={closeModals}>
                    <form onSubmit={submitDelete} className="p-6">
                        <h2 className="mb-3 text-lg font-medium">حذف دارو</h2>
                        <p className="mb-5">
                            آیا مطمئن هستید که می‌خواهید داروی{' '}
                            <strong>{deleteDrug?.brand_name}</strong> را حذف
                            کنید؟
                        </p>
                        <div className="flex justify-end gap-3">
                            <SecondaryButton onClick={closeModals}>
                                انصراف
                            </SecondaryButton>
                            <DangerButton disabled={processing}>
                                حذف
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
