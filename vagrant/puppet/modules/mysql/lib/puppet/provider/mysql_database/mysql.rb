require 'puppet/provider/package'

Puppet::Type.type(:mysql_database).provide(:mysql,
		:parent => Puppet::Provider::Package) do

	desc "Use mysql as database."
	commands :mysqladmin => '/usr/bin/mysqladmin'
	commands :mysql => '/usr/bin/mysql'

  if File.exist?('/etc/mysql/debian.cnf')
      $configfile = "--defaults-file=/etc/mysql/debian.cnf"
  elsif File.exist?('/root/.my.cnf')
      $configfile = "--defaults-file=/root/.my.cnf"
  else
      $configfile = "--no-defaults"
  end

	# retrieve the current set of mysql users
	def self.instances
		dbs = []

		cmd = "#{command(:mysql)} $configfile mysql -NBe 'show databases'"
		execpipe(cmd) do |process|
			process.each do |line|
				dbs << new( { :ensure => :present, :name => line.chomp } )
			end
		end
		return dbs
	end

	def query
		result = {
			:name => @resource[:name],
			:ensure => :absent
		}

		cmd = "#{command(:mysql)} $configfile mysql -NBe 'show databases'"
		execpipe(cmd) do |process|
			process.each do |line|
				if line.chomp.eql?(@resource[:name])
					result[:ensure] = :present
				end
			end
		end
		result
	end

	def create
		mysqladmin $configfile, "create", @resource[:name]
	end
	def destroy
		mysqladmin $configfile, "-f", "drop", @resource[:name]
	end

	def exists?
    #Don't know why but $configfile is evaluated to false in the function call below.
    #Thus we bypass that by making it local
    if File.exist?('/etc/mysql/debian.cnf')
        configfile = "--defaults-file=/etc/mysql/debian.cnf"
    elsif File.exist?('/root/.my.cnf')
        configfile = "--defaults-file=/root/.my.cnf"
    else
        configfile = "--no-defaults"
    end
		if mysql(configfile, "mysql", "-NBe", "show databases").match(/^#{@resource[:name]}$/)
			true
		else
			false
		end
	end
end

