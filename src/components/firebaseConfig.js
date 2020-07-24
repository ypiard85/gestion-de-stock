import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAVFBYPQQUCnDG4oHk7dkU7wi93WLqB1Tk",
    authDomain: "solstockage.firebaseapp.com",
    databaseURL: "https://solstockage.firebaseio.com",
    projectId: "solstockage",
    storageBucket: "solstockage.appspot.com",
    messagingSenderId: "557530671157",
    appId: "1:557530671157:web:a41e572ec27d8dfb70697c",
    measurementId: "G-BHCSDM88RT"
}


const firebaseAp = firebase.initializeApp(config)
export default firebaseAp.firestore()


