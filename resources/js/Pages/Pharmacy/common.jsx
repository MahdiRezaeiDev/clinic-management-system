import '@/css/factor.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapPin, Phone } from 'lucide-react';

export default function ModernPrescriptionAfghanistanV6() {
    const medicines = [
        {
            name: 'استامینوفن شربت',
            count: '2 شیشه',
            price: '150 AFN',
            description: 'هر ۶ ساعت ۵ میلی‌لیتر',
        },
        {
            name: 'آموکسی‌سیلین',
            count: '20 کپسول',
            price: '500 AFN',
            description: '۲۵۰ میلی‌گرم هر ۸ ساعت',
        },
        {
            name: 'ویتامین D قطره',
            count: '1 بطری',
            price: '200 AFN',
            description: '۱ قطره در روز',
        },
    ];

    const patientInfo = {
        name: 'سارا احمدی',
        age: '۵ سال',
        date: '۱۴۰۴/۰۸/۰۱',
        prescriptionNo: '۱',
    };

    const vitals = [
        { label: 'BP', value: '120/80' },
        { label: 'PR', value: '78' },
        { label: 'RR', value: '78' },
        { label: 'T', value: '37°C' },
        { label: 'SPO2', value: '98%' },
        { label: 'CC', value: '-' },
    ];

    return (
        <AuthenticatedLayout title="نسخه مدرن افغانستان V6">
            <Head title="نسخه مدرن افغانستان V6" />
            <div
                dir="rtl"
                className="flex items-center justify-center bg-gray-50 py-10"
            >
                <div className="relative h-[210mm] w-[148mm] overflow-hidden bg-white shadow-md">
                    {/* Header */}
                    <div className="relative bg-teal-700">
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
                    </div>

                    {/* Patient Info */}
                    <section className="border-b px-4 py-3">
                        <div className="grid grid-cols-4 gap-2 text-[12px]">
                            <p>
                                <span className="pl-2 font-semibold">
                                    نام بیمار:
                                </span>
                                {patientInfo.name}
                            </p>
                            <p>
                                <span className="pl-2 font-semibold">سن:</span>
                                {patientInfo.age}
                            </p>
                            <p className="text-left">
                                <span className="pl-2 font-semibold">
                                    تاریخ:
                                </span>
                                {patientInfo.date}
                            </p>
                            <p className="text-left">
                                <span className="pl-2 font-semibold">
                                    نسخه شماره:
                                </span>
                                {patientInfo.prescriptionNo}
                            </p>
                        </div>
                    </section>

                    {/* Main Body */}
                    <div className="h-full p-4 text-xs">
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
                                            قیمت
                                        </th>
                                        <th className="border border-gray-300 px-3 py-2 text-right">
                                            دستور مصرف
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.map((med, i) => (
                                        <tr key={i} className="even:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-800">
                                                {med.name}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 text-gray-700">
                                                {med.count}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 text-gray-700">
                                                {med.price}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 text-gray-600">
                                                {med.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Doctor Notes and Vitals at Bottom */}
                        <div className="absolute bottom-16 left-0 right-0 flex justify-between px-4">
                            {/* Doctor Notes */}
                            <div className="w-2/3 pr-2">
                                <h3 className="mb-2 text-sm font-bold text-teal-700">
                                    توصیه‌های پزشک:
                                </h3>
                                <ul className="list-inside list-disc space-y-1 text-[11px] text-gray-700">
                                    <li>
                                        مصرف داروها را طبق دستور پزشک ادامه
                                        دهید.
                                    </li>
                                    <li>
                                        در صورت بروز حساسیت یا تب بالا، مراجعه
                                        کنید.
                                    </li>
                                    <li>
                                        استراحت کافی و تغذیه سالم برای کودک
                                        رعایت شود.
                                    </li>
                                </ul>
                            </div>

                            {/* Vitals */}
                            <div className="w-1/3 overflow-hidden rounded-md border border-gray-300">
                                <div className="bg-gray-100 py-2 text-center font-bold text-gray-700">
                                    Vital Signs
                                </div>
                                <table className="w-full text-xs">
                                    <tbody>
                                        {vitals.map((v, i) => (
                                            <tr
                                                key={i}
                                                className="border-t border-gray-200"
                                            >
                                                <td className="px-3 py-1 text-right font-semibold text-gray-700">
                                                    {v.label}
                                                </td>
                                                <td className="px-2 py-1 text-left text-gray-600">
                                                    {v.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="absolute bottom-0 left-0 right-0 space-y-2 border-t-8 border-teal-400 bg-teal-700 px-4 py-2">
                        <div>
                            <MapPin className="ml-2 inline h-4 w-4 text-white" />
                            <span className="text-[10px] font-semibold text-white">
                                دشت برچی، پل خشک، حمام جنرال حیدر، سرک زیارت
                                قرآن، کلینیک کودک و مادر
                            </span>
                        </div>
                        <div className="flex text-xs text-white">
                            <Phone className="ml-2 inline h-4 w-4 text-white" />
                            <p>۰۷۷۱۱۶۱۶۶۲۵</p>-<p>۰۷۴۹۶۵۹۰۱۳</p>
                        </div>
                    </footer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
