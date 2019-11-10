<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attendance extends Model
{
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'date',
        'begin',
        'finish',
        'holiday',
    ];

    /**
     * デフォルト値
     *
     * @var array
     */
    protected $attributes = [
        'holiday' => false,
    ];

    /**
     * casts
     *
     * @var array
     */
    protected $casts = [
        'holiday' => 'boolean',
    ];

    /**
     * 日付変換する項目
     *
     * @var array
     */
    protected $dates = [
        'date',
        'begin',
        'finish',
    ];

    public function formatDate()
    {
        return $this->date->format('Y-m-d');
    }

    /**
     * 不稼働時間を取得
     */
    public function dailyDownTimes(): HasMany
    {
        return $this->hasMany('App\DailyDownTime');
    }

    /**
     * ユーザを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\User');
    }

    // TODO 条件取得の関数作る
}
