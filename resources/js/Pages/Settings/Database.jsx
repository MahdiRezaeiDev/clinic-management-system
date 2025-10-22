import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function BackupPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const runBackup = async () => {
        setLoading(true);
        setMessage('در حال شروع پشتیبان‌گیری...');

        try {
            const response = await axios.post(route('backup.run'));
            setMessage(
                response.data.message +
                    '\n\nفایل:\n' +
                    response.data.file +
                    '\n\nمسیر:\n' +
                    response.data.path,
            );
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'پشتیبان‌گیری ناموفق بود.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout title="پشتیبان‌گیری از پایگاه داده">
            <Head title="پشتیبان‌گیری از پایگاه داده" />
            <div className="mx-auto mt-10 max-w-3xl rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-4 text-xl font-bold">
                    اجرای پشتیبان‌گیری پایگاه داده
                </h1>

                <button
                    onClick={runBackup}
                    disabled={loading}
                    className={`rounded px-4 py-2 font-semibold text-white ${
                        loading
                            ? 'cursor-not-allowed bg-gray-400'
                            : 'bg-teal-700 hover:bg-teal-900'
                    }`}
                >
                    {loading ? 'در حال پشتیبان‌گیری...' : 'اجرای پشتیبان‌گیری'}
                </button>

                {message && (
                    <div className="mt-4 rounded border bg-gray-100 p-4">
                        <pre className="text-sm">{message}</pre>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
