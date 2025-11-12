import login_bg from '@/img/login_bg.png';
export default function GuestLayout({ children }) {
    return (
        <div
            className="bg-blueGray-800 bg-full flex h-screen items-center justify-center bg-no-repeat font-sans"
            style={{
                backgroundImage: `url(${login_bg})`,
            }}
        >
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
