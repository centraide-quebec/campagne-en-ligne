class mysql::server (
  $mysql_listen_network       = true,
  $mysql_root_user            = 'root',
  $mysql_root_password        = false,
  $mysql_specific_settings    = false,
  $monitored                  = false,
  $nagios_notification_period = 'WorkHours',
  $nagios_servers             = false,
  $mysql_nagios_user          = 'nagios',
  $mysql_nagios_password      = false,
  $graphed                    = false,
  $mysql_collectd_user        = 'collectd',
  $mysql_collectd_password    = false,
  $innodb_log_file_size       = '64M',
  $innodb_buffer_pool_size    = '128M',
  $mysql_raid_device          = false
  ) {
  include mysql::variables

  $mysql_cnf              = $mysql::variables::mysql_cnf
  $mysql_service          = $mysql::variables::mysql_service
  $mysql_socket           = $mysql::variables::mysql_socket
  $mysql_error_log        = $mysql::variables::mysql_error_log
  $mysql_set_skip_bdb     = $mysql::variables::mysql_set_skip_bdb

  if $::lsbdistid in ['CentOS', 'RedHatEnterpriseServer'] {
    if ! $mysql_root_password {
      #No debian-sys-maint on CentOS
      fail('Please pass $mysql_root_password.')
    }
  }

  if $mysql_raid_device {
    $pkg_require = Mount ['/var/lib/mysql']

    file { '/var/lib/mysql':
      ensure  => directory,
      owner   => undef,
      group   => undef
    }

    mount { '/var/lib/mysql':
      ensure  => mounted,
      device  => "/dev/${mysql_raid_device}",
      fstype  => 'xfs',
      dump    => 0,
      pass    => 0,
      options => 'defaults,noatime,nodiratime,logbufs=8',
      require => [ File['/var/lib/mysql'], Sysadmin::Raid::Raiddevice["${mysql_raid_device}"] ]
    }
  } else {
    $pkg_require = undef
  }

  package { ['mysql-server', 'maatkit' ]:
    ensure  => present,
    require => $pkg_require
  }

  if (! defined(Package['libdbd-mysql-perl'])) {
    package{'libdbd-mysql-perl': ensure => present }
  }
  if (! defined(Package['libdbi-perl'])) {
    package{'libdbi-perl': ensure => present }
  }

  file { $mysql_cnf:
    ensure    => present,
    owner     => root,
    group     => root,
    mode      => '0644',
    content   => template('mysql/etc/mysql/my.cnf.erb'),
    require   => Package['mysql-server'],
    notify    => Service[$mysql_service]
  }

  file { '/etc/mysql':
    ensure  => directory
  }

  file { '/etc/mysql/conf.d':
    ensure  => directory
  }

  file { '/etc/mysql/conf.d/performance_settings.cnf':
    ensure    => present,
    mode      => '0644',
    content   => template('mysql/etc/mysql/conf.d/performance_settings.cnf.erb'),
    require   => [ Package['mysql-server'], File ['/var/lib/mysql/innodb_logs'] ],
    notify    => Service[$mysql_service]
  }

  if $mysql_specific_settings {
    file { '/etc/mysql/conf.d/mysql_specific_settings.cnf':
      ensure  => present,
      owner => root,
      group => root,
      mode  => '0644',
      require => Package['mysql-server'],
      source  => "puppet:///modules/mysql/etc/mysql/conf.d/${mysql_specific_settings}",
      notify  => Service[$mysql_service],
    }
  }

  if $::lsbdistid in ['Ubuntu', 'Debian'] {
    file { '/root/.my.cnf':
      ensure  => link,
      target  => '/etc/mysql/debian.cnf',
      owner   => 'root',
      group   => 'root',
      require => Package['mysql-server'],
    }
  } else {
    file { '/root/.my.cnf':
      ensure  => file,
      content => template('mysql/my.cnf.erb'),
      owner   => 'root',
      group   => 'root',
      require => Package[ 'mysql-server' ],
    }
  }

  service { $mysql_service:
    ensure      => running,
    enable      => true,
    hasstatus   => true,
    hasrestart  => true,
    require     => Package['mysql-server'],
  }

  file { '/var/lib/mysql/innodb_logs':
    ensure  => directory,
    owner   => 'mysql',
    group   => 'mysql',
    mode    => '0755',
    require => Package['mysql-server']
  }

  if $mysql_exists == 'true' {

    #Delete extra user created by the package that we do not want
    mysql_user{ '@localhost':       ensure => absent }
    mysql_user{ "@${hostname}":     ensure => absent }

    if $::lsbdistid in ['Ubuntu', 'Debian'] {
      mysql_user { 'root@localhost':    ensure => absent, require => Package['mysql-server'] }
      mysql_user { 'root@127.0.0.1':    ensure => absent }
      mysql_user { "root@${hostname}":  ensure => absent }
    } else {
      mysql_user { 'root@localhost':    password_hash => mysql_password($mysql_root_password) }
      mysql_user { 'root@127.0.0.1':    password_hash => mysql_password($mysql_root_password) }
      mysql_user { "root@${hostname}":  password_hash => mysql_password($mysql_root_password) }
    }

    # Collect all databases and users
    # Mysql_database<<||>>
    # Mysql_user<<||>>
    # Mysql_grant<<||>>
  }

  if $monitored {
    if ! $nagios_servers        { fail('Please pass $nagios_servers') }
    if ! $mysql_nagios_password { fail('Please pass $mysql_nagios_password') }
    if ! $mysql_nagios_allowed_hosts { $mysql_nagios_allowed_hosts = $nagios_servers }  # Because of DNS resolv in MySQL, keep possibility to override Nagios servers

    mysql::user { 'nagios_localhost' :
      user      => $mysql_nagios_user,
      password  => $mysql_nagios_password,
      host      => 'localhost'
    }

    mysql::user { 'nagios' :
      user      => $mysql_nagios_user,
      password  => $mysql_nagios_password,
      host      => $mysql_nagios_allowed_hosts
    }

    mysql::rights::collectdplugin { 'nagios_localhost_replicationstatusrights': user => "$mysql_nagios_user", host => 'localhost' }
    mysql::rights::collectdplugin { 'nagios_replicationstatusrights': user => "$mysql_nagios_user", host => $mysql_nagios_allowed_hosts }

    # @@nagios_service { "MySQL_connectiontime_${hostname}":
    #   check_command         => "check_mysql_connectiontime!5!10!${mysql_nagios_user}!${mysql_nagios_password}",
    #   service_description   => 'MySQL Connection Time',
    #   servicegroups         => '+Database',
    #   notification_period   => $nagios_notification_period,
    #   require               => Nagios_timeperiod[$nagios_notification_period],
    #   tag                   => $::environment
    # }
  }

  if $graphed {
    if ! $mysql_collectd_password { fail('Please pass $mysql_collectd_password') }
    mysql::user { 'collectd_localhost' :
      user      => $mysql_collectd_user,
      password  => $mysql_collectd_password,
      host      => 'localhost'
    }
    collectd::plugin { 'mysql': }
  }

  if $bacula_backup_me == true {
    if $location { $tmp_job_title = "_${location}" }
    else         { $tmp_job_title = "" }

    file { "/var/backups/mysql":
      ensure  => directory,
    }

    file { "/var/backups/mysql/current":
      ensure  => directory,
    }

    bacula::job { "${hostname}_mysql${tmp_job_title}" : bacula_fileset => 'MySQLDatabases', bacula_schedule => "CycleAlwaysFull${location}", bacula_ClientRunBeforeJob => "sh -c '/etc/bacula/scripts/common/mysql_backup.py -p ${backup_mysql_rotate}'", bacula_ClientRunAfterJob => "sh -c 'umount /var/backups/mysql/current'" }
  }
}

class mysql::server::check_replication {

}

# = Class: mysql::server::replicated
#
# * Setup replication between hosts. mysql database is not replicated
# * Create the user for replication with correct credentials for replication _and not more_
# * Limit replication connections to the host $mysql_replicate_peer
# * Puppet must run twice before configuration is complete because user are not created on first run
#
# === Parameters:
#
# $mysql_server_id:: The mysql server id which must be unique for each peer of a replication setup
# $mysql_auto_increment_offset:: The starting point to auto increment values. Should be *different* on all host. Values range from 1....N
# $mysql_auto_increment_increment:: The increment for auto increment values should be *equal* to the number of servers and identical on all hosts
# $mysql_replicate_peer:: The host with which replication is running
class mysql::server::replicated (
  $mysql_replicate_password,
  $mysql_server_id,
  $mysql_auto_increment_offset,
  $mysql_auto_increment_increment,
  $mysql_replicate_peer,
  $mysql_listen_network       = true,
  $mysql_root_user            = 'root',
  $mysql_root_password        = false,
  $mysql_specific_settings    = false,
  $monitored                  = false,
  $nagios_notification_period = 'WorkHours',
  $nagios_servers             = false,
  $mysql_nagios_user          = 'nagios',
  $mysql_nagios_password      = false,
  $graphed                    = false,
  $mysql_collectd_user        = 'collectd',
  $mysql_collectd_password    = false,
  $innodb_log_file_size       = '64M',
  $innodb_buffer_pool_size    = '128M',
  $mysql_raid_device          = false,
  $mysql_replicate_user       = 'replicate',
  $mysql_replicate_user_tables = false,
  $mysql_replicate_do_db      = false,
  $mysql_replicate_ignore_table = []
  ) {

  class { 'mysql::server':
    mysql_listen_network        => $mysql_listen_network,
    mysql_root_user             => $mysql_root_user,
    mysql_root_password         => $mysql_root_password,
    mysql_specific_settings     => $mysql_specific_settings,
    monitored                   => $monitored,
    nagios_notification_period  => $nagios_notification_period,
    nagios_servers              => $nagios_servers,
    mysql_nagios_user           => $mysql_nagios_user,
    mysql_nagios_password       => $mysql_nagios_password,
    graphed                     => $graphed,
    mysql_collectd_user         => $mysql_collectd_user,
    mysql_collectd_password     => $mysql_collectd_password,
    innodb_log_file_size        => $innodb_log_file_size,
    innodb_buffer_pool_size     => $innodb_buffer_pool_size,
    mysql_raid_device           => $mysql_raid_device
  }
  $mysql_cnf              = $mysql::variables::mysql_cnf
  $mysql_service          = $mysql::variables::mysql_service
  $mysql_socket           = $mysql::variables::mysql_socket
  $mysql_error_log        = $mysql::variables::mysql_error_log
  $mysql_set_skip_bdb     = $mysql::variables::mysql_set_skip_bdb

  # This allows to override the host part of the user declaration in mysql,
  # For example in cases where you cannot control the reverse lookups and
  # have to use server fqdns.
  if $mysql_replicate_allowed_override {
    $mysql_skip_name_resolve = true
  } else {
    $mysql_replicate_allowed_override = $mysql_replicate_peer
    $mysql_skip_name_resolve=false
  }

  file { '/etc/mysql/conf.d/mysql_replication_settings.cnf':
    ensure  => present,
    mode    => '0644',
    require => Package['mysql-server'],
    content => template('mysql/etc/mysql/conf.d/replication_settings.cnf.erb'),
    notify  => Service[$mysql_service]
  }

  if $mysql_exists == 'true' {
    mysql::user { $mysql_replicate_user :
      password  => $mysql_replicate_password,
      host      => $mysql_replicate_allowed_override,
      require   => Package['mysql-server']
    }

    mysql::rights::replicate { "${mysql_replicate_user}_${hostname}" :
      user    => "${mysql_replicate_user}",
      host    => "${mysql_replicate_allowed_override}",
      require => Package['mysql-server']
    }
  }

  if $nagios_monitor_me == true {
    # @@nagios_service { "MySQL_slaveio_${hostname}":
    #   check_command       => "check_mysql_slaveio!${mysql_nagios_user}!${mysql_nagios_password}",
    #   service_description => 'MySQL slave IO running',
    #   servicegroups       => '+Database',
    #   notification_period => "${nagios_notification_period}",
    #   require             => Nagios_timeperiod["${nagios_notification_period}"],
    #   tag                 => $::environment
    # }

    # @@nagios_service { "MySQL_slavesql_${hostname}":
    #   check_command       => "check_mysql_slavesql!${mysql_nagios_user}!${mysql_nagios_password}",
    #   service_description => 'MySQL slave SQL running',
    #   servicegroups       => '+Database',
    #   notification_period => "${nagios_notification_period}",
    #   require             => Nagios_timeperiod["${nagios_notification_period}"],
    #   tag                 => $::environment
    # }
  }

  if $collectd_graph_me == true {
    collectd::plugin { 'mysql_replication': }
  }
}
