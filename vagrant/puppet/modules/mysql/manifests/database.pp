# Define mysql::database
#
# * Create/Delete a database in mysql
define mysql::database($ensure=present) {
  if $mysql_exists == 'true' {
    mysql_database { $name:
      ensure => $ensure,
    }
  }
}