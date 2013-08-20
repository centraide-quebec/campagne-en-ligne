exec { "apt_update":
  command => "apt-get update",
  path    => "/usr/bin"
}

class{'apache2::install':}
class{'php5::install':}
class{'curl':}
class{'composer':}

class {'mysql::server': }

mysql_database { 'centraide':
  ensure => present;
}

mysql::user { 'vagrant' :
  ensure => present,
  require  => Service['mysql'],
  password => 'vagrant',
  host     => 'localhost'
}

mysql::rights::standard { 'vagrant' :
  database => 'centraide',
  user     => 'vagrant',
  host     => 'localhost',
}