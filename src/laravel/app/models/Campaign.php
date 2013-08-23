<?php

class Campaign extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Campaign";
	protected $guarded = array();

	public static $rules = array();
}