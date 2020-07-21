module.exports = function (grunt) {
  grunt.initConfig({
    ts: {
      default: {
        tsconfig: './tsconfig.json'
      }
    },
    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**','!**/*.ts','!**/*.js'],
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'config/',
            src: ['**','!**/*.ts'],
            dest: 'dist/config/'
          }
        ]
      }
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON('tslint.json')
      },
      all: {
        src: ['src/**/*.ts','!node_modules/**/*.ts','!obj/**/*.ts','!typings/**/*.ts']
        // avoid linting typings files and node_modules files
      }
    },
    standard: {
      dist: {
        options: {
          fix: true
        },
        src: ['dist/**/*.js']
      }
    },
    run: {
      options: {
        // Task-specific options go here.
      },
      tests: {
        cmd: 'npm',
        args: ['run','coverage']
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*','!node_modules/**/*.ts'], // the watched files
        tasks: ['newer:tslint:all','ts','copy','standard:dist'], // the task to run
        options: {
          spawn: false // makes the watch task faster
        }
      }
    },
    nodemon: {
      dev: {
        script: 'dist/index.js'
      },
      options: {
        ignore: ['node_modules/**','gruntfile.js'],
        env: {
          PORT: '8080'
        }
      }
    },
    concurrent: {
      watchers: {
        tasks: ['nodemon','watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  })
  grunt.loadNpmTasks('grunt-ts')
  grunt.loadNpmTasks('grunt-tslint')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-newer')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-standard')
  grunt.loadNpmTasks('grunt-run')

  grunt.registerTask('build',['tslint:all','ts','copy'])
  grunt.registerTask('serve',['concurrent:watchers'])
  // grunt.registerTask('default', ['copy'])
}
