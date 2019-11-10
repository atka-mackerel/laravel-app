<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDownTime extends Model
{
    /**
     * 日付変換する項目
     *
     * @var array
     */
    protected $dates = [
        'apply_start',
        'apply_end',
    ];

    /**
     * 不稼働時間マスタを取得
     */
    public function downTime(): BelongsTo
    {
        return $this->belongsTo('App\DownTime');
    }
}
