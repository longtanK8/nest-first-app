pipeline {
    agent any

    tools {
        nodejs "Node20"  // From global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/longtanK8/nest-first-app.git', branch: 'main' // Add credentialsId if private
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
                sh 'pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js'
            }
        }
    }
}
