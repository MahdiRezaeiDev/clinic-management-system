import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

const afghanMonths = [
    'حمل',
    'ثور',
    'جوزا',
    'سرطان',
    'اسد',
    'سنبله',
    'میزان',
    'عقرب',
    'قوس',
    'جدی',
    'دلو',
    'حوت',
];

export default function AfghanDatePicker({
    value,
    onChange,
    placeholder = 'انتخاب تاریخ',
    inputClass = 'w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400',
    format = 'YYYY/MM/DD',
    ...props
}) {
    return (
        <DatePicker
            calendar={persian}
            locale={persian_fa}
            months={afghanMonths}
            format={format}
            value={value}
            onChange={onChange}
            inputClass={`w-full ${inputClass}`} // force full width
            placeholder={placeholder}
            {...props}
        />
    );
}
