import {
    ClinicPage,
    ClinicPanel,
    ClinicStat,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Activity, BedDouble, Sparkles, Wrench } from 'lucide-react';
const colors = {
    available: 'border-green-300 bg-green-50',
    occupied: 'border-red-300 bg-red-50',
    cleaning: 'border-amber-300 bg-amber-50',
    maintenance: 'border-gray-400 bg-gray-100',
};
export default function BedBoard({ wards, admissions, stats }) {
    const ward = useForm({ name: '', type: '' });
    const admissionFor = (bed) => admissions.find((a) => a.bed_id === bed.id);
    const change = (bed, status) =>
        router.patch(route('hospital.beds.status', bed.id), { status });
    const transfer = (a) => {
        const bed_id = prompt('شناسه تخت مقصد را وارد کنید');
        const reason = bed_id && prompt('دلیل انتقال');
        if (bed_id && reason)
            router.post(route('hospital.admissions.transfer', a.id), {
                bed_id,
                reason,
            });
    };
    return (
        <AuthenticatedLayout title="مدیریت بستری و تخت‌ها">
            <Head title="مدیریت بستری و تخت‌ها" />
            <ClinicPage className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">نقشه بخش‌ها و تخت‌ها</h1>
                    <p className="text-sm text-gray-500">
                        مدیریت لحظه‌ای اشغال، انتقال، نظافت و تعمیر
                    </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <Stat t="کل تخت" v={stats.total} />
                    <Stat t="اشغال" v={stats.occupied} />
                    <Stat t="آزاد" v={stats.available} />
                    <Stat t="نظافت" v={stats.cleaning} />
                    <Stat t="ضریب اشغال" v={`${stats.occupancy_rate}%`} />
                    <Stat
                        t="میانگین اقامت"
                        v={`${stats.average_stay_days} روز`}
                    />
                </div>
                <ClinicPanel title="افزودن بخش جدید">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            ward.post(route('hospital.wards.store'), {
                                onSuccess: () => ward.reset(),
                            });
                        }}
                        className="grid items-end gap-5 md:grid-cols-3"
                    >
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-600">
                                نام بخش
                            </span>
                            <input
                                className={fieldClass}
                                placeholder="مثلاً بخش داخلی"
                                value={ward.data.name}
                                onChange={(e) =>
                                    ward.setData('name', e.target.value)
                                }
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-600">
                                نوع بخش
                            </span>
                            <input
                                className={fieldClass}
                                placeholder="عمومی، مراقبت ویژه و..."
                                value={ward.data.type}
                                onChange={(e) =>
                                    ward.setData('type', e.target.value)
                                }
                            />
                        </label>
                        <button className={primaryButton}>افزودن بخش</button>
                    </form>
                </ClinicPanel>
                {wards.map((w) => (
                    <section
                        key={w.id}
                        className="overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">{w.name}</h2>
                                <span className="text-xs text-gray-500">
                                    {w.type}
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    const number = prompt('شماره اتاق');
                                    if (number)
                                        router.post(
                                            route('hospital.rooms.store', w.id),
                                            { number, type: 'standard' },
                                        );
                                }}
                                className="rounded border px-3 py-1 text-sm"
                            >
                                + اتاق
                            </button>
                        </div>
                        <div className="grid gap-4 lg:grid-cols-2">
                            {w.rooms.map((r) => (
                                <div
                                    key={r.id}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="mb-3 flex justify-between">
                                        <b>اتاق {r.number}</b>
                                        <button
                                            onClick={() => {
                                                const number =
                                                    prompt('شماره تخت');
                                                const daily_rate =
                                                    number &&
                                                    prompt('قیمت روزانه');
                                                if (number && daily_rate)
                                                    router.post(
                                                        route(
                                                            'hospital.beds.store',
                                                            r.id,
                                                        ),
                                                        { number, daily_rate },
                                                    );
                                            }}
                                            className="text-sm text-blue-600"
                                        >
                                            + تخت
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {r.beds.map((b) => {
                                            const a = admissionFor(b);
                                            return (
                                                <div
                                                    key={b.id}
                                                    className={`rounded-lg border-2 p-3 ${colors[b.status]}`}
                                                >
                                                    <div className="flex justify-between">
                                                        <b>تخت {b.number}</b>
                                                        <small>#{b.id}</small>
                                                    </div>
                                                    <p className="mt-1 text-xs">
                                                        {b.status} ·{' '}
                                                        {Number(
                                                            b.daily_rate,
                                                        ).toLocaleString()}{' '}
                                                        ؋/روز
                                                    </p>
                                                    {a ? (
                                                        <div className="mt-2">
                                                            <Link
                                                                href={route(
                                                                    'patients.show',
                                                                    a.patient_id,
                                                                )}
                                                                className="text-sm font-bold text-red-700"
                                                            >
                                                                {
                                                                    a.patient
                                                                        ?.full_name
                                                                }
                                                            </Link>
                                                            <p className="text-xs">
                                                                از{' '}
                                                                {a.admitted_at}
                                                            </p>
                                                            <button
                                                                onClick={() =>
                                                                    transfer(a)
                                                                }
                                                                className="mt-2 rounded bg-white px-2 py-1 text-xs"
                                                            >
                                                                انتقال
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    router.post(
                                                                        route(
                                                                            'hospital.admissions.sync-invoice',
                                                                            a.id,
                                                                        ),
                                                                    )
                                                                }
                                                                className="mr-1 mt-2 rounded bg-white px-2 py-1 text-xs"
                                                            >
                                                                صورتحساب
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-2 flex flex-wrap gap-1">
                                                            {b.status ===
                                                                'available' && (
                                                                <button
                                                                    onClick={() =>
                                                                        change(
                                                                            b,
                                                                            'maintenance',
                                                                        )
                                                                    }
                                                                    className="rounded bg-white px-2 py-1 text-xs"
                                                                >
                                                                    تعمیر
                                                                </button>
                                                            )}
                                                            {b.status !==
                                                                'available' && (
                                                                <button
                                                                    onClick={() =>
                                                                        change(
                                                                            b,
                                                                            'available',
                                                                        )
                                                                    }
                                                                    className="rounded bg-white px-2 py-1 text-xs"
                                                                >
                                                                    آزاد
                                                                </button>
                                                            )}
                                                            {b.status ===
                                                                'available' && (
                                                                <button
                                                                    onClick={() =>
                                                                        change(
                                                                            b,
                                                                            'cleaning',
                                                                        )
                                                                    }
                                                                    className="rounded bg-white px-2 py-1 text-xs"
                                                                >
                                                                    نظافت
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
function Stat({ t, v }) {
    const settings = t.includes('اشغال')
        ? [Activity, 'red']
        : t.includes('آزاد')
          ? [BedDouble, 'green']
          : t.includes('نظافت')
            ? [Sparkles, 'orange']
            : t.includes('اقامت')
              ? [Activity, 'purple']
              : [Wrench, 'teal'];
    return (
        <ClinicStat
            title={t}
            value={v}
            icon={settings[0]}
            color={settings[1]}
        />
    );
}
