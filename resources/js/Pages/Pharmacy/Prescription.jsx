import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Printer } from 'lucide-react';

export default function Prescription({ sale }) {
    return (
        <AuthenticatedLayout title="فاکتور فروش">
            <Head title="فاکتور فروش" />
            <div className="mx-auto my-6 max-w-2xl rounded-xl bg-white font-sans shadow-lg">
                {/* Header */}
                <div className="relative min-h-32 overflow-hidden rounded-t-xl border-none bg-gray-900 text-center">
                    <figure className="absolute inset-x-0 bottom-0 -mb-px">
                        <svg
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1920 100.1"
                        >
                            <path
                                fill="currentColor"
                                className="fill-white"
                                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                            ></path>
                        </svg>
                    </figure>
                </div>

                {/* Icon */}
                <div className="relative z-10 -mt-12 border-none text-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border bg-white text-gray-700 shadow-lg">
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27z" />
                        </svg>
                    </span>
                </div>

                {/* Title */}
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        فاکتور شماره {sale.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                        تاریخ: {sale.sale_date}
                    </p>
                </div>

                {/* Payment Info */}
                <div className="mt-6 grid grid-cols-2 gap-5 px-6 text-center sm:grid-cols-3">
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            مبلغ پرداخت‌شده:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            {sale.total_amount} افغانی
                        </span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            تاریخ پرداخت:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            {sale.sale_date}
                        </span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            روش پرداخت:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            نقد
                        </span>
                    </div>
                </div>

                {/* Summary Items */}
                <div className="mt-6 px-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-800">
                        خلاصه
                    </h4>
                    <div className="divide-y divide-gray-200 rounded-lg border">
                        {sale?.items?.map((item, index) => (
                            <div key={index}>
                                <div
                                    className={`text-smtext-gray-800 flex justify-between px-4 py-2`}
                                >
                                    {item.drug_name}
                                    <span>{item.unit_price} افغانی</span>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between bg-gray-50 px-4 py-2 text-sm font-semibold">
                            مجموع پرداخت‌ شده{' '}
                            <span>{sale.total_amount} افغانی</span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-start gap-2 p-6">
                    <PrimaryButton onClick={() => window.print()}>
                        <Printer className="ml-2 h-4 w-4" />
                        چاپ
                    </PrimaryButton>
                </div>

                {/* Contact Info */}
                {/* <div className="mt-6 p-6 text-center text-sm text-gray-500">
                    در صورت داشتن هرگونه سوال، لطفاً با ما تماس بگیرید:
                    <a
                        href="mailto:example@site.com"
                        className="text-blue-600 hover:underline"
                    >
                        example@site.com
                    </a>{' '}
                    یا تماس با شماره
                    <a
                        href="tel:+1898345492"
                        className="text-blue-600 hover:underline"
                    >
                        +1 898-34-5492
                    </a>
                </div> */}
            </div>
        </AuthenticatedLayout>
    );
}
