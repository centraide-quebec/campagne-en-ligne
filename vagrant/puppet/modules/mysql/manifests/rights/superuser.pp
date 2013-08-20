# Define mysql::rights::superuser
#
# * Creates a mysql user with all permissions
define mysql::rights::superuser($database="", $user, $host="localhost", $ensure="present", $privileges = ['all']) {
  mysql::rights { $name:
    database  => $database,
    user      => $user,
    host      => $host,
    privs     => $privileges
  }
}