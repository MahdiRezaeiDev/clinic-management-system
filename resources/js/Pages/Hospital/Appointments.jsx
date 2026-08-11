import {
    ClinicHeader,
    ClinicPage,
    ClinicPanel,
    ClinicStat,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Filter,
    Play,
    Stethoscope,
    UserCheck,
    UserX,
} from 'lucide-react';
import { useState } from 'react';

const labels = {
    scheduled: 'برنامه‌ریزی‌شده',
    checked_in: 'حاضر',
    in_progress: 'در حال ویزیت',
    completed: 'تکمیل‌شده',
    cancelled: 'لغوشده',
    no_show: 'غایب',
};
const badge = {
    scheduled: 'bg-blue-50 text-blue-700',
    checked_in: 'bg-orange-50 text-orange-700',
    in_progress: 'bg-purple-50 text-purple-700',
    completed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
    no_show: 'bg-gray-100 text-gray-600',
};
export default function Appointments({
    appointments,
    doctors,
    filters,
    stats,
}) {
    const [query, setQuery] = useState(filters);
    const apply = (e) => {
        e.preventDefault();
        router.get(route('hospital.appointments.index'), query, {
            preserveState: true,
        });
    };
    const update = (item, status) =>
        router.patch(
            route('appointments.status', item.id),
            { status },
            { preserveScroll: true },
        );
    return (
        <AuthenticatedLayout title="تقویم نوبت‌ها">
            <Head title="تقویم نوبت‌ها" />
            <ClinicPage className="space-y-6">
                <ClinicHeader
                    title="تقویم نوبت‌های داکتران"
                    subtitle="مدیریت حضور، غیبت و جریان مراجعه بیمار"
                    icon={CalendarDays}
                />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <ClinicStat
                        title="کل نوبت‌ها"
                        value={appointments.length}
                        icon={CalendarDays}
                    />
                    <ClinicStat
                        title="حاضر"
                        value={stats.checked_in}
                        icon={UserCheck}
                        color="orange"
                    />
                    <ClinicStat
                        title="در حال ویزیت"
                        value={stats.in_progress}
                        icon={Stethoscope}
                        color="purple"
                    />
                    <ClinicStat
                        title="تکمیل‌شده"
                        value={stats.completed}
                        icon={CheckCircle2}
                        color="green"
                    />
                </div>
                <ClinicPanel title="انتخاب روز و داکتر" icon={Filter}>
                    <form
                        onSubmit={apply}
                        className="grid items-end gap-5 md:grid-cols-3"
                    >
                        <Field label="تاریخ جلالی">
                            <input
                                className={fieldClass}
                                value={query.date}
                                onChange={(e) =>
                                    setQuery({ ...query, date: e.target.value })
                                }
                                placeholder="1405/01/01"
                            />
                        </Field>
                        <Field label="داکتر">
                            <select
                                className={fieldClass}
                                value={query.doctor_id || ''}
                                onChange={(e) =>
                                    setQuery({
                                        ...query,
                                        doctor_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">همه داکتران</option>
                                {doctors.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.full_name}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <button className={primaryButton}>
                            <Filter className="h-4 w-4" />
                            نمایش برنامه
                        </button>
                    </form>
                </ClinicPanel>
                <ClinicPanel
                    title={`برنامه روز (${appointments.length})`}
                    icon={Clock3}
                    bodyClassName="p-0"
                >
                    {appointments.length === 0 ? (
                        <div className="py-16 text-center">
                            <CalendarDays className="mx-auto h-12 w-12 text-teal-300" />
                            <h3 className="mt-4 font-bold text-gray-700">
                                برای این روز نوبتی ثبت نشده است
                            </h3>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {appointments.map((a) => (
                                <div
                                    key={a.id}
                                    className="grid items-center gap-4 px-6 py-5 transition hover:bg-teal-50/40 md:grid-cols-[100px_1fr_1fr_140px_220px]"
                                >
                                    <div className="text-lg font-bold text-teal-700">
                                        {new Date(
                                            a.scheduled_at,
                                        ).toLocaleTimeString('en-GB', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZone: 'Asia/Kabul',
                                        })}
                                    </div>
                                    <div>
                                        <Link
                                            href={route(
                                                'patients.show',
                                                a.patient_id,
                                            )}
                                            className="font-bold text-gray-800 hover:text-teal-700"
                                        >
                                            {a.patient.full_name}
                                        </Link>
                                        <p className="text-xs text-gray-400">
                                            {a.patient.medical_record_number}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">
                                            {a.doctor.full_name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {a.duration_minutes} دقیقه ·{' '}
                                            {a.reason || 'بدون توضیح'}
                                        </p>
                                    </div>
                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${badge[a.status]}`}
                                    >
                                        {labels[a.status]}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {a.status === 'scheduled' && (
                                            <>
                                                <Action
                                                    onClick={() =>
                                                        update(a, 'checked_in')
                                                    }
                                                    icon={UserCheck}
                                                    text="حاضر"
                                                />
                                                <Action
                                                    onClick={() =>
                                                        update(a, 'no_show')
                                                    }
                                                    icon={UserX}
                                                    text="غایب"
                                                    tone="gray"
                                                />
                                            </>
                                        )}
                                        {a.status === 'checked_in' && (
                                            <Action
                                                onClick={() =>
                                                    update(a, 'in_progress')
                                                }
                                                icon={Play}
                                                text="شروع"
                                            />
                                        )}
                                        {a.status === 'in_progress' && (
                                            <Action
                                                onClick={() =>
                                                    update(a, 'completed')
                                                }
                                                icon={CheckCircle2}
                                                text="تکمیل"
                                                tone="green"
                                            />
                                        )}
                                        {!['completed', 'cancelled'].includes(
                                            a.status,
                                        ) && (
                                            <button
                                                onClick={() =>
                                                    update(a, 'cancelled')
                                                }
                                                className="rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                                            >
                                                لغو
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ClinicPanel>
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
const Field = ({ label, children }) => (
    <label>
        <span className="mb-2 block text-sm font-medium text-gray-600">
            {label}
        </span>
        {children}
    </label>
);
const Action = ({ onClick, icon: Icon, text, tone = 'blue' }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium ${tone === 'green' ? 'bg-green-50 text-green-700' : tone === 'gray' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-700'}`}
    >
        <Icon className="h-3.5 w-3.5" />
        {text}
    </button>
);
