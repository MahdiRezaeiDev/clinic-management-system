import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

export default function Index({ staff, salaries }) {
    console.log(salaries);

    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [salaryId, setSalaryId] = useState(null);
    const { delete: destroy, processing, reset, clearErrors } = useForm();

    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);
            const timeout = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const confirmDelete = (id) => {
        setConfirmingDelete(true);
        setSalaryId(id);
    };

    const deleteSalary = (e) => {
        e.preventDefault();
        destroy(route('staffs.salary.destroy', [staff.id, salaryId]), {
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDelete(false);
        setSalaryId(null);
        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout title={`حقوق پرسنل: ${staff.full_name}`}>
            <Head title={`حقوق ${staff.full_name}`} />

            <div className="mx-auto w-full md:px-10 md:py-16">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">لیست حقوق پرداختی</h3>
                    <Link
                        href={route('staffs.salary.create', staff.id)}
                        className="bg-blueGray-600 rounded px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                    >
                        پرداخت حقوق
                    </Link>
                </div>

                <div className="overflow-x-auto rounded shadow-lg">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-blueGray-600 text-sm text-white">
                                <th className="px-6 py-3 text-right">#</th>
                                <th className="px-6 py-3 text-right">
                                    حقوق پایه
                                </th>
                                <th className="px-6 py-3 text-right">
                                    اضافه کاری
                                </th>
                                <th className="px-6 py-3 text-right">کسورات</th>
                                <th className="px-6 py-3 text-right">
                                    تاریخ پرداخت
                                </th>
                                <th className="px-6 py-3 text-right">
                                    مبلغ پرداخت نهایی
                                </th>
                                <th className="px-6 py-3 text-right">
                                    توضیحات
                                </th>
                                <th className="px-6 py-3 text-right">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.map((salary, index) => (
                                <tr
                                    key={salary.id}
                                    className="border-b text-xs"
                                >
                                    <td className="px-6 py-2 text-right">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {salary.base_salary}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {moment(salary.salary_month).format(
                                            'jYYYY/jMM/jDD',
                                        )}{' '}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {parseFloat(
                                            salary.total_paid,
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {salary.description || '-'}
                                    </td>
                                    <td className="flex gap-2 px-6 py-2 text-right">
                                        <Link
                                            href={route('staffs.salary.edit', [
                                                staff.id,
                                                salary.id,
                                            ])}
                                            className="text-blue-600 hover:underline"
                                        >
                                            ویرایش
                                        </Link>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() =>
                                                confirmDelete(salary.id)
                                            }
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 text-sm font-semibold">
                                <td
                                    colSpan="2"
                                    className="px-6 py-2 text-right"
                                >
                                    جمع کل:
                                </td>
                                <td className="px-6 py-2 text-right">
                                    {totalPaid.toLocaleString()}
                                </td>
                                <td colSpan="2"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingDelete} onClose={closeModal}>
                <form onSubmit={deleteSalary} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این پرداخت حذف شود؟
                    </h2>
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
                <div className="rounded bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
