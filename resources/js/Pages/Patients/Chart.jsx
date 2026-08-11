import {
    ClinicPage,
    ClinicPanel,
    fieldClass,
    primaryButton,
} from '@/Components/ClinicUI';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Download, FileText, Trash2, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

const today = () =>
    new Intl.DateTimeFormat('en-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
        .format(new Date())
        .replace(/\//g, '/');
export default function Chart({
    patient,
    doctors,
    labTests,
    drugs,
    beds,
    insurers,
}) {
    const [tab, setTab] = useState('timeline');
    const tabs = [
        ['timeline', 'خلاصه'],
        ['appointments', 'نوبت'],
        ['clinical', 'بالینی'],
        ['lab', 'لابراتوار'],
        ['rx', 'نسخه'],
        ['admission', 'بستری'],
        ['billing', 'صورتحساب'],
        ['documents', 'اسناد'],
    ];
    return (
        <AuthenticatedLayout title={`پرونده ${patient.full_name}`}>
            <Head title={patient.full_name} />
            <ClinicPage className="space-y-5">
                <header className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-teal-700 via-teal-600 to-blue-700 p-7 text-white shadow-xl">
                    <h1 className="text-2xl font-bold">{patient.full_name}</h1>
                    <p className="mt-2 text-sm">
                        شماره پرونده: {patient.medical_record_number} | تلفن:{' '}
                        {patient.phone || '-'} | گروپ خون:{' '}
                        {patient.blood_group || '-'}
                    </p>
                    <p className="mt-1 text-sm">
                        حساسیت‌ها: {patient.allergies || 'ثبت نشده'} | بیماری
                        مزمن: {patient.chronic_conditions || 'ثبت نشده'}
                    </p>
                </header>
                <nav className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gray-100">
                    {tabs.map(([k, l]) => (
                        <button
                            key={k}
                            onClick={() => setTab(k)}
                            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${tab === k ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md' : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'}`}
                        >
                            {l}
                        </button>
                    ))}
                </nav>
                {tab === 'timeline' && <Timeline patient={patient} />}{' '}
                {tab === 'appointments' && (
                    <Appointment patient={patient} doctors={doctors} />
                )}{' '}
                {tab === 'clinical' && (
                    <Clinical patient={patient} doctors={doctors} />
                )}{' '}
                {tab === 'lab' && (
                    <Lab patient={patient} doctors={doctors} tests={labTests} />
                )}{' '}
                {tab === 'rx' && (
                    <Rx patient={patient} doctors={doctors} drugs={drugs} />
                )}{' '}
                {tab === 'admission' && (
                    <Admission
                        patient={patient}
                        doctors={doctors}
                        beds={beds}
                    />
                )}{' '}
                {tab === 'billing' && <Billing patient={patient} />}
                {tab === 'documents' && (
                    <Documents patient={patient} insurers={insurers} />
                )}
            </ClinicPage>
        </AuthenticatedLayout>
    );
}
const Box = ({ title, children }) => (
    <ClinicPanel title={title}>{children}</ClinicPanel>
);
const Sel = ({ value, onChange, children }) => (
    <select className={fieldClass} value={value} onChange={onChange}>
        {children}
    </select>
);
const In = ({ value, onChange, placeholder, type = 'text' }) => (
    <input
        type={type}
        className={fieldClass}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);
function Timeline({ patient }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Box title="ویزیت‌ها">
                <b>{patient.visits.length}</b>
            </Box>
            <Box title="آزمایش‌ها">
                <b>{patient.lab_orders.length}</b>
            </Box>
            <Box title="صورتحساب‌های باز">
                <b>
                    {
                        patient.invoices.filter(
                            (x) => !['paid', 'cancelled'].includes(x.status),
                        ).length
                    }
                </b>
            </Box>
            <div className="md:col-span-3">
                <Box title="آخرین رویدادها">
                    {patient.clinical_notes.map((n) => (
                        <div key={n.id} className="border-b py-3">
                            <b>{n.diagnosis || 'یادداشت بالینی'}</b>
                            <p className="text-sm text-gray-600">
                                {n.assessment || n.plan}
                            </p>
                        </div>
                    ))}
                </Box>
            </div>
        </div>
    );
}
function Appointment({ patient, doctors }) {
    const f = useForm({
        doctor_id: '',
        date: today(),
        time: '09:00',
        reason: '',
    });
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="نوبت جدید">
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        f.post(
                            route('patients.appointments.store', patient.id),
                        );
                    }}
                >
                    <Sel
                        value={f.data.doctor_id}
                        onChange={(e) => f.setData('doctor_id', e.target.value)}
                    >
                        <option value="">انتخاب داکتر</option>
                        {doctors.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.full_name}
                            </option>
                        ))}
                    </Sel>
                    <In
                        value={f.data.date}
                        onChange={(e) => f.setData('date', e.target.value)}
                        placeholder="1405/01/01"
                    />
                    <In
                        type="time"
                        value={f.data.time}
                        onChange={(e) => f.setData('time', e.target.value)}
                    />
                    <In
                        value={f.data.reason}
                        onChange={(e) => f.setData('reason', e.target.value)}
                        placeholder="دلیل مراجعه"
                    />
                    <button className={primaryButton}>ثبت نوبت</button>
                </form>
            </Box>
            <Box title="نوبت‌ها">
                {patient.appointments.map((x) => (
                    <div key={x.id} className="border-b py-3">
                        <b>{x.doctor?.full_name}</b>
                        <p className="text-sm">
                            {x.scheduled_at} — {x.status}
                        </p>
                    </div>
                ))}
            </Box>
        </div>
    );
}
function Clinical({ patient, doctors }) {
    const f = useForm({
        doctor_id: '',
        diagnosis: '',
        assessment: '',
        plan: '',
        vitals: { temperature: '', blood_pressure: '' },
    });
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="یادداشت بالینی">
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        f.post(route('patients.notes.store', patient.id));
                    }}
                >
                    <Sel
                        value={f.data.doctor_id}
                        onChange={(e) => f.setData('doctor_id', e.target.value)}
                    >
                        <option value="">داکتر</option>
                        {doctors.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.full_name}
                            </option>
                        ))}
                    </Sel>
                    <In
                        value={f.data.diagnosis}
                        onChange={(e) => f.setData('diagnosis', e.target.value)}
                        placeholder="تشخیص"
                    />
                    <textarea
                        className={`${fieldClass} h-28 py-3`}
                        value={f.data.assessment}
                        onChange={(e) =>
                            f.setData('assessment', e.target.value)
                        }
                        placeholder="ارزیابی"
                    />
                    <textarea
                        className={`${fieldClass} h-28 py-3`}
                        value={f.data.plan}
                        onChange={(e) => f.setData('plan', e.target.value)}
                        placeholder="برنامه درمان"
                    />
                    <button className={primaryButton}>ثبت</button>
                </form>
            </Box>
            <Box title="سوابق">
                {patient.clinical_notes.map((x) => (
                    <div className="border-b py-3" key={x.id}>
                        <b>{x.diagnosis}</b>
                        <p>{x.assessment}</p>
                        <small>{x.created_at}</small>
                    </div>
                ))}
            </Box>
        </div>
    );
}
function Lab({ patient, doctors, tests }) {
    const f = useForm({
        doctor_id: '',
        ordered_at: today(),
        test_ids: [],
        clinical_notes: '',
    });
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="درخواست آزمایش">
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        f.post(route('patients.lab-orders.store', patient.id));
                    }}
                >
                    <Sel
                        value={f.data.doctor_id}
                        onChange={(e) => f.setData('doctor_id', e.target.value)}
                    >
                        <option value="">داکتر</option>
                        {doctors.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.full_name}
                            </option>
                        ))}
                    </Sel>
                    <In
                        value={f.data.ordered_at}
                        onChange={(e) =>
                            f.setData('ordered_at', e.target.value)
                        }
                        placeholder="تاریخ جلالی"
                    />
                    <div className="max-h-48 overflow-auto border p-2">
                        {tests.map((t) => (
                            <label key={t.id} className="block p-1">
                                <input
                                    type="checkbox"
                                    checked={f.data.test_ids.includes(t.id)}
                                    onChange={() =>
                                        f.setData(
                                            'test_ids',
                                            f.data.test_ids.includes(t.id)
                                                ? f.data.test_ids.filter(
                                                      (i) => i !== t.id,
                                                  )
                                                : [...f.data.test_ids, t.id],
                                        )
                                    }
                                />{' '}
                                {t.name} — {Number(t.price).toLocaleString()} ؋
                            </label>
                        ))}
                    </div>
                    <button className={primaryButton}>ثبت درخواست</button>
                </form>
            </Box>
            <Box title="نتایج">
                {patient.lab_orders.map((o) => (
                    <div key={o.id} className="mb-3 rounded border p-3">
                        <b>{o.order_number}</b>
                        <p className="text-sm">{o.status}</p>
                        {o.items.map((i) => (
                            <p key={i.id}>
                                {i.test?.name}: {i.result || 'در انتظار'}
                            </p>
                        ))}
                    </div>
                ))}
            </Box>
        </div>
    );
}
function Rx({ patient, doctors, drugs }) {
    const f = useForm({
        doctor_id: '',
        prescribed_at: today(),
        notes: '',
        items: [
            {
                drug_id: '',
                drug_name: '',
                dose: '',
                frequency: '',
                duration: '',
                quantity: 1,
            },
        ],
    });
    const item = f.data.items[0];
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="نسخه جدید">
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        f.post(
                            route('patients.prescriptions.store', patient.id),
                        );
                    }}
                >
                    <Sel
                        value={f.data.doctor_id}
                        onChange={(e) => f.setData('doctor_id', e.target.value)}
                    >
                        <option value="">داکتر</option>
                        {doctors.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.full_name}
                            </option>
                        ))}
                    </Sel>
                    <Sel
                        value={item.drug_id}
                        onChange={(e) => {
                            const d = drugs.find((x) => x.id == e.target.value);
                            f.setData('items', [
                                {
                                    ...item,
                                    drug_id: e.target.value,
                                    drug_name: d?.brand_name || '',
                                },
                            ]);
                        }}
                    >
                        <option value="">انتخاب دوا</option>
                        {drugs.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.brand_name}
                            </option>
                        ))}
                    </Sel>
                    <div className="grid grid-cols-2 gap-2">
                        <In
                            value={item.dose}
                            onChange={(e) =>
                                f.setData('items', [
                                    { ...item, dose: e.target.value },
                                ])
                            }
                            placeholder="مقدار"
                        />
                        <In
                            value={item.frequency}
                            onChange={(e) =>
                                f.setData('items', [
                                    { ...item, frequency: e.target.value },
                                ])
                            }
                            placeholder="دفعات"
                        />
                        <In
                            value={item.duration}
                            onChange={(e) =>
                                f.setData('items', [
                                    { ...item, duration: e.target.value },
                                ])
                            }
                            placeholder="مدت"
                        />
                        <In
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                                f.setData('items', [
                                    { ...item, quantity: e.target.value },
                                ])
                            }
                        />
                    </div>
                    <button className={primaryButton}>ثبت نسخه</button>
                </form>
            </Box>
            <Box title="نسخه‌ها">
                {patient.prescriptions.map((p) => (
                    <div key={p.id} className="mb-3 rounded border p-3">
                        <b>{p.prescription_number}</b>
                        {p.items.map((i) => (
                            <p key={i.id}>
                                {i.drug_name} — {i.dose}، {i.frequency}
                            </p>
                        ))}
                    </div>
                ))}
            </Box>
        </div>
    );
}
function Admission({ patient, doctors, beds }) {
    const [discharge, setDischarge] = useState(null);
    const f = useForm({ doctor_id: '', bed_id: '', reason: '' });
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="بستری جدید">
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        f.post(route('patients.admissions.store', patient.id));
                    }}
                >
                    <Sel
                        value={f.data.doctor_id}
                        onChange={(e) => f.setData('doctor_id', e.target.value)}
                    >
                        <option value="">داکتر مسئول</option>
                        {doctors.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.full_name}
                            </option>
                        ))}
                    </Sel>
                    <Sel
                        value={f.data.bed_id}
                        onChange={(e) => f.setData('bed_id', e.target.value)}
                    >
                        <option value="">تخت آزاد</option>
                        {beds.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.room?.ward?.name} / {x.room?.number} /{' '}
                                {x.number}
                            </option>
                        ))}
                    </Sel>
                    <In
                        value={f.data.reason}
                        onChange={(e) => f.setData('reason', e.target.value)}
                        placeholder="دلیل بستری"
                    />
                    <button className={primaryButton}>ثبت بستری</button>
                </form>
            </Box>
            <Box title="سوابق بستری">
                {patient.admissions.map((a) => (
                    <div key={a.id} className="border-b py-3">
                        <b>{a.admission_number}</b>
                        <p>
                            {a.status} — {a.reason}
                        </p>
                        <p className="text-xs">
                            {a.bed?.room?.ward?.name} / اتاق{' '}
                            {a.bed?.room?.number} / تخت {a.bed?.number}
                        </p>
                        {a.transfers?.map((t) => (
                            <p key={t.id} className="text-xs text-gray-500">
                                انتقال: تخت {t.from_bed?.number || '-'} ←{' '}
                                {t.to_bed?.number}، {t.started_at}
                            </p>
                        ))}
                        {['admitted', 'transferred'].includes(a.status) && (
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() =>
                                        router.post(
                                            route(
                                                'hospital.admissions.sync-invoice',
                                                a.id,
                                            ),
                                        )
                                    }
                                    className="rounded bg-blue-100 px-2 py-1 text-xs"
                                >
                                    به‌روزرسانی صورتحساب
                                </button>
                                <button
                                    onClick={() => setDischarge(a)}
                                    className="rounded bg-red-100 px-2 py-1 text-xs"
                                >
                                    ترخیص
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </Box>
            <TextActionModal
                show={Boolean(discharge)}
                title="ترخیص بیمار"
                label="خلاصه ترخیص"
                submitLabel="تأیید ترخیص"
                danger
                onClose={() => setDischarge(null)}
                onSubmit={(discharge_summary) =>
                    router.patch(
                        route('admissions.discharge', discharge.id),
                        { discharge_summary },
                        { onSuccess: () => setDischarge(null) },
                    )
                }
            />
        </div>
    );
}
function Billing({ patient }) {
    const [voidPayment, setVoidPayment] = useState(null);
    const f = useForm({
        invoice_date: today(),
        discount: 0,
        items: [
            {
                service_type: 'service',
                description: '',
                quantity: 1,
                unit_price: 0,
            },
        ],
    });
    const i = f.data.items[0];
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="صورتحساب جدید">
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        f.post(route('patients.invoices.store', patient.id));
                    }}
                >
                    <In
                        value={f.data.invoice_date}
                        onChange={(e) =>
                            f.setData('invoice_date', e.target.value)
                        }
                        placeholder="تاریخ"
                    />
                    <In
                        value={i.description}
                        onChange={(e) =>
                            f.setData('items', [
                                { ...i, description: e.target.value },
                            ])
                        }
                        placeholder="شرح خدمت"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <In
                            type="number"
                            value={i.quantity}
                            onChange={(e) =>
                                f.setData('items', [
                                    { ...i, quantity: e.target.value },
                                ])
                            }
                        />
                        <In
                            type="number"
                            value={i.unit_price}
                            onChange={(e) =>
                                f.setData('items', [
                                    { ...i, unit_price: e.target.value },
                                ])
                            }
                            placeholder="قیمت"
                        />
                    </div>
                    <button className={primaryButton}>ایجاد صورتحساب</button>
                </form>
            </Box>
            <Box title="صورتحساب‌ها">
                {patient.invoices.map((x) => (
                    <div
                        key={x.id}
                        className="invoice-print mb-4 rounded border p-3"
                    >
                        <div className="flex justify-between">
                            <b>{x.invoice_number}</b>
                            <button
                                onClick={() => window.print()}
                                className="text-xs text-blue-600 print:hidden"
                            >
                                چاپ
                            </button>
                        </div>
                        <div className="my-2 text-sm">
                            {x.items.map((i) => (
                                <div
                                    key={i.id}
                                    className="flex justify-between border-b py-1"
                                >
                                    <span>
                                        {i.description} × {i.quantity}
                                    </span>
                                    <span>
                                        {Number(i.subtotal).toLocaleString()} ؋
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="font-bold">
                            مجموع {Number(x.total_amount).toLocaleString()} ؋ —
                            پرداخت {Number(x.paid_amount).toLocaleString()} ؋ —
                            مانده {Number(x.remaining_amount).toLocaleString()}{' '}
                            ؋
                        </p>
                        <small>{x.status}</small>
                        {x.remaining_amount > 0 && <Payment invoice={x} />}{' '}
                        {x.payments.map((p) => (
                            <div
                                key={p.id}
                                className="mt-2 flex justify-between text-xs"
                            >
                                <span>
                                    رسید {p.receipt_number}:{' '}
                                    {Number(p.amount).toLocaleString()} ؋
                                </span>
                                <button
                                    className="text-red-600 print:hidden"
                                    onClick={() => setVoidPayment(p)}
                                >
                                    ابطال
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </Box>
            <TextActionModal
                show={Boolean(voidPayment)}
                title="ابطال پرداخت"
                label="دلیل ابطال"
                submitLabel="ابطال پرداخت"
                danger
                onClose={() => setVoidPayment(null)}
                onSubmit={(reason) =>
                    router.delete(
                        route('hospital.invoice-payments.void', voidPayment.id),
                        {
                            data: { reason },
                            onSuccess: () => setVoidPayment(null),
                        },
                    )
                }
            />
        </div>
    );
}
function Payment({ invoice }) {
    const f = useForm({
        payment_date: today(),
        amount: invoice.remaining_amount,
        payment_method: 'cash',
    });
    return (
        <form
            className="mt-3 grid grid-cols-3 gap-2 print:hidden"
            onSubmit={(e) => {
                e.preventDefault();
                f.post(route('patient-invoices.payments.store', invoice.id));
            }}
        >
            <In
                value={f.data.payment_date}
                onChange={(e) => f.setData('payment_date', e.target.value)}
            />
            <In
                type="number"
                value={f.data.amount}
                onChange={(e) => f.setData('amount', e.target.value)}
            />
            <select
                className={fieldClass}
                value={f.data.payment_method}
                onChange={(e) => f.setData('payment_method', e.target.value)}
            >
                <option value="cash">نقدی</option>
                <option value="card">کارت</option>
                <option value="bank">بانک</option>
                <option value="check">چک</option>
            </select>
            <button className={`${primaryButton} col-span-3`}>
                ثبت پرداخت
            </button>
        </form>
    );
}
function Documents({ patient, insurers }) {
    const form = useForm({ title: '', category: 'other', file: null });
    const insurance = useForm({
        insurer_id: '',
        policy_number: '',
        coverage_percent: 0,
        expires_at: '',
    });
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Box title="بارگذاری سند">
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.post(
                            route('patients.documents.store', patient.id),
                            {
                                forceFormData: true,
                                onSuccess: () => form.reset(),
                            },
                        );
                    }}
                >
                    <In
                        value={form.data.title}
                        onChange={(e) => form.setData('title', e.target.value)}
                        placeholder="عنوان سند"
                    />
                    <Sel
                        value={form.data.category}
                        onChange={(e) =>
                            form.setData('category', e.target.value)
                        }
                    >
                        <option value="lab">نتیجه آزمایش</option>
                        <option value="prescription">نسخه</option>
                        <option value="imaging">تصویربرداری</option>
                        <option value="identity">مدرک هویتی</option>
                        <option value="discharge">ترخیص</option>
                        <option value="other">سایر</option>
                    </Sel>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/50 p-6 text-sm text-teal-700 hover:bg-teal-50">
                        <Upload className="h-5 w-5" />
                        {form.data.file?.name || 'انتخاب فایل PDF یا تصویر'}
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={(e) =>
                                form.setData('file', e.target.files[0])
                            }
                        />
                    </label>
                    <button
                        disabled={form.processing}
                        className={primaryButton}
                    >
                        <Upload className="h-4 w-4" />
                        ذخیره سند
                    </button>
                </form>
            </Box>
            <Box title={`اسناد بیمار (${patient.documents?.length || 0})`}>
                {patient.documents?.length ? (
                    <div className="divide-y">
                        {patient.documents.map((d) => (
                            <div
                                key={d.id}
                                className="flex items-center justify-between py-4"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="rounded-lg bg-teal-50 p-2 text-teal-700">
                                        <FileText className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <b className="text-gray-800">
                                            {d.title}
                                        </b>
                                        <p className="text-xs text-gray-400">
                                            {d.category} ·{' '}
                                            {(d.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={`/storage/${d.path}`}
                                        target="_blank"
                                        className="rounded-lg bg-blue-50 p-2 text-blue-700"
                                    >
                                        <Download className="h-4 w-4" />
                                    </a>
                                    <button
                                        onClick={() =>
                                            router.delete(
                                                route(
                                                    'patients.documents.destroy',
                                                    d.id,
                                                ),
                                            )
                                        }
                                        className="rounded-lg bg-red-50 p-2 text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-500">
                        <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                        سندی ثبت نشده است.
                    </div>
                )}
            </Box>
            <div className="lg:col-span-2">
                <Box title="بیمه‌های بیمار">
                    <form
                        className="mb-6 grid items-end gap-4 md:grid-cols-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            insurance.post(
                                route('patients.insurance.store', patient.id),
                                { onSuccess: () => insurance.reset() },
                            );
                        }}
                    >
                        <label>
                            <span className="mb-2 block text-sm text-gray-600">
                                شرکت بیمه
                            </span>
                            <select
                                className={fieldClass}
                                value={insurance.data.insurer_id}
                                onChange={(e) =>
                                    insurance.setData(
                                        'insurer_id',
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="">انتخاب بیمه</option>
                                {insurers?.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <In
                            value={insurance.data.policy_number}
                            onChange={(e) =>
                                insurance.setData(
                                    'policy_number',
                                    e.target.value,
                                )
                            }
                            placeholder="شماره بیمه‌نامه"
                        />
                        <In
                            type="number"
                            value={insurance.data.coverage_percent}
                            onChange={(e) =>
                                insurance.setData(
                                    'coverage_percent',
                                    e.target.value,
                                )
                            }
                            placeholder="درصد پوشش"
                        />
                        <In
                            value={insurance.data.expires_at}
                            onChange={(e) =>
                                insurance.setData('expires_at', e.target.value)
                            }
                            placeholder="انقضا 1406/01/01"
                        />
                        <button className={primaryButton}>ثبت بیمه</button>
                    </form>
                    <div className="grid gap-3 md:grid-cols-3">
                        {patient.insurances?.map((i) => (
                            <div
                                key={i.id}
                                className="rounded-xl border border-teal-100 bg-teal-50/50 p-4"
                            >
                                <b>{i.insurer?.name}</b>
                                <p className="mt-1 text-sm text-gray-600">
                                    {i.policy_number} · پوشش{' '}
                                    {i.coverage_percent}%
                                </p>
                            </div>
                        ))}
                    </div>
                </Box>
            </div>
        </div>
    );
}
function TextActionModal({
    show,
    title,
    label,
    submitLabel,
    onClose,
    onSubmit,
    danger = false,
}) {
    const [value, setValue] = useState('');
    useEffect(() => {
        if (!show) setValue('');
    }, [show]);
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form
                className="p-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (value.trim()) onSubmit(value.trim());
                }}
            >
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                <p className="mt-1 text-sm text-gray-500">
                    این عملیات ثبت و در تاریخچه سیستم نگهداری می‌شود.
                </p>
                <label className="mt-5 block">
                    <span className="mb-2 block text-sm font-medium text-gray-600">
                        {label}
                    </span>
                    <textarea
                        autoFocus
                        required
                        className={`${fieldClass} h-28 py-3`}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </label>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-700"
                    >
                        انصراف
                    </button>
                    <button
                        className={
                            danger
                                ? 'rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-red-700'
                                : primaryButton
                        }
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
