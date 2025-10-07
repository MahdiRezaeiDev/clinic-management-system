import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        contact_person: '',
        phone: '',
        email: '',
        address: '',
        description: '',
    });
    console.log(errors);

    const { flash } = usePage().props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    const submit = (e) => {
        e.preventDefault();
        post(route('suppliers.store'), { onSuccess: () => reset() });
    };

    const inputClass =
        'peer block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400';

    return (
        <AuthenticatedLayout title="شرکت های همکار">
            <Head title="ثبت شرکت همکار جدید" />

            <div className="mx-auto w-full max-w-4xl px-4 md:px-10 md:pt-10">
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                    <div className="bg-blueGray-600 p-5">
                        <h2 className="text-lg font-bold text-white">
                            ثبت شرکت همکار جدید
                        </h2>
                    </div>

                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2"
                    >
                        {/* Company Name */}
                        <div className="relative">
                            <input
                                id="company_name"
                                type="text"
                                value={data.company_name}
                                onChange={(e) =>
                                    setData('company_name', e.target.value)
                                }
                                className={inputClass}
                                required
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                                نام شرکت
                            </label>
                            <InputError message={errors.company_name} />
                        </div>

                        {/* Contact Person */}
                        <div className="relative">
                            <input
                                id="contact_person"
                                type="text"
                                value={data.contact_person}
                                onChange={(e) =>
                                    setData('contact_person', e.target.value)
                                }
                                className={inputClass}
                            />
                            <label
                                htmlFor="contact_person"
                                className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                                نام مسئول
                            </label>
                            <InputError message={errors.contact_person} />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <input
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                className={inputClass}
                            />
                            <label
                                htmlFor="phone"
                                className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                                شماره تماس
                            </label>
                            <InputError message={errors.phone} />
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <input
                                id="address"
                                type="text"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                className={inputClass}
                            />
                            <label
                                htmlFor="address"
                                className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                                آدرس
                            </label>
                            <InputError message={errors.address} />
                        </div>

                        {/* Description */}
                        <div className="relative md:col-span-2">
                            <textarea
                                id="description"
                                rows="3"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className={inputClass}
                            />
                            <label
                                htmlFor="description"
                                className="absolute left-3 top-2 bg-white px-2 text-sm text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                                توضیحات
                            </label>
                            <InputError message={errors.description} />
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
            {/* Success Toast */}
            <Transition
                show={show}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="rounded bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
