<?php

class Enterprise extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Enterprise";

    /**
     * The mass assignment blacklist.
     *
     * @var array
     */
    protected $guarded = array('id');

	public static $rules = array();

    public function campaigns()
    {
        return $this->belongsToMany('Campaign', 'EnterpriseCampaign');
    }
}