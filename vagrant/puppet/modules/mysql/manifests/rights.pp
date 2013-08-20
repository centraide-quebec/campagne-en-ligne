define mysql::rights (
  $database = "",
  $user,
  $host = 'localhost',
  $privs
  ) {
  if $mysql_exists == 'true' {
    if $database != "" {
      mysql_grant { "${user}@${host}/${database}":
        privileges => $privileges,
      }
    } else {
      mysql_grant { "${user}@${host}":
        privileges => $privs,
      }
    }
  }
}
