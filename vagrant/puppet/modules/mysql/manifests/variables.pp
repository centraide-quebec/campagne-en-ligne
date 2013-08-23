class mysql::variables {
  if $::lsbdistid in [ 'Ubuntu', 'Debian' ] {
    $mysql_cnf        = '/etc/mysql/my.cnf'
    $mysql_service    = 'mysql'
    $mysql_socket     = '/var/run/mysqld/mysqld.sock'
    $mysql_error_log  = '/var/log/mysql.log'
    if ( versioncmp( $::lsbdistrelease, '9.04' ) <= 0 ) {
      $mysql_set_skip_bdb = true
    }
  }
  elsif $::lsbdistid in [ 'CentOS', 'RedHatEnterpriseServer' ] {
    $mysql_cnf          = '/etc/my.cnf'
    $mysql_service      = 'mysqld'
    $mysql_socket       = '/var/lib/mysql/mysql.sock'
    $mysql_error_log    = '/var/log/mysqld.log'
    $mysql_set_skip_bdb = false
  }
  else {
    fail('Unsupported operating system')
  }
}