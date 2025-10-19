import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

export default function Index({
    expenses,
    categories,
    paymentMethods,
    filters,
}) {
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(
        filters.category || '',
    );
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        category: 'other',
        amount: '',
        payment_method: 'cash',
        expense_date: '',
        description: '',
    });

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            route('expenses.index'),
            {
                search,
                category: categoryFilter,
                start_date:
                    startDate &&
                    moment(startDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
                end_date:
                    endDate &&
                    moment(endDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
            },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryFilter('');
        setStartDate('');
        setEndDate('');
        router.get(route('expenses.index'), {}, { preserveState: true });
    };

    const openAddModal = () => {
        reset();
        setShowAddModal(true);
    };

    const openEditModal = (expense) => {
        setSelectedExpense(expense);
        setData({
            category: expense.category,
            amount: expense.amount,
            payment_method: expense.payment_method,
            expense_date: expense.expense_date,
            description: expense.description,
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (expense) => {
        setSelectedExpense(expense);
        setShowDeleteModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedExpense(null);
        reset();
        clearErrors();
    };

    const submitAdd = (e) => {
        e.preventDefault();
        const expense_date = moment(data.expense_date, 'jYYYY/jMM/jDD').format(
            'YYYY-MM-DD',
        );
        data.expense_date = expense_date;
        post(route('expenses.store'), { onSuccess: closeModals });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('expenses.update', selectedExpense.id), {
            onSuccess: closeModals,
        });
    };

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('expenses.destroy', selectedExpense.id), {
            onSuccess: closeModals,
        });
    };

    return (
        <AuthenticatedLayout title="هزینه‌ها">
            <Head title="هزینه‌ها" />

            <div className="relative m-6 flex min-w-0 flex-col break-words rounded bg-white pb-10 shadow-lg">
                {/* Header + Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-6">
                    <h3 className="text-blueGray-700 text-lg font-semibold">
                        لیست هزینه‌ها
                    </h3>
                    <PrimaryButton onClick={openAddModal}>
                        ثبت هزینه جدید
                    </PrimaryButton>
                </div>

                {/* Filter Form */}
                <form
                    onSubmit={applyFilter}
                    className="mb-4 grid grid-cols-1 items-center gap-3 px-4 md:grid-cols-5"
                >
                    <input
                        type="text"
                        placeholder="جستجو توضیحات..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full border border-gray-300 px-7 py-2 text-sm"
                    >
                        <option value="">همه دسته‌بندی‌ها</option>
                        {Object.entries(categories).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <AfghanDatePicker
                        value={startDate}
                        onChange={(value) => {
                            setStartDate(value.format('YYYY/MM/DD'));
                        }}
                        className="w-40 rounded border px-3 py-2 text-sm"
                        placeholder="از تاریخ"
                    />
                    <AfghanDatePicker
                        value={endDate}
                        onChange={(value) => {
                            setEndDate(value.format('YYYY/MM/DD'));
                        }}
                        className="w-40 rounded border px-3 py-2 text-sm"
                        placeholder="تا تاریخ"
                    />

                    <div className="flex w-full flex-col gap-2 sm:flex-row">
                        <PrimaryButton type="submit" className="flex-1">
                            اعمال فیلتر
                        </PrimaryButton>
                        <DangerButton
                            type="button"
                            className="flex-1"
                            onClick={clearFilters}
                        >
                            حذف فیلتر
                        </DangerButton>
                    </div>
                </form>

                {/* Table */}
                <div className="overflow-auto px-4">
                    <table className="min-w-full divide-y divide-gray-200 rounded bg-white shadow">
                        <thead className="bg-teal-700 text-white">
                            <tr>
                                <th className="px-6 py-3 text-right text-sm">
                                    #
                                </th>
                                <th className="px-6 py-3 text-right text-sm">
                                    دسته‌بندی
                                </th>
                                <th className="px-6 py-3 text-right text-sm">
                                    مبلغ
                                </th>
                                <th className="px-6 py-3 text-right text-sm">
                                    روش پرداخت
                                </th>
                                <th className="px-6 py-3 text-right text-sm">
                                    تاریخ
                                </th>
                                <th className="px-6 py-3 text-right text-sm">
                                    توضیحات
                                </th>
                                <th className="px-6 py-3 text-right text-sm">
                                    عملیات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {expenses.data.length ? (
                                expenses.data.map((expense, index) => (
                                    <tr key={expense.id}>
                                        <td className="px-6 py-3 text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-3 text-sm">
                                            {categories[expense.category]}
                                        </td>
                                        <td className="px-6 py-3 text-sm">
                                            {expense.amount.toLocaleString()}{' '}
                                            افغانی
                                        </td>
                                        <td className="px-6 py-3 text-sm">
                                            {
                                                paymentMethods[
                                                    expense.payment_method
                                                ]
                                            }
                                        </td>
                                        <td className="px-6 py-3 text-sm">
                                            {moment(
                                                expense.expense_date,
                                            ).format('jYYYY/jMM/jDD')}
                                        </td>
                                        <td className="px-6 py-3 text-sm">
                                            {expense.description}
                                        </td>
                                        <td className="flex gap-2 px-6 py-3 text-sm">
                                            <Edit
                                                onClick={() =>
                                                    openEditModal(expense)
                                                }
                                                className="h-5 w-5 cursor-pointer text-teal-700"
                                                title="ویرایش"
                                            />
                                            <Trash
                                                onClick={() =>
                                                    openDeleteModal(expense)
                                                }
                                                className="h-5 w-5 cursor-pointer text-rose-700"
                                                title="حذف"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="p-4 text-center text-sm text-gray-500"
                                    >
                                        هیچ هزینه‌ای ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {expenses.links.length > 3 && (
                        <div className="mt-4 flex justify-center">
                            {expenses.links.map((link, idx) => {
                                let label = link.label;

                                // Convert pagination text to Persian
                                if (label.includes('Next')) label = 'بعدی';
                                else if (label.includes('Previous'))
                                    label = 'قبلی';

                                return (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            link.url && router.get(link.url)
                                        }
                                        className={`mx-1 rounded px-3 py-1 text-sm ${
                                            link.active
                                                ? 'bg-teal-700 text-white'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            {/* Add/Edit/Delete Modals */}
            <Modal show={showAddModal || showEditModal} onClose={closeModals}>
                <form
                    onSubmit={showAddModal ? submitAdd : submitEdit}
                    className="space-y-4 p-6"
                >
                    <h2 className="text-lg font-medium">
                        {showAddModal ? 'ثبت هزینه جدید' : 'ویرایش هزینه'}
                    </h2>

                    <div className="flex gap-3">
                        <select
                            className="w-1/3 rounded border border-gray-300 px-8 py-2 text-sm"
                            value={data.category}
                            onChange={(e) =>
                                setData('category', e.target.value)
                            }
                        >
                            <option value="">انتخاب دسته‌بندی</option>
                            {Object.entries(categories).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="مبلغ"
                            className="w-1/3 rounded border border-gray-300 px-3 py-2 text-sm"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        <select
                            className="w-1/3 rounded border border-gray-300 px-8 py-2 text-sm"
                            value={data.payment_method}
                            onChange={(e) =>
                                setData('payment_method', e.target.value)
                            }
                        >
                            <option value="">روش پرداخت</option>
                            {Object.entries(paymentMethods).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>

                    <AfghanDatePicker
                        value={data.expense_date}
                        onChange={(v) =>
                            setData('expense_date', v.format('YYYY-MM-DD'))
                        }
                    />

                    <textarea
                        placeholder="توضیحات (اختیاری)"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        rows={2}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <div className="flex justify-start gap-3">
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
                    <h2 className="text-lg font-medium">
                        آیا مطمئن هستید که می‌خواهید این هزینه را حذف کنید؟
                    </h2>
                    <div className="mt-4 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModals}>
                            انصراف
                        </SecondaryButton>
                        <DangerButton disabled={processing}>حذف</DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Flash Toast */}
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
                <div className="rounded bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
