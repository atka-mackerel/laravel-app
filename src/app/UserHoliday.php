<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserHoliday extends Model
{
    /**
     * ユーザを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\User');
    }
}
