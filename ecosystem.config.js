module.exports = {
	apps : [{
		name: "my-nest-app",
		script: "./dist/main.js",
		instances: "max",
		exec_mode: "cluster",
		env_production: {
			NODE_ENV: "production",
		}
	]},
}
