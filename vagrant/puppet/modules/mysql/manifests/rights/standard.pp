# Define mysql::rights::standard
#
# * Creates a mysql user with standard required rights for normal use on given database
define mysql::rights::standard (
  $database="",
  $user,
  $host="localhost",
  $ensure="present",
  $privileges = [ "select_priv", "insert_priv", "update_priv", "delete_priv", "create_priv", "alter_priv", "index_priv", "drop_priv", "create_tmp_table_priv", "lock_tables_priv", "show_view_priv", "create_routine_priv", "alter_routine_priv", "execute_priv", "create_view_priv", "trigger_priv" ] ) {
  mysql::rights { $name:
    database  => $database,
    user      => $user,
    host      => $host,
    privs     => $privileges
  }
}
