import AfghanDatePicker from '@/Components/AfghanDatePicker';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';

export default function Index({
    incomes,
    categories,
    paymentMethods,
    filters,
}) {
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
    const [categoryFilter, setCategoryFilter] = useState(
        filters.category || '',
    );
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            route('incomes.index'),
            {
                search,
                category: categoryFilter,
                start_date: startDate,
                end_date: endDate,
            },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryFilter('');
        setStartDate('');
        setEndDate('');
        router.get(route('incomes.index'), {}, { preserveState: true });
    };

    // Form for Add/Edit
    const { data, setData, post, put, processing, reset, errors } = useForm({
        category: 'other',
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
                category: income.category,
                amount: income.amount,
                payment_method: income.payment_method,
                income_date: moment(income.income_date).format('jYYYY/jMM/jDD'),
                description: income.description || '',
            });
        } else {
            setEditMode(false);
            setData({
                category: 'other',
                amount: '',
                payment_method: 'cash',
                income_date: new DateObject({
                    calendar: persian,
                    locale: persian_en,
                }).format('YYYY/MM/DD'),
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
        router.delete(route('incomes.destroy', selectedIncome.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmDelete(false),
        });
    };

    let TotalIncome = 0;
    for (const income of incomes.data) {
        TotalIncome += income.amount;
    }

    return (
        <AuthenticatedLayout title="مدیریت عایدات بیماران">
            <Head title="مدیریت عایدات بیماران" />

            <div className="pt-8">
                <div className="relative m-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <h3 className="text-lg font-semibold text-gray-700">
                            عایدات بیماران
                        </h3>
                        <PrimaryButton onClick={() => openModal()}>
                            + عاید جدید
                        </PrimaryButton>
                    </div>

                    {/* Filter Form */}
                    <form
                        onSubmit={applyFilter}
                        className="mb-4 grid grid-cols-1 items-center gap-3 px-4 md:grid-cols-5"
                    >
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
                        <input
                            type="text"
                            placeholder="جستجو توضیحات..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 text-sm"
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
                    <span className="mx-4 inline w-96 bg-sky-700 px-4 py-2 text-xs text-white">
                        مجموع عواید حاصله عبارت است از
                        <span className="px-1 font-semibold text-green-600">
                            {TotalIncome}
                        </span>
                        افغانی.
                    </span>

                    {/* Table */}
                    <div className="overflow-x-auto py-6">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-teal-700 text-white">
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
                                            className="even:bg-sky-50 hover:bg-sky-100"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">
                                                {categories[income.category]}
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
                                                {moment(
                                                    income.income_date,
                                                ).format('jYYYY/jMM/jDD')}
                                            </td>
                                            <td className="p-3">
                                                {income.description || '-'}
                                            </td>
                                            <td className="flex gap-2 p-3">
                                                <Edit
                                                    onClick={() =>
                                                        openModal(income)
                                                    }
                                                    title="ویرایش"
                                                    className="h-5 w-5 cursor-pointer text-teal-700"
                                                />
                                                <Trash
                                                    onClick={() =>
                                                        confirmDeleteIncome(
                                                            income,
                                                        )
                                                    }
                                                    title="حذف"
                                                    className="h-5 w-5 cursor-pointer text-rose-800"
                                                />
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

                    {incomes.links.length > 3 && (
                        <div className="my-4 flex justify-center">
                            {incomes.links.map((link, idx) => {
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

            {/* Add/Edit Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <form onSubmit={submit} className="space-y-4">
                    <h2 className="bg-teal-700 p-6 text-lg font-semibold text-white">
                        {editMode ? 'ویرایش عاید' : 'افزودن عاید جدید'}
                    </h2>
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="mb-1 block text-sm">
                                    بخش
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="w-full border border-gray-300 px-8 py-2 text-sm"
                                >
                                    <option value="">انتخاب کنید</option>
                                    {Object.entries(categories).map(
                                        ([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                                <InputError message={errors.category} />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm">
                                    مبلغ
                                </label>
                                <input
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData('amount', e.target.value)
                                    }
                                    className="border border-gray-300 px-8 py-2 text-sm"
                                />
                                <InputError message={errors.amount} />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm">
                                    تاریخ
                                </label>
                                <AfghanDatePicker
                                    value={data.income_date}
                                    onChange={(date) =>
                                        setData(
                                            'income_date',
                                            date.format('YYYY/MM/DD'),
                                        )
                                    }
                                />
                                <InputError message={errors.income_date} />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">
                                توضیحات
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded border px-2 py-1"
                            ></textarea>
                        </div>

                        <div className="mt-4 flex justify-start gap-3">
                            <PrimaryButton disabled={processing}>
                                {editMode ? 'بروزرسانی' : 'ذخیره'}
                            </PrimaryButton>
                            <SecondaryButton onClick={closeModal}>
                                انصراف
                            </SecondaryButton>
                        </div>
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
