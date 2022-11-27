import auth from '@react-native-firebase/auth';

interface AuthenticateUser {
  email: string;
  password: string;
}

export const authenticateUser = (payload: AuthenticateUser) => {
  console.log('test', payload);
  auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then((response) => {
      console.log('User account created & signed in!', response);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};
