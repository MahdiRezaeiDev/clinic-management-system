import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import NavLink from './NavLink';

export default function Sidebar() {
    const { auth } = usePage().props;
    const user = auth.user;

    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:bottom-0 md:right-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto print:hidden">
            <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
                {/* Mobile toggle button */}
                <button
                    className="cursor-pointer rounded border border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    type="button"
                    onClick={() => setShowSidebar((prev) => !prev)}
                >
                    <i className="fas fa-bars"></i>
                </button>

                {/* Company name */}
                <a
                    className="text-blueGray-600 ml-0 inline-block text-right text-sm font-bold uppercase md:block md:pb-2"
                    href={route('dashboard')}
                >
                    Clinic Name
                </a>

                {/* Mobile dropdown */}
                <div className="flex list-none flex-wrap items-center md:hidden">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {user.name}
                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
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
                {showSidebar && (
                    <aside
                        className="absolute left-0 right-0 top-0 z-40 hidden h-auto flex-1 flex-col items-stretch overflow-y-auto overflow-x-hidden shadow md:relative md:mt-4 md:flex md:opacity-100 md:shadow-none print:hidden"
                        id="sidebar"
                    >
                        <ul className="flex list-none flex-col md:min-w-full md:flex-col">
                            <li>
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    <i className="fas fa-tachometer-alt mr-2 text-sm"></i>{' '}
                                    داشبورد
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href={route('staffs.index')}
                                    active={route().current('staffs.*')}
                                >
                                    <i className="fa-solid fa-users-gear mr-2 text-sm"></i>{' '}
                                    مدیریت پرسنل
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href={route('patients.index')}
                                    active={route().current('patients.*')}
                                >
                                    <i className="fa-solid fa-hospital-user mr-2 text-sm"></i>{' '}
                                    مدیریت بیماران
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href={route('pharmacy.index')}
                                    active={route().current('pharmacy.*')}
                                >
                                    <i className="fa-solid fa-pills mr-2 text-sm"></i>{' '}
                                    داروخانه
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href={route('incomes.index')}
                                    active={route().current('incomes.*')}
                                >
                                    <i className="fa-solid fa-coins mr-2 text-sm"></i>{' '}
                                    درآمدها
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href={route('expenses.index')}
                                    active={route().current('expenses.*')}
                                >
                                    <i className="fa-solid fa-money-bill-transfer mr-2 text-sm"></i>{' '}
                                    مصارف
                                </NavLink>
                            </li>
                        </ul>
                    </aside>
                )}
            </div>
        </nav>
    );
}
