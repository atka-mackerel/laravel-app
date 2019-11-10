<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailyDownTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_down_times', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('attendance_id')->unsigned();
            $table->bigInteger('user_down_time_id')->unsigned();
            $table->dateTime('begin')->nullable();
            $table->dateTime('finish')->nullable();
            $table->timestamps();
            $table->foreign('attendance_id')->references('id')->on('attendances');
            $table->foreign('user_down_time_id')->references('id')->on('user_down_times');
            $table->unique(['attendance_id', 'user_down_time_id'], 'uq_daily_down_times');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_down_times');
    }
}
