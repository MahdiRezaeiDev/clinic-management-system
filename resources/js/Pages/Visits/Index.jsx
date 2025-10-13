import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import moment from 'moment-jalaali';
import { useEffect, useState } from 'react';

export default function Index({ visits, doctors, filters }) {
    const [confirmingVisitDeletion, setConfirmingVisitDeletion] =
        useState(false);
    const [visitId, setVisitId] = useState(null);
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

    const confirmVisitDeletion = (id) => {
        setConfirmingVisitDeletion(true);
        setVisitId(id);
    };

    const deleteStaff = (e) => {
        e.preventDefault();
        destroy(route('visits.destroy', visitId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log(errors),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingVisitDeletion(false);
        setVisitId(null);
        clearErrors();
        reset();
    };

    // Handle search/filter
    const [doctor, setDoctor] = useState(filters.doctor || '');

    const submitFilter = (e) => {
        e.preventDefault();
        router.get(route('visits.index'), { doctor }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout title="پرسنل سیستم">
            <Head title="پرسنل سیستم" />

            <div className="flex flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="relative flex w-full min-w-0 flex-col overflow-auto break-words rounded pb-8 shadow-lg">
                        {/* Header */}
                        <div className="mb-0 flex items-center justify-between rounded-t border-0 px-4 py-3">
                            <h3 className="text-blueGray-700 text-lg font-semibold">
                                لیست وزیت های ثبت شده
                            </h3>
                            <Link
                                href={route('visits.create')}
                                className="rounded bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                            >
                                ثبت ویزیت
                            </Link>
                        </div>

                        {/* Filter Form */}
                        <form
                            onSubmit={submitFilter}
                            className="flex flex-wrap items-center gap-3 border-b px-4 py-3"
                        >
                            <select
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="w-72 rounded border px-7 py-2 text-sm focus:ring-2 focus:ring-teal-700"
                            >
                                <option value="">همه داکترها</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.full_name}
                                    </option>
                                ))}
                            </select>
                            <PrimaryButton type="submit" className="px-4 py-2">
                                اعمال فیلتر
                            </PrimaryButton>
                        </form>

                        {/* Table */}
                        <div className="block w-full">
                            <table className="w-full border-collapse bg-transparent">
                                <thead>
                                    <tr className="bg-teal-700 text-white">
                                        <th className="px-6 py-3 text-right text-sm">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            بیمار
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            جنسیت
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            سن
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            شماره تماس
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            آدرس
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            داکتر معالج
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            هزینه وزیت
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            تاریخ مراجعه
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            تاریخ مراجعه
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visits.data.length ? (
                                        visits.data.map((visit, index) => (
                                            <tr key={visit.id}>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {++index}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.patient.full_name}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.patient.gender}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.patient.age}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.patient.phone}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.patient.address}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.doctor.full_name}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.fee}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {moment(
                                                        visit.visit_date,
                                                    ).format('jYYYY/jMM/jDD')}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    {visit.description}
                                                </td>

                                                <td className="whitespace-nowrap p-4 px-6 text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route(
                                                                'visits.edit',
                                                                visit.id,
                                                            )}
                                                        >
                                                            <Edit className="h-5 w-5 text-teal-700" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                confirmVisitDeletion(
                                                                    visit.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash className="h-5 w-5 text-rose-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="11"
                                                className="p-4 text-center text-sm"
                                            >
                                                هیچ وزیتی یافت نشد.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {visits.data.length ? (
                            <div className="flex justify-center p-4">
                                {visits.links.map((link, index) => (
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
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingVisitDeletion} onClose={closeModal}>
                <form onSubmit={deleteStaff} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        آیا مطمئن هستید که می‌خواهید این ویزیت را حذف کنید؟
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        بعد از حذف ویزیت، اطلاعات مرتبط با آن دیگر در دسترس
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
