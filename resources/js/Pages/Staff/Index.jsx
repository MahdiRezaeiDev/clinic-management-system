import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ staffs }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [user, setUser] = useState(null);
    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm();

    const confirmUserDeletion = (id) => {
        setConfirmingUserDeletion(true);
        setUser(id);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('user.destroy', user), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log(errors),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    const AllUsers = staffs.map((staff) => (
        <tr key={staff.id}>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <span className="text-blueGray-600 font-bold">{staff.id}</span>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right text-xs">
                <span className="text-blueGray-600 ml-3 font-bold">
                    {staff.name}
                </span>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                {staff.email}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <i className="fas fa-circle mr-2 text-green-600"></i>
                {staff.role}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                <div className="flex gap-2">
                    <Link
                        className="rounded-sm bg-sky-400 px-2 py-1 text-white"
                        href={route('staffs.edit', staff.id)}
                    >
                        ویرایش
                    </Link>
                    <p
                        className="cursor-pointer rounded-sm bg-rose-400 px-2 py-1 text-white"
                        onClick={() => confirmUserDeletion(staff.id)}
                    >
                        حذف
                    </p>
                </div>
            </td>
        </tr>
    ));

    return (
        <AuthenticatedLayout title="کاربران سیستم">
            <Head title="کاربران سیستم" />
            <div className="mx-auto h-screen w-full md:px-10 md:py-16">
                <div className="flex flex-wrap pt-8">
                    <div className="mb-12 w-full px-4">
                        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
                            <div className="mb-0 rounded-t border-0 px-4 py-3">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                                        <h3 className="text-blueGray-700 text-lg font-semibold">
                                            لیست کاربران ثبت شده
                                        </h3>
                                    </div>
                                    <a
                                        href={route('user.create')}
                                        className="bg-blueGray-600 active:bg-blueGray-700 mr-1 rounded px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
                                        type="button"
                                    >
                                        ایجاد حساب کاربری
                                    </a>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="w-full border-collapse items-center bg-transparent">
                                    <thead>
                                        <tr className="bg-blueGray-600 border-blueGray-100 border-b text-white">
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                #
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                نام نام خانوادگی
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                ایمیل آدرس
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                نوعیت حساب
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                عملیات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{AllUsers}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که میخواهید حساب خود را حذف کنید؟
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        بعد از حذف حساب کاربری، هیچگونه اطلاعات این حساب و
                        اطلاعات ثبت شده توسط این حساب در دسترس نخواهد بود.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            حذف حساب
                        </DangerButton>
                    </div>
                </form>
            </Modal>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
                className="absolute bottom-4 left-4"
            >
                <p className="bg-green-600 px-10 py-3 text-center text-sm font-semibold text-white">
                    عملیات حذف موفقانه صورت گرفت.
                </p>
            </Transition>
        </AuthenticatedLayout>
    );
}
