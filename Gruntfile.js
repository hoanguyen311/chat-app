module.exports = function(grunt) {

	grunt.initConfig({
		jst: {
			templates: {
				files: {
					'public/js/templates.js': ['public/templates/**/*.html']
				},
				options: {
					processName: function(filepath) {
						return filepath.replace('.html', '').replace('public/templates/', '');
					},
					prettify: true
				}
			}
		},
		watch: {
			configs: {
				files: ['Gruntfile.js']
			},
			templates: {
				files: ["public/templates/**/*.html"],
				tasks: ['jst']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['watch']);
};