import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    BaggageClaim,
    CalendarSync,
    CircleDollarSign,
    ShieldUser,
} from 'lucide-react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout title="داشبورد">
            <Head title="داشبورد" />

            <div className="bg-blueGray-600 relative py-12 md:pt-32">
                <div className="mx-auto w-full px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                                        سفارشات ناتکمیل
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {/* {{ $incompleteOrders }} */}
                                    </span>
                                </div>
                                <div className="rounded-full bg-red-500 p-3 text-white">
                                    <CalendarSync className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-400 mt-2 text-xs">
                                مجموع سفارشات ناتکمیل تا به امروز
                            </p>
                        </div>

                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                                        کاربران سیستم
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {/* {{ $totalUsers }} */}
                                    </span>
                                </div>
                                <div className="rounded-full bg-orange-500 p-3 text-white">
                                    <ShieldUser className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-400 mt-2 text-xs">
                                مجموع کاربران ثبت شده در سیستم
                            </p>
                        </div>

                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                                        فروشات امروز
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {/* {{ $todaysSells }} */}
                                    </span>
                                </div>
                                <div className="rounded-full bg-pink-500 p-3 text-white">
                                    <CircleDollarSign className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-400 mt-2 text-xs">
                                مجموع فروشات امروز
                            </p>
                        </div>

                        <div className="rounded bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                                        سفارش های تکمیل شده
                                    </h5>
                                    <span className="text-blueGray-700 text-xl font-semibold">
                                        {/* {{ $totalOrders }} */}
                                    </span>
                                </div>
                                <div className="bg-lightBlue-500 rounded-full p-3 text-white">
                                    <BaggageClaim className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-blueGray-400 mt-2 text-xs">
                                مجموع سفارشات تکمیل شده الی امروز
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
