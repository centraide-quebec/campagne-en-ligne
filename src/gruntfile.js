module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      front: {
          src: [
            'public/assets/js/*.js',
          ],
          dest: 'public/assets/js/build/front.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      front: {
        src: '<%= concat.front.dest %>',
        dest: 'public/assets/js/build/front.min.js'
      }
    }


  });
 
 
  // loading the required tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
  grunt.registerTask('default', ['concat', 'uglify']);
};
