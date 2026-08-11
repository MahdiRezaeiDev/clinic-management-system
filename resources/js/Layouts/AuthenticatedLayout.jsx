import Nav from '@/Components/Nav';
import Sidebar from '@/Components/Sidebar';

export default function AuthenticatedLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <main className="relative isolate min-h-screen md:mr-64">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl" />
                </div>
                <Nav title={title} />
                <div className="relative min-h-[calc(100vh-4rem)] md:py-16">
                    {children}
                </div>
            </main>
        </div>
    );
}
