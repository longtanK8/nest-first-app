pipeline {
    agent any
    environment {
        // Set NVM directory for jenkins user
        NVM_DIR = "/var/lib/jenkins/.nvm"
        // Set the desired Node.js version
        NODE_VERSION = "20.19.5"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/longtanK8/nest-first-app.git'
            }
        }
        stage('Setup Node.js with NVM') {
            steps {
                sh '''
                    # Load nvm and use the correct Node.js version for the whole pipeline
                    export NVM_DIR="${NVM_DIR}"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION}
                    # Verify Node.js version
                    node --version
                    npm --version
                '''
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
                script {
                    def isRunning = sh(script: "pm2 ls | grep my-nest-app || echo 'not running'", returnStdout: true).trim()

                    if (isRunning.contains("online")) {
                        echo "App is running, restarting..."
                        sh 'pm2 restart my-nest-app'
                    } else {
                        echo "App is not running, starting new processes..."
                        // Clean up any old process before starting new one to prevent conflicts
                        sh 'pm2 delete my-nest-app || true'
                        sh 'pm2 start ecosystem.config.js --env production'
                    }

                    sh 'pm2 save'
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully! ✅'
        }
        failure {
            echo 'Deployment failed! ❌'
        }
    }
}
