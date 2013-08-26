<?php

use Illuminate\Database\Migrations\Migration;

class AddCampaignGoalAmount extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('Campaign', function($table)
		{
		    $table->decimal('goal_amount', 14, 2);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('Campaign', function($table)
		{
		    $table->dropColumn('goal_amount');
		});
	}

}