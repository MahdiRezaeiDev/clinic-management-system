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
                'text-blueGray-800 block px-2 py-3 text-sm font-bold uppercase hover:bg-gray-200' +
                (active ? ' bg-gray-200' : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
