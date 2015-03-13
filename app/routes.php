<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Auth Filter
Route::filter('sentry_auth', function() {
    // If user is not logged in redirect to login page
    if (!Sentry::check()) {
        return Redirect::to('/');
    }
});

Route::group(array('before' => 'sentry_auth'), function()
{
	//Dashboard
	Route::controller('/bookings/:userId', 'BookingController');
});


//Custom Routes － User
Route::get('/logout', array('as' => 'logout', 'uses' => 'UserController@getLogout'));
Route::post('/login', array('uses' => 'UserController@postLogin'));
Route::controller('/', 'HomeController');
