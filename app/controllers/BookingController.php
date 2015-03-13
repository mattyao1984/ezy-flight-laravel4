<?php

class BookingController extends BaseController {

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

	public function getIndex()
	{	
		return View::make('booking.index');
	}

	public function getLogout(){
		Sentry::logout();

		return Response::json(array(
	    	'code' => '1', 
	    	'info' => 'Log out successfully.'
	  	)
	  );
	}
}