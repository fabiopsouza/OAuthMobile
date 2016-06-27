function getFirebaseErrorMessage(errorCode) {
  switch (errorCode) {

    //Email
    case 'auth/email-already-in-use':
      errorMessage = 'E-mail já está em uso';
      break;
    case 'auth/invalid-email':
      errorMessage = 'E-mail inválido';
      break;

      //User
    case 'auth/user-disabled':
      errorMessage = 'Usuário desabilitado';
      break;
    case 'auth/user-not-found':
      errorMessage = 'E-mail não encontrado';
      break;

      //Password
    case 'auth/wrong-password':
      errorMessage = 'Senha incorreta';
      break;
    case 'auth/weak-password':
      errorMessage = 'A senha deve ter ao menos 6 caracteres';
      break;
    case 'auth/expired-action-code':
      errorMessage = 'Alteração da senha expirou';
      break;

      //Operation
    case 'auth/operation-not-allowed':
      errorMessage = 'Operação não permitida';
      break;
    case 'auth/operation-not-supported-in-this-environment':
      errorMessage = 'Dispositivo não suportado';
      break;

      //Others
    case 'auth/too-many-requests':
      errorMessage = 'Dispositivo bloqueado por motivos de segurança! Tente novamente mais tarde';
      break;
    case 'auth/account-exists-with-different-credential':
      errorMessage = 'Email já cadastrado';
      break;

    default:
      errorMessage = 'Houve um erro inesperado';
  }

  return errorMessage;
}
