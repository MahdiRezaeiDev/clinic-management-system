import {
    ClinicHeader,
    ClinicPage,
    ClinicPanel,
    ClinicStat,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Activity,
    CheckCircle2,
    ChevronDown,
    Clock3,
    HeartPulse,
    Play,
    Siren,
    Stethoscope,
    UserRoundPlus,
} from 'lucide-react';

const priority = {
    resuscitation: ['احیا فوری', 'bg-red-700 text-white'],
    very_urgent: ['بسیار عاجل', 'bg-red-100 text-red-700'],
    urgent: ['عاجل', 'bg-orange-100 text-orange-700'],
    standard: ['معمولی', 'bg-yellow-100 text-yellow-700'],
    non_urgent: ['غیرعاجل', 'bg-green-100 text-green-700'],
};
const status = {
    waiting: 'در انتظار',
    in_progress: 'در حال معاینه',
    completed: 'تکمیل‌شده',
    cancelled: 'لغوشده',
};

export default function Triage({ entries, patients, stats }) {
    const form = useForm({
        patient_id: '',
        priority: 'standard',
        temperature: '',
        blood_pressure: '',
        pulse: '',
        respiratory_rate: '',
        oxygen_saturation: '',
        weight: '',
        height: '',
        pain_score: '',
        chief_complaint: '',
        notes: '',
    });
    const submit = (event) => {
        event.preventDefault();
        form.post(route('hospital.triage.store'), {
            onSuccess: () => form.reset(),
        });
    };
    const changeStatus = (entry, next) =>
        router.patch(
            route('hospital.triage.status', entry.id),
            { status: next },
            { preserveScroll: true },
        );

    return (
        <AuthenticatedLayout title="تریاژ و صف انتظار">
            <Head title="تریاژ و صف انتظار" />
            <ClinicPage className="space-y-6">
                <ClinicHeader
                    title="تریاژ و صف انتظار"
                    subtitle="ثبت علائم حیاتی، تعیین فوریت و مدیریت جریان بیماران"
                    icon={HeartPulse}
                />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <ClinicStat
                        title="در انتظار"
                        value={stats.waiting}
                        icon={Clock3}
                        color="orange"
                    />
                    <ClinicStat
                        title="در حال معاینه"
                        value={stats.in_progress}
                        icon={Stethoscope}
                        color="blue"
                    />
                    <ClinicStat
                        title="تکمیل‌شده"
                        value={stats.completed}
                        icon={CheckCircle2}
                        color="green"
                    />
                    <ClinicStat
                        title="موارد عاجل"
                        value={stats.urgent}
                        icon={Siren}
                        color="red"
                    />
                </div>
                <ClinicPanel title="پذیرش و ارزیابی اولیه" icon={UserRoundPlus}>
                    <form
                        onSubmit={submit}
                        className="grid items-end gap-5 md:grid-cols-2 xl:grid-cols-4"
                    >
                        <Field label="بیمار" error={form.errors.patient_id}>
                            <div className="relative">
                                <UserRoundPlus className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <select
                                    required
                                    className={`${fieldClass} appearance-none px-11`}
                                    value={form.data.patient_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'patient_id',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">انتخاب بیمار</option>
                                    {patients.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.full_name} —{' '}
                                            {p.medical_record_number}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </Field>
                        <Field label="درجه فوریت">
                            <div className="relative">
                                <Siren className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <select
                                    className={`${fieldClass} appearance-none px-11`}
                                    value={form.data.priority}
                                    onChange={(e) =>
                                        form.setData('priority', e.target.value)
                                    }
                                >
                                    {Object.entries(priority).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value[0]}
                                            </option>
                                        ),
                                    )}
                                </select>
                                <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </Field>
                        <Input
                            form={form}
                            name="temperature"
                            label="دمای بدن (°C)"
                            type="number"
                            step="0.1"
                            placeholder="37.0"
                        />
                        <Input
                            form={form}
                            name="blood_pressure"
                            label="فشار خون"
                            placeholder="120/80"
                        />
                        <Input
                            form={form}
                            name="pulse"
                            label="نبض در دقیقه"
                            type="number"
                        />
                        <Input
                            form={form}
                            name="respiratory_rate"
                            label="تنفس در دقیقه"
                            type="number"
                        />
                        <Input
                            form={form}
                            name="oxygen_saturation"
                            label="اکسیژن خون (%)"
                            type="number"
                        />
                        <Input
                            form={form}
                            name="pain_score"
                            label="شدت درد (۰ تا ۱۰)"
                            type="number"
                        />
                        <Input
                            form={form}
                            name="weight"
                            label="وزن (kg)"
                            type="number"
                            step="0.1"
                        />
                        <Input
                            form={form}
                            name="height"
                            label="قد (cm)"
                            type="number"
                            step="0.1"
                        />
                        <Field
                            label="شکایت اصلی"
                            error={form.errors.chief_complaint}
                            className="md:col-span-2"
                        >
                            <textarea
                                required
                                className={`${fieldClass} h-24 py-3`}
                                value={form.data.chief_complaint}
                                onChange={(e) =>
                                    form.setData(
                                        'chief_complaint',
                                        e.target.value,
                                    )
                                }
                                placeholder="علت مراجعه و علائم اصلی"
                            />
                        </Field>
                        <Field label="یادداشت تریاژ" className="md:col-span-2">
                            <textarea
                                className={`${fieldClass} h-24 py-3`}
                                value={form.data.notes}
                                onChange={(e) =>
                                    form.setData('notes', e.target.value)
                                }
                            />
                        </Field>
                        <div className="md:col-span-2 xl:col-span-4">
                            <button
                                disabled={form.processing}
                                className={primaryButton}
                            >
                                <Activity className="h-4 w-4" />
                                ثبت و افزودن به صف
                            </button>
                        </div>
                    </form>
                </ClinicPanel>
                <ClinicPanel
                    title={`صف امروز (${entries.length})`}
                    icon={Stethoscope}
                    bodyClassName="p-0"
                >
                    {entries.length === 0 ? (
                        <div className="py-16 text-center">
                            <Clock3 className="mx-auto h-12 w-12 text-teal-300" />
                            <h3 className="mt-4 font-bold text-gray-700">
                                صف انتظار خالی است
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                بیماران پذیرش‌شده امروز در این قسمت نمایش داده
                                می‌شوند.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gradient-to-l from-teal-700 to-teal-600 text-white">
                                    <tr>
                                        {[
                                            'صف',
                                            'بیمار',
                                            'فوریت',
                                            'شکایت اصلی',
                                            'علائم حیاتی',
                                            'وضعیت',
                                            'عملیات',
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="whitespace-nowrap px-4 py-4 text-right"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((e) => (
                                        <tr
                                            key={e.id}
                                            className="border-b border-gray-100 hover:bg-teal-50/40"
                                        >
                                            <td className="px-4 py-4 text-xl font-bold text-teal-700">
                                                {e.queue_number}
                                            </td>
                                            <td className="px-4 py-4">
                                                <Link
                                                    href={route(
                                                        'patients.show',
                                                        e.patient_id,
                                                    )}
                                                    className="font-bold text-gray-800 hover:text-teal-700"
                                                >
                                                    {e.patient.full_name}
                                                </Link>
                                                <p className="text-xs text-gray-400">
                                                    {
                                                        e.patient
                                                            .medical_record_number
                                                    }
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${priority[e.priority][1]}`}
                                                >
                                                    {priority[e.priority][0]}
                                                </span>
                                            </td>
                                            <td className="max-w-xs px-4 py-4 text-gray-600">
                                                {e.chief_complaint}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-600">
                                                <p>
                                                    فشار:{' '}
                                                    {e.blood_pressure || '-'} |
                                                    نبض: {e.pulse || '-'}
                                                </p>
                                                <p>
                                                    دما: {e.temperature || '-'}{' '}
                                                    | O₂:{' '}
                                                    {e.oxygen_saturation || '-'}
                                                    %
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                {status[e.status]}
                                            </td>
                                            <td className="px-4 py-4">
                                                {e.status === 'waiting' && (
                                                    <button
                                                        onClick={() =>
                                                            changeStatus(
                                                                e,
                                                                'in_progress',
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700"
                                                    >
                                                        <Play className="h-3.5 w-3.5" />
                                                        شروع
                                                    </button>
                                                )}
                                                {e.status === 'in_progress' && (
                                                    <button
                                                        onClick={() =>
                                                            changeStatus(
                                                                e,
                                                                'completed',
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        تکمیل
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ClinicPanel>
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
function Field({ label, error, children, className = '' }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-sm font-medium text-gray-600">
                {label}
            </span>
            {children}
            {error && (
                <span className="mt-1 block text-xs text-red-600">{error}</span>
            )}
        </label>
    );
}
function Input({ form, name, label, ...props }) {
    return (
        <Field label={label} error={form.errors[name]}>
            <input
                className={fieldClass}
                value={form.data[name]}
                onChange={(e) => form.setData(name, e.target.value)}
                {...props}
            />
        </Field>
    );
}
