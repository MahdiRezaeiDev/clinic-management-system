// import '@/css/factor.css';
import tooth from '@/img/tooth.svg';
export default function DentalLetterhead() {
    return (
        <div
            className="flex h-[148mm] w-[210mm] overflow-hidden rounded-lg bg-white shadow-lg"
            dir="rtl"
            style={{
                width: '210mm',
                height: '148mm',
                margin: '0 auto',
            }}
        >
            {/* RIGHT SIDE - Content Area */}
            <div
                className="relative w-4/6 bg-teal-100 p-8"
                style={{
                    backgroundImage: `url('/images/dentist-bg.jpg')`,
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                }}
            >
                {/* Top-left small fields */}
                <div className="absolute right-6 top-6 text-right">
                    <div className="mb-4 text-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">تاریخ :</span>
                            <span className="inline-block h-4 w-40 border-b border-dashed border-gray-300"></span>
                        </div>
                    </div>

                    <div className="text-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">بیمار :</span>
                            <span className="inline-block h-4 w-40 border-b border-dashed border-gray-300"></span>
                        </div>
                    </div>
                </div>

                {/* Large watermark tooth (center) */}
                <img
                    className="absolute bottom-[-50px] right-[-100px] h-96 w-96 text-gray-500"
                    src={tooth}
                    alt="tooth icon"
                />

                {/* Bottom-left decorative image */}
                <div
                    className="absolute bottom-6 left-6 h-24 w-36 bg-right-bottom bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/stethoscope.png')",
                        backgroundSize: 'contain',
                    }}
                />

                {/* Main content area */}
                <div className="flex h-full items-start justify-start pl-8 pt-16">
                    <div className="w-full max-w-md">
                        {/* Empty space for content - perfect for prescriptions, notes, etc. */}
                    </div>
                </div>
            </div>
            {/* LEFT SIDE - Doctor Info */}
            <div className="flex w-2/6 flex-col items-center justify-between border-l border-gray-200 bg-white p-6">
                <div className="w-full text-center">
                    {/* Logo area */}
                    <div className="flex flex-col items-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
                            <img
                                className="h-10 w-10"
                                src={tooth}
                                alt="tooth icon"
                            />
                        </div>

                        <h1 className="font-nastaliq text-7xl font-extrabold text-gray-800">
                            دکتر علی آقا اشرفی
                        </h1>
                        <p className="text-sm text-teal-600">
                            Dr. Aliaqa Ashrafi
                        </p>
                        <p className="mt-3 text-sm text-gray-500">
                            جراح و متخصص دندانپزشک
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="mt-6 border-t border-dashed border-gray-200 pt-4 text-sm text-teal-600">
                        <p>پذیرش دوشنبه، چهارشنبه</p>
                        <p>از ساعت 8 الی 20</p>
                    </div>

                    {/* Contact */}
                    <div className="mt-6 text-sm text-gray-700">
                        <p className="flex flex-col">
                            <p>۰۷۷۱۱۶۱۶۶۲۵</p>
                            <br />
                            <p>۰۷۴۹۶۵۹۰۱۳</p>
                        </p>

                        <p className="mt-7 text-sm leading-relaxed text-gray-500">
                            دشت برچی، پل خشک، حمام جنرال حیدر، سرک زیارت قرآن،
                            کلینیک کودک و مادر
                        </p>
                    </div>
                </div>

                {/* Small footer mark */}
                <div className="w-full text-center text-xs text-gray-400">
                    <hr className="my-2" />
                    <span>www.exampleclinic.com</span>
                </div>
            </div>
        </div>
    );
}
