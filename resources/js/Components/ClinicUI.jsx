export function ClinicPage({ children, className = '' }) {
    return <><div className="absolute inset-0 -z-10 h-full w-full bg-white"><div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"/><div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-teal-100 opacity-20 blur-3xl"/><div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"/></div><div dir="rtl" className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}>{children}</div></>;
}
export function ClinicHeader({ title, subtitle, description, action }) {
    const supportingText = subtitle || description;
    return <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{title}</h1>{supportingText&&<p className="mt-1 text-sm text-gray-500">{supportingText}</p>}</div>{action}</div>;
}
export function ClinicPanel({ title, icon: Icon, children, className = '', bodyClassName = 'p-6' }) {
    return <section className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg ${className}`}><div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-l from-teal-50/80 to-white px-6 py-4">{Icon&&<span className="rounded-xl bg-teal-100 p-2 text-teal-700"><Icon className="h-5 w-5"/></span>}<h2 className="font-bold text-gray-800">{title}</h2></div><div className={bodyClassName}>{children}</div></section>;
}
export function ClinicStat({ title, value, icon: Icon, color = 'teal', subtitle }) {
    const palette={teal:'bg-teal-500 text-teal-600 bg-teal-50',green:'bg-green-500 text-green-600 bg-green-50',red:'bg-red-500 text-red-600 bg-red-50',blue:'bg-blue-500 text-blue-600 bg-blue-50',orange:'bg-orange-500 text-orange-600 bg-orange-50',purple:'bg-purple-500 text-purple-600 bg-purple-50'}[color].split(' ');
    return <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"><span className={`absolute right-0 top-0 h-full w-1 ${palette[0]}`}/><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-gray-500">{title}</p><p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>{subtitle&&<p className="mt-2 text-xs text-gray-500">{subtitle}</p>}</div>{Icon&&<span className={`rounded-xl p-3 ${palette[2]} ${palette[1]}`}><Icon className="h-6 w-6"/></span>}</div></div>;
}
export const primaryButton='inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50';
export const secondaryButton='inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50';
export const fieldClass='w-full rounded-xl border-gray-200 bg-gray-50/70 text-sm shadow-sm transition focus:border-teal-500 focus:bg-white focus:ring-teal-500';
