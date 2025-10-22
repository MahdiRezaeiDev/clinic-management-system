import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Database({ flash }) {
    const [loading, setLoading] = useState(false);

    const handleBackup = () => {
        if (
            confirm(
                'آیا مطمئن هستید که می‌خواهید از پایگاه داده پشتیبان بگیرید؟',
            )
        ) {
            setLoading(true);
            router.post(
                route('backup.database'),
                {},
                {
                    onFinish: () => setLoading(false),
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-4 text-lg font-bold">تنظیمات سیستم</h2>

                <div className="flex items-center justify-between border-t pt-4">
                    <span>پشتیبان‌گیری از پایگاه داده</span>
                    <PrimaryButton
                        onClick={handleBackup}
                        disabled={loading}
                        className="bg-teal-600 hover:bg-teal-700"
                    >
                        {loading ? 'در حال پشتیبان‌گیری...' : 'پشتیبان‌گیری'}
                    </PrimaryButton>
                </div>

                {flash?.success && (
                    <div className="mt-4 rounded bg-green-100 p-3 text-sm text-green-800">
                        {flash.success}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
