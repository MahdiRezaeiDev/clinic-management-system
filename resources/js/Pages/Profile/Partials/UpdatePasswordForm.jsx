import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { CheckCircle, Key, Lock } from 'lucide-react'; // Make sure to install lucide-react
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Header Section with Icon */}
            <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3">
                        <Key className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            ویرایش رمز عبور
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            لطفا از رمزعبور حداقل ۸ کارکتر استفاده نمایید تا
                            حساب کاربری تان ایمن تر باشد. برای امنیت بیشتر، از
                            ترکیب حروف بزرگ، کوچک، اعداد و علائم استفاده کنید.
                        </p>
                    </div>
                </div>

                {/* Password Requirements Card */}
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
                        <Lock className="h-4 w-4" />
                        نکات امنیتی برای رمز عبور قوی:
                    </h3>
                    <ul className="space-y-1.5 text-sm text-amber-700">
                        <li className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-amber-500"></span>
                            حداقل ۸ کاراکتر
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-amber-500"></span>
                            شامل حروف بزرگ و کوچک
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-amber-500"></span>
                            شامل اعداد
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-amber-500"></span>
                            شامل علائم خاص (!@#$%^&*)
                        </li>
                    </ul>
                </div>
            </div>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password Field */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="current_password"
                                value="رمز عبور فعلی"
                                className="text-sm font-semibold text-gray-700"
                            />

                            <div className="relative mt-2">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData(
                                            'current_password',
                                            e.target.value,
                                        )
                                    }
                                    type="password"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-3 pr-10 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="رمز عبور فعلی خود را وارد کنید"
                                    autoComplete="current-password"
                                />
                            </div>

                            <InputError
                                message={errors.current_password}
                                className="mt-2 text-sm text-red-600"
                            />
                        </div>
                    </div>
                </div>

                {/* New Password Fields */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="space-y-5">
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="رمزعبور جدید"
                                className="text-sm font-semibold text-gray-700"
                            />

                            <div className="relative mt-2">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    type="password"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-3 pr-10 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="رمز عبور جدید را وارد کنید"
                                    autoComplete="new-password"
                                />
                            </div>

                            <InputError
                                message={errors.password}
                                className="mt-2 text-sm text-red-600"
                            />

                            {/* Password Strength Indicator */}
                            {data.password && (
                                <div className="mt-3">
                                    <div className="mb-1 flex items-center gap-2">
                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                    data.password.length < 4
                                                        ? 'w-1/4 bg-red-500'
                                                        : data.password.length <
                                                            6
                                                          ? 'w-2/4 bg-orange-500'
                                                          : data.password
                                                                  .length < 8
                                                            ? 'w-3/4 bg-yellow-500'
                                                            : 'w-full bg-green-500'
                                                }`}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">
                                            {data.password.length < 4
                                                ? 'ضعیف'
                                                : data.password.length < 6
                                                  ? 'متوسط'
                                                  : data.password.length < 8
                                                    ? 'خوب'
                                                    : 'عالی'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="تایید رمزعبور"
                                className="text-sm font-semibold text-gray-700"
                            />

                            <div className="relative mt-2">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <CheckCircle className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    type="password"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-3 pr-10 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="رمز عبور جدید را مجدد وارد کنید"
                                    autoComplete="new-password"
                                />
                            </div>

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-sm text-red-600"
                            />

                            {/* Match Indicator */}
                            {data.password && data.password_confirmation && (
                                <p
                                    className={`mt-2 text-sm ${
                                        data.password ===
                                        data.password_confirmation
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {data.password ===
                                    data.password_confirmation
                                        ? '✓ رمز عبور با تایید آن مطابقت دارد'
                                        : '✗ رمز عبور با تایید آن مطابقت ندارد'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-3">
                        <PrimaryButton
                            disabled={processing}
                            className="transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-600/30"
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
                                'ویرایش رمز عبور'
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

                    {/* Optional: Add a cancel button */}
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
                    >
                        انصراف
                    </button>
                </div>
            </form>
        </section>
    );
}
