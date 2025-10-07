import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
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
const weekDays = ['شن', 'یک', 'دو', 'سه', 'چه', 'پن', 'جم'];

export default function AfghanDatePicker({
    value,
    onChange,
    inputClass = 'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400',
    format = 'YYYY/MM/DD',
    ...props
}) {
    return (
        <DatePicker
            calendar={persian}
            locale={persian_en}
            months={afghanMonths}
            format={format}
            weekDays={weekDays}
            value={value}
            onChange={onChange}
            inputClass={`w-full ${inputClass}`} // force full width
            {...props}
        />
    );
}
