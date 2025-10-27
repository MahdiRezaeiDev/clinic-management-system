// import '@/css/factor.css';
import tooth from '@/img/tooth.svg';
import toothBlack from '@/img/toothBlack.svg';
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
                                src={toothBlack}
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
                    <div className="mt-32 text-sm text-gray-700">
                        <p className="mt-7 text-xs leading-relaxed text-gray-500">
                            دشت برچی، پل خشک، حمام جنرال حیدر، سرک زیارت قرآن،
                            کلینیک کودک و مادر
                        </p>
                    </div>
                </div>

                {/* Small footer mark */}
                <div className="w-full text-center text-xs text-gray-400">
                    <hr className="my-2" />
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1">
                            <span> ۰۷۷۱۱۶۱۶۶۲۵</span>
                            <svg
                                fill="#000000"
                                width="18px"
                                height="18px"
                                viewBox="-32 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM94 416c-7.033 0-13.057-4.873-14.616-11.627l-14.998-65a15 15 0 0 1 8.707-17.16l69.998-29.999a15 15 0 0 1 17.518 4.289l30.997 37.885c48.944-22.963 88.297-62.858 110.781-110.78l-37.886-30.997a15.001 15.001 0 0 1-4.289-17.518l30-69.998a15 15 0 0 1 17.16-8.707l65 14.998A14.997 14.997 0 0 1 384 126c0 160.292-129.945 290-290 290z"></path>
                                </g>
                            </svg>
                        </p>
                        <p className="flex items-center gap-1">
                            <span>۰۷۴۹۶۵۹۰۱۳</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="WhatsApp"
                                role="img"
                                viewBox="0 0 512 512"
                                width="18px"
                                height="18px"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect
                                        width="512"
                                        height="512"
                                        rx="15%"
                                        fill="#25d366"
                                    ></rect>
                                    <path
                                        fill="#25d366"
                                        stroke="#ffffff"
                                        strokeWidth="26"
                                        d="M123 393l14-65a138 138 0 1150 47z"
                                    ></path>
                                    <path
                                        fill="#ffffff"
                                        d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                                    ></path>
                                </g>
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
