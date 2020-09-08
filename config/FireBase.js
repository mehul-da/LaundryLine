import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    MESSAGE_SENDER_ID,
    APP_ID
} from 'react-native-dotenv'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: '',
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

let Firebase;
class FirebaseSvc {
    constructor() {
        if (!firebase.apps.length) { //avoid re-initializing
            Firebase = firebase.initializeApp(firebaseConfig);
        }
    }  
  }

export const firebaseSVC = connect(mapStateToProps)(FirebaseSvc);
export const firebaseSvc = new FirebaseSvc();
export const db = firebase.firestore();
export const realtime = firebase.database();
export default Firebase;