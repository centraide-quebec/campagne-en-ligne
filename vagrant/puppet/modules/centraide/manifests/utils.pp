
class centraide::utils {
    package { "vim": }
    package { "git": }


	exec {'settimezone': 
		command => "/bin/echo \"America/Montreal\" > /etc/timezone && /usr/sbin/dpkg-reconfigure -f noninteractive tzdata",
	}

}
