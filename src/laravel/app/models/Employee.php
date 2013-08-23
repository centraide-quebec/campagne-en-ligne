<?php

class Employee extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Employee";

    protected $guarded = array();

	public static $rules = array();
}