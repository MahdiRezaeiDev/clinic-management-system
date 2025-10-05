import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';
import {
    Accessibility,
    BanknoteArrowUp,
    Box,
    ChevronDown,
    IdCardLanyard,
    LayoutDashboard,
    MenuIcon,
    Pill,
    X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import NavLink from './NavLink';

export default function Sidebar() {
    const { auth } = usePage().props;
    const user = auth.user;

    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (name) => {
        setOpenSubmenu(openSubmenu === name ? null : name);
    };

    const sidebarRef = useRef();
    const toggleSidebar = () => {
        const el = sidebarRef.current;
        if (!el) return;

        el.classList.toggle('hidden');
        el.classList.toggle('bg-white');
        el.classList.toggle('py-3');
        el.classList.toggle('px-6');
    };

    return (
        <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white p-4 shadow-xl md:fixed md:bottom-0 md:right-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto print:hidden">
            <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
                {/* Mobile toggle button */}
                <button
                    className="cursor-pointer rounded border border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    type="button"
                    onClick={toggleSidebar}
                >
                    <MenuIcon className="h-6 w-6" />
                </button>

                {/* Company name */}
                <a
                    className="text-blueGray-600 ml-0 inline-block text-right text-sm font-bold uppercase md:block md:pb-2"
                    href={route('dashboard')}
                >
                    Clinic Name
                </a>

                {/* Mobile user dropdown */}
                <div className="flex list-none flex-wrap items-center md:hidden">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {user.name}
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="bg-blueGray-700 flex w-full items-center justify-between whitespace-nowrap p-4 font-normal text-white">
                                <p className="text-xs">حساب کاربری:</p>
                                <p className="text-xs">{user.name}</p>
                            </div>
                            <ResponsiveNavLink
                                active={route().current('profile.edit')}
                                href={route('profile.edit')}
                                className="text-blueGray-700 block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal"
                            >
                                پروفایل کاربری
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                active={route().current('logout')}
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full px-4 py-2 text-left text-sm font-normal outline-none focus:outline-none"
                            >
                                خروج
                            </ResponsiveNavLink>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {/* Sidebar links */}
                <aside
                    className="absolute left-0 right-0 top-0 z-40 hidden h-auto flex-1 flex-col items-stretch overflow-y-auto overflow-x-hidden shadow md:relative md:mt-4 md:flex md:opacity-100 md:shadow-none print:hidden"
                    id="sidebar"
                    ref={sidebarRef}
                >
                    <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
                        <div className="flex flex-wrap">
                            <div className="w-6/12">
                                <a
                                    className="text-blueGray-600 mr-0 inline-block px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                                    href="{{ route('dashboard') }}"
                                >
                                    <img
                                        src="{{ asset('img/logo.jpg') }}"
                                        alt="company logo"
                                    />
                                </a>
                            </div>
                            <div className="flex w-6/12 justify-end">
                                <X
                                    onClick={toggleSidebar}
                                    className="h-5 w-5"
                                />
                            </div>
                        </div>
                    </div>
                    <ul className="flex list-none flex-col md:min-w-full md:flex-col">
                        {/* Dashboard */}
                        <li>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                <div className="flex items-end gap-2">
                                    <LayoutDashboard className="h-5 w-5" />
                                    <span>داشبورد</span>
                                </div>
                            </NavLink>
                        </li>

                        {/* Staff Menu */}
                        <li>
                            <button
                                onClick={() => toggleSubmenu('staff')}
                                className="flex w-full items-center justify-between py-2 text-left hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 px-2">
                                    <IdCardLanyard className="h-5 w-5" />
                                    <span>پرسنل</span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${openSubmenu === 'staff' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openSubmenu === 'staff' && (
                                <ul className="mr-6 flex flex-col gap-1">
                                    <NavLink
                                        href={route('staffs.index')}
                                        active={route().current('staffs.*')}
                                    >
                                        لیست پرسنل
                                    </NavLink>
                                    <NavLink
                                        href={route('staffs.overtime.index')}
                                        active={route().current(
                                            'staffs.overtime.*',
                                        )}
                                    >
                                        اضافه‌کاری
                                    </NavLink>
                                    <NavLink
                                        href={route('staffs.salary.index')}
                                        active={route().current(
                                            'staffs.salary.*',
                                        )}
                                    >
                                        حقوق
                                    </NavLink>
                                    <NavLink
                                        href={route('staffs.payments.index')}
                                        active={route().current(
                                            'staffs.payments.*',
                                        )}
                                    >
                                        پرداخت‌ها
                                    </NavLink>
                                </ul>
                            )}
                        </li>

                        {/* Patients Menu */}
                        <li>
                            <button
                                onClick={() => toggleSubmenu('patients')}
                                className="flex w-full items-center justify-between py-2 text-left hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 px-2">
                                    <Accessibility className="h-5 w-5" />
                                    <span>بیماران</span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${openSubmenu === 'patients' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openSubmenu === 'patients' && (
                                <ul className="mr-6 flex flex-col gap-1">
                                    <NavLink
                                        href={route('patients.index')}
                                        active={route().current('patients.*')}
                                    >
                                        لیست بیماران
                                    </NavLink>
                                    <NavLink
                                        href={route('doctorvisits.index')}
                                        active={route().current(
                                            'doctorvisits.*',
                                        )}
                                    >
                                        ویزیت‌ها
                                    </NavLink>
                                </ul>
                            )}
                        </li>

                        {/* Pharmacy Menu */}
                        <li>
                            <button
                                onClick={() => toggleSubmenu('pharmacy')}
                                className="flex w-full items-center justify-between py-2 text-left hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 px-2">
                                    <Pill className="h-5 w-5" />
                                    <span>داروخانه</span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${openSubmenu === 'pharmacy' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openSubmenu === 'pharmacy' && (
                                <ul className="mr-6 flex flex-col gap-1">
                                    <NavLink
                                        href={route('pharmacy.sales')}
                                        active={route().current(
                                            'pharmacy.sales',
                                        )}
                                    >
                                        فروش
                                    </NavLink>
                                    <NavLink
                                        href={route('pharmacy.purchases')}
                                        active={route().current(
                                            'pharmacy.purchases',
                                        )}
                                    >
                                        خرید
                                    </NavLink>
                                    <NavLink
                                        href={route('pharmacy.inventory')}
                                        active={route().current(
                                            'pharmacy.inventory',
                                        )}
                                    >
                                        موجودی
                                    </NavLink>
                                </ul>
                            )}
                        </li>

                        {/* Finance Menu */}
                        <li>
                            <button
                                onClick={() => toggleSubmenu('finance')}
                                className="flex w-full items-center justify-between py-2 text-left hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 px-2">
                                    <BanknoteArrowUp className="h-5 w-5" />
                                    <span>مالی</span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${openSubmenu === 'finance' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openSubmenu === 'finance' && (
                                <ul className="mr-6 flex flex-col gap-1">
                                    <NavLink
                                        href={route('incomes.index')}
                                        active={route().current('incomes.*')}
                                    >
                                        درآمدها
                                    </NavLink>
                                    <NavLink
                                        href={route('expenses.index')}
                                        active={route().current('expenses.*')}
                                    >
                                        مصارف
                                    </NavLink>
                                    <NavLink
                                        href={route('reports.index')}
                                        active={route().current('reports.*')}
                                    >
                                        گزارش‌ها
                                    </NavLink>
                                </ul>
                            )}
                        </li>

                        {/* Assets Menu */}
                        <li>
                            <button
                                onClick={() => toggleSubmenu('assets')}
                                className="flex w-full items-center justify-between py-2 text-left hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 px-2">
                                    <Box className="h-5 w-5" />
                                    <span>تجهیزات</span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${openSubmenu === 'assets' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openSubmenu === 'assets' && (
                                <ul className="mr-6 flex flex-col gap-1">
                                    <NavLink
                                        href={route('assets.index')}
                                        active={route().current('assets.*')}
                                    >
                                        لیست دارایی‌ها
                                    </NavLink>
                                    <NavLink
                                        href={route('assets.maintenance.index')}
                                        active={route().current(
                                            'assets.maintenance.*',
                                        )}
                                    >
                                        تعمیرات
                                    </NavLink>
                                </ul>
                            )}
                        </li>
                    </ul>
                </aside>
            </div>
        </nav>
    );
}
