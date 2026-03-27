<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;
use Carbon\Carbon;

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
        return match (true) {
            $value instanceof Jalalian => $value->toCarbon()->toDateString(),
            is_string($value) && $value => Jalalian::fromFormat('Y/m/d', $value)->toCarbon()->toDateString(),
            default => null,
        };
    }
}
