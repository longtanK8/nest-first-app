pipeline {
    agent any
    environment {
        // Set NVM directory for jenkins user
        NVM_DIR = "/var/lib/jenkins/.nvm"
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
                    # Load nvm
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    # Use the correct Node.js version
                    nvm use 20.19.5
                    # Verify Node.js version
                    node --version
                    npm --version
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use 20.19.5
                    npm install
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use 20.19.5
                    npm run build
                '''
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh '''
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                        nvm use 20.19.5
                        # Check if app is running
                        pm2 ls | grep my-nest-app || true
                    '''
                    
                    // Check if app is running and decide to start or restart
                    def isRunning = sh(script: '''
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                        nvm use 20.19.5
                        pm2 ls | grep my-nest-app || echo "not running"
                    ''', returnStdout: true).trim()
                    
                    if (isRunning.contains("online")) {
                        echo "App is running, restarting..."
                        sh '''
                            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                            nvm use 20.19.5
                            pm2 restart my-nest-app
                        '''
                    } else {
                        echo "App is not running, starting new processes..."
                        sh '''
                            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                            nvm use 20.19.5
                            pm2 start ecosystem.config.js --env production
                        '''
                    }
                    
                    sh '''
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                        nvm use 20.19.5
                        pm2 save
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
