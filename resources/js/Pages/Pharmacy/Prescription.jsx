import '@/css/factor.css';
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
        { label: 'T', value: '37°C' },
        { label: 'SPO2', value: '98%' },
        { label: 'RX', value: '-' },
    ];

    return (
        <div
            dir="rtl"
            className="flex items-center justify-center bg-gray-50 py-10"
        >
            <div className="relative h-[210mm] w-[148mm] overflow-hidden bg-white shadow-md">
                {/* Heading Section with Logo */}
                <div className="relative bg-teal-700">
                    <div className="flex justify-between">
                        <div className="w-1/2 p-4 text-right text-white">
                            <h1 className="text-xl font-bold">
                                کلینیک ۲۴ ساعته کودک و مادر
                            </h1>
                            <p className="text-sm">
                                مرکز صحی جامع برای مراقبت از اطفال و مادران
                            </p>
                        </div>
                        <div className="parallelogram w-1/2 bg-teal-600 p-4 text-left text-white">
                            <h1 className="text-xl font-bold">
                                Mother & Child 24/7 Clinic
                            </h1>
                            <p className="text-sm">
                                Comprehensive Health Center for Children and
                                Mothers
                            </p>
                        </div>
                    </div>
                </div>

                {/* Patient Info in one row */}
                <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-700">
                    <div>
                        <span className="pl-2 font-semibold">نام بیمار:</span>
                        {patientInfo.name}
                    </div>
                    <div>
                        <span className="font-semibold">سن:</span>
                        {patientInfo.age}
                    </div>
                    <div>
                        <span className="font-semibold">تاریخ:</span>
                        {patientInfo.date}
                    </div>
                    <div className="text-left">
                        <span className="font-semibold">شماره نسخه:</span>
                        {patientInfo.prescriptionNo}
                    </div>
                </div>

                {/* Main Body: Vitals + Prescription Table */}
                <div className="gap-6 p-4">
                    <table className="w-full border-2 border-gray-600">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-l-2 border-gray-600 px-4 py-2 text-right">
                                    داروها
                                </th>
                                <th className="w-1/4 px-4 py-2 text-left">
                                    شاخصه‌ها
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-l-2 border-gray-600">
                                    <table className="w-full text-sm">
                                        <thead className="bg-teal-50 text-gray-700">
                                            <tr>
                                                <th className="px-2 py-3 text-right">
                                                    نام دارو
                                                </th>
                                                <th className="px-2 py-3 text-right">
                                                    تعداد
                                                </th>
                                                <th className="px-2 py-3 text-right">
                                                    قیمت
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicines.map((med, i) => (
                                                <tr
                                                    key={i}
                                                    className="border-b transition last:border-none hover:bg-gray-50"
                                                >
                                                    <td className="px-2 py-3">
                                                        {med.name}
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        {med.count}
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        {med.price}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <ul className="px-4 text-left">
                                        {vitals.map((vital, i) => (
                                            <li
                                                key={i}
                                                className="flex justify-between"
                                            >
                                                <span className="font-semibold">
                                                    {vital.label}:
                                                </span>
                                                <span>{vital.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Doctor's Notes */}
                <div className="px-8 pb-6">
                    <h3 className="mb-2 font-bold text-teal-700">
                        توصیه‌های پزشک
                    </h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>مصرف داروها را طبق دستور پزشک ادامه دهید.</li>
                        <li>در صورت بروز حساسیت یا تب بالا، مراجعه کنید.</li>
                        <li>استراحت کافی و تغذیه سالم برای کودک رعایت شود.</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="bg-teal700 absolute bottom-0 left-0 right-0 space-y-2 border-t-8 border-teal-400 bg-teal-700 p-4">
                    <div>
                        <MapPin className="ml-2 inline h-4 w-4 text-white" />
                        <span className="text-[10px] font-semibold text-white">
                            دشت برچی، پل خشک، حمام جنرال حیدر، سرک زیارت قرآن،
                            کلینیک کودک و مادر
                        </span>
                    </div>
                    <div className="flex text-xs text-white">
                        <Phone className="ml-2 inline h-4 w-4 text-white" />
                        <p>۰۷۷۱۱۶۱۶۶۲۵</p>-<p>۰۷۴۹۶۵۹۰۱۳</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
