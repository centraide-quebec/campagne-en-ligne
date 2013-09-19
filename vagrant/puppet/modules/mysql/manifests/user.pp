# Define mysql::user
#
# * Creates a mysql user
define mysql::user (
  $password,
  $host   ='localhost',
  $ensure ='present'
) {
    mysql_user { "${name}@${host}":
      password_hash => mysql_password($password),
      require       => Package['mysql-server'],
    }
}

