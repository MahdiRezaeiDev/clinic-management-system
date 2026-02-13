import FinanceChart from '@/Components/Cards/FinanceChart';
import Pharmacy from '@/Components/Cards/Pharmacy';
import Visit from '@/Components/Cards/Visit';
import MonthlyVisitsChart from '@/Components/Cards/VisitChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowDown,
    ArrowUp,
    BaggageClaim,
    Calendar,
    CalendarSync,
    CheckCircle,
    CircleDollarSign,
    DollarSign,
    Pill,
    ShieldUser,
    Stethoscope,
    TrendingDown,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard({
    doctors,
    userCount,
    todayVisitCount,
    totalIncomeToday,
    totalExpenseToday,
    monthlyStats,
    visitMonthlyStats,
}) {
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    // Calculate profit/loss
    const todayProfit = totalIncomeToday - totalExpenseToday;
    const profitPercentage =
        totalExpenseToday > 0
            ? Math.round((todayProfit / totalExpenseToday) * 100)
            : 0;

    // Get current time greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'صبح بخیر';
        if (hour < 17) return 'عصر بخیر';
        return 'شب بخیر';
    };

    // Stat Card Component
    const StatCard = ({
        title,
        value,
        icon: Icon,
        subtitle,
        trend,
        trendValue,
        color,
    }) => (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute left-0 top-0 h-full w-1 ${color}`}></div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-800">
                        {typeof value === 'number'
                            ? value.toLocaleString()
                            : value}
                    </p>
                    {subtitle && (
                        <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
                    )}
                </div>
                <div
                    className={`rounded-xl p-3 ${color.replace('bg-', 'bg- bg-opacity-10')}`}
                >
                    <Icon
                        className={`h-6 w-6 ${color.replace('bg-', 'text-')}`}
                    />
                </div>
            </div>
            {trend && (
                <div className="mt-3 flex items-center gap-1">
                    {trend > 0 ? (
                        <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                        <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                        className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {trend > 0 ? '+' : ''}
                        {trendValue}%
                    </span>
                    <span className="text-xs text-gray-500">نسبت به دیروز</span>
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout title="داشبورد">
            <Head title="داشبورد" />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div
                className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
                dir="rtl"
            >
                {/* Welcome Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            {getGreeting()}، به داشبورد خوش آمدید
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            امروز {new Date().toLocaleDateString('fa-IR')} -
                            overview کامل از وضعیت کلینیک
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2">
                        <Calendar className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                            {new Date().toLocaleDateString('fa-IR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="ویزیت‌های امروز"
                        value={todayVisitCount}
                        icon={CalendarSync}
                        subtitle="تعداد بیماران ویزیت شده"
                        trend={5}
                        trendValue="8"
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="کاربران سیستم"
                        value={userCount}
                        icon={ShieldUser}
                        subtitle="پرسنل فعال در سیستم"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="فروش امروز"
                        value={`${totalIncomeToday.toLocaleString()} ؋`}
                        icon={CircleDollarSign}
                        subtitle="درآمد حاصل از فروش"
                        trend={12}
                        trendValue="15"
                        color="bg-green-500"
                    />
                    <StatCard
                        title="مصارف امروز"
                        value={`${totalExpenseToday.toLocaleString()} ؋`}
                        icon={BaggageClaim}
                        subtitle="هزینه‌های جاری"
                        trend={-3}
                        trendValue="2"
                        color="bg-red-500"
                    />
                </div>

                {/* Profit/Loss Summary */}
                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    <div className="col-span-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">
                                        سود / زیان امروز
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {todayProfit.toLocaleString()}{' '}
                                        <span className="text-sm font-normal">
                                            افغانی
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm ${
                                    todayProfit >= 0
                                        ? 'bg-green-500/30'
                                        : 'bg-red-500/30'
                                }`}
                            >
                                {todayProfit >= 0 ? (
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>{profitPercentage}% سود</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <TrendingDown className="h-4 w-4" />
                                        <span>
                                            {Math.abs(profitPercentage)}% زیان
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-white/20 p-1">
                                    <ArrowUp className="h-3 w-3" />
                                </div>
                                <div>
                                    <p className="text-xs opacity-80">درآمد</p>
                                    <p className="text-sm font-bold">
                                        {totalIncomeToday.toLocaleString()} ؋
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-white/20 p-1">
                                    <ArrowDown className="h-3 w-3" />
                                </div>
                                <div>
                                    <p className="text-xs opacity-80">مصارف</p>
                                    <p className="text-sm font-bold">
                                        {totalExpenseToday.toLocaleString()} ؋
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl bg-white p-5 shadow-lg">
                        <h3 className="mb-3 text-sm font-semibold text-gray-800">
                            دسترسی سریع
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <a
                                href={route('visits.create')}
                                className="flex flex-col items-center justify-center rounded-lg bg-teal-50 p-3 transition-all hover:bg-teal-100 hover:shadow-md"
                            >
                                <Stethoscope className="h-5 w-5 text-teal-600" />
                                <span className="mt-1 text-xs font-medium text-teal-700">
                                    ویزیت جدید
                                </span>
                            </a>
                            <a
                                href={route('pharmacy.create')}
                                className="flex flex-col items-center justify-center rounded-lg bg-blue-50 p-3 transition-all hover:bg-blue-100 hover:shadow-md"
                            >
                                <Pill className="h-5 w-5 text-blue-600" />
                                <span className="mt-1 text-xs font-medium text-blue-700">
                                    فروش دارو
                                </span>
                            </a>
                            <a
                                href={route('medicine.create')}
                                className="flex flex-col items-center justify-center rounded-lg bg-purple-50 p-3 transition-all hover:bg-purple-100 hover:shadow-md"
                            >
                                <Wallet className="h-5 w-5 text-purple-600" />
                                <span className="mt-1 text-xs font-medium text-purple-700">
                                    خرید جدید
                                </span>
                            </a>
                            <a
                                href={route('incomes.create')}
                                className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-3 transition-all hover:bg-green-100 hover:shadow-md"
                            >
                                <DollarSign className="h-5 w-5 text-green-600" />
                                <span className="mt-1 text-xs font-medium text-green-700">
                                    ثبت عاید
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="mb-8 grid gap-6 lg:grid-cols-3">
                    {/* Pharmacy Card */}
                    <div className="col-span-1 overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white p-4">
                            <h3 className="text-sm font-semibold text-gray-800">
                                فروش دارو
                            </h3>
                            <p className="text-xs text-gray-500">
                                آخرین فروش‌های ثبت شده
                            </p>
                        </div>
                        <div className="p-4">
                            <Pharmacy />
                        </div>
                    </div>

                    {/* Finance Chart */}
                    <div className="col-span-2 overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        گزارش مالی ماهانه
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        درآمد، هزینه و سود در ماه‌های اخیر
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="flex items-center gap-1 text-xs">
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                        درآمد
                                    </span>
                                    <span className="flex items-center gap-1 text-xs">
                                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                                        هزینه
                                    </span>
                                    <span className="flex items-center gap-1 text-xs">
                                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                                        سود
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="h- p-4">
                            <FinanceChart data={monthlyStats} />
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid gap-6 lg:grid-cols-5">
                    {/* Visit Card */}
                    <div className="col-span-3 overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white p-4">
                            <h3 className="text-sm font-semibold text-gray-800">
                                ویزیت‌های اخیر
                            </h3>
                            <p className="text-xs text-gray-500">
                                لیست آخرین ویزیت‌های ثبت شده
                            </p>
                        </div>
                        <div className="p-4">
                            <Visit doctors={doctors} />
                        </div>
                    </div>

                    {/* Visit Chart */}
                    <div className="col-span-2 overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white p-4">
                            <h3 className="text-sm font-semibold text-gray-800">
                                آمار ویزیت ماهانه
                            </h3>
                            <p className="text-xs text-gray-500">
                                تعداد ویزیت‌ها در ماه‌های اخیر
                            </p>
                        </div>
                        <div className="">
                            <MonthlyVisitsChart data={visitMonthlyStats} />
                        </div>
                    </div>
                </div>

                {/* Success Toast */}
                <Transition
                    show={show}
                    enter="transition-all duration-300 ease-out"
                    enterFrom="opacity-0 translate-x-2"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-200 ease-in"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-2"
                    className="fixed bottom-6 left-6 z-50"
                >
                    <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-2xl">
                        <div className="rounded-full bg-green-100 p-1">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">موفقیت!</p>
                            <p className="text-sm text-gray-600">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </Transition>
            </div>
        </AuthenticatedLayout>
    );
}
