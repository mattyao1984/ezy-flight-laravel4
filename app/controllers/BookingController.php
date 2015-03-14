<?php

class BookingController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$data['user'] = Sentry::getUser();
		return View::make('booking.index', $data);
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$booking = new Booking();
		$input = Input::all();

		$booking->userId = Input::get('userId');
		$booking->source = Input::get('source');
		$booking->destination = Input::get('destination');
		$booking->date = Input::get('date');
		$booking->time = Input::get('time');
		$booking->capacity = Input::get('capacity');

		$booking->save();

		return Response::json(
			array(
				'code'     => '200',
				'info'     => 'New booking has been created.',
				'id' 			 => $booking->id
			)
		);
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$bookings = Booking::where('userId', $id)->get();
		return Response::json($bookings);
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$booking = Booking::find($id);
		$input = Input::all();

		$booking->source = Input::get('source');
		$booking->destination = Input::get('destination');
		$booking->date = Input::get('date');
		$booking->time = Input::get('time');
		$booking->capacity = Input::get('capacity');

		$booking->save();

		return Response::json(
			array(
				'code'     => '200',
				'info'     => 'booking has been updated.',
				'id' 			 => $booking->id
			)
		);
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$booking = Booking::find($id);
		$booking->delete();

		return Response::json(
			array(
				'code'     => '200',
				'info'     => 'booking has been deleted.'
			)
		);
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
