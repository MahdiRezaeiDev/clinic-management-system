import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        name: '',
        email: '',
        role: 'finance',
        password: '',
        password_confirmation: '',
    });

    const handleUserCreate = (e) => {
        e.preventDefault();

        post(route('user.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout title="ایجاد حساب کاربری">
            <Head title="ایجاد حساب کاربری" />
            <div className="mx-auto w-full px-4 md:px-10 md:pt-16">
                <div className="flex flex-wrap pt-8">
                    <div className="mb-12 w-full px-4">
                        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-green-200 shadow-lg">
                            <div className="block w-full overflow-x-auto">
                                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="overflow-hidden p-6 shadow-sm sm:rounded-lg">
                                        <form
                                            method="POST"
                                            onSubmit={handleUserCreate}
                                        >
                                            <div>
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="نام و نام خانوادگی"
                                                />
                                                <TextInput
                                                    id="name"
                                                    className="mt-1 block w-full"
                                                    name="name"
                                                    value={data.name}
                                                    isFocused={true}
                                                    onChange={(e) => {
                                                        setData(
                                                            'name',
                                                            e.target.value,
                                                        );
                                                    }}
                                                    required
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="email"
                                                    value="ایمیل آدرس"
                                                />
                                                <TextInput
                                                    id="email"
                                                    className="mt-1 block w-full"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={(e) => {
                                                        setData(
                                                            'email',
                                                            e.target.value,
                                                        );
                                                    }}
                                                    required
                                                />
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="role"
                                                    value="نوعیت حساب کاربری"
                                                />
                                                <select
                                                    name="role"
                                                    id="role"
                                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    value={data.role}
                                                    onChange={(e) =>
                                                        setData(
                                                            'role',
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="finance">
                                                        مالی
                                                    </option>
                                                    <option value="admin">
                                                        مدیر
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={errors.role}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="رمز عبور"
                                                />
                                                <p className="text-xs text-gray-600">
                                                    * رمز عبور باید حداقل متشکل
                                                    از ۸ حرف باشد.
                                                </p>
                                                <TextInput
                                                    id="password"
                                                    className="mt-1 block w-full"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    autoComplete="new-password"
                                                    onChange={(e) =>
                                                        setData(
                                                            'password',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.password}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="password_confirmation"
                                                    value="تایید رمز عبور"
                                                />
                                                <TextInput
                                                    id="password_confirmation"
                                                    className="mt-1 block w-full"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'password_confirmation',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="mt-4 flex items-center justify-start">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="me-4"
                                                >
                                                    ثبت حساب کاربری
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
                className="fixed bottom-4 left-4"
            >
                <p className="bg-green-600 px-10 py-3 text-center text-sm font-semibold text-white">
                    حساب کاربری موفقانه ایجاد گردید.
                </p>
            </Transition>
        </AuthenticatedLayout>
    );
}
