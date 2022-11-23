import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



const _signIn = async () => {
    try {
    GoogleSignin.configure({
        webClientId: '694605010149-61g9h8frua88elncb0bo0ilpf63npc5k.apps.googleusercontent.com',
        androidClientId: '694605010149-61g9h8frua88elncb0bo0ilpf63npc5k.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      console.log('Here');
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

    //   this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
};

const getCurrentUserInfo = async () => {
    try {
      GoogleSignin.configure({
        webClientId: '694605010149-61g9h8frua88elncb0bo0ilpf63npc5k.apps.googleusercontent.com',
      });
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log('ERROR');
      } else {
        // some other error
        console.log('ERROR');
      }
    }
};

const signOut = async () => {
    try {
      GoogleSignin.configure({
        webClientId: '694605010149-61g9h8frua88elncb0bo0ilpf63npc5k.apps.googleusercontent.com',
      });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
};

export {_signIn, getCurrentUserInfo, signOut};