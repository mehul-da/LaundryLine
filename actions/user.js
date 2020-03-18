import Firebase, {db} from '../config/FireBase.js'
import { Alert } from 'react-native';

// types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_CODE = 'UPDATE_CODE'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

// actions

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const updateCode = code => {
    return {
        type: UPDATE_CODE,
        payload: code
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(getUser(response.user.uid))
        } catch (e) {
            Alert.alert("Error!", "Please make sure your email/password combination is valid.")
        }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password, code } = getState().user
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)

            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                    code: code
                }
                
                const stateOfWashersDryers = {
                    w1: false,
                    w2: false,
                    w3: false,
                    w4: false,
                    d1: false,
                    d2: false,
                    d3: false,
                    d4: false
                }

                db.collection('users')
                    .doc(response.user.uid)
                    .set(user)
                
                const codesRef = db.collection('codes').doc(String(code))

                codesRef.get()
                    .then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        codesRef.set(stateOfWashersDryers)
                    }
                });

                dispatch({ type: SIGNUP, payload: user })
            }
        } catch (e) {
            console.log(e);
            Alert.alert("Error!", "Please make sure:\n1. An account with this email hasn't already been authenticated\n2. All fields are filled in\n3. Your email is valid\n4. Your password is at least 6 characters long\n")
        }
    }
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db
                .collection('users')
                .doc(uid)
                .get()

            dispatch({ type: LOGIN, payload: user.data() })
        } catch (e) {
            alert(e)
        }
    }
}
