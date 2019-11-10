<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDownTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_down_times', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('down_time_id')->unsigned();
            $table->date('apply_start');
            $table->date('apply_end');
            $table->timestamps();
            $table->foreign('down_time_id')->references('id')->on('down_times');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_down_times');
    }
}
