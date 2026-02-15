import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Eye,
    EyeOff,
    Hospital,
    Laptop,
    Lock,
    LogIn,
    Mail,
    Shield,
    Smartphone,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="ورود به حساب کاربری" />

            {/* Responsive Background */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-teal-50 via-white to-blue-50">
                {/* Pattern overlay - hidden on mobile for performance */}
                {!isMobile && (
                    <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                )}
                {/* Animated blobs - adjusted for mobile */}
                <div className="absolute left-0 top-0 h-48 w-48 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl md:h-96 md:w-96"></div>
                <div className="absolute bottom-0 right-0 h-48 w-48 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl md:h-96 md:w-96"></div>
            </div>

            <div
                className="flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-8 md:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Responsive container */}
                <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg">
                    {/* Logo and Brand - Responsive sizing */}
                    <div className="mb-4 text-center sm:mb-6 md:mb-8">
                        <div className="flex justify-center">
                            <div className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-0.5 shadow-lg sm:rounded-2xl sm:p-1 md:shadow-xl">
                                <div className="rounded-lg bg-white p-2 sm:rounded-xl sm:p-3">
                                    {/* Responsive logo size */}
                                    <Hospital className="h-8 w-8 text-teal-600 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                                </div>
                            </div>
                        </div>
                        <h2 className="mt-3 text-xl font-bold text-gray-800 sm:mt-4 sm:text-2xl md:mt-6 md:text-3xl">
                            کلینیک مادر و کودک
                        </h2>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            سیستم مدیریت یکپارچه کلینیک
                        </p>

                        {/* Device indicator - visual feedback */}
                        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400 sm:hidden">
                            <Smartphone className="h-3 w-3" />
                            <span>نسخه موبایل</span>
                        </div>
                        <div className="mt-2 hidden items-center justify-center gap-2 text-xs text-gray-400 sm:flex">
                            <Laptop className="h-3 w-3" />
                            <span>نسخه دسکتاپ</span>
                        </div>
                    </div>

                    {/* Status Message - Responsive padding */}
                    {status && (
                        <div className="mb-3 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700 sm:mb-4 sm:rounded-xl sm:p-4 sm:text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                                {status}
                            </div>
                        </div>
                    )}

                    {/* Login Card - Responsive design */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-lg sm:rounded-2xl md:shadow-2xl">
                        {/* Header - Responsive padding */}
                        <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="rounded-lg bg-white/10 p-1.5 backdrop-blur-sm sm:p-2">
                                    <LogIn className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white sm:text-lg">
                                        ورود به حساب کاربری
                                    </h3>
                                    <p className="text-[10px] text-teal-100 sm:text-xs">
                                        برای دسترسی به داشبورد وارد شوید
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form - Responsive padding */}
                        <form onSubmit={submit} className="p-4 sm:p-5 md:p-6">
                            {/* Email Field - Responsive spacing */}
                            <div className="mb-4 space-y-1 sm:mb-5">
                                <InputLabel
                                    htmlFor="email"
                                    value="ایمیل آدرس"
                                    className="text-xs font-medium text-gray-700 sm:text-sm"
                                />
                                <div className="relative">
                                    <Mail className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="example@clinic.com"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-8 text-xs transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 sm:px-4 sm:py-3 sm:pr-10 sm:text-sm"
                                        // Touch-friendly on mobile
                                        style={{
                                            minHeight: isMobile
                                                ? '44px'
                                                : 'auto',
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-xs"
                                />
                            </div>

                            {/* Password Field - Responsive spacing */}
                            <div className="mb-3 space-y-1 sm:mb-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="رمز عبور"
                                    className="text-xs font-medium text-gray-700 sm:text-sm"
                                />
                                <div className="relative">
                                    <Lock className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                                    <TextInput
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-8 pr-8 text-xs transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 sm:px-4 sm:py-3 sm:pl-10 sm:pr-10 sm:text-sm"
                                        // Touch-friendly on mobile
                                        style={{
                                            minHeight: isMobile
                                                ? '44px'
                                                : 'auto',
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all hover:text-gray-600"
                                        // Larger touch target on mobile
                                        style={{
                                            padding: isMobile ? '8px' : '4px',
                                        }}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                                        ) : (
                                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-1 text-xs"
                                />
                            </div>

                            {/* Remember Me & Forgot Password - Responsive layout */}
                            <div className="mb-4 flex flex-col items-start gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                        // Larger touch target on mobile
                                        style={{
                                            transform: isMobile
                                                ? 'scale(1.2)'
                                                : 'scale(1)',
                                        }}
                                    />
                                    <span className="text-xs text-gray-600 sm:text-sm">
                                        مرا به خاطر بسپار
                                    </span>
                                </label>
                                <a
                                    href={route('password.request')}
                                    className="text-xs text-teal-600 transition-all hover:text-teal-700 hover:underline sm:text-sm"
                                    // Larger touch target on mobile
                                    style={{
                                        padding: isMobile ? '8px 0' : '0',
                                    }}
                                >
                                    رمز عبور را فراموش کرده‌اید؟
                                </a>
                            </div>

                            {/* Submit Button - Responsive sizing */}
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-3 text-xs font-bold text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50 sm:px-6 sm:py-3 sm:text-sm"
                                // Touch-friendly on mobile
                                style={{
                                    minHeight: isMobile ? '48px' : 'auto',
                                }}
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-4 sm:w-4"></span>
                                        <span className="text-xs sm:text-sm">
                                            در حال ورود...
                                        </span>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="text-xs sm:text-sm">
                                            ورود به حساب
                                        </span>
                                    </span>
                                )}
                            </PrimaryButton>

                            {/* Demo Credentials - Responsive design */}
                            <div className="mt-4 rounded-lg border border-teal-100 bg-teal-50/50 p-3 sm:mt-6 sm:rounded-xl sm:p-4">
                                <p className="mb-2 text-[10px] font-medium text-teal-700 sm:text-xs">
                                    اطلاعات آزمایشی
                                </p>
                                <div className="space-y-1 text-[10px] text-gray-600 sm:text-xs">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3" />
                                        <span className="truncate">
                                            admin@clinic.com
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Lock className="h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3" />
                                        <span>password</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer - Responsive text */}
                    <p className="mt-4 text-center text-[10px] text-gray-400 sm:mt-6 sm:text-xs">
                        © ۱۴۰۵ کلینیک مادر و کودک. تمامی حقوق محفوظ است.
                    </p>
                </div>
            </div>

            {/* RTL-specific styles */}
            <style jsx>{`
                /* Ensure proper RTL spacing */
                input,
                button,
                a {
                    font-family: inherit;
                }

                /* Better touch targets on mobile */
                @media (max-width: 640px) {
                    button,
                    a,
                    input,
                    label {
                        cursor: pointer;
                        -webkit-tap-highlight-color: transparent;
                    }

                    input,
                    button {
                        font-size: 16px !important; /* Prevents zoom on iOS */
                    }
                }

                /* Smooth scrolling */
                * {
                    -webkit-overflow-scrolling: touch;
                }
            `}</style>
        </GuestLayout>
    );
}
