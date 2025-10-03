import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ staff }) {
    const roles = [
        { key: 'doctor', label: 'داکتر' },
        { key: 'nurse', label: 'پرستار' },
        { key: 'pharmacist', label: 'فارمسیست' },
        { key: 'lab', label: 'لابراتوار' },
        { key: 'dentist', label: 'دندان‌پزشک' },
        { key: 'emergency', label: 'ایمرجنسی' },
        { key: 'gynecology', label: 'نسایی ولادی' },
        { key: 'inpatient', label: 'بخش بستری' },
        { key: 'service', label: 'خدمات' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        full_name: staff.full_name || '',
        phone: staff.phone || '',
        role: staff.role || '',
        base_salary: staff.base_salary || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('staffs.update', staff.id));
    };

    return (
        <AuthenticatedLayout title="ویرایش کارمند">
            <Head title="ویرایش کارمند" />

            <div className="mx-auto p-6">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-6 text-xl font-bold text-gray-800">
                        ✏️ ویرایش اطلاعات کارمند
                    </h2>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                نام
                            </label>
                            <input
                                type="text"
                                value={data.full_name}
                                onChange={(e) =>
                                    setData('full_name', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                شماره تماس
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                وظیفه
                            </label>
                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData('role', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border border-gray-300 px-7 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            >
                                <option value="">انتخاب کنید</option>
                                {roles.map((r) => (
                                    <option key={r.key} value={r.key}>
                                        {r.label}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                معاش (افغانی)
                            </label>
                            <input
                                type="number"
                                value={data.base_salary}
                                onChange={(e) =>
                                    setData('base_salary', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.base_salary && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.base_salary}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex items-center gap-3">
                            <PrimaryButton type="submit" disabled={processing}>
                                ذخیره
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => window.history.back()}
                            >
                                بازگشت
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
