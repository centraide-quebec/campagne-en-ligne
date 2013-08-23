<?php

class Enterprise extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Enterprise";
	protected $guarded = array();

	public static $rules = array();
}