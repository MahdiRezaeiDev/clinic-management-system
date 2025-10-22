import axios from 'axios';
import { useState } from 'react';

export default function BackupPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const runBackup = async () => {
        setLoading(true);
        setMessage('Starting backup...');

        try {
            const response = await axios.post(route('backup.run'));
            setMessage(
                response.data.message + '\n\nOutput:\n' + response.data.output,
            );
        } catch (error) {
            setMessage(error.response?.data?.message || 'Backup failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto mt-10 max-w-3xl rounded-xl bg-white p-6 shadow-md">
            <h1 className="mb-4 text-xl font-bold">Run Database Backup</h1>

            <button
                onClick={runBackup}
                disabled={loading}
                className={`rounded px-4 py-2 font-semibold text-white ${
                    loading
                        ? 'cursor-not-allowed bg-gray-400'
                        : 'bg-teal-500 hover:bg-teal-700'
                }`}
            >
                {loading ? 'Backing up...' : 'Run Backup'}
            </button>

            {message && (
                <div className="mt-4 rounded border bg-gray-100 p-4">
                    <pre className="whitespace-pre-wrap text-sm">{message}</pre>
                </div>
            )}
        </div>
    );
}
