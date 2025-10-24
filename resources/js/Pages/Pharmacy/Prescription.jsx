import '@/css/factor.css';

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
        prescriptionNo: '۰۰۱۲۳۴',
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
            <div className="h-[210mm] w-[148mm] overflow-hidden border border-gray-300 bg-white shadow-md">
                {/* Heading Section with Logo */}
                <div className="relative flex items-center justify-between bg-teal-700 p-4">
                    <div className="text-right text-white">
                        <h1 className="text-xl font-bold">
                            کلینیک ۲۴ ساعته کودک و مادر
                        </h1>
                        <p className="text-sm">
                            مرکز صحی جامع برای مراقبت از اطفال و مادران
                        </p>
                        <p className="mt-1 text-xs">
                            آدرس: کابل، ناحیه ۵، جاده اصلی | تلفن: ۰۷۰۰۱۲۳۴۵۶
                        </p>
                    </div>
                    <div className="h-16 w-16">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                            alt="Clinic Logo"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                {/* Patient Info in one row */}
                <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-gray-50 px-8 py-4 text-sm text-gray-700">
                    <div>
                        <span className="font-semibold">نام بیمار:</span>{' '}
                        {patientInfo.name}
                    </div>
                    <div>
                        <span className="font-semibold">سن:</span>{' '}
                        {patientInfo.age}
                    </div>
                    <div>
                        <span className="font-semibold">تاریخ:</span>{' '}
                        {patientInfo.date}
                    </div>
                    <div>
                        <span className="font-semibold">شماره نسخه:</span>{' '}
                        {patientInfo.prescriptionNo}
                    </div>
                </div>

                {/* Main Body: Vitals + Prescription Table */}
                <div className="flex gap-6 px-8 py-6">
                    {/* Vitals Column */}
                    <div className="w-1/4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <h3 className="mb-2 text-center font-bold text-teal-700">
                            شاخصه‌ها
                        </h3>
                        <ul className="space-y-1 text-sm">
                            {vitals.map((vital, i) => (
                                <li key={i} className="flex justify-between">
                                    <span className="font-semibold">
                                        {vital.label}:
                                    </span>
                                    <span>{vital.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Prescription Table */}
                    <div className="flex-1">
                        <h2 className="mb-4 text-lg font-bold text-teal-800">
                            داروهای تجویز شده
                        </h2>
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-teal-50 text-gray-700">
                                    <tr>
                                        <th className="px-2 py-3">نام دارو</th>
                                        <th className="px-2 py-3">تعداد</th>
                                        <th className="px-2 py-3">قیمت</th>
                                        <th className="px-2 py-3">توضیحات</th>
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
                                            <td className="px-2 py-3">
                                                {med.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-8 py-6">
                    <div>
                        <p className="font-semibold text-gray-700">
                            پزشک معالج: دکتر مریم هاشمی
                        </p>
                        <p className="text-sm text-gray-500">
                            شماره نظام پزشکی: ۴۵۶۷۸۹
                        </p>
                    </div>
                    <div className="text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1828/1828643.png"
                            alt="Signature"
                            className="mx-auto w-20 opacity-80"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            امضا و مهر پزشک
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
