pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        // Checkout the code from Git repository
        git branch: 'main', credentialsId: 'd92dc6d4-42dd-4e27-935f-07f81bb002a5', url: 'git@github.com:FSocietyLK/Task-Manager.git'
        
        // Build the frontend code
        bat 'cd client && npm install && npm run build'

        // Build the backend code
        bat 'cd server && npm install && npm run build'
      }
    }
    
    stage('Test') {
      steps {
        // Run automated tests for client
        bat 'cd client && npm run test'

        // Run automated tests for server
        bat 'cd server && npm run test'
      }
    }
    
    stage('Deploy') {
      steps {
        // Build the Docker image for both client and server
        bat "docker-compose build"
        
        // Deploy the Docker containers for staging
        bat "docker-compose up -d"
      }
    }
  }

  post {
      always {
          emailext to: "yasey.omal@gmail.com",
          subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
          body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}<br>More Info can be found here: ${env.BUILD_URL}",
          attachLog: true
      }
  }
}
