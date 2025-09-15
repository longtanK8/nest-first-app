pipeline {
    agent any

    tools {
        nodejs "Node20"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/longtanK8/nest-first-app.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
	    
            steps {
		withEnv(['BUILD_ID=dontKillMe']) {
			script {
				def isRunning = sh(script: "pm2 ls | grep 'my-nest-app' || true", returnStdout: true).trim()
				if(isRunning) {
					echo 'App is running, doing zero-downtime reload...'
					sh 'pm2 reload my-nest-app --update-env'
				} else {
					echo 'App is not running, starting new processes...'
					sh 'pm2 start ecosystem.config.js --env production'
				}
				sh 'pm2 save'
			}
		}
            }
        }
    }
    post {
	always{
		echo 'Success'
	}
	failure {
		echo 'Failed'
	}
    }
}
