import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Mail, Send, User } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            {/* Header Section with Icon */}
            <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-3">
                        <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            اطلاعات حساب کاربری
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            ویرایش اطلاعات و ایمیل آدرس حساب کاربری. اطلاعات خود
                            را به‌روز نگه دارید تا تجربه بهتری از سرویس ما داشته
                            باشید.
                        </p>
                    </div>
                </div>

                {/* Profile Summary Card */}
                <div className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20">
                            <span className="text-2xl font-bold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {user.email}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <div
                                    className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                                        user.email_verified_at
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                >
                                    {user.email_verified_at ? (
                                        <>
                                            <CheckCircle className="h-3 w-3" />
                                            <span>تایید شده</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="h-3 w-3" />
                                            <span>تایید نشده</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Personal Information Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <User className="h-5 w-5 text-purple-500" />
                        اطلاعات شخصی
                    </h3>

                    <div className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="نام و نام خانوادگی"
                                className="text-sm font-semibold text-gray-700"
                            />

                            <div className="relative mt-2">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-3 pr-10 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                                />
                            </div>

                            <InputError
                                className="mt-2 text-sm text-red-600"
                                message={errors.name}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="ایمیل آدرس"
                                className="text-sm font-semibold text-gray-700"
                            />

                            <div className="relative mt-2">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-3 pr-10 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    autoComplete="username"
                                    placeholder="example@domain.com"
                                />
                            </div>

                            <InputError
                                className="mt-2 text-sm text-red-600"
                                message={errors.email}
                            />
                        </div>
                    </div>
                </div>

                {/* Email Verification Section */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-yellow-100 p-2">
                                <AlertCircle className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="mb-1 text-sm font-semibold text-yellow-800">
                                    ایمیل شما تایید نشده است
                                </h4>
                                <p className="mb-3 text-sm text-yellow-700">
                                    برای استفاده از تمامی امکانات سایت، لطفا
                                    ایمیل خود را تایید کنید.
                                </p>
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="inline-flex transform items-center gap-2 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-yellow-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-700 hover:shadow-xl hover:shadow-yellow-600/30"
                                >
                                    <Send className="h-4 w-4" />
                                    ارسال مجدد ایمیل تایید
                                </Link>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-100 px-3 py-2 text-green-700">
                                        <CheckCircle className="h-4 w-4" />
                                        <p className="text-xs font-medium">
                                            لینک جدید تایید، برای شما در ایمیل
                                            آدرس درج شده ارسال گردید.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-3">
                        <PrimaryButton
                            disabled={processing}
                            className="transform rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:shadow-purple-600/30"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    در حال ویرایش...
                                </span>
                            ) : (
                                'ذخیره تغییرات'
                            )}
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition-all duration-300"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition-all duration-300"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-green-700">
                                <CheckCircle className="h-5 w-5" />
                                <p className="text-sm font-medium">
                                    موفقانه ویرایش گردید.
                                </p>
                            </div>
                        </Transition>
                    </div>

                    {/* Optional: Add a reset button */}
                    <button
                        type="button"
                        onClick={() => {
                            setData('name', user.name);
                            setData('email', user.email);
                        }}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
                    >
                        بازنشانی
                    </button>
                </div>
            </form>
        </section>
    );
}
