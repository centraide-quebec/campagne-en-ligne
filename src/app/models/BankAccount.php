<?php

class BankAccount extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "BankAccount";

    /**
     * The mass assignment blacklist.
     *
     * @var array
     */
	protected $guarded = array('id');

	public static $rules = array();
}