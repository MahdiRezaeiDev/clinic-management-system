import AfghanDatePicker from '@/Components/AfghanDatePicker';
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

    let totalVisit = 0;
    for (const visit of visits.data) {
        totalVisit += visit.fee;
    }

    // Filter states
    const [doctor, setDoctor] = useState(filters.doctor || '');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            route('visits.index'),
            {
                doctor,
                start_date: startDate,
                end_date: endDate,
            },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setDoctor('');
        setStartDate('');
        setEndDate('');
        router.get(route('visits.index'), {}, { preserveState: true });
    };

    return (
        <AuthenticatedLayout title="پرسنل سیستم">
            <Head title="پرسنل سیستم" />

            <div className="flex flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="relative flex w-full min-w-0 flex-col break-words rounded pb-8 shadow-lg">
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
                            onSubmit={applyFilter}
                            className="grid grid-cols-1 items-center gap-3 border-b px-4 py-3 md:grid-cols-4"
                        >
                            <select
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="w-full border border-gray-300 px-7 py-2 text-sm focus:ring-2 focus:ring-teal-700"
                            >
                                <option value="">همه داکترها</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.full_name}
                                    </option>
                                ))}
                            </select>

                            <AfghanDatePicker
                                placeholder="تاریخ شروع"
                                value={startDate}
                                onChange={(value) => {
                                    setStartDate(value.format('YYYY/MM/DD'));
                                }}
                                className="border px-3 py-2 text-sm focus:ring-2 focus:ring-teal-700"
                            />

                            <AfghanDatePicker
                                placeholder="تاریخ پایان"
                                value={endDate}
                                onChange={(value) => {
                                    setEndDate(value.format('YYYY/MM/DD'));
                                }}
                                className="border px-3 py-2 text-sm focus:ring-2 focus:ring-teal-700"
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

                        <span className="mx-4 my-4 inline w-96 bg-sky-700 px-4 py-2 text-xs text-white">
                            مجموع عواید حاصله عبارت است از
                            <span className="px-1 font-semibold text-green-600">
                                {totalVisit}
                            </span>
                            افغانی.
                        </span>

                        {/* Table */}
                        <div className="block w-full overflow-auto">
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
                                            توضیحات
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visits.data.length ? (
                                        visits.data.map((visit, index) => (
                                            <tr
                                                className="even:bg-teal-50"
                                                key={visit.id}
                                            >
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {++index}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.patient.full_name}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.patient.gender}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.patient.age}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.patient.phone}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.patient.address}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.doctor.full_name}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.fee}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {moment(
                                                        visit.visit_date,
                                                    ).format('jYYYY/jMM/jDD')}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
                                                    {visit.description}
                                                </td>
                                                <td className="whitespace-nowrap p-4 px-6 text-sm">
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

                        {/* Pagination */}
                        {visits.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                {visits.links.map((link, idx) => {
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
