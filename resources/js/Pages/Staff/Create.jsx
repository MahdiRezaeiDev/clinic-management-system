import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        phone: '',
        role: '',
        base_salary: 0,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('staffs.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout title="افزودن پرسنل">
            <Head title="افزودن پرسنل" />
            <div className="mx-auto flex max-w-2xl flex-wrap pt-8">
                <div className="mb-12 w-full px-4">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg">
                        <div className="mb-0 flex items-center justify-between rounded-t border-0 px-4 py-3">
                            <h3 className="text-blueGray-700 text-lg font-semibold">
                                فرم افزودن پرسنل جدید
                            </h3>
                        </div>

                        <form
                            onSubmit={submit}
                            className="space-y-6 rounded bg-white p-6 shadow"
                        >
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    نام و نام خانوادگی
                                </label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData('full_name', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.full_name}
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    نقش
                                </label>
                                <select
                                    value={data.role}
                                    name="role"
                                    onChange={(e) =>
                                        setData('role', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                    <option value="">انتخاب نقش</option>
                                    <option value="doctor">پزشک</option>
                                    <option value="nurse">نرس</option>
                                    <option value="pharmacist">فارمسیست</option>
                                    <option value="lab">لابراتوار</option>
                                    <option value="dentist">دندانپزشک</option>
                                    <option value="emergency">عاجل</option>
                                    <option value="gynecology">نسایی</option>
                                    <option value="inpatient">بستری</option>
                                    <option value="service">
                                        خدمات / سایر
                                    </option>
                                </select>
                                {errors.role && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            {/* Base Salary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    حقوق پایه
                                </label>
                                <input
                                    type="number"
                                    value={data.base_salary}
                                    onChange={(e) =>
                                        setData('base_salary', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.base_salary && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.base_salary}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
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
            </div>
        </AuthenticatedLayout>
    );
}
