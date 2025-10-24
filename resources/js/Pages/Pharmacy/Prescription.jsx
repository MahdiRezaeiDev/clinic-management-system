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
                    {/* Heading Section with Logo */}
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
                    <section className="border-b bg-gray-100 px-4 py-3">
                        <div className="grid grid-cols-4 gap-2 text-[12px]">
                            <div>
                                <p>
                                    <span className="pl-2 font-semibold">
                                        نام بیمار:
                                    </span>
                                    سارا احمدی
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="pl-2 font-semibold">
                                        سن:
                                    </span>
                                    ۵ سال
                                </p>
                            </div>
                            <div className="text-left">
                                <p>
                                    <span className="pl-2 font-semibold">
                                        تاریخ:
                                    </span>
                                    ۱۸ کیلوگرم
                                </p>
                            </div>
                            <div className="text-left">
                                <p>
                                    <span className="pl-2 font-semibold">
                                        نسخه شماره:
                                    </span>
                                    ۱۱۰
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Main Body: Vitals + Prescription Table */}
                    <div className="flex h-full text-xs">
                        {/* Medicines Column */}
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 pb-1 pl-4 font-bold text-gray-700">
                                <span>نام دارو</span>
                                <span>تعداد</span>
                                <span>قیمت</span>
                            </div>
                            {medicines.map((med, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between rounded-lg border border-gray-300 p-2 shadow-sm transition hover:shadow-md"
                                >
                                    <span className="font-semibold text-gray-700">
                                        {med.name}
                                    </span>
                                    <span className="text-gray-600">
                                        {med.count}
                                    </span>
                                    <span className="text-gray-600">
                                        {med.price}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Vitals Column */}
                        <div className="flex w-32 flex-col gap-2 border-r-4 border-gray-300">
                            <div className="bg-gray-100 px-4 py-2 font-bold text-gray-700">
                                شاخصه‌ها
                            </div>
                            <table className="w-full table-auto border-collapse pl-4">
                                <tbody>
                                    {vitals.map((vital, i) => (
                                        <tr
                                            key={i}
                                            className="px-4 py-2 text-center"
                                        >
                                            <td className="text-left text-gray-600">
                                                {vital.value}
                                            </td>
                                            <td className="px-4 text-left font-semibold text-gray-700">
                                                {vital.label}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Doctor's Notes */}
                    <div className="px-8 pb-6">
                        <h3 className="mb-2 font-bold text-teal-700">
                            توصیه‌های پزشک
                        </h3>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                            <li>مصرف داروها را طبق دستور پزشک ادامه دهید.</li>
                            <li>
                                در صورت بروز حساسیت یا تب بالا، مراجعه کنید.
                            </li>
                            <li>
                                استراحت کافی و تغذیه سالم برای کودک رعایت شود.
                            </li>
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="bg-teal700 absolute bottom-0 left-0 right-0 space-y-2 border-t-8 border-teal-400 bg-teal-700 px-4 py-2">
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
