<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{

		// TODO: fetch the latest activities
		//
		// TODO: fetch the company donation ranking
		//
		// TODO: fetch the user donation ranking
		//
		// TODO: fetch the campaign's goal + contributions until now

		return View::make('home');
	}

}