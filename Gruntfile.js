module.exports = function (grunt) {

  grunt.initConfig({
    pages: {
      posts: {
        src: 'posts',
        dest: 'dist',
        layout: 'src/layouts/post.ejs',
        url: 'posts/:title/',
        options: {
          pageSrc: 'src/pages',
          data: {
            baseUrl: '/'
          },
          pagination: {
            postsPerPage: 20,
            listPage: 'src/pages/index.ejs'
          }
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/styles',
          cssDir: 'dist/styles'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          dest: 'dist',
          src: [
            'images/**',
            'scripts/**',
            'styles/**.css',
            'styles/fonts/**'
          ]
        }]
      },
      misc: {
      	files: [{
      	  expand: true,
          cwd: 'misc',
          dest: 'dist',
          src: [
            '**'
          ]
      	}]
      }
    },
    watch: {
      pages: {
        files: [
          'posts/**',
          'src/layouts/**',
          'src/pages/**'
        ],
        tasks: ['pages']
      },
      compass: {
        files: ['src/styles/**'],
        tasks: ['compass']
      },
      copy: {
        files: [
          'src/images/**',
          'src/scripts/**',
          'src/styles/**.css',
          'src/styles/fonts/**'
        ],
        tasks: ['copy']
      },
      dist: {
        files: ['dist/**'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      dist: {
        options: {
          port: 5455,
          hostname: '0.0.0.0',
          base: 'dist',
          livereload: true
        }
      }
    },
    open: {
      dist: {
        path: 'http://localhost:5455'
      }
    },
    clean: {
      dist: 'dist'
    },
    'gh-pages': {
      options: {
        base: 'dist',
		branch: 'master'
      },
      src: ['**']
    }
  });

  grunt.registerTask('build', [
    'clean',
    'pages',
    'compass',
    'copy:dist'
  ]);

  grunt.registerTask('deploy', ['build', 'copy:misc', 'gh-pages']);

  grunt.registerTask('server', [
    'build',
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', 'server');

  require('load-grunt-tasks')(grunt);
};
