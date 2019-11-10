<?php
namespace App\Services;

class CommonUtility
{
    public static function tap($obj = null, callable $callback)
    {
        $callback($obj);
        return $obj;
    }

    public static function then($obj = null, callable $callback)
    {
        return $callback($obj);
    }
}
