<?php

class EmployeeActivity extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "EmployeeActivity";
	protected $guarded = array();

	public static $rules = array();
}