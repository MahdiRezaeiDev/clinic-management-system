<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;
use Carbon\Carbon;
use InvalidArgumentException;

class JalaliDateCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return $value
            ? Jalalian::fromCarbon(Carbon::parse($value))->format('Y/m/d')
            : null;
    }

    /**
     * Prepare the given value for storage.ظ
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        $date = match (true) {
            $value instanceof Jalalian => $value->toCarbon()->toDateString(),
            $value instanceof Carbon => $value->toDateString(),
            is_string($value) && preg_match('/^(?:19|20)\d{2}-\d{2}-\d{2}$/', $value) => Carbon::createFromFormat('Y-m-d', $value)->toDateString(),
            is_string($value) && preg_match('/^1[34]\d{2}[\/-]\d{2}[\/-]\d{2}$/', $value) => Jalalian::fromFormat('Y/m/d', str_replace('-', '/', $value))->toCarbon()->toDateString(),
            default => null,
        };

        if ($value !== null && $value !== '' && $date === null) {
            throw new InvalidArgumentException("Invalid date value for {$key}.");
        }

        return $date;
    }
}
