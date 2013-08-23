<?php

class BankAccount extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "BankAccount";

	protected $guarded = array();

	public static $rules = array();
}