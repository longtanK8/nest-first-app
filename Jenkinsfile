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
                sh 'npm run build'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js'
            }
        }
    }
}
