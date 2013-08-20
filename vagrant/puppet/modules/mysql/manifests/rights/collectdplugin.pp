# Define mysql::rights::monitor
#
# * Creates a mysql user with rights for monitoring
define mysql::rights::collectdplugin($user, $host="localhost", $ensure="present", $privileges = [ "select_priv", "super_priv", "repl_client_priv" ] ) {
  mysql::rights { $name:
    database  => $database,
    user      => $user,
    host      => $host,
    privs     => $privileges
  }
}