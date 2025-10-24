export default function ModernPrescription() {
    const medicines = [
        {
            name: 'استامینوفن شربت',
            dose: '۵ میلی‌لیتر هر ۶ ساعت',
            duration: '۳ روز',
        },
        {
            name: 'آموکسی‌سیلین',
            dose: '۲۵۰ میلی‌گرم هر ۸ ساعت',
            duration: '۵ روز',
        },
        { name: 'ویتامین D قطره', dose: '۱ قطره در روز', duration: '۳۰ روز' },
    ];

    return (
        <div
            dir="rtl"
            className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 px-4 py-10 font-[Vazirmatn]"
        >
            <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-2xl">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-l from-cyan-600 to-blue-700 p-6 text-white">
                    {/* Decorative circles */}
                    <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"></div>

                    {/* Header content */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                کلینیک کودک و مادر
                            </h1>
                            <p className="text-sm text-cyan-100">
                                Mother & Child Health Clinic
                            </p>
                        </div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                            alt="Clinic Logo"
                            className="h-16 w-16 rounded-full bg-white p-2 shadow-md"
                        />
                    </div>

                    {/* Bottom wave */}
                    <svg
                        className="absolute bottom-0 left-0 w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fill="#fff"
                            fillOpacity="1"
                            d="M0,128L48,138.7C96,149,192,171,288,192C384,213,480,235,576,229.3C672,224,768,192,864,170.7C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-6 border-b border-gray-200 bg-gray-50 px-8 py-6">
                    <div>
                        <p>
                            <span className="font-semibold text-gray-700">
                                نام بیمار:
                            </span>{' '}
                            سارا احمدی
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">
                                سن:
                            </span>{' '}
                            ۵ سال
                        </p>
                    </div>
                    <div className="text-left">
                        <p>
                            <span className="font-semibold text-gray-700">
                                تاریخ:
                            </span>{' '}
                            ۱۴۰۴/۰۸/۰۱
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">
                                شماره نسخه:
                            </span>{' '}
                            ۰۰۱۲۳۴
                        </p>
                    </div>
                </div>

                {/* Prescription */}
                <div className="px-8 py-6">
                    <h2 className="mb-4 text-lg font-bold text-blue-800">
                        داروهای تجویز شده
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead className="bg-blue-50 text-gray-700">
                                <tr>
                                    <th className="px-2 py-3">نام دارو</th>
                                    <th className="px-2 py-3">
                                        مقدار / زمان مصرف
                                    </th>
                                    <th className="px-2 py-3">مدت</th>
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
                                            {med.dose}
                                        </td>
                                        <td className="px-2 py-3">
                                            {med.duration}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Doctor's Notes */}
                <div className="px-8 pb-6">
                    <h3 className="mb-2 font-bold text-blue-700">
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
