import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'group mx-2 my-1 block rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ' +
                (active
                    ? ' bg-gradient-to-l from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200/60'
                    : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
