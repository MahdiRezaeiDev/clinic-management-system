import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ staffs }) {
    const [confirmingStaffDeletion, setConfirmingStaffDeletion] =
        useState(false);
    const [staffId, setStaffId] = useState(null);
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 3000); // auto hide after 3s
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm();

    // Define a mapping of roles to Persian names
    const roleNames = {
        doctor: 'پزشک',
        nurse: 'نرس',
        pharmacist: 'فارمسیست',
        lab: 'لابراتوار',
        dentist: 'دندانپزشک',
        emergency: 'عاجل',
        gynecology: 'نسایی',
        inpatient: 'بستری',
        service: 'خدمات / سایر',
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

    const AllStaff = staffs.map((staff) => (
        <tr key={staff.id}>
            <td className="whitespace-nowrap p-4 px-6 text-xs">{staff.id}</td>
            <td className="whitespace-nowrap p-4 px-6 text-xs">
                {staff.full_name}
            </td>
            <td className="whitespace-nowrap p-4 px-6 text-xs">
                {staff.phone || '-'}
            </td>
            <td className="whitespace-nowrap p-4 px-6 text-xs">
                {roleNames[staff.role] || staff.role}
            </td>
            <td className="whitespace-nowrap p-4 px-6 text-xs">
                {staff.base_salary.toLocaleString()}
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
                            href={route('staffs.edit', staff.id)}
                        >
                            ویرایش
                        </Link>
                        <button
                            className="block w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => confirmStaffDeletion(staff.id)}
                        >
                            حذف
                        </button>
                        <Link
                            className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                            href={route('staffs.salary.index', staff.id)}
                        >
                            حقوق
                        </Link>
                        <Link
                            className="block px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100"
                            href={route('staffs.overtime.index', staff.id)}
                        >
                            اضافه کاری
                        </Link>
                        <Link
                            className="block px-4 py-2 text-sm text-purple-600 hover:bg-gray-100"
                            href={route('staffs.salary.report', staff.id)}
                        >
                            گزارش حقوق
                        </Link>
                    </Dropdown.Content>
                </Dropdown>
            </td>
        </tr>
    ));

    return (
        <AuthenticatedLayout title="پرسنل سیستم">
            <Head title="پرسنل سیستم" />
            <div className="flex flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
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
                                <tbody>{AllStaff}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

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
