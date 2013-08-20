Facter.add("mysql_exists") do
	ENV["PATH"]="/bin:/sbin:/usr/bin:/usr/sbin"
	setcode do
		mysqlexists = system "netstat -tlnp | grep 3306 > /dev/null 2>&1"
		($?.exitstatus == 0).to_s
		end
end
