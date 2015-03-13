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

	public function getIndex()
	{	
		return View::make('home.index');
	}

	public function postLogin()
	{
		try{
	    $credentials = array(
	        'email'    => Input::get('email'),
	        'password' => Input::get('password')
	    );

	    $user = Sentry::authenticate($credentials, false);

	    if ($user->isActivated())
      {
          Sentry::loginAndRemember($user);
          return Response::json(array(
	          	'code' => '1', 
	          	'info' => 'Login successful.',
	          	'id'   => $user->id
          	)
          );
      }else{
      		return Response::json(array(
      			'code' => '0', 
      			'info' =>'User is invalid.'
      			)
      		);
      }
	  }catch(\Exception $ex){
      return Response::json(array(
	      	'code' => '0', 
	      	'error' => $ex, 
	      	'info' => 'Username/Password is not correct.'
      	)
      );
    }
	}
}
