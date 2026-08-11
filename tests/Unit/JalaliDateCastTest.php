<?php

use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;

it('converts a Jalali date to the expected Gregorian database date', function () {
    $cast = new JalaliDateCast();
    $model = new class extends Model {};

    expect($cast->set($model, 'date', '1405/01/01', []))->toBe('2026-03-21');
});

it('keeps an already Gregorian database date unchanged', function () {
    $cast = new JalaliDateCast();
    $model = new class extends Model {};

    expect($cast->set($model, 'date', '2026-03-21', []))->toBe('2026-03-21');
});

it('formats Gregorian database values as Jalali dates', function () {
    $cast = new JalaliDateCast();
    $model = new class extends Model {};

    expect($cast->get($model, 'date', '2026-03-21', []))->toBe('1405/01/01');
});
