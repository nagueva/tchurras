module.exports = function(grunt) {

  grunt.initConfig({
    clean:{
      dist: ["dist/*"],
    },
    copy:{
      dist:{
        files: [{
          expand: true,
          flatten: true,
          cwd: 'app/assets/',
          src: [
            'jquery/dist/jquery.min.js',
            'modernizr/modernizr.js',
            'foundation/js/foundation.min.js'
          ],
          dest: 'dist/assets/',
        }]        
      }
    },
    htmlmin: {
      dist: {
        options:{
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['*.html'],
          dest: 'dist/',
        }]
      }
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'app/styles/',
          src: ['*.scss'],
          dest: 'dist/styles/',
          ext: '.css'
        }]
      }
    },
    uglify:{
      dist:{
        files: [{
          expand: true,
          cwd: 'app/scripts/',
          src: ['**/*.js'],
          dest: 'dist/scripts/'
        },{
          expand: true,
          cwd: 'dist/assets/',
          src: [
            '*.js',
            '!*.min.js'
          ],
          dest: 'dist/assets/'          
        }]
      }
    },
    connect: {
      server: {
        options: {
          base: 'dist',
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['app/*.html'],
        tasks: ['htmlmin']
      },
      styles: {
        files: ['app/styles/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['app/scripts/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  require('time-grunt')(grunt);

  grunt.registerTask('build', ['clean','copy','htmlmin','sass','uglify']);
  grunt.registerTask('default', ['build','connect','watch']);

};