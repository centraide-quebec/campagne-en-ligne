# Define mysql::rights::backup
#
# * Creates a mysql user with only select and lock writes
define mysql::rights::backup($database="", $user, $host="localhost", $ensure="present", $privileges = [ "select_priv", "lock_tables_priv" ] ) {
  mysql::rights { $name:
    database  => $database,
    user      => $user,
    host      => $host,
    privs     => $privileges
  }
}
