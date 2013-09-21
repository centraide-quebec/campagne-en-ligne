<?php

class Employee extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Employee";

    /**
     * The mass assignment blacklist.
     *
     * @var array
     */
    protected $guarded = array('id');

	public static $rules = array();
}