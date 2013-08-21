exec { "apt_update":
  command => "apt-get update",
  path    => "/usr/bin"
}

class{'apache2::install':}
class{'php5::install':}
class{'curl':}
class{'composer':}

class {'mysql::server': }

file { '/var/www/laravel/public':
    ensure  => 'directory',
    mode    => '0755',
    owner    => 'vagrant';
}

file { "/var/www/laravel/storage":
  owner => vagrant,
  group => vagrant,
  mode  => 777,
  recurse => true
}

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

package { "git": }

exec { "dependency_install" :
    command => "/usr/local/bin/composer install --prefer-dist",
    cwd     => "/var/www/laravel",
    require => [ Class["php5::install"], Package["git"] ],
}
