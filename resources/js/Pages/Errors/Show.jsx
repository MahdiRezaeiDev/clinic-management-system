import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Clock3,
    Gauge,
    Home,
    RefreshCw,
    SearchX,
    ServerCrash,
    ShieldAlert,
    Wrench,
} from 'lucide-react';

const errors = {
    403: {
        title: 'دسترسی غیرمجاز',
        message: 'شما اجازه دسترسی به این بخش از سیستم را ندارید.',
        icon: ShieldAlert,
    },
    404: {
        title: 'صفحه پیدا نشد',
        message: 'آدرسی که وارد کرده‌اید وجود ندارد یا جابه‌جا شده است.',
        icon: SearchX,
    },
    419: {
        title: 'نشست شما منقضی شد',
        message: 'برای حفظ امنیت اطلاعات، لطفاً صفحه را تازه‌سازی کرده و دوباره تلاش کنید.',
        icon: Clock3,
    },
    429: {
        title: 'درخواست‌های بیش از حد',
        message: 'تعداد درخواست‌ها زیاد بوده است؛ کمی صبر کنید و دوباره تلاش نمایید.',
        icon: Gauge,
    },
    500: {
        title: 'خطای داخلی سیستم',
        message: 'مشکلی هنگام پردازش درخواست رخ داد. تیم فنی می‌تواند این مورد را بررسی کند.',
        icon: ServerCrash,
    },
    503: {
        title: 'سرویس موقتاً در دسترس نیست',
        message: 'سیستم در حال نگهداری است یا موقتاً پاسخ‌گو نیست. لطفاً بعداً تلاش کنید.',
        icon: Wrench,
    },
};

export default function Show({ status }) {
    const user = usePage().props.auth?.user;
    const error = errors[status] ?? errors[500];
    const Icon = error.icon;

    return (
        <div
            dir="rtl"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10"
        >
            <Head title={error.title} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#dbe5e4_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

            <main className="relative w-full max-w-xl rounded-3xl border border-gray-100 bg-white/95 p-7 text-center shadow-2xl shadow-teal-900/10 backdrop-blur sm:p-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-teal-600 ring-8 ring-teal-50/50">
                    <Icon className="h-10 w-10" />
                </div>
                <p className="mt-8 text-6xl font-black tracking-tight text-teal-600">
                    {status}
                </p>
                <h1 className="mt-4 text-2xl font-black text-gray-800 sm:text-3xl">
                    {error.title}
                </h1>
                <p className="mx-auto mt-4 max-w-md leading-8 text-gray-500">
                    {error.message}
                </p>

                <div className="mt-9 flex flex-col-reverse justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 font-medium text-gray-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                    >
                        <ArrowRight className="h-4 w-4" />
                        بازگشت به صفحه قبل
                    </button>
                    {status === 419 ? (
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-teal-600 to-teal-500 px-6 font-bold text-white shadow-lg shadow-teal-200 transition hover:-translate-y-0.5"
                        >
                            <RefreshCw className="h-4 w-4" />
                            تازه‌سازی صفحه
                        </button>
                    ) : (
                        <Link
                            href={user ? route('dashboard') : route('login')}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-teal-600 to-teal-500 px-6 font-bold text-white shadow-lg shadow-teal-200 transition hover:-translate-y-0.5"
                        >
                            <Home className="h-4 w-4" />
                            {user ? 'رفتن به داشبورد' : 'رفتن به صفحه ورود'}
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}
