<?php

class Campaign extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "Campaign";

    /**
     * The mass assignment blacklist.
     *
     * @var array
     */
    protected $guarded = array('id');

	public static $rules = array();

    /**
     * Many2Many link with pivot table named EnterpriseCampaign
     * @return [Enterprise] Enterprise objects
     */
    public function enterprises()
    {
        return $this->belongsToMany('Enterprise', 'EnterpriseCampaign');
    }

    /**
     * Returns the current campaign by checking its start & end date.
     * Will fail if more than one campaign is found
     * @return Campaign the current campaign
     */
    public static function getCurrentOne()
    {
        return Campaign::where('start_date', '<=', 'now')
            ->where('end_date', '>=', 'now')
            ->firstOrFail();
    }
}