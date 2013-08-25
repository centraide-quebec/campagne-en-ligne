<?php

class PrivacyLevel extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "PrivacyLevel";
	protected $guarded = array();

	public static $rules = array();
}