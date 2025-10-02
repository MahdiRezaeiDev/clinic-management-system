import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ staffs, filters }) {
    const [confirmingStaffDeletion, setConfirmingStaffDeletion] =
        useState(false);
    const [staffId, setStaffId] = useState(null);
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm();

    // Role labels
    const roleNames = {
        doctor: 'پزشک',
        nurse: 'پرستار',
        pharmacist: 'دواساز',
        lab: 'لابراتوار',
        dentist: 'دندان‌پزشک',
        emergency: 'ایمرجنسی',
        gynecology: 'نسایی ولادی',
        inpatient: 'بخش بستری',
        service: 'خدمات',
    };

    const confirmStaffDeletion = (id) => {
        setConfirmingStaffDeletion(true);
        setStaffId(id);
    };

    const deleteStaff = (e) => {
        e.preventDefault();
        destroy(route('staffs.destroy', staffId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log(errors),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingStaffDeletion(false);
        setStaffId(null);
        clearErrors();
        reset();
    };

    // Handle search/filter
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const submitFilter = (e) => {
        e.preventDefault();
        router.get(
            route('staffs.index'),
            { search, role },
            { preserveState: true },
        );
    };

    return (
        <AuthenticatedLayout title="پرسنل سیستم">
            <Head title="پرسنل سیستم" />

            <div className="flex flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
                        {/* Header */}
                        <div className="mb-0 flex items-center justify-between rounded-t border-0 px-4 py-3">
                            <h3 className="text-blueGray-700 text-lg font-semibold">
                                لیست پرسنل ثبت شده
                            </h3>
                            <Link
                                href={route('staffs.create')}
                                className="bg-blueGray-600 rounded px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                            >
                                افزودن پرسنل
                            </Link>
                        </div>

                        {/* Filter Form */}
                        <form
                            onSubmit={submitFilter}
                            className="flex flex-wrap items-center gap-3 border-b px-4 py-3"
                        >
                            <input
                                type="text"
                                placeholder="جستجو نام یا شماره تماس..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="rounded border px-3 py-2 text-sm"
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="rounded border px-7 py-2 text-sm"
                            >
                                <option value="">همه نقش‌ها</option>
                                {Object.entries(roleNames).map(
                                    ([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ),
                                )}
                            </select>
                            <PrimaryButton
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                اعمال فیلتر
                            </PrimaryButton>
                        </form>

                        {/* Table */}
                        <div className="block w-full">
                            <table className="w-full border-collapse bg-transparent">
                                <thead>
                                    <tr className="bg-blueGray-600 text-white">
                                        <th className="px-6 py-3 text-right text-sm">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            نام و نام خانوادگی
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            شماره تماس
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            نقش
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            حقوق پایه
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffs.data.length ? (
                                        staffs.data.map((staff, index) => (
                                            <tr key={staff.id}>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {++index}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {staff.full_name}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {staff.phone || '-'}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {roleNames[staff.role] ||
                                                        staff.role}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {staff.base_salary?.toLocaleString() ||
                                                        '-'}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <button className="bg-blueGray-600 rounded px-3 py-1 text-xs text-white">
                                                                عملیات
                                                            </button>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Link
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                href={route(
                                                                    'staffs.edit',
                                                                    staff.id,
                                                                )}
                                                            >
                                                                ویرایش
                                                            </Link>
                                                            <button
                                                                className="block w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                                                                onClick={() =>
                                                                    confirmStaffDeletion(
                                                                        staff.id,
                                                                    )
                                                                }
                                                            >
                                                                حذف
                                                            </button>
                                                            <Link
                                                                className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                                                                href={route(
                                                                    'staffs.salary.index',
                                                                    staff.id,
                                                                )}
                                                            >
                                                                حقوق
                                                            </Link>
                                                            <Link
                                                                className="block px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100"
                                                                href={route(
                                                                    'staffs.overtime.index',
                                                                    staff.id,
                                                                )}
                                                            >
                                                                اضافه کاری
                                                            </Link>
                                                            <Link
                                                                className="block px-4 py-2 text-sm text-purple-600 hover:bg-gray-100"
                                                                href={route(
                                                                    'staffs.salary.report',
                                                                    staff.id,
                                                                )}
                                                            >
                                                                گزارش حقوق
                                                            </Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="p-4 text-center text-sm"
                                            >
                                                هیچ پرسنلی یافت نشد.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center p-4">
                            {staffs.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`mx-1 rounded px-3 py-1 text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingStaffDeletion} onClose={closeModal}>
                <form onSubmit={deleteStaff} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این پرسنل را حذف کنید؟
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        بعد از حذف پرسنل، اطلاعات مرتبط با آن دیگر در دسترس
                        نخواهد بود.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            حذف
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Success Toast */}
            <Transition
                show={show}
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
