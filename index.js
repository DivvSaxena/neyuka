/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyA4S_cppIxRLQiF529B7aXmPeZGEKFcmEA",
    authDomain: "playground2-38fa3.firebaseapp.com",
    databaseURL: "https://playground2-38fa3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "playground2-38fa3",
    storageBucket: "playground2-38fa3.appspot.com"
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

/* === UI === */

/* === UI - Elements === */

const viewLoggedOut = document.getElementById('logged-out-view')
const viewLoggedIn = document.getElementById('logged-in-view')

const signInWithGoogleBtnEl = document.getElementById('sign-in-with-google')

const emailInputEl = document.getElementById('email-input')
const passwordInputEl = document.getElementById('password-input')

const signInButtonEl = document.getElementById('sign-in-btn')
const createAccountButtonEl = document.getElementById('create-account-btn')

/* === Event Listeners === */

signInButtonEl.addEventListener('click', authSignInWithEmail)
createAccountButtonEl.addEventListener('click', authCreateAccountWithEmail)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
    } else {
      showLoggedOutView()
    }
  });


/* === Functions - UI Functions === */

showLoggedOutView()

function authSignInWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function authCreateAccountWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        console.log(error.message)
    })
}

function clearAuthFields(){
    emailInputEl.value = ''
    passwordInputEl.value = ''
}

function showLoggedOutView(){
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView(){
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view){
    view.style.display = 'flex'
}

function hideView(view){
    view.style.display = 'none'
}