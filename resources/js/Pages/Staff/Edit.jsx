import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, staff }) {
    const roles = [
        { key: 'doctor', label: 'داکتر' },
        { key: 'nurse', label: 'پرستار' },
        { key: 'pharmacist', label: 'دواساز' },
        { key: 'lab', label: 'لابراتوار' },
        { key: 'dentist', label: 'دندان‌پزشک' },
        { key: 'emergency', label: 'ایمرجنسی' },
        { key: 'gynecology', label: 'نسایی ولادی' },
        { key: 'inpatient', label: 'بخش بستری' },
        { key: 'service', label: 'خدمات' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: staff.name || '',
        phone: staff.phone || '',
        role: staff.role || '',
        salary: staff.salary || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('staffs.update', staff.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="ویرایش کارمند" />

            <div className="mx-auto max-w-2xl rounded bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold">ویرایش کارمند</h2>

                <form onSubmit={submit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium">نام</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium">
                            شماره تماس
                        </label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium">
                            وظیفه
                        </label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                        >
                            <option value="">انتخاب کنید</option>
                            {roles.map((r) => (
                                <option key={r.key} value={r.key}>
                                    {r.label}
                                </option>
                            ))}
                        </select>
                        {errors.role && (
                            <p className="text-sm text-red-500">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium">
                            معاش
                        </label>
                        <input
                            type="number"
                            value={data.salary}
                            onChange={(e) => setData('salary', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />
                        {errors.salary && (
                            <p className="text-sm text-red-500">
                                {errors.salary}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            ذخیره تغییرات
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
