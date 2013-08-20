<?php

use Illuminate\Database\Migrations\Migration;

class FirstDraft extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('Campaign', function($table)
		{
		    $table->bigIncrements('id');
		    // $table->primary('id');
		    $table->dateTime('started_at');
		   	$table->dateTime('ended_at');
		    $table->timestamps();
		    $table->softDeletes();
		});

		Schema::create('Division', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->string('name', 250);
			$table->timestamps();
		});

		Schema::create('Enterprise', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->string('name', 250);
			$table->string('logo', 250)->nullable();
			$table->string('slug', 250);
			$table->foreign('division_id')
				->references('id')->on('Division')->unsigned();
			$table->integer('payroll_quantity')->default(0);
			$table->string('facebook_link', 250)->nullable();
			$table->string('twitter_link', 250)->nullable();
			$table->string('flickr_link', 250)->nullable();
			$table->string('instagram_link', 250)->nullable();
			$table->string('youtube_link', 250)->nullable();
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('EnterpriseCampaign', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->foreign('campaign_id')
				->references('id')->on('Campaign')->unsigned();
			$table->foreign('enterprise_id')
				->references('id')->on('Enterprise')->unsigned();
			$table->decimal('goal_amount', 14, 2);
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('EnterpriseBadge', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->string('name', 250);
			$table->foreign('enterprise_id')
				->references('id')->on('Enterprise')->unsigned();
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('EnterpriseActivity', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->foreign('enterprise_id')
				->references('id')->on('Enterprise')->unsigned();
			$table->timestamps();
			$table->softDeletes();
		});

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

		Schema::create('BankAccount', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('PrivacyLevel', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->string('name', 250);
			$table->timestamps();
		});

		Schema::create('Employee', function($table){
			$table->bigIncrements('id');
			// $table->primary('id');
			$table->foreign('enterprise_id')
				->references('id')->on('Enterprise')->unsigned();
			$table->string('first_name', 250);
			$table->string('middle_name', 250);
			$table->string('last_name', 250);
			$table->string('address', 250);
			$table->string('city', 250);
			$table->string('state', 250);
			$table->string('country', 250);
			$table->string('postal_code', 25);
			$table->string('phone_number_work', 50);
			$table->string('phone_number_home', 50);
			$table->string('email_work', 250)->unique();
			$table->string('email_personal', 250);
			$table->string('email_newsletter', 250);
			$table->boolean('has_subscribed_to_newsletter')
				->default(false);
			$table->foreign("privacy_level_id")->references('id')
				->on("PrivacyLevel")->unsigned();
			$table->foreign("credit_card_id")->references('id')
				->on("CreditCard")->unsigned();
			$table->foreign('bank_account_id')->references('id')
				->on('BankAccount')->unsigned();
			$table->string('enterprise_internal_number', 250)->nullable();
			$table->dateTime('clicked_email_at')->nullable();
			$table->string('newsletter_hashed_link')->unique();
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('Donation', function($table){
			$table->bigIncrements('id');
			$table->foreign('employee_id')
				->references('id')->on('Employee')->unsigned();
			$table->integer('donation_type');
			$table->decimal('amount', 14, 2)->default(0);
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('EmployeeActivity', function($table){
			$table->bigIncrements('id');
			$table->foreign('employee_id')
				->references('id')->on('Employee')->unsigned();
			$table->foreign('donation_id')
				->references('id')->on('Donation')->unsigned();
			$table->decimal('amount', 14, 2)->default(0);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('Campaign');
		Schema::dropIfExists('Division');
		Schema::dropIfExists('EnterpriseCampaign');
		Schema::dropIfExists('EnterpriseBadge');
		Schema::dropIfExists('EnterpriseActivity');
		Schema::dropIfExists('Enterprise');
		Schema::dropIfExists('Employee');
		Schema::dropIfExists('CreditCard');
		Schema::dropIfExists('BankAccount');
	}

}