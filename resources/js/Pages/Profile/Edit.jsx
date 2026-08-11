import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout title="پروفایل کاربری">
            <Head title="پروفایل کاربری" />

            <div dir="rtl" className="px-4 py-7 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <header className="overflow-hidden rounded-3xl bg-gradient-to-l from-teal-700 via-teal-600 to-cyan-600 p-6 text-white shadow-xl shadow-teal-200/60 sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black ring-1 ring-white/20 backdrop-blur">
                                    {user.name?.charAt(0)}
                                </span>
                                <div>
                                    <p className="text-sm text-teal-100">
                                        حساب کاربری فعال
                                    </p>
                                    <h1 className="mt-1 text-2xl font-black">
                                        {user.name}
                                    </h1>
                                    <p
                                        dir="ltr"
                                        className="mt-1 text-right text-sm text-teal-50"
                                    >
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur">
                                <ShieldCheck className="h-5 w-5" />
                                مدیریت مشخصات و امنیت حساب
                            </div>
                        </div>
                    </header>

                    <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/50 sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-none"
                        />
                    </section>

                    <div className="grid items-start gap-6 xl:grid-cols-2">
                        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/50 sm:p-8">
                            <UpdatePasswordForm className="max-w-none" />
                        </section>
                        <section className="rounded-3xl border border-red-100 bg-white p-5 shadow-lg shadow-red-100/50 sm:p-8">
                            <DeleteUserForm className="max-w-none" />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
