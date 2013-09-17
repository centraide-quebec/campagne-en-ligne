
class centraide::db {
	class {'mysql::server': 
	}

	mysql_database { 'centraide':
	  ensure => present,
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

}
