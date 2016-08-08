starter.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $location, $ionicHistory) {

  $scope.$on('$ionicView.beforeEnter', function(e) {
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        $scope.user = user;
        $scope.loginData = {};

        if($ionicHistory.currentView().stateId == 'login')
          $location.path("/playlists");
      } else {
        $location.path("/login");
      }

      $scope.$apply();
    });
  });

  //App Data
  $scope.user = {};
  $scope.loginData = {};
  $scope.signUpData = {};

  var modalOptions = {
    scope: $scope,
    focusFirstInput: true,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  };

  // Create the signup modal
  $ionicModal.fromTemplateUrl('templates/signup.html', modalOptions).then(function(modal) {
    $scope.signUpModal = modal;
  });

  // Open the signUp modal
  $scope.signUp = function() {
    $scope.signUpModal.show();
  };

  // Triggered in the signUp modal to close it
  $scope.closeSignUp = function() {
    $scope.signUpModal.hide();
  };

  // Perform the signUp action when the user submits the signUp form
  $scope.doSignUp = function() {
    if ($scope.signUpData == null || $scope.signUpData.email == null ||
      $scope.signUpData.password == null || $scope.signUpData.confirmPassword == null) {
      $scope.showAlert('Falha', 'Formulário incompleto');
      return;
    }

    if ($scope.signUpData.password != $scope.signUpData.confirmPassword) {
      $scope.showAlert('Falha', 'As senhas não conferem');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword($scope.signUpData.email, $scope.signUpData.password)
      .catch(function(error) {
        $scope.showAlert('Falha', getFirebaseErrorMessage(error.code), error.message);
      });

    $scope.signUpData = {};
    $scope.closeSignUp();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    if ($scope.loginData == null || $scope.loginData.email == null || $scope.loginData.password == null) {
      $scope.showAlert('Falha', 'Digite um e-mail e uma senha');
      return;
    }

    firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password)
      .catch(function(error) {
        $scope.showAlert('Falha', getFirebaseErrorMessage(error.code), error.message);
      });
  };

  // Triggered in the  slide menu to signUp account
  $scope.doLogout = function() {
    firebase.auth().signOut().then(function() {}, function(error) {
      console.log(error.message);
    });
  };

  // Perform the facebook login action
  $scope.doFacebookLogin = function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {}).catch(function(error) {
      console.log(error.message);
    });
  };

  // Perform the google login action
  $scope.doGoogleLogin = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider).then(function(result) {}).catch(function(error) {
      console.log(error.message);
    });
  };

  // Perform the twitter login action
  $scope.doTwitterLogin = function() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {}).catch(function(error) {
      $scope.showAlert('Falha', getFirebaseErrorMessage(error.code), error);
    });
  };

  // Perform the github login action
  $scope.doGithubLogin = function() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {}).catch(function(error) {
      $scope.showAlert('Falha', getFirebaseErrorMessage(error.code), error);
    });
  };

  // Generic Alert
  $scope.showAlert = function(title, message, error) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: message
    });

    alertPopup.then(function(res) {
      if (error != undefined)
        console.log(error);
    });
  };

})
