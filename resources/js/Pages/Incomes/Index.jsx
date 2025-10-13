import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ incomes, titles, paymentMethods, filters }) {
    const { flash } = usePage().props;

    const [showToast, setShowToast] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShowToast(true);
            const timeout = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    // Filters
    const [search, setSearch] = useState(filters.search || '');
    const [title, setTitle] = useState(filters.title || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route('incomes.index'),
            { search, title },
            { preserveState: true },
        );
    };

    // Form for Add/Edit
    const { data, setData, post, put, processing, reset, errors } = useForm({
        title: '',
        amount: '',
        payment_method: 'cash',
        income_date: '',
        description: '',
    });

    const openModal = (income = null) => {
        if (income) {
            setEditMode(true);
            setSelectedIncome(income);
            setData({
                title: income.title,
                amount: income.amount,
                payment_method: income.payment_method,
                income_date: income.income_date,
                description: income.description || '',
            });
        } else {
            setEditMode(false);
            setData({
                title: '',
                amount: '',
                payment_method: 'cash',
                income_date: '',
                description: '',
            });
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editMode && selectedIncome) {
            put(route('incomes.update', selectedIncome.id), {
                preserveScroll: true,
                onSuccess: closeModal,
            });
        } else {
            post(route('incomes.store'), {
                preserveScroll: true,
                onSuccess: closeModal,
            });
        }
    };

    const confirmDeleteIncome = (income) => {
        setSelectedIncome(income);
        setConfirmDelete(true);
    };

    const deleteIncome = () => {
        router.delete(route('patient-incomes.destroy', selectedIncome.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmDelete(false),
        });
    };

    return (
        <AuthenticatedLayout title="مدیریت عایدات بیماران">
            <Head title="مدیریت عایدات بیماران" />

            <div className="pt-8">
                <div className="w-full overflow-hidden rounded bg-white shadow-md">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <h3 className="text-lg font-semibold text-gray-700">
                            عایدات بیماران
                        </h3>
                        <PrimaryButton onClick={() => openModal()}>
                            + عاید جدید
                        </PrimaryButton>
                    </div>

                    {/* Filters */}
                    <form
                        onSubmit={handleFilter}
                        className="flex flex-wrap items-center gap-3 border-b bg-gray-50 px-4 py-3"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="جستجو توضیحات..."
                            className="w-40 rounded border px-3 py-2 text-sm"
                        />
                        <select
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded border px-3 py-2 text-sm"
                        >
                            <option value="">همه بخش‌ها</option>
                            {Object.entries(titles).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <PrimaryButton type="submit" className="text-sm">
                            اعمال فیلتر
                        </PrimaryButton>
                    </form>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-3 text-right">#</th>
                                    <th className="p-3 text-right">بخش</th>
                                    <th className="p-3 text-right">مبلغ</th>
                                    <th className="p-3 text-right">
                                        روش پرداخت
                                    </th>
                                    <th className="p-3 text-right">تاریخ</th>
                                    <th className="p-3 text-right">توضیحات</th>
                                    <th className="p-3 text-right">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incomes.data.length ? (
                                    incomes.data.map((income, index) => (
                                        <tr
                                            key={income.id}
                                            className="border-t hover:bg-gray-50"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">
                                                {titles[income.title]}
                                            </td>
                                            <td className="p-3">
                                                {Number(
                                                    income.amount,
                                                ).toLocaleString()}{' '}
                                                افغانی
                                            </td>
                                            <td className="p-3">
                                                {
                                                    paymentMethods[
                                                        income.payment_method
                                                    ]
                                                }
                                            </td>
                                            <td className="p-3">
                                                {income.income_date}
                                            </td>
                                            <td className="p-3">
                                                {income.description || '-'}
                                            </td>
                                            <td className="flex gap-2 p-3">
                                                <button
                                                    onClick={() =>
                                                        openModal(income)
                                                    }
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    ویرایش
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        confirmDeleteIncome(
                                                            income,
                                                        )
                                                    }
                                                    className="text-red-600 hover:underline"
                                                >
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="py-4 text-center text-gray-500"
                                        >
                                            هیچ عایدی یافت نشد.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {incomes.links.length > 1 && (
                        <div className="flex justify-center p-4">
                            {incomes.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`mx-1 rounded px-3 py-1 text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <form onSubmit={submit} className="space-y-4 p-6">
                    <h2 className="text-lg font-semibold">
                        {editMode ? 'ویرایش عاید' : 'افزودن عاید جدید'}
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1 block text-sm">بخش</label>
                            <select
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1"
                            >
                                <option value="">انتخاب کنید</option>
                                {Object.entries(titles).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.title && (
                                <div className="text-xs text-red-600">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">مبلغ</label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) =>
                                    setData('amount', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1"
                            />
                            {errors.amount && (
                                <div className="text-xs text-red-600">
                                    {errors.amount}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">
                                روش پرداخت
                            </label>
                            <select
                                value={data.payment_method}
                                onChange={(e) =>
                                    setData('payment_method', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1"
                            >
                                {Object.entries(paymentMethods).map(
                                    ([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ),
                                )}
                            </select>
                            {errors.payment_method && (
                                <div className="text-xs text-red-600">
                                    {errors.payment_method}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">تاریخ</label>
                            <AfghanDatePicker
                                value={data.income_date}
                                onChange={(date) =>
                                    setData(
                                        'income_date',
                                        date.format('YYYY/MM/DD'),
                                    )
                                }
                            />
                            {errors.income_date && (
                                <div className="text-xs text-red-600">
                                    {errors.income_date}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm">توضیحات</label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        ></textarea>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editMode ? 'بروزرسانی' : 'ذخیره'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal show={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <div className="p-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-700">
                        آیا مطمئن هستید که می‌خواهید حذف کنید؟
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        این عمل غیرقابل بازگشت است.
                    </p>
                    <div className="flex justify-end gap-2">
                        <SecondaryButton
                            onClick={() => setConfirmDelete(false)}
                        >
                            انصراف
                        </SecondaryButton>
                        <DangerButton onClick={deleteIncome}>حذف</DangerButton>
                    </div>
                </div>
            </Modal>

            {/* Toast */}
            <Transition
                show={showToast}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="rounded bg-green-600 px-6 py-3 text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
