<?php

class EnterpriseCampaign extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "EnterpriseCampaign";

    /**
     * The mass assignment blacklist.
     *
     * @var array
     */
    protected $guarded = array('id');

	public static $rules = array();
}