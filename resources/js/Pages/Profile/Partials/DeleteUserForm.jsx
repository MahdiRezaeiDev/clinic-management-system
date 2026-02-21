import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {
    AlertOctagon,
    AlertTriangle,
    Lock,
    Shield,
    Trash2,
    XCircle,
} from 'lucide-react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`${className} mx-auto max-w-2xl`}>
            {/* Header Section with Warning Icon */}
            <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-red-50 to-rose-50 p-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            حذف حساب کاربری
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            بعد از حذف حساب کاربری، هیچگونه اطلاعات این حساب و
                            اطلاعات ثبت شده توسط این حساب در دسترس نخواهد بود.
                            این عملیات غیرقابل بازگشت است.
                        </p>
                    </div>
                </div>

                {/* Warning Card */}
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 rounded-lg bg-red-100 p-1.5">
                            <AlertOctagon className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold text-red-800">
                                هشدار مهم
                            </h3>
                            <p className="text-sm leading-relaxed text-red-700">
                                با حذف حساب کاربری، تمامی اطلاعات زیر برای همیشه
                                پاک خواهند شد:
                            </p>
                            <ul className="mt-2 space-y-1.5 text-sm text-red-700">
                                <li className="flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-red-500"></span>
                                    اطلاعات شخصی و پروفایل
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-red-500"></span>
                                    تاریخچه فعالیت‌ها و تراکنش‌ها
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-red-500"></span>
                                    فایل‌ها و مستندات آپلود شده
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-red-500"></span>
                                    تنظیمات و اولویت‌های ذخیره شده
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2">
                            <Trash2 className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                حذف دائمی حساب
                            </h3>
                            <p className="mt-0.5 text-sm text-gray-600">
                                پس از تایید، دیگر امکان بازیابی اطلاعات وجود
                                نخواهد داشت
                            </p>
                        </div>
                    </div>

                    <DangerButton
                        onClick={confirmUserDeletion}
                        className="flex transform items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-red-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-rose-700 hover:shadow-xl hover:shadow-red-600/30"
                    >
                        <Trash2 className="h-4 w-4" />
                        حذف حساب کاربری
                    </DangerButton>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                show={confirmingUserDeletion}
                onClose={closeModal}
                maxWidth="md"
            >
                <form onSubmit={deleteUser}>
                    <div className="p-6">
                        {/* Modal Header */}
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-full bg-red-100 p-2.5">
                                <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    آیا مطمئن هستید؟
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    این عملیات غیرقابل بازگشت است
                                </p>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="space-y-4">
                            <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                <span className="font-semibold text-red-600">
                                    توجه:
                                </span>{' '}
                                بعد از حذف حساب کاربری، هیچگونه اطلاعات این حساب
                                و اطلاعات ثبت شده توسط این حساب در دسترس نخواهد
                                بود. لطفا برای تایید، رمز عبور خود را وارد کنید.
                            </p>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="رمز عبور"
                                    className="text-sm font-semibold text-gray-700"
                                />

                                <div className="relative mt-2">
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-3 pr-10 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-red-500"
                                        isFocused
                                        placeholder="رمز عبور خود را وارد کنید"
                                    />
                                </div>

                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-sm text-red-600"
                                />
                            </div>

                            {/* Security Note */}
                            <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                <p className="text-xs leading-relaxed text-blue-700">
                                    برای امنیت بیشتر، این عملیات در لاگ سیستم
                                    ثبت خواهد شد. در صورت ادامه، جلسه کاربری شما
                                    بلافاصله بسته خواهد شد.
                                </p>
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-200 pt-6">
                            <SecondaryButton
                                onClick={closeModal}
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
                            >
                                انصراف
                            </SecondaryButton>

                            <DangerButton
                                disabled={processing || !data.password}
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-red-500/25 hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
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
                                        در حال حذف...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        تایید و حذف حساب
                                    </span>
                                )}
                            </DangerButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
