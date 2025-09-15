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
		echo 'Deploying with PM2..'
                sh 'pm2 reload all --update-env'
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
