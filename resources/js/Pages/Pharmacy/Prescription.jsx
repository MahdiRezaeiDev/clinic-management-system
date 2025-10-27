import '@/css/factor.css';
import logo from '@/img/logo.jpg';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapPin, Phone } from 'lucide-react';
import moment from 'moment-jalaali';

export default function Prescription({ sale }) {
    const vitals = [
        { label: 'BP', value: '' },
        { label: 'PR', value: '' },
        { label: 'RR', value: '' },
        { label: 'T', value: '' },
        { label: 'SPO2', value: '' },
        { label: 'Diagnosis', value: '' },
    ];

    const lastName = sale.doctor.full_name?.trim().split(' ').pop();

    return (
        <AuthenticatedLayout title="نسخه بیمار">
            <Head title="نسخه بیمار" />
            <article
                dir="rtl"
                className="flex items-center justify-center bg-gray-50 py-10"
            >
                <div className="relative h-[210mm] w-[148mm] overflow-hidden bg-white shadow-md">
                    {/* Watermark */}
                    <img
                        src={logo}
                        alt="Watermark"
                        className="pointer-events-none absolute inset-0 m-auto h-64 w-64 select-none object-contain opacity-10"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    {/* Header */}
                    <header className="relative bg-teal-700">
                        <div className="flex justify-between">
                            <div className="w-1/2 p-4 text-right text-white">
                                <h1 className="text-xl font-bold">
                                    کلینیک ۲۴ ساعته کودک و مادر
                                </h1>
                                <p className="text-xs">
                                    مرکز صحی جامع برای مراقبت از اطفال و مادران
                                </p>
                            </div>
                            <div className="parallelogram w-1/2 bg-teal-600 p-4 text-left text-white">
                                <h1 className="text-xl font-bold">
                                    Mother & Child Clinic
                                </h1>
                                <p className="text-xs">
                                    A comprehensive Health Center for Children
                                    and Mothers
                                </p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-white">
                            <div>
                                <td className="pl-2 font-semibold">تاریخ:</td>
                                <td>
                                    {moment(sale.created_at).format(
                                        'jYYYY/jMM/jDD',
                                    )}
                                </td>
                            </div>
                            <div>
                                <td className="pl-2 font-semibold">
                                    نمبر مسلسل:
                                </td>
                                <td>{sale.id}</td>
                            </div>
                        </div>
                    </header>

                    {/* information section */}
                    <section className="border-t-8 border-teal-700 py-4">
                        <p className="text-center text-xs text-gray-700">
                            <span className="pl-2 font-semibold">
                                داکتر نادر پاینده:
                            </span>
                            متخصص امراض داخله و جراحی اطفال
                        </p>
                        <p className="text-center text-xs text-gray-700">
                            <span className="pl-2 font-semibold">
                                {' '}
                                داکتر محمد حسین الماس:
                            </span>
                            معالج امراض داخله عمومی و اطفال
                        </p>
                        <p className="text-center text-xs text-gray-700">
                            <span className="pl-2 font-semibold">
                                داکتر الیاس عمران:
                            </span>
                            معالج امراض داخله عمومی و اعصاب و روان
                        </p>
                        <p className="text-center text-xs text-gray-700">
                            <span className="pl-2 font-semibold">
                                داکتر سید شیر احمد موسوی:
                            </span>
                            معالج داخله عمومی و اطفال
                        </p>
                    </section>

                    {/* Patient Info */}
                    <section className="border-b-4 border-dashed border-gray-400 px-4 pb-3">
                        <div className="grid grid-cols-4 gap-2 text-[12px]">
                            <p>
                                <span className="pl-2 font-semibold">نام:</span>
                                {sale.patient.full_name}
                            </p>
                            <p>
                                <span className="pl-2 font-semibold">سن:</span>
                                {sale.patient.age}
                            </p>
                            <p>
                                <span className="pl-2 font-semibold">
                                    جنسیت:
                                </span>
                                {sale.patient.gender === 'male'
                                    ? 'مذکر'
                                    : 'مونث'}
                            </p>
                            <p>
                                <span className="pl-2 font-semibold">
                                    داکتر معالج:
                                </span>
                                {lastName}
                            </p>
                        </div>
                    </section>

                    {/* Main Body */}
                    <section className="h-full p-4 text-xs">
                        <div className="flex gap-4">
                            {/* Medicines Table */}
                            <div className="flex-1">
                                <table className="w-full border border-gray-300 text-xs">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-3 py-2 text-right">
                                                نام دارو
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-right">
                                                تعداد
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-right">
                                                قیمت واحد
                                            </th>
                                            <th className="border border-gray-300 px-3 py-2 text-right">
                                                جمع کل
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sale.items.map((item, i) => (
                                            <>
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-3 py-1 font-semibold text-gray-800">
                                                        {item.drug_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.unit_price}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.subtotal}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-3 py-1 font-semibold text-gray-800">
                                                        {item.drug_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.unit_price}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.subtotal}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-3 py-1 font-semibold text-gray-800">
                                                        {item.drug_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.unit_price}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.subtotal}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-3 py-1 font-semibold text-gray-800">
                                                        {item.drug_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.unit_price}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.subtotal}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-3 py-1 font-semibold text-gray-800">
                                                        {item.drug_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.unit_price}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                    <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                                        {item.subtotal}
                                                        <span className="pr-1 text-[8px]">
                                                            افغانی
                                                        </span>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                        <tr className="bg-gray-100 font-bold">
                                            <td
                                                colSpan="3"
                                                className="border border-gray-300 px-3 py-2 text-right"
                                            >
                                                مجموع کل:
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 text-gray-800">
                                                {sale.total_amount}
                                                <span className="pr-1 text-[8px]">
                                                    افغانی
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Vitals */}
                            <div className="w-36 overflow-hidden">
                                <div className="bg-gray-100 px-4 py-2 text-left font-bold text-gray-700">
                                    Clinical Record
                                </div>
                                <table className="w-full text-xs">
                                    <tbody>
                                        <tr className="">
                                            <td
                                                colSpan={2}
                                                className="px-2 py-24 text-left text-gray-600"
                                            ></td>
                                        </tr>
                                        {vitals.map((v, i) => (
                                            <tr key={i} className="">
                                                <td className="px-2 text-left text-gray-600">
                                                    {v.value}
                                                </td>
                                                <td className="px-2 text-left font-semibold text-gray-700">
                                                    :{v.label}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Doctor Notes */}
                        {/* <div className="mt-6 px-2">
                            <h3 className="mb-2 text-sm font-bold text-teal-700">
                                توصیه‌های پزشک:
                            </h3>
                            <ul className="list-inside list-disc space-y-1 text-[11px] text-gray-700">
                                <li>
                                    مصرف داروها را طبق دستور پزشک ادامه دهید.
                                </li>
                                <li>
                                    در صورت بروز حساسیت یا تب بالا، مراجعه کنید.
                                </li>
                                <li>
                                    استراحت کافی و تغذیه سالم برای کودک رعایت
                                    شود.
                                </li>
                            </ul>
                        </div> */}
                    </section>

                    {/* Footer */}
                    <footer className="absolute bottom-0 left-0 right-0 space-y-2 border-t-4 border-teal-400 bg-teal-700 px-4 py-2">
                        <div>
                            <MapPin className="ml-2 inline h-4 w-4 text-white" />
                            <span className="text-[10px] font-semibold text-white">
                                دشت برچی، پل خشک، حمام جنرال حیدر، سرک زیارت
                                قرآن، کلینیک کودک و مادر
                            </span>
                        </div>
                        <div className="flex text-xs text-white">
                            <Phone className="ml-2 inline h-4 w-4 text-white" />
                            <p>۰۷۷۱۱۶۱۶۶۲۵</p> - <p>۰۷۴۹۶۵۹۰۱۳</p>
                        </div>
                    </footer>
                </div>
            </article>
        </AuthenticatedLayout>
    );
}
