<?php

class PrivacyLevel extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "PrivacyLevel";

    /**
     * The mass assignment blacklist.
     *
     * @var array
     */
    protected $guarded = array('id');

	public static $rules = array();
}