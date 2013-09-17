
# Use stage to make sure centraide module is executed at the end
stage { 'last': }
Stage['main'] -> Stage['last']

exec { "apt_update":
  command => "apt-get update",
  path    => "/usr/bin"
}

class{'apache2::install':}
class{'php5::install':}
class{'curl':}
class{'composer':}


class{"centraide::app":
	stage => last
}


