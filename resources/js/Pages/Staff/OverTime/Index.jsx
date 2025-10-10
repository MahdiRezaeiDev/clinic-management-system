import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment-jalaali';

export default function Index({ overtimes }) {
    return (
        <AuthenticatedLayout title={`اضافه کاری پرسنل: ${staff.full_name}`}>
            <Head title={`اضافه کاری ${staff.full_name}`} />

            <div className="mx-auto w-full md:px-10 md:py-16">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">لیست اضافه کاری </h3>
                    <Link
                        href={route('staffs.salary.create', staff.id)}
                        className="bg-blueGray-600 rounded px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                    >
                        پرداخت اضافه کاری
                    </Link>
                </div>

                <div className="overflow-x-auto rounded shadow-lg">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-blueGray-600 text-sm text-white">
                                <th className="px-6 py-3 text-right">#</th>
                                <th className="px-6 py-3 text-right">
                                    اضافه کاری پایه
                                </th>
                                <th className="px-6 py-3 text-right">
                                    اضافه کاری
                                </th>
                                <th className="px-6 py-3 text-right">کسورات</th>
                                <th className="px-6 py-3 text-right">ماه</th>

                                <th className="px-6 py-3 text-right">
                                    مبلغ پرداخت نهایی
                                </th>
                                <th className="px-6 py-3 text-right">
                                    تاریخ پرداخت
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
                                        {salary.overtimes.reduce(
                                            (sum, ot) =>
                                                sum + parseFloat(ot.total),
                                            0,
                                        )}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {salary.deductions}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {
                                            afghanMonths[
                                                salary.salary_month - 1
                                            ].label
                                        }
                                    </td>

                                    <td className="px-6 py-2 text-right">
                                        {parseFloat(
                                            salary.total_paid,
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-2 text-right">
                                        {moment(salary.payment_date).format(
                                            'jYYYY/jMM/jDD',
                                        )}
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
                                <td colSpan="6"></td>
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
