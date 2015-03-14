<?php

class User extends \Eloquent {
  protected $fillable = [];
  protected $table = 'users';

  public function bookings()
  {
      return $this->hasMany('bookings');
  }
}
