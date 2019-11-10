<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DailyDownTime extends Model
{
    protected $fillable = [
        'attendance_id',
        'user_down_time_id',
        'begin',
        'finish',
    ];

    /**
     * 日付変換する項目
     *
     * @var array
     */
    protected $dates = [
        'begin',
        'finish',
    ];

    /**
     * 勤務を取得
     */
    public function attendance(): BelongsTo
    {
        return $this->belongsTo('App\Attendance');
    }

    /**
     * ユーザの不稼働時間設定を取得
     */
    public function userDownTime(): HasOne
    {
        return $this->hasOne('App\UserDownTime');
    }
}
