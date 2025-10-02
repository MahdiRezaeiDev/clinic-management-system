import Nav from '@/Components/Nav';
import Sidebar from '@/Components/Sidebar';

export default function AuthenticatedLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <main className="relative md:mr-64">
                <Nav title={title} />
                {children}
            </main>
        </div>
    );
}
