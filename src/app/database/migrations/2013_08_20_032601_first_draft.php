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
		    $table->dateTime('started_at');
		   	$table->dateTime('ended_at');
		    $table->timestamps();
		    $table->softDeletes();
		});

		Schema::create('Division', function($table){
			$table->bigIncrements('id');
			$table->string('name', 250);
			$table->timestamps();
		});

		Schema::create('Enterprise', function($table){
			$table->bigIncrements('id');
			$table->string('name', 250);
			$table->string('logo', 250)->nullable();
			$table->string('slug', 250);
			$table->bigInteger('division_id')->unsigned();
			$table->integer('payroll_quantity')->default(0);
			$table->string('facebook_link', 250)->nullable();
			$table->string('twitter_link', 250)->nullable();
			$table->string('flickr_link', 250)->nullable();
			$table->string('instagram_link', 250)->nullable();
			$table->string('youtube_link', 250)->nullable();
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('division_id')->references('id')->on('Division');
		});

		Schema::create('EnterpriseCampaign', function($table){
			$table->bigIncrements('id');
			$table->bigInteger('campaign_id')->unsigned();
			$table->bigInteger('enterprise_id')->unsigned();
			$table->decimal('goal_amount', 14, 2);
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('campaign_id')->references('id')->on('Campaign');
			$table->foreign('enterprise_id')->references('id')->on('Enterprise');
		});

		Schema::create('EnterpriseBadge', function($table){
			$table->bigIncrements('id');
			$table->string('name', 250);
			$table->bigInteger('enterprise_id')->unsigned();
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('enterprise_id')->references('id')->on('Enterprise');
		});

		Schema::create('EnterpriseActivity', function($table){
			$table->bigIncrements('id');
			$table->bigInteger('enterprise_id')->unsigned();
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('enterprise_id')->references('id')->on('Enterprise');
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
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('PrivacyLevel', function($table){
			$table->bigIncrements('id');
			$table->string('name', 250);
			$table->timestamps();
		});

		Schema::create('Employee', function($table){
			$table->bigIncrements('id');
			$table->bigInteger('enterprise_id')->unsigned();
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
			$table->boolean('has_subscribed_to_newsletter')->default(false);
			$table->bigInteger('privacy_level_id')->unsigned();
			$table->bigInteger('credit_card_id')->unsigned();
			$table->bigInteger('bank_account_id')->unsigned();
			$table->string('enterprise_internal_number', 250)->nullable();
			$table->dateTime('clicked_email_at')->nullable();
			$table->string('newsletter_hashed_link')->unique();
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('enterprise_id')->references('id')->on('Enterprise');
			$table->foreign("privacy_level_id")->references('id')->on("PrivacyLevel");
			$table->foreign("credit_card_id")->references('id')->on("CreditCard");
			$table->foreign('bank_account_id')->references('id')->on('BankAccount');
		});

		Schema::create('EmployeeBadge', function($table){
			$table->bigIncrements('id');
			$table->string('name', 250);
			$table->bigInteger('employee_id')->unsigned();
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('employee_id')->references('id')->on('Employee');
		});

		Schema::create('Donation', function($table){
			$table->bigIncrements('id');
			$table->bigInteger('employee_id')->unsigned();
			$table->integer('donation_type');
			$table->decimal('amount', 14, 2)->default(0);
			$table->timestamps();
			$table->softDeletes();

			$table->foreign('employee_id')->references('id')->on('Employee');
		});

		Schema::create('EmployeeActivity', function($table){
			$table->bigIncrements('id');
			$table->bigInteger('employee_id')->unsigned();
			$table->bigInteger('donation_id')->unsigned();
			$table->decimal('amount', 14, 2)->default(0);
			$table->timestamps();

			$table->foreign('donation_id')->references('id')->on('Donation');
			$table->foreign('employee_id')->references('id')->on('Employee');
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
		Schema::dropIfExists('Donation');
		Schema::dropIfExists('EmployeeActivity');
		Schema::dropIfExists('EmployeeBadge');
	}

}