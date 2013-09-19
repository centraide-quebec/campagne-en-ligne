define mysql::rights (
  $database = "",
  $user,
  $host = 'localhost',
  $privs
  ) {
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
