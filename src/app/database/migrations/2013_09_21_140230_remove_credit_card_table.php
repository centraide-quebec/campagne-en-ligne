<?php

use Illuminate\Database\Migrations\Migration;

class RemoveCreditCardTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('Employee', function($table)
		{
			$table->dropForeign('employee_credit_card_id_foreign');
			$table->dropColumn('credit_card_id');
		});

		Schema::dropIfExists('CreditCard');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::create('CreditCard', function($table){
			$table->bigIncrements('id');
			$table->string('card_holder', 250);
			$table->string('card_number', 250);
			$table->string('expiration_month', 2);
			$table->string('expiration_year', 4);
			$table->string('cvc', 25);
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::table('Employee', function($table)
		{
			$table->bigInteger('credit_card_id')->unsigned();
			$table->foreign("credit_card_id")->references('id')->on("CreditCard");
		});
	}

}
