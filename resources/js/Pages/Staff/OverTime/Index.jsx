import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

const afghanMonths = [
    { value: '1', label: 'حمل' },
    { value: '2', label: 'ثور' },
    { value: '3', label: 'جوزا' },
    { value: '4', label: 'سرطان' },
    { value: '5', label: 'اسد' },
    { value: '6', label: 'سنبله' },
    { value: '7', label: 'میزان' },
    { value: '8', label: 'عقرب' },
    { value: '9', label: 'قوس' },
    { value: '10', label: 'جدی' },
    { value: '11', label: 'دلو' },
    { value: '12', label: 'حوت' },
];

export default function Index({ staff, overtimes }) {
    const { flash } = usePage().props;
    const [show, setShowFlash] = useState(false);
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

    const confirmOvertimeDeletion = (id) => {
        console.log(id);

        setConfirmingDelete(true);
        setSalaryId(id);
    };

    const deleteOvertime = (e) => {
        e.preventDefault();
        destroy(route('staffs.overtime.destroy', [staff.id, salaryId]), {
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
        <AuthenticatedLayout title={`اضافه‌کاری‌ها - ${staff.full_name}`}>
            <Head title={`اضافه‌کاری‌ها - ${staff.full_name}`} />

            <div className="mx-auto w-full md:px-10 md:py-16">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        لیست اضافه‌کاری‌ها
                    </h3>
                    <Link
                        href={route('staffs.overtime.create', staff.id)}
                        className="bg-blueGray-600 rounded px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                    >
                        ثبت اضافه‌کاری
                    </Link>
                </div>

                <div className="rounded shadow-lg">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-blueGray-600 text-sm text-white">
                                <th className="px-6 py-3 text-right">#</th>
                                <th className="px-6 py-3 text-right">تاریخ</th>
                                <th className="px-6 py-3 text-right">
                                    مدت (ساعت)
                                </th>
                                <th className="px-6 py-3 text-right">
                                    نرخ فی ساعت
                                </th>
                                <th className="px-6 py-3 text-right">
                                    مبلغ کل
                                </th>
                                <th className="px-6 py-3 text-right">
                                    توضیحات
                                </th>
                                <th className="px-6 py-3 text-right">وضعیت</th>
                                <th className="px-6 py-3 text-right">
                                    ماه حقوق
                                </th>
                                <th className="px-6 py-3 text-right">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {overtimes.length > 0 ? (
                                overtimes.map((overTime, index) => (
                                    <tr
                                        key={overTime.id}
                                        className={`border-b text-xs ${
                                            overTime.salary_id
                                                ? 'bg-green-50'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <td className="px-6 py-2 text-right">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {moment(overTime.date).format(
                                                'jYYYY/jMM/jDD',
                                            )}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.hours}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {parseFloat(
                                                overTime.rate,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {parseFloat(
                                                overTime.total,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.description || '-'}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.salary_id ? (
                                                <span className="rounded bg-green-500/20 px-3 py-1 text-green-700">
                                                    پرداخت شده
                                                </span>
                                            ) : (
                                                <span className="rounded bg-yellow-500/20 px-3 py-1 text-yellow-700">
                                                    پرداخت نشده
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {overTime.salary
                                                ? `ماه ${afghanMonths[overTime.salary.salary_month - 1].label}`
                                                : '-'}
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
                                                            'staffs.overtime.edit',
                                                            [
                                                                staff.id,
                                                                overTime.id,
                                                            ],
                                                        )}
                                                    >
                                                        ویرایش
                                                    </Link>
                                                    <button
                                                        className="block w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                                                        onClick={() =>
                                                            confirmOvertimeDeletion(
                                                                overTime.id,
                                                            )
                                                        }
                                                    >
                                                        حذف
                                                    </button>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        هیچ اضافه‌کاری ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Delete Modal */}
            <Modal show={confirmingDelete} onClose={closeModal}>
                <form onSubmit={deleteOvertime} className="p-6">
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
