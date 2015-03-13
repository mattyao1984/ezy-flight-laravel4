<?php

class BillingAddress extends BaseModel {
    protected $fillable = array('user_id', 'address1', 'address2', 'suburb', 'postcode');
    protected $table = 'billing_address';

    public function bills()
    {
        return $this->hasMany('bills');
    }
}
