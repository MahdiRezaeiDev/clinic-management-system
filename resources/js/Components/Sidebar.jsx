import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import NavLink from './NavLink';
export default function Sidebar() {
    const user = usePage().props.auth.user;

    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:bottom-0 md:right-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto print:hidden">
            <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
                <button
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    type="button"
                    onClick={() =>
                        setShowSidebar((previousState) => !previousState)
                    }
                >
                    <i className="fas fa-bars">cc</i>
                </button>
                <a
                    className="text-blueGray-600 ml-0 inline-block text-right text-sm font-bold uppercase md:block md:pb-2"
                    href="{{ route('dashboard') }}"
                >
                    Company Name
                </a>
                <div className="flex list-none flex-wrap items-center md:hidden">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
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
                                active={route().current('profile.edit')}
                                href={route('logout')}
                                method="post"
                                className="outline-none focus:border-none focus:outline-none"
                                as="button"
                            >
                                خروج
                            </ResponsiveNavLink>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {showSidebar && (
                    <aside
                        className="absolute left-0 right-0 top-0 z-40 hidden h-auto flex-1 items-center overflow-y-auto overflow-x-hidden shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none print:hidden"
                        id="sidebar"
                    >
                        <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <a
                                        className="text-blueGray-600 mr-0 inline-block px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                                        href="{{ route('dashboard') }}"
                                    >
                                        Company Name
                                    </a>
                                </div>
                                <div className="flex w-6/12 justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) =>
                                                    !previousState,
                                            )
                                        }
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <ul className="flex list-none flex-col md:min-w-full md:flex-col">
                            <li>
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    <i className="fas fa-tachometer-alt mr-2 text-sm"></i>
                                    داشبورد
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route('user.index')}
                                    active={route().current('user.index')}
                                >
                                    <i className="fa-solid fa-users-gear mr-2 text-sm"></i>
                                    مدیریت کاربران
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('staff.index')}>
                                    <i className="fas fa-box mr-2 text-sm"></i>
                                    مدیریت پرسونل
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('dashboard')}>
                                    <i className="fas fa-shopping-cart mr-2 text-sm"></i>
                                    فروش اجناس
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('dashboard')}>
                                    <i className="fa-solid fa-coins mr-2 text-sm"></i>
                                    برداشت ها
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('dashboard')}>
                                    <i className="fa-regular fa-handshake mr-2 text-sm"></i>
                                    مدیریت مشتریان
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href={route('dashboard')}>
                                    <i className="fa-solid fa-star mr-2 text-sm"></i>
                                    مدیریت محصولات
                                </NavLink>
                            </li>
                        </ul>
                    </aside>
                )}
            </div>
        </nav>
    );
}
