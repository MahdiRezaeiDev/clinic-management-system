import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import {
    AlertCircle,
    Archive,
    CheckCircle,
    ChevronLeft,
    Clock,
    Database,
    Download,
    FileText,
    HardDrive,
} from 'lucide-react';
import { useState } from 'react';

export default function BackupPage({ backupHealth }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [backupInfo, setBackupInfo] = useState(null);

    const runBackup = async () => {
        setLoading(true);
        setMessage('در حال شروع پشتیبان‌گیری...');
        setBackupInfo(null);

        try {
            const response = await axios.post(route('backup.run'));
            setBackupInfo(response.data);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'پشتیبان‌گیری ناموفق بود.',
            );
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <AuthenticatedLayout title="پشتیبان‌گیری از پایگاه داده">
            <Head title="پشتیبان‌گیری از پایگاه داده" />

            <div className="min-h-screen px-4 py-8 md:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                            <Database className="h-6 w-6 text-teal-600" />
                            پشتیبان‌گیری از پایگاه داده
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            از اطلاعات خود نسخه پشتیبان تهیه کنید و در محل امنی
                            نگهداری نمایید
                        </p>
                    </div>

                    {/* Main Card */}
                    <div
                        className={`mb-6 rounded-xl border p-4 ${backupHealth?.healthy ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}
                    >
                        <p className="font-semibold">
                            وضعیت پشتیبان‌گیری:{' '}
                            {backupHealth?.healthy ? 'سالم' : 'نیازمند بررسی'}
                        </p>
                        <p className="mt-1 text-sm">
                            آخرین اجرا:{' '}
                            {backupHealth?.lastRun?.finished_at ||
                                'هنوز اجرا نشده'}{' '}
                            — اجرای بعدی: {backupHealth?.nextScheduledRun}
                        </p>
                        {backupHealth?.lastRun?.message && (
                            <p className="mt-1 text-xs text-gray-600">
                                {backupHealth.lastRun.message}
                            </p>
                        )}
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        {/* Header with gradient */}
                        <div className="border-b border-gray-200 bg-gradient-to-l from-teal-50 to-white px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                                    <Archive className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        ایجاد نسخه پشتیبان جدید
                                    </h3>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        با کلیک بر روی دکمه زیر، یک نسخه پشتیبان
                                        کامل از پایگاه داده تهیه می‌شود
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {/* Info Cards */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                            <HardDrive className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                نوع پشتیبان
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800">
                                                کامل (Full)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                                            <Clock className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                زمان تقریبی
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800">
                                                کمتر از ۱ دقیقه
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                                            <FileText className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                فرمت فایل
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800">
                                                SQL
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Backup Button */}
                            <div className="mb-6 flex justify-center">
                                <button
                                    onClick={runBackup}
                                    disabled={loading}
                                    className={`flex transform items-center gap-3 rounded-xl px-8 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 ${
                                        loading
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-gradient-to-l from-teal-600 to-teal-500 shadow-lg hover:from-teal-700 hover:to-teal-600 hover:shadow-xl'
                                    } `}
                                >
                                    {loading ? (
                                        <>
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            <span>در حال پشتیبان‌گیری...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="h-5 w-5" />
                                            <span>شروع پشتیبان‌گیری</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Result Section */}
                            {(message || backupInfo) && (
                                <div className="border-t border-gray-200 pt-6">
                                    {message && !backupInfo && (
                                        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                                            <p className="text-sm text-blue-800">
                                                {message}
                                            </p>
                                        </div>
                                    )}

                                    {backupInfo && (
                                        <div className="space-y-4">
                                            {/* Success Message */}
                                            <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                                                <p className="text-sm text-green-800">
                                                    {backupInfo.message}
                                                </p>
                                            </div>

                                            {/* Backup Details */}
                                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                                <div className="border-b border-gray-200 bg-gray-100 px-4 py-3">
                                                    <h4 className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                                        <Database className="h-4 w-4" />
                                                        جزئیات فایل پشتیبان
                                                    </h4>
                                                </div>
                                                <div className="space-y-3 p-4">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            <span className="ml-1 font-medium">
                                                                نام فایل:
                                                            </span>
                                                            {backupInfo.file}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <HardDrive className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            <span className="ml-1 font-medium">
                                                                مسیر ذخیره:
                                                            </span>
                                                            {backupInfo.path}
                                                        </span>
                                                    </div>
                                                    {backupInfo.size && (
                                                        <div className="flex items-center gap-3">
                                                            <Archive className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">
                                                                <span className="ml-1 font-medium">
                                                                    حجم فایل:
                                                                </span>
                                                                {formatFileSize(
                                                                    backupInfo.size,
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {backupInfo.tables && (
                                                        <div className="flex items-center gap-3">
                                                            <Database className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">
                                                                <span className="ml-1 font-medium">
                                                                    تعداد جداول:
                                                                </span>
                                                                {
                                                                    backupInfo.tables
                                                                }{' '}
                                                                جدول
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Download Button */}
                                            {backupInfo.download_url && (
                                                <div className="flex justify-end">
                                                    <a
                                                        href={
                                                            backupInfo.download_url
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                                                        download
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        دانلود فایل پشتیبان
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Error Message */}
                            {message &&
                                message.includes('ناموفق') &&
                                !backupInfo && (
                                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                                        <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                                        <p className="text-sm text-red-800">
                                            {message}
                                        </p>
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-blue-800">
                                    نکات مهم پشتیبان‌گیری:
                                </h4>
                                <ul className="list-inside list-disc space-y-1.5 text-xs text-blue-700">
                                    <li>
                                        به طور منظم از اطلاعات خود نسخه پشتیبان
                                        تهیه کنید
                                    </li>
                                    <li>
                                        فایل‌های پشتیبان را در محل امنی (خارج از
                                        سرور) نگهداری کنید
                                    </li>
                                    <li>
                                        قبل از به‌روزرسانی سیستم، حتماً پشتیبان
                                        بگیرید
                                    </li>
                                    <li>
                                        فایل‌های پشتیبان قدیمی را به صورت
                                        دوره‌ای پاک کنید
                                    </li>
                                    <li>
                                        از صحت فایل‌های پشتیبان با بازگردانی
                                        آزمایشی اطمینان حاصل کنید
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Back to Dashboard Link */}
                    <div className="mt-6">
                        <a
                            href={route('dashboard')}
                            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            بازگشت به داشبورد
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
