
class centraide::app {
	include centraide::db

    package { "git": }

    exec { "composer_dependency_install" :
        command => "/usr/local/bin/composer install --prefer-dist && /usr/local/bin/composer dump-autoload",
        cwd     => "/var/www/laravel",
        require => [ Class["php5::install"], Package["git"] , Class["composer"] ],
    }

    exec { "db_migration" :
        command => "/usr/bin/php artisan migrate",
        cwd     => "/var/www/laravel",
        require => [ 
            Class["centraide::db"], 
            Mysql::User['vagrant'], Mysql::Rights::Standard['vagrant'], 
            Exec["composer_dependency_install"], 
            Mysql_database['centraide'], 
            File["/var/www/laravel/public"], File["/var/www/laravel/app/storage"],
            Service["mysql"], Class["mysql::server"]
        ],
        logoutput => true,
    }

    file { '/var/www/laravel/public':
        ensure  => 'directory',
        mode    => '0755',
        owner    => 'vagrant';
    }

    file { "/var/www/laravel/app/storage":
        ensure  => 'directory',
        recurse => true,
        owner => vagrant,
        group => vagrant,
        mode  => '0777'
    }

}
