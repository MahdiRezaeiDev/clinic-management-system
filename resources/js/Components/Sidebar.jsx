import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';
import {
    BadgeDollarSign,
    Bell,
    Boxes,
    Calendar,
    CardSim,
    ChartAreaIcon,
    ChevronDown,
    Coins,
    FileWarning,
    FlaskConical,
    HeartPulse,
    Hospital,
    IdCard,
    LayoutDashboard,
    MenuIcon,
    ParkingMeter,
    RadioReceiver,
    Settings,
    Store,
    User,
    UserIcon,
    UsersRound,
    WalletCards,
} from 'lucide-react';
import { useRef, useState } from 'react';

export default function Sidebar() {
    const user = usePage().props.auth.user;
    const sidebarRef = useRef();

    const toggleSidebar = () => {
        const element = sidebarRef.current;
        if (!element) return;
        element.classList.toggle('hidden');
        element.classList.toggle('bg-white');
        element.classList.toggle('px-3');
        element.classList.toggle('py-3');
    };

    const can = (...roles) => roles.includes(user.role);

    return (
        <nav className="relative z-30 flex flex-wrap items-center justify-between border-l border-gray-100 bg-white p-4 shadow-2xl shadow-gray-300/40 md:fixed md:inset-y-0 md:right-0 md:h-screen md:w-72 md:flex-col md:flex-nowrap md:overflow-hidden print:hidden">
            <div className="mx-auto flex w-full flex-wrap items-center justify-between md:h-full md:min-h-0 md:flex-1 md:flex-col md:flex-nowrap md:items-stretch">
                <button
                    className="rounded-xl border border-gray-200 p-2 text-gray-600 md:hidden"
                    type="button"
                    onClick={toggleSidebar}
                    aria-label="نمایش منو"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>

                <a
                    className="flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-700 to-teal-600 px-4 py-3 text-white shadow-lg md:mb-3"
                    href={route('dashboard')}
                >
                    <span className="rounded-xl bg-white/15 p-2">
                        <Hospital className="h-6 w-6" />
                    </span>
                    <span>
                        <b className="block text-sm">سیستم مدیریت بیمارستان</b>
                        <small className="text-[11px] font-normal text-teal-100">
                            کلینیک مادر و طفل
                        </small>
                    </span>
                </a>

                <div className="flex list-none items-center md:hidden">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="inline-flex items-center gap-1 rounded-xl p-2 text-gray-500">
                                <User className="h-5 w-5" />
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="bg-teal-700 p-4 text-xs text-white">
                                {user.name}
                            </div>
                            <ResponsiveNavLink href={route('profile.edit')}>
                                پروفایل کاربری
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                خروج
                            </ResponsiveNavLink>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                <aside
                    ref={sidebarRef}
                    className="absolute left-0 right-0 top-16 z-40 hidden max-h-[calc(100vh-5rem)] flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain rounded-b-2xl bg-white pb-5 shadow-xl md:relative md:inset-auto md:mt-1 md:flex md:max-h-none md:min-h-0 md:w-full md:shadow-none"
                >
                    <div className="space-y-1 pb-8 pt-2">
                        <MenuItem
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            icon={LayoutDashboard}
                        >
                            داشبورد
                        </MenuItem>

                        <MenuGroup
                            title="پذیرش و درمان"
                            icon={HeartPulse}
                            active={
                                route().current('visits.*') ||
                                route().current('patients.*') ||
                                route().current('hospital.triage.*') ||
                                route().current('hospital.appointments.*') ||
                                route().current('hospital.bed-board') ||
                                route().current('hospital.lab.*')
                            }
                        >
                            <MenuItem
                                href={route('visits.index')}
                                active={route().current('visits.*')}
                                icon={Calendar}
                            >
                                ویزیت‌ها
                            </MenuItem>
                            <MenuItem
                                href={route('patients.index')}
                                active={route().current('patients.*')}
                                icon={User}
                            >
                                پرونده مریضان
                            </MenuItem>
                            <MenuItem
                                href={route('hospital.triage.index')}
                                active={route().current('hospital.triage.*')}
                                icon={HeartPulse}
                            >
                                تریاژ و صف انتظار
                            </MenuItem>
                            <MenuItem
                                href={route('hospital.appointments.index')}
                                active={route().current(
                                    'hospital.appointments.*',
                                )}
                                icon={Calendar}
                            >
                                تقویم نوبت‌ها
                            </MenuItem>
                            <MenuItem
                                href={route('hospital.bed-board')}
                                active={route().current('hospital.bed-board')}
                                icon={ParkingMeter}
                            >
                                بستری و تخت‌ها
                            </MenuItem>
                            {can(
                                'admin',
                                'manager',
                                'doctor',
                                'laboratory',
                            ) && (
                                <MenuItem
                                    href={route('hospital.lab.index')}
                                    active={route().current('hospital.lab.*')}
                                    icon={FlaskConical}
                                >
                                    مرکز لابراتوار
                                </MenuItem>
                            )}
                        </MenuGroup>

                        <MenuGroup
                            title="دارو و انبار"
                            icon={Boxes}
                            active={
                                route().current('hospital.inventory.*') ||
                                route().current('hospital.catalog.*') ||
                                route().current('suppliers.*') ||
                                route().current('drugs.*') ||
                                route().current('medicine.*') ||
                                route().current('pharmacy.*')
                            }
                        >
                            {can(
                                'admin',
                                'manager',
                                'pharmacy',
                                'inventory',
                            ) && (
                                <MenuItem
                                    href={route('hospital.inventory.index')}
                                    active={route().current(
                                        'hospital.inventory.*',
                                    )}
                                    icon={Boxes}
                                >
                                    انبار محموله‌ای
                                </MenuItem>
                            )}
                            {can('admin', 'manager', 'accountant') && (
                                <MenuItem
                                    href={route('hospital.catalog.index')}
                                    active={route().current(
                                        'hospital.catalog.*',
                                    )}
                                    icon={BadgeDollarSign}
                                >
                                    بیمه و تعرفه
                                </MenuItem>
                            )}
                            <MenuItem
                                href={route('suppliers.index')}
                                active={route().current('suppliers.*')}
                                icon={UsersRound}
                            >
                                شرکت‌های همکار
                            </MenuItem>
                            <MenuItem
                                href={route('drugs.index')}
                                active={route().current('drugs.*')}
                                icon={Store}
                            >
                                لیست داروها
                            </MenuItem>
                            <MenuItem
                                href={route('medicine.index')}
                                active={route().current('medicine.*')}
                                icon={CardSim}
                            >
                                خرید دارو
                            </MenuItem>
                            <MenuItem
                                href={route('pharmacy.index')}
                                active={route().current('pharmacy.*')}
                                icon={Coins}
                            >
                                فروش دارو
                            </MenuItem>
                        </MenuGroup>

                        <MenuGroup
                            title="منابع انسانی"
                            icon={UserIcon}
                            active={route().current('staffs.*')}
                        >
                            <MenuItem
                                href={route('staffs.index')}
                                active={route().current('staffs.*')}
                                icon={UserIcon}
                            >
                                مدیریت پرسنل
                            </MenuItem>
                        </MenuGroup>

                        <MenuGroup
                            title="مالی و گزارش‌ها"
                            icon={WalletCards}
                            active={
                                route().current('incomes.*') ||
                                route().current('expenses.*') ||
                                route().current('reports*') ||
                                route().current('finance.*')
                            }
                        >
                            <MenuItem
                                href={route('incomes.index')}
                                active={route().current('incomes.*')}
                                icon={RadioReceiver}
                            >
                                مدیریت عواید
                            </MenuItem>
                            <MenuItem
                                href={route('expenses.index')}
                                active={route().current('expenses.*')}
                                icon={IdCard}
                            >
                                مدیریت هزینه‌ها
                            </MenuItem>
                            <MenuItem
                                href={route('reports')}
                                active={route().current('reports*')}
                                icon={ChartAreaIcon}
                            >
                                گزارشات مدیریتی
                            </MenuItem>
                            {can(
                                'admin',
                                'manager',
                                'accountant',
                                'cashier',
                            ) && (
                                <MenuItem
                                    href={route('finance.control')}
                                    active={route().current('finance.control')}
                                    icon={Coins}
                                >
                                    کنترل مالی و صندوق
                                </MenuItem>
                            )}
                            {can('admin', 'manager', 'cashier') && (
                                <MenuItem
                                    href={route('finance.shifts.index')}
                                    active={route().current('finance.shifts.*')}
                                    icon={WalletCards}
                                >
                                    شیفت صندوق
                                </MenuItem>
                            )}
                        </MenuGroup>

                        <MenuGroup
                            title="سیستم"
                            icon={Settings}
                            active={
                                route().current('notifications.*') ||
                                route().current('settings.*')
                            }
                        >
                            <MenuItem
                                href={route('notifications.index')}
                                active={route().current('notifications.*')}
                                icon={Bell}
                            >
                                اعلان‌ها
                            </MenuItem>
                            {can('admin', 'manager') && (
                                <MenuItem
                                    href={route('settings.database')}
                                    active={route().current(
                                        'settings.database',
                                    )}
                                    icon={FileWarning}
                                >
                                    پشتیبان‌گیری پایگاه داده
                                </MenuItem>
                            )}
                        </MenuGroup>
                    </div>
                </aside>
            </div>
        </nav>
    );
}

function MenuGroup({ title, icon: Icon, active, children }) {
    const [open, setOpen] = useState(active);

    return (
        <section className="px-2">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`}
            >
                <span className="flex items-center gap-2.5">
                    <Icon className="h-5 w-5" />
                    {title}
                </span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && (
                <div className="duration-200 animate-in fade-in slide-in-from-top-1">
                    <div className="mr-4 mt-1 border-r border-teal-100 pr-1">
                        {children}
                    </div>
                </div>
            )}
        </section>
    );
}

function MenuItem({ href, active, icon: Icon, children }) {
    return (
        <NavLink href={href} active={active} className="!mx-1">
            <span className="flex items-center gap-2.5">
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {children}
            </span>
        </NavLink>
    );
}
