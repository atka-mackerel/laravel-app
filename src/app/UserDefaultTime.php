<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDefaultTime extends Model
{
    /**
     * 日付変換する項目
     *
     * @var array
     */
    protected $dates = [
        'begin',
        'finish',
        'apply_start',
        'apply_end',
    ];

    /**
     * ユーザを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\User');
    }
}
