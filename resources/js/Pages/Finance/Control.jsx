import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ClinicHeader, ClinicPage, ClinicPanel, ClinicStat, fieldClass, primaryButton } from '@/Components/ClinicUI';
import { ArrowDownToLine, ArrowUpFromLine, Scale } from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const money = (value) => `${Number(value || 0).toLocaleString()} ؋`;
const Card = ({ title, value, tone = 'text-gray-900' }) => (
    <ClinicStat title={title} value={value} color={tone.includes('red') ? 'red' : tone.includes('green') ? 'green' : 'blue'} icon={tone.includes('red') ? ArrowUpFromLine : tone.includes('green') ? ArrowDownToLine : Scale} />
);

export default function Control({ transactions, summary, supplierDebts, patientDebts, inventoryAlerts, auditLogs, filters }) {
    const [form, setForm] = useState({ start_date: filters.start_date || '', end_date: filters.end_date || '', payment_method: filters.payment_method || '' });
    const apply = (e) => { e.preventDefault(); router.get(route('finance.control'), form, { preserveState: true }); };
    const balance = Number(summary.credits) - Number(summary.debits);
    return <AuthenticatedLayout title="کنترل مالی و صندوق">
        <Head title="کنترل مالی و صندوق" />
        <ClinicPage className="space-y-6">
            <ClinicHeader title="کنترل مالی و صندوق" description="دفتر واحد تراکنش‌ها، بدهی‌ها، هشدارها و تاریخچه تغییرات" />
            <ClinicPanel title="فیلتر گزارش مالی"><form onSubmit={apply} className="grid gap-3 md:grid-cols-4">
                <input className={fieldClass} placeholder="از تاریخ 1405/01/01" value={form.start_date} onChange={e => setForm({...form, start_date:e.target.value})}/>
                <input className={fieldClass} placeholder="تا تاریخ 1405/12/29" value={form.end_date} onChange={e => setForm({...form, end_date:e.target.value})}/>
                <select className={fieldClass} value={form.payment_method} onChange={e => setForm({...form, payment_method:e.target.value})}><option value="">همه روش‌ها</option><option value="cash">نقدی</option><option value="card">کارت</option><option value="bank">بانک</option><option value="check">چک</option><option value="other">سایر</option></select>
                <button className={primaryButton}>اعمال فیلتر</button>
            </form></ClinicPanel>
            <div className="grid gap-4 md:grid-cols-3"><Card title="کل دریافتی" value={money(summary.credits)} tone="text-green-600"/><Card title="کل پرداختی" value={money(summary.debits)} tone="text-red-600"/><Card title="مانده صندوق" value={money(balance)} tone={balance >= 0 ? 'text-blue-600':'text-red-600'}/></div>
            <Section title="تفکیک روش پرداخت"><Table headers={['روش','نوع','مجموع']} rows={summary.byMethod.map(x=>[x.payment_method,x.direction === 'credit'?'دریافت':'پرداخت',money(x.total)])}/></Section>
            <Section title="دفتر صندوق"><Table headers={['شماره مرجع','تاریخ','نوع','روش','مبلغ']} rows={transactions.data.map(t => [t.reference_number,t.transaction_date,t.direction === 'credit'?'دریافت':'پرداخت',t.payment_method,money(t.amount)])}/></Section>
            <div className="grid gap-6 lg:grid-cols-2"><Section title="بدهی به تأمین‌کنندگان"><Table headers={['شرکت','تاریخ','کل','مانده']} rows={supplierDebts.map(x=>[x.name,x.date,money(x.total),money(x.remaining)])}/></Section><Section title="بدهی مریضان"><Table headers={['مریض','تاریخ','کل','مانده']} rows={patientDebts.map(x=>[x.name,x.date,money(x.total),money(x.remaining)])}/></Section></div>
            <Section title="هشدار موجودی و انقضا"><Table headers={['دوا','موجودی','حد سفارش','انقضا']} rows={inventoryAlerts.map(x=>[x.brand_name,x.stock_quantity,x.reorder_level,x.expiry_date || '-'])}/></Section>
            <Section title="آخرین تغییرات مالی"><Table headers={['مدل','عملیات','شناسه','زمان']} rows={auditLogs.map(x=>[x.auditable_type.split('\\').pop(),x.event,x.auditable_id,x.created_at])}/></Section>
            {transactions.links?.length > 3 && <div className="flex flex-wrap gap-2">{transactions.links.map((l,i)=><Link key={i} href={l.url || '#'} className={`rounded border px-3 py-1 ${l.active?'bg-teal-600 text-white':'bg-white'}`} dangerouslySetInnerHTML={{__html:l.label}} />)}</div>}
        </ClinicPage>
    </AuthenticatedLayout>;
}
function Section({title,children}) { return <ClinicPanel title={title} bodyClassName="p-0">{children}</ClinicPanel>; }
function Table({headers,rows}) { return <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gradient-to-l from-teal-700 to-teal-600 text-white"><tr>{headers.map(h=><th key={h} className="px-4 py-3.5 text-right font-semibold">{h}</th>)}</tr></thead><tbody>{rows.length?rows.map((r,i)=><tr key={i} className="border-t border-gray-100 transition hover:bg-teal-50/50">{r.map((c,j)=><td key={j} className="whitespace-nowrap px-4 py-3">{c}</td>)}</tr>):<tr><td colSpan={headers.length} className="p-8 text-center text-gray-400">موردی موجود نیست</td></tr>}</tbody></table></div>; }
