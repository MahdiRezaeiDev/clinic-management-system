import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Activity,
    Eye,
    EyeOff,
    HeartPulse,
    Hospital,
    Lock,
    LogIn,
    Mail,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';

export default function Login({ status }) {
    const form = useForm({ email: '', password: '', remember: false });
    const [showPassword, setShowPassword] = useState(false);
    const submit = (event) => {
        event.preventDefault();
        form.post(route('login'), { onFinish: () => form.reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="ورود به سیستم" />
            <div
                dir="rtl"
                className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8"
            >
                <div className="pointer-events-none absolute inset-0 bg-white">
                    <div className="absolute inset-0 bg-[radial-gradient(#dbe5e4_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-teal-200/30 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-96 w-96 animate-pulse rounded-full bg-blue-200/30 blur-3xl" />
                </div>
                <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-teal-900/10 ring-1 ring-gray-100 lg:grid-cols-2">
                    <section className="relative hidden overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute -left-16 top-16 h-52 w-52 rounded-full border border-white/10" />
                        <div className="absolute -bottom-20 -right-12 h-72 w-72 rounded-full bg-white/5" />
                        <div className="relative">
                            <span className="inline-flex rounded-2xl bg-white/15 p-4 backdrop-blur">
                                <Hospital className="h-10 w-10" />
                            </span>
                            <h1 className="mt-8 text-3xl font-black leading-relaxed">
                                سیستم یکپارچه مدیریت بیمارستان
                            </h1>
                            <p className="mt-4 max-w-sm leading-8 text-teal-50">
                                مدیریت امن پرونده بیماران، نوبت‌ها، تریاژ،
                                لابراتوار، دواخانه و امور مالی در یک محیط واحد.
                            </p>
                        </div>
                        <div className="relative grid grid-cols-2 gap-3">
                            <Feature
                                icon={HeartPulse}
                                text="پرونده الکترونیکی"
                            />
                            <Feature icon={Activity} text="مدیریت لحظه‌ای" />
                            <Feature icon={ShieldCheck} text="دسترسی امن" />
                            <Feature icon={Hospital} text="گردش کار یکپارچه" />
                        </div>
                    </section>
                    <section className="p-6 sm:p-10 lg:p-12">
                        <div className="mb-9 flex items-center gap-3 lg:hidden">
                            <span className="rounded-2xl bg-teal-100 p-3 text-teal-700">
                                <Hospital className="h-7 w-7" />
                            </span>
                            <div>
                                <b className="text-gray-800">
                                    سیستم مدیریت بیمارستان
                                </b>
                                <p className="text-xs text-gray-400">
                                    کلینیک مادر و طفل
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-teal-600">
                                خوش آمدید
                            </p>
                            <h2 className="mt-2 text-3xl font-black text-gray-800">
                                ورود به حساب کاربری
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                برای ادامه، مشخصات حساب خود را وارد کنید.
                            </p>
                        </div>
                        {status && (
                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit} className="mt-8 space-y-5">
                            <Field label="آدرس ایمیل" icon={Mail}>
                                <input
                                    autoFocus
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) =>
                                        form.setData('email', e.target.value)
                                    }
                                    autoComplete="username"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-4 pr-11 text-left text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
                                    placeholder="name@hospital.com"
                                />
                            </Field>
                            <InputError message={form.errors.email} />
                            <Field label="رمز عبور" icon={Lock}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.data.password}
                                    onChange={(e) =>
                                        form.setData('password', e.target.value)
                                    }
                                    autoComplete="current-password"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-11 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
                                    placeholder="رمز عبور"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </Field>
                            <InputError message={form.errors.password} />
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                                    <Checkbox
                                        checked={form.data.remember}
                                        onChange={(e) =>
                                            form.setData(
                                                'remember',
                                                e.target.checked,
                                            )
                                        }
                                        className="text-teal-600 focus:ring-teal-500"
                                    />
                                    مرا به خاطر بسپار
                                </label>
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-teal-600 hover:text-teal-700"
                                >
                                    فراموشی رمز عبور
                                </Link>
                            </div>
                            <button
                                disabled={form.processing}
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 font-bold text-white shadow-lg shadow-teal-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
                            >
                                {form.processing ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5" />
                                        ورود به سیستم
                                    </>
                                )}
                            </button>
                        </form>
                        <p className="mt-10 text-center text-xs text-gray-400">
                            © ۱۴۰۵ کلینیک مادر و طفل — دسترسی محافظت‌شده
                        </p>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
}
function Field({ label, icon: Icon, children }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </span>
            <div className="relative">
                <Icon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                {children}
            </div>
        </label>
    );
}
function Feature({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-xs backdrop-blur">
            <Icon className="h-4 w-4" />
            {text}
        </div>
    );
}
