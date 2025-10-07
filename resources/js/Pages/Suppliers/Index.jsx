import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ suppliers }) {
    const [confirmingCompanyDeletion, setConfirmingUserDeletion] =
        useState(false);
    const [supplier, setSupplier] = useState(null);
    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm();

    const confirmSupplierDeletion = (id) => {
        setConfirmingUserDeletion(true);
        setSupplier(id);
    };

    const deleteCompany = (e) => {
        e.preventDefault();

        destroy(route('suppliers.destroy', supplier), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    const AllUsers = suppliers.map((supplier) => (
        <tr key={supplier.id}>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <span className="text-blueGray-600 font-bold">
                    {supplier.id}
                </span>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right text-xs">
                <span className="text-blueGray-600 ml-3 font-bold">
                    {supplier.company_name}
                </span>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                {supplier.phone}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <i className="fas fa-circle mr-2 text-green-600"></i>
                {supplier.contact_person}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <i className="fas fa-circle mr-2 text-green-600"></i>
                {supplier.address}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                <div className="flex gap-2">
                    <Link
                        className="rounded-sm bg-sky-400 px-2 py-1 text-white"
                        href={route('suppliers.edit', supplier.id)}
                    >
                        تاریخچه خرید
                    </Link>
                </div>
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
                            href={route('suppliers.edit', supplier.id)}
                        >
                            ویرایش
                        </Link>
                        <button
                            className="block w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => confirmSupplierDeletion(supplier.id)}
                        >
                            حذف
                        </button>
                    </Dropdown.Content>
                </Dropdown>
            </td>
        </tr>
    ));

    return (
        <AuthenticatedLayout title="شرکت های همکار">
            <Head title="شرکت های همکار" />
            <div className="mx-auto h-screen w-full md:px-10">
                <div className="flex flex-wrap pt-8">
                    <div className="mb-12 w-full px-4">
                        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
                            <div className="mb-0 rounded-t border-0 px-4 py-3">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                                        <h3 className="text-blueGray-700 text-lg font-semibold">
                                            شرکت های همکار
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
                                                شرکت
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                شماره تماس
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                رابط شرکت
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold">
                                                ادرس
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-xs font-semibold"></th>
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
            <Modal show={confirmingCompanyDeletion} onClose={closeModal}>
                <form onSubmit={deleteCompany} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این شرکت همکار را حذف کنید؟
                    </h2>

                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        با حذف شرکت، تمام اطلاعات مربوط به خریدها، فاکتورها و
                        تراکنش‌های انجام‌شده با این شرکت از سیستم حذف می‌شود و
                        دیگر قابل بازیابی نخواهد بود.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            انصراف
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            حذف شرکت
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
