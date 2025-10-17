import FinanceChart from '@/Components/Cards/FinanceChart';
import MonthlyVisitsChart from '@/Components/Cards/VisitChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, usePage } from '@inertiajs/react';
import {
    BaggageClaim,
    CalendarSync,
    CircleDollarSign,
    ShieldUser,
} from 'lucide-react';

import { useEffect, useState } from 'react';

export default function Dashboard({
    userCount,
    todayVisitCount,
    totalIncomeToday,
    totalExpenseToday,
    monthlyStats,
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
    return (
        <AuthenticatedLayout title="داشبورد">
            <Head title="داشبورد" />

            <div className="relative bg-teal-700 py-12">
                <div className="mx-auto w-full px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-600 text-sm font-bold uppercase">
                                        ویزیت های امروز
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {todayVisitCount}
                                    </span>
                                </div>
                                <div className="rounded-full bg-red-500 p-3 text-white">
                                    <CalendarSync className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-600 mt-2 text-xs">
                                مجموع ویزیت های ثبت شده امروز
                            </p>
                        </div>

                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-600 text-sm font-bold uppercase">
                                        کاربران سیستم
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {userCount}
                                    </span>
                                </div>
                                <div className="rounded-full bg-orange-500 p-3 text-white">
                                    <ShieldUser className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-600 mt-2 text-xs">
                                مجموع کاربران ثبت شده در سیستم
                            </p>
                        </div>

                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-600 text-sm font-bold uppercase">
                                        فروشات امروز
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {totalIncomeToday}
                                    </span>
                                </div>
                                <div className="rounded-full bg-pink-500 p-3 text-white">
                                    <CircleDollarSign className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-600 mt-2 text-xs">
                                مجموع فروشات امروز
                            </p>
                        </div>

                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-600 text-sm font-bold uppercase">
                                        مصارف امروز
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {totalExpenseToday}
                                    </span>
                                </div>
                                <div className="bg-lightBlue-500 rounded-full p-3 text-white">
                                    <BaggageClaim className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-600 mt-2 text-xs">
                                مجموع مصارف امروز
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 px-4 md:px-6">
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 lg:gap-6">
                    {/* Visit Card */}
                    <div className="col-span-2 w-full">
                        <FinanceChart data={monthlyStats} />
                    </div>

                    {/* Pharmacy Card */}
                    <div className="col-span-2 mt-6 w-full lg:mt-0">
                        <MonthlyVisitsChart
                            data={[
                                { visits: 20 },
                                { visits: 35 },
                                { visits: 50 },
                                { visits: 15 },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            <Transition
                show={show}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="fixed bottom-6 left-6 z-50"
            >
                <div className="rounded bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
                    {flash.success}
                </div>
            </Transition>
        </AuthenticatedLayout>
    );
}
