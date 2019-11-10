<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DownTime extends Model
{
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
     * ユーザを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\User');
    }
}
