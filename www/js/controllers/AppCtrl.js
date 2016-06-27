starter.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.$on('$ionicView.enter', function(e) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user = user;
        $scope.closeLogin();
        $scope.loginData = {};
      } else {
        $scope.login();
      }
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

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', modalOptions).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Create the signup modal
  $ionicModal.fromTemplateUrl('templates/signup.html', modalOptions).then(function(modal) {
    $scope.signUpModal = modal;
  });

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the signUp modal
  $scope.signUp = function() {
    $scope.signUpModal.show();
  };

  // Triggered in the signUp modal to close it
  $scope.closeSignUp = function() {
    $scope.signUpModal.hide();
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
        console.log(error);
        $scope.showAlert('Falha', getFirebaseErrorMessage(error.code), error.message);
      });

    $scope.signUpData = {};
    $scope.closeLogin();
    $scope.closeSignUp();
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
