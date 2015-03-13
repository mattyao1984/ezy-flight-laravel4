<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('bookings', function(Blueprint $table)
		{
			Schema::create('bookings', function(Blueprint $table) {
	      $table->increments('id');
	      $table->integer('userId');
	      $table->string('source');
	      $table->string('destination');
	      $table->string('date');
	      $table->string('time');
	      $table->string('capacity');
	      $table->timestamps();

	      $table->index('id');
			});
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('bookings');
	}

}
