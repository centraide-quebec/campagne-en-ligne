
class centraide::app {
	include centraide::db

    exec { "composer_dependency_install" :
        command => "/usr/local/bin/composer install --prefer-dist && /usr/local/bin/composer dump-autoload",
        cwd     => "/var/www",
        require => [ Class["php5::install"], Package["git"] , Class["composer"] ],
    }

    exec { "db_migration" :
        command => "/usr/bin/php artisan migrate",
        cwd     => "/var/www",
        require => [
            Class["centraide::db"],
            Mysql::User['vagrant'], Mysql::Rights::Standard['vagrant'],
            Exec["composer_dependency_install"],
            Mysql_database['centraide'],
            File["/var/www/public"], File["/var/www/app/storage"],
            Service["mysql"], Class["mysql::server"]
        ],
        logoutput => true,
    }

    file { '/var/www/public':
        ensure  => 'directory',
        mode    => '0755',
        owner    => 'vagrant';
    }

    file { "/var/www/app/storage":
        ensure  => 'directory',
        recurse => true,
        owner => vagrant,
        group => vagrant,
        mode  => '0777'
    }

}
