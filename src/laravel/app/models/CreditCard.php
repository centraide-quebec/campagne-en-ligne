<?php

class CreditCard extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "CreditCard";
	protected $guarded = array();

	public static $rules = array();
}