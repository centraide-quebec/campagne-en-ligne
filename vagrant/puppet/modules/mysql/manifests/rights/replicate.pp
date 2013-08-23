# Define mysql::rights::replicate
#
# * Creates a mysql user for replication
define mysql::rights::replicate($database="", $user, $host="localhost", $ensure="present", $privileges = [ "repl_slave_priv", "repl_client_priv" ] ) {
  mysql::rights { $name:
    database  => $database,
    user      => $user,
    host      => $host,
    privs     => $privileges
  }
}
