pipeline {
  agent {
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('build') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'npm ci'
        sh 'npm run cy:verify'
      }
    }
  
    stage('start local server') {
      steps {
        sh 'nohup npm run start:ci &'
      }
    }
    stage('cypress parallel tests') {
      environment {
        CYPRESS_RECORD_KEY = credentials('Challenge_RA-record-key')
        CYPRESS_trashAssetsBeforeRuns = 'false'
      }
    }
     parallel {
          stage('tester A') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npm run e2e:record:parallel"
          }
          }
     
        stage('tester B') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npm run e2e:record:parallel"
          }
        }
     }
  post {
      always {
      echo 'Stopping local server'
      sh 'pkill -f http-server'
    }
  }
}        
}
}
