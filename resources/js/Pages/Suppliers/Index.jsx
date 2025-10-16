import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
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

    const AllUsers = suppliers.map((supplier, index) => (
        <tr key={supplier.id}>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                <span className="text-blueGray-600 font-bold">{++index}</span>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right text-sm">
                <span className="text-blueGray-600 ml-3 font-bold">
                    {supplier.company_name}
                </span>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                {supplier.phone}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                {supplier.contact_person}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                {supplier.address}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-sm">
                <div className="flex gap-2">
                    <Link
                        className="rounded-sm bg-sky-400 px-2 py-1 text-xs text-white"
                        href={route('suppliers.show', supplier.id)}
                    >
                        تاریخچه
                    </Link>
                </div>
            </td>
            <td className="whitespace-nowrap p-4 px-6 text-xs">
                <div className="flex items-center gap-2">
                    <Link href={route('suppliers.edit', supplier.id)}>
                        <Edit className="h-5 w-5 text-teal-600" />
                    </Link>
                    <button
                        onClick={() => confirmSupplierDeletion(supplier.id)}
                    >
                        <Trash className="h-5 w-5 text-rose-600" />
                    </button>
                </div>
            </td>
        </tr>
    ));

    return (
        <AuthenticatedLayout title="شرکت های همکار">
            <Head title="شرکت های همکار" />
            <div className="mx-auto min-h-screen w-full md:px-10">
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
                                        href={route('suppliers.create')}
                                        className="mr-1 rounded bg-teal-600 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-teal-700"
                                        type="button"
                                    >
                                        ثبت شرکت همکار
                                    </a>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="w-full border-collapse items-center bg-transparent">
                                    <thead>
                                        <tr className="border-blueGray-100 border-b bg-teal-600 text-white">
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold">
                                                #
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold">
                                                شرکت
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold">
                                                شماره تماس
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold">
                                                رابط شرکت
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold">
                                                ادرس
                                            </th>
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold"></th>
                                            <th className="px-6 py-3 text-right align-middle text-sm font-semibold">
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

                    <InputError message={errors.id} />

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
                className="fixed bottom-4 left-4"
            >
                <p className="bg-green-600 px-10 py-3 text-center text-sm font-semibold text-white">
                    عملیات حذف موفقانه صورت گرفت.
                </p>
            </Transition>
        </AuthenticatedLayout>
    );
}
