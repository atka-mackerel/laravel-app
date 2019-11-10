<?php
namespace App\Services;

use DateInterval;
use Illuminate\Support\Carbon;

class DateUtility
{
    const DATE_INTERVAL = 'P1D';

    public static function toHourMinute(Carbon $time = null): array
    {
        return CommonUtility::then($time, function(Carbon $t = null) {
            return [
                'hour' => $t !== null ? $t->hour : null,
                'minute' => $t !== null ? $t->minute : null,
            ];
        });
    }

    public static function datePeriod(Carbon $start, Carbon $end)
    {
        return $start->toPeriod($end, new DateInterval(self::DATE_INTERVAL));
    }
}
