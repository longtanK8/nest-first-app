module.exports = {
	apps : [{
		name: "my-nest-app",
		script: "./dist/main.js",
		instances: "4",
		exec_mode: "cluster",
		env_production: {
			NODE_ENV: "production",
		}
	}],
};
