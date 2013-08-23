<?php

class Donation extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Donation";
	protected $guarded = array();

	public static $rules = array();
}