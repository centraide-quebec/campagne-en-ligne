exec { "apt_update":
  command => "apt-get update",
  path    => "/usr/bin"
}

class{'apache2::install':}
class{'php5::install':}
class{'curl':}
class{'composer':}
class{'mysql':}

mysql::password { "root":
    username => "root",
    password => "vagrant",
}

mysql::create_database { "centraide-campagne-en-ligne":
    username => "root",
    password => "vagrant",
    root_password => "vagrant"
}