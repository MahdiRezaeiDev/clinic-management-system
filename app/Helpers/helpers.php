<?php

use Morilog\Jalali\Jalalian;
use Carbon\Carbon;

if (!function_exists('jalaliToGregorian')) {
    function jalaliToGregorian($jalaliDate)
    {
        return Jalalian::fromFormat('Y/m/d', $jalaliDate)
            ->toCarbon()
            ->format('Y/m/d');
    }
}

if (!function_exists('gregorianToJalali')) {
    function gregorianToJalali($gregorianDate)
    {
        return Jalalian::fromCarbon(Carbon::parse($gregorianDate))
            ->format('Y/m/d');
    }
}
