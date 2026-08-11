import {
    ClinicHeader,
    ClinicPage,
    ClinicPanel,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Search, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

export default function Index({ patients, search }) {
    const [q, setQ] = useState(search || '');
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        phone: '',
        gender: '',
        age: '',
        address: '',
        blood_group: '',
        emergency_contact: '',
        allergies: '',
        chronic_conditions: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('patients.store'), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout title="مریضان">
            <Head title="مریضان" />
            <ClinicPage className="space-y-6">
                <ClinicHeader
                    title="پرونده‌های مریضان"
                    icon={Users}
                    subtitle="مدیریت پرونده الکترونیکی و سوابق درمانی"
                    action={
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <input
                                className={fieldClass}
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="نام، تلفن یا شماره پرونده..."
                            />
                            <button
                                onClick={() =>
                                    router.get(route('patients.index'), {
                                        search: q,
                                    })
                                }
                                className={primaryButton}
                            >
                                <Search className="h-4 w-4" />
                                جستجو
                            </button>
                        </div>
                    }
                />
                <ClinicPanel title="ثبت مریض جدید" icon={UserPlus}>
                    <form
                        onSubmit={submit}
                        className="grid gap-x-5 gap-y-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <Input
                            label="نام کامل"
                            value={data.full_name}
                            set={(v) => setData('full_name', v)}
                            error={errors.full_name}
                        />
                        <Input
                            label="تلفن"
                            value={data.phone}
                            set={(v) => setData('phone', v)}
                        />
                        <label className="text-sm">
                            <span className="mb-2 block font-medium text-gray-600">
                                جنسیت
                            </span>
                            <select
                                className={fieldClass}
                                value={data.gender}
                                onChange={(e) =>
                                    setData('gender', e.target.value)
                                }
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="male">مرد</option>
                                <option value="female">زن</option>
                            </select>
                        </label>
                        <Input
                            label="سن"
                            type="number"
                            value={data.age}
                            set={(v) => setData('age', v)}
                        />
                        <Input
                            label="گروپ خون"
                            value={data.blood_group}
                            set={(v) => setData('blood_group', v)}
                        />
                        <Input
                            label="تماس اضطراری"
                            value={data.emergency_contact}
                            set={(v) => setData('emergency_contact', v)}
                        />
                        <Input
                            label="آدرس"
                            value={data.address}
                            set={(v) => setData('address', v)}
                        />
                        <div className="flex items-end md:col-span-2 xl:col-span-3">
                            <button
                                disabled={processing}
                                className={`${primaryButton} min-w-40`}
                            >
                                ایجاد پرونده
                            </button>
                        </div>
                    </form>
                </ClinicPanel>
                <ClinicPanel
                    title={`لیست مریضان (${patients.total})`}
                    icon={Users}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gradient-to-l from-teal-700 to-teal-600 text-white">
                                <tr>
                                    {[
                                        'شماره پرونده',
                                        'نام',
                                        'تلفن',
                                        'سن',
                                        'عملیات',
                                    ].map((x) => (
                                        <th
                                            className="px-4 py-3 text-right font-medium"
                                            key={x}
                                        >
                                            {x}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {patients.data.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="border-b transition hover:bg-teal-50/50"
                                    >
                                        <td className="px-4 py-3">
                                            {p.medical_record_number || '-'}
                                        </td>
                                        <td className="px-4 py-3 font-bold text-gray-800">
                                            {p.full_name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {p.phone || '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            {p.age || '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                className="rounded-lg bg-teal-50 px-3 py-1.5 font-medium text-teal-700 transition hover:bg-teal-100"
                                                href={route(
                                                    'patients.show',
                                                    p.id,
                                                )}
                                            >
                                                بازکردن پرونده
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ClinicPanel>
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
function Input({ label, value, set, type = 'text', error }) {
    return (
        <label className="text-sm">
            <span className="mb-2 block font-medium text-gray-600">
                {label}
            </span>
            <input
                type={type}
                className={fieldClass}
                value={value}
                onChange={(e) => set(e.target.value)}
            />
            {error && (
                <span className="mt-1 block text-xs text-red-600">{error}</span>
            )}
        </label>
    );
}
