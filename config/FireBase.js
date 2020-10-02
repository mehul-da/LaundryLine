import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
// import {
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     MESSAGE_SENDER_ID,
//     APP_ID
// } from 'react-native-dotenv'



const firebaseConfig = {
    apiKey: "AIzaSyAJZmWdLHDWkVuw5fxMtvFERLAmQHRFhpw",
    authDomain: "laundryline-b6bf9.firebaseapp.com",
    databaseURL: "https://laundryline-b6bf9.firebaseio.com",
    projectId: "laundryline-b6bf9",
    storageBucket: '',
    messagingSenderId: 106688181769,
    appId: "1:106688181769:web:720d10f577339c6edfaad8"
};

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
export const fb = firebase.database();
export default Firebase;