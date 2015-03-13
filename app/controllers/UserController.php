<?php

class UserController extends BaseController {

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

	public function getLogin()
	{
		return View::make('user.login');
	}

	public function getForgetPassword(){
		return View::make('user.forget-password');
	}

	public function getSignUp(){
		return View::make('user.signup');
	}

	public function getLogout(){
		Sentry::logout();

		return Redirect::to('/');
	}

	public function postCreateUser(){
		$user                       = array(
    	'first_name'						  => Input::get('first_name'),
      'last_name'            		=> Input::get('last_name'),
    	'email'                		=> Input::get('email'),
      'phone'                		=> Input::get('phone'),
      'address1'       					=> Input::get('address1'),
      'address2'      			  	=> Input::get('address2'),
      'suburb'      			  	  => Input::get('suburb'),
      'postcode'      			  	=> Input::get('postcode'),
      'password'             		=> Input::get('password'),
      'activated'               => "1"
    );

    try{
    	$user = Sentry::createUser($user);
    	Sentry::loginAndRemember($user);

    	return Response::json(array('code' => '1', 'info' =>'success'));
    }catch(\Exception $ex){
      return Response::json(array('code' => '0', 'error' => $ex, 'info' => 'failed'));
    }
	}

	public function postLogin(){
		try{
	    $credentials = array(
	        'email'    => Input::get('email'),
	        'password' => Input::get('password')
	    );

	    $user = Sentry::authenticate($credentials, false);

	    if ($user->isActivated())
      {
          Sentry::loginAndRemember($user);
          return Response::json(array('code' => '1', 'info' =>'success'));
      }else{
      		return Response::json(array('code' => '0', 'info' =>'invalid user'));
      }
	  }catch(\Exception $ex){
      return Response::json(array('code' => '0', 'error' => $ex, 'info' => 'invalid access'));
    }
	}

	public function getUser($id){
		$user = Sentry::findUserById($id);
		return Response::json($user);
	}

	public function postUpdateUser($id){
		try{
			$user = Sentry::findUserById($id);

			$user->email                = Input::get('email');
			$user->phone                = Input::get('phone');
			$user->address1             = Input::get('address1');
			$user->address2             = Input::get('address2');
			$user->suburb               = Input::get('suburb');
			$user->postcode             = Input::get('postcode');

			if(Input::get('password') != ""){
				$user->password           = Input::get('password');
			}

			if ($user->save())
	    {
	      return Response::json(array('code' => '1', 'info' =>'success'));
	    }
	    else
	    {
	      return Response::json(array('code' => '0', 'error' => $ex, 'info' => 'failed'));
	    }
	  }catch(\Exception $ex){
	  	return Response::json(array('code' => '0', 'error' => $ex, 'info' => 'failed'));
	  }
	}
}
