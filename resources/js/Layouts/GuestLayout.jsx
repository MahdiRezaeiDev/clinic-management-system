export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-white font-sans">
            <main className="relative flex h-full w-full items-center justify-center">
                <div className="mx-auto flex h-full w-full items-center justify-center">
                    <div className="flex h-full w-full content-center items-center justify-center">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
