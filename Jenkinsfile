pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
    
    stages {
        
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
                sh 'npm install -g gh-pages'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                
                // Deploy the project to GitHub Pages
                withCredentials([usernamePassword(credentialsId: 'portfolio-app-access-token', usernameVariable: 'USERNAME', passwordVariable: 'ACCESS_TOKEN')]) {
                    sh 'git remote set-url origin https://$ACCESS_TOKEN@github.com/paulgan98/my-portfolio.git'
                }
                
                sh 'npm run deploy'
            }
        }
    }
}
