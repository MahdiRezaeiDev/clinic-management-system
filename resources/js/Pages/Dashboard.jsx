import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="داشبورد" />

            <div className="bg-blueGray-600 relative pt-12 md:pt-32">
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
                                    <i className="far fa-chart-bar"></i>
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
                                    <i className="fas fa-users"></i>
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
                                    <i className="fas fa-chart-pie"></i>
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
                                    <i className="fas fa-percent"></i>
                                </div>
                            </div>
                            <p className="text-blueGray-400 mt-2 text-xs">
                                مجموع سفارشات تکمیل شده الی امروز
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-20 w-full space-y-10 px-4 pb-5 md:px-10">
                <div className="mx-auto mt-28 max-w-4xl rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-6 text-lg font-semibold text-gray-800">
                        میانبرهای سریع
                    </h2>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                        <a
                            href="{{ route('goods.index') }}"
                            className="bg-blueGray-50 hover:bg-blueGray-100 flex flex-col items-center rounded-lg p-5 text-center shadow-sm transition"
                        >
                            <i className="fas fa-plus-square mb-3 text-3xl text-blue-600"></i>
                            <span className="text-sm font-medium text-gray-800">
                                ثبت جنس
                            </span>
                        </a>
                        <a
                            href="{{ route('sells.index') }}"
                            className="bg-blueGray-50 hover:bg-blueGray-100 flex flex-col items-center rounded-lg p-5 text-center shadow-sm transition"
                        >
                            <i className="fas fa-file-invoice-dollar mb-3 text-3xl text-green-600"></i>
                            <span className="text-sm font-medium text-gray-800">
                                ثبت فروش
                            </span>
                        </a>
                        <a
                            href="{{ route('contracts.create') }}"
                            className="bg-blueGray-50 hover:bg-blueGray-100 flex flex-col items-center rounded-lg p-5 text-center shadow-sm transition"
                        >
                            <i className="fas fa-file-contract mb-3 text-3xl text-indigo-600"></i>
                            <span className="text-sm font-medium text-gray-800">
                                ثبت قرارداد
                            </span>
                        </a>
                        <a
                            href="{{ route('orders.create') }}"
                            className="bg-blueGray-50 hover:bg-blueGray-100 flex flex-col items-center rounded-lg p-5 text-center shadow-sm transition"
                        >
                            <i className="fas fa-shopping-cart mb-3 text-3xl text-pink-600"></i>
                            <span className="text-sm font-medium text-gray-800">
                                ثبت سفارش
                            </span>
                        </a>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        آخرین سفارشات
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-right text-sm">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="p-3 font-semibold">#</th>
                                    <th className="p-3 font-semibold">مشتری</th>
                                    <th className="p-3 font-semibold">
                                        نمبر مسلسل
                                    </th>
                                    <th className="p-3 font-semibold">تاریخ</th>
                                    <th className="p-3 font-semibold">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y"></tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        آخرین قراردادها
                    </h2>
                    <ul className="divide-y text-sm text-gray-700"></ul>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800 shadow">
                    <div className="flex items-start gap-3">
                        <i className="fas fa-exclamation-triangle mt-1 text-xl text-red-600"></i>
                        <div>
                            <h3 className="mb-2 font-bold">هشدار موجودی:</h3>
                            <ul className="list-inside list-disc space-y-1 text-sm"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
