pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        // Build the source code
        echo "Fetching source code from github web hook"
        echo "Compiling the code and generating artifacts"
      }
    }
    
    stage('Test') {
      steps {
        // Rn unit tests
        echo "Running unit tests"
      }
    }
    
    stage('Deploy') {
      steps {
        // Deploy for staging
        echo "Deploying the application to testing environment"
      }
    }
  }
}
