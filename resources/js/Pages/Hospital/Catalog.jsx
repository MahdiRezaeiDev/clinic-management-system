import {
    ClinicHeader,
    ClinicPage,
    ClinicPanel,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { BadgeDollarSign, Building2, Plus } from 'lucide-react';
export default function Catalog({ insurers, tariffs }) {
    const insurer = useForm({ name: '', code: '', phone: '' });
    const tariff = useForm({
        code: '',
        name: '',
        category: '',
        price: '',
        insurer_id: '',
        insurance_price: '',
        effective_from: '',
    });
    return (
        <AuthenticatedLayout title="بیمه و تعرفه خدمات">
            <Head title="بیمه و تعرفه خدمات" />
            <ClinicPage className="space-y-6">
                <ClinicHeader
                    title="بیمه و تعرفه خدمات"
                    subtitle="مدیریت شرکت‌های بیمه و قیمت خدمات بیمارستان"
                    icon={BadgeDollarSign}
                />
                <div className="grid gap-6 lg:grid-cols-2">
                    <ClinicPanel title="شرکت بیمه جدید" icon={Building2}>
                        <form
                            className="grid gap-4 sm:grid-cols-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                insurer.post(route('hospital.insurers.store'), {
                                    onSuccess: () => insurer.reset(),
                                });
                            }}
                        >
                            <Input
                                form={insurer}
                                name="name"
                                label="نام شرکت"
                            />
                            <Input form={insurer} name="code" label="کد" />
                            <Input form={insurer} name="phone" label="تلفن" />
                            <button className={primaryButton}>
                                <Plus className="h-4 w-4" />
                                ثبت شرکت
                            </button>
                        </form>
                        <div className="mt-6 divide-y">
                            {insurers.map((i) => (
                                <div
                                    key={i.id}
                                    className="flex justify-between py-3"
                                >
                                    <b>{i.name}</b>
                                    <span className="text-sm text-gray-500">
                                        {i.code}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ClinicPanel>
                    <ClinicPanel title="تعرفه جدید" icon={BadgeDollarSign}>
                        <form
                            className="grid gap-4 sm:grid-cols-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                tariff.post(route('hospital.tariffs.store'), {
                                    onSuccess: () => tariff.reset(),
                                });
                            }}
                        >
                            <Input form={tariff} name="name" label="نام خدمت" />
                            <Input form={tariff} name="code" label="کد خدمت" />
                            <Input
                                form={tariff}
                                name="category"
                                label="دسته‌بندی"
                            />
                            <Input
                                form={tariff}
                                name="price"
                                label="قیمت آزاد"
                                type="number"
                            />
                            <label>
                                <span className="mb-2 block text-sm font-medium text-gray-600">
                                    بیمه
                                </span>
                                <select
                                    className={fieldClass}
                                    value={tariff.data.insurer_id}
                                    onChange={(e) =>
                                        tariff.setData(
                                            'insurer_id',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">بدون بیمه</option>
                                    {insurers.map((i) => (
                                        <option key={i.id} value={i.id}>
                                            {i.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <Input
                                form={tariff}
                                name="insurance_price"
                                label="قیمت بیمه"
                                type="number"
                            />
                            <Input
                                form={tariff}
                                name="effective_from"
                                label="تاریخ اجرا (جلالی)"
                                placeholder="1405/01/01"
                            />
                            <button className={primaryButton}>
                                <Plus className="h-4 w-4" />
                                ثبت تعرفه
                            </button>
                        </form>
                    </ClinicPanel>
                </div>
                <ClinicPanel
                    title={`فهرست تعرفه‌ها (${tariffs.length})`}
                    icon={BadgeDollarSign}
                    bodyClassName="p-0"
                >
                    <Table tariffs={tariffs} />
                </ClinicPanel>
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
function Input({ form, name, label, ...rest }) {
    return (
        <label>
            <span className="mb-2 block text-sm font-medium text-gray-600">
                {label}
            </span>
            <input
                className={fieldClass}
                value={form.data[name]}
                onChange={(e) => form.setData(name, e.target.value)}
                {...rest}
            />
            {form.errors[name] && (
                <small className="text-red-600">{form.errors[name]}</small>
            )}
        </label>
    );
}
function Table({ tariffs }) {
    return tariffs.length ? (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-teal-700 text-white">
                    <tr>
                        {[
                            'کد',
                            'خدمت',
                            'دسته',
                            'قیمت آزاد',
                            'بیمه',
                            'قیمت بیمه',
                        ].map((h) => (
                            <th key={h} className="px-5 py-4 text-right">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tariffs.map((t) => (
                        <tr key={t.id} className="border-b">
                            <td className="px-5 py-4">{t.code}</td>
                            <td className="px-5 py-4 font-bold">{t.name}</td>
                            <td className="px-5 py-4">{t.category}</td>
                            <td className="px-5 py-4">
                                {Number(t.price).toLocaleString()} ؋
                            </td>
                            <td className="px-5 py-4">
                                {t.insurer?.name || '-'}
                            </td>
                            <td className="px-5 py-4">
                                {t.insurance_price
                                    ? `${Number(t.insurance_price).toLocaleString()} ؋`
                                    : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="py-14 text-center text-gray-500">
            هنوز تعرفه‌ای ثبت نشده است.
        </div>
    );
}
