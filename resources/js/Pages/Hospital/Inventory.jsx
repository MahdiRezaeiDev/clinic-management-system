import {
    ClinicHeader,
    ClinicPage,
    ClinicPanel,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ArchiveRestore, PackagePlus, Pill } from 'lucide-react';
export default function Inventory({ drugs, batches, movements }) {
    const batch = useForm({
        drug_id: '',
        batch_number: '',
        expires_at: '',
        quantity_received: '',
        purchase_price: '',
        sale_price: '',
    });
    const move = useForm({
        drug_batch_id: '',
        type: 'return',
        quantity: '',
        reason: '',
    });
    return (
        <AuthenticatedLayout title="انبار محموله‌ای دارو">
            <Head title="انبار دارو" />
            <ClinicPage className="space-y-6">
                <ClinicHeader
                    title="انبار محموله‌ای دارو"
                    subtitle="کنترل FEFO، انقضا، برگشت و ضایعات"
                    icon={Pill}
                />
                <div className="grid gap-6 lg:grid-cols-2">
                    <ClinicPanel title="دریافت محموله" icon={PackagePlus}>
                        <form
                            className="grid gap-4 sm:grid-cols-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                batch.post(
                                    route('hospital.inventory.batches.store'),
                                    { onSuccess: () => batch.reset() },
                                );
                            }}
                        >
                            <Select form={batch} name="drug_id" label="دارو">
                                <option value="">انتخاب دارو</option>
                                {drugs.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.brand_name}
                                    </option>
                                ))}
                            </Select>
                            <Input
                                form={batch}
                                name="batch_number"
                                label="شماره Batch"
                            />
                            <Input
                                form={batch}
                                name="expires_at"
                                label="انقضا (جلالی)"
                                placeholder="1406/01/01"
                            />
                            <Input
                                form={batch}
                                name="quantity_received"
                                label="تعداد"
                                type="number"
                            />
                            <Input
                                form={batch}
                                name="purchase_price"
                                label="قیمت خرید"
                                type="number"
                            />
                            <Input
                                form={batch}
                                name="sale_price"
                                label="قیمت فروش"
                                type="number"
                            />
                            <button className={primaryButton}>
                                ثبت محموله
                            </button>
                        </form>
                    </ClinicPanel>
                    <ClinicPanel
                        title="برگشت، ضایعات یا تعدیل"
                        icon={ArchiveRestore}
                    >
                        <form
                            className="grid gap-4 sm:grid-cols-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                move.post(
                                    route('hospital.inventory.movements.store'),
                                    { onSuccess: () => move.reset() },
                                );
                            }}
                        >
                            <Select
                                form={move}
                                name="drug_batch_id"
                                label="محموله"
                            >
                                <option value="">انتخاب محموله</option>
                                {batches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.drug.brand_name} / {b.batch_number} /{' '}
                                        {b.quantity_available}
                                    </option>
                                ))}
                            </Select>
                            <Select form={move} name="type" label="نوع">
                                <option value="return">برگشت</option>
                                <option value="waste">ضایعات</option>
                                <option value="adjustment">کاهش موجودی</option>
                            </Select>
                            <Input
                                form={move}
                                name="quantity"
                                label="تعداد"
                                type="number"
                            />
                            <Input form={move} name="reason" label="دلیل" />
                            <button className={primaryButton}>ثبت گردش</button>
                        </form>
                    </ClinicPanel>
                </div>
                <ClinicPanel
                    title={`محموله‌ها (${batches.length})`}
                    icon={Pill}
                    bodyClassName="p-0"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-teal-700 text-white">
                                <tr>
                                    {[
                                        'دارو',
                                        'Batch',
                                        'انقضا',
                                        'دریافت',
                                        'موجود',
                                        'قیمت خرید',
                                        'قیمت فروش',
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-4 text-right"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map((b) => (
                                    <tr key={b.id} className="border-b">
                                        <td className="px-4 py-4 font-bold">
                                            {b.drug.brand_name}
                                        </td>
                                        <td className="px-4 py-4">
                                            {b.batch_number}
                                        </td>
                                        <td className="px-4 py-4">
                                            {b.expires_at}
                                        </td>
                                        <td className="px-4 py-4">
                                            {b.quantity_received}
                                        </td>
                                        <td className="px-4 py-4">
                                            {b.quantity_available}
                                        </td>
                                        <td className="px-4 py-4">
                                            {Number(
                                                b.purchase_price,
                                            ).toLocaleString()}{' '}
                                            ؋
                                        </td>
                                        <td className="px-4 py-4">
                                            {Number(
                                                b.sale_price,
                                            ).toLocaleString()}{' '}
                                            ؋
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ClinicPanel>
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
function Field({ form, name, label, children }) {
    return (
        <label>
            <span className="mb-2 block text-sm font-medium text-gray-600">
                {label}
            </span>
            {children}
            {form.errors[name] && (
                <small className="text-red-600">{form.errors[name]}</small>
            )}
        </label>
    );
}
function Input({ form, name, label, ...p }) {
    return (
        <Field form={form} name={name} label={label}>
            <input
                className={fieldClass}
                value={form.data[name]}
                onChange={(e) => form.setData(name, e.target.value)}
                {...p}
            />
        </Field>
    );
}
function Select({ form, name, label, children }) {
    return (
        <Field form={form} name={name} label={label}>
            <select
                className={fieldClass}
                value={form.data[name]}
                onChange={(e) => form.setData(name, e.target.value)}
            >
                {children}
            </select>
        </Field>
    );
}
