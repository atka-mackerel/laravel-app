<?php

namespace App\Http\Controllers\Api\V1;

use App\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\DateUtility;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class AttendanceController extends Controller
{
    public function __construct()
    {
    }

    /**
     * 勤務一覧取得
     */
    public function index(Request $request)
    {
        $attendances = $this->getAttendances($request);
        $json = [
            'errors' => null,
            'data' => [
                'attendances' => $attendances->map(function($item)
                {
                    return [
                        'id' => $item->id,
                        'date' => $item->formatDate(),
                        'begin' => DateUtility::toHourMinute($item->begin),
                        'finish' => DateUtility::toHourMinute($item->finish),
                        'holiday' => $item->holiday,
                        'downTimes' => [],
                    ];
                }),
                'userDownTimes' => [],
                'userDownTimeMasters' => [],
                'userDefaultTime' => [
                    'begin' => DateUtility::toHourMinute(),
                    'finish' => DateUtility::toHourMinute(),
                ],
                'total' => [
                    'work' => '00:00',
                    'down' => '00:00',
                    'actual' => '00:00',
                    'over' => '00:00',
                ],
            ],
        ];
        return $json;
    }

    private function getAttendances(Request $request): Collection
    {
        $dateRangeStart = new Carbon($request->date_range_start);
        $dateRangeEnd = new Carbon($request->date_range_end);
        $datePeriod = DateUtility::datePeriod($dateRangeStart, $dateRangeEnd);

        // 勤務取得
        $attendances = Attendance::all();

        // 日付をキーとする連想配列作成
        $attendancesArray = [];
        foreach ($attendances as $attendance) {
            $attendancesArray[$attendance->date->toString()] = $attendance;
        }

        // パラメータの開始日付～終了日付の一覧作成
        return collect($datePeriod->map(function (Carbon $day) use ($attendancesArray) {
            // 取得した勤務が存在する日付は取得した勤務
            // 存在しない場合はAttendance新規作成
            return $attendancesArray[$day->toString()] ?? (new Attendance())->fill(['date' => $day]);
        }));
    }
}
