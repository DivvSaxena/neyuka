/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

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
  const provider = new GoogleAuthProvider()

/* === UI === */

/* === UI - Elements === */

const viewLoggedOut = document.getElementById('logged-out-view')
const viewLoggedIn = document.getElementById('logged-in-view')

const signInWithGoogleBtnEl = document.getElementById('sign-in-with-google')

const emailInputEl = document.getElementById('email-input')
const passwordInputEl = document.getElementById('password-input')

const signInButtonEl = document.getElementById('sign-in-btn')
const createAccountButtonEl = document.getElementById('create-account-btn')

const signOutButtonEl = document.getElementById('sign-out-btn')

const newsEl = document.getElementById('news')
const newsColumnEl = document.getElementById('news-column')

/* === Event Listeners === */

signInButtonEl.addEventListener('click', authSignInWithEmail)
createAccountButtonEl.addEventListener('click', authCreateAccountWithEmail)

signOutButtonEl.addEventListener('click',showLoggedOutView)
signInWithGoogleBtnEl.addEventListener('click', authSignUpWithGoogle)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e653f9e6aac144d1907847d62e5fe6df')
    .then(res => res.json())
    .then(data => {
        // console.log(data.articles[0].title)
        for(let i =0; i<10;i++){
            newsColumnEl.innerHTML += `
                                       <div class="articles-news"> 
                                            <p>${data.articles[i].title}</p>
                                            <hr/>
                                       </div>
                                    `
        }
    })
    } else {
      showLoggedOutView()
    }
  });


/* === Functions - UI Functions === */

function authSignUpWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log('Sign in With Google')
  }).catch((error) => {
     alert(error.message)
  })
}

function authSignInWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        alert(error.message)
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
        alert(error.message)
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

async function addNews(){
    fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e653f9e6aac144d1907847d62e5fe6df')
    .then(res => res.json())
    .then(data => {
        // console.log(data.articles[0].title)
        for(let i =0; i<10;i++){
            newsColumnEl.innerHTML += `
                                       <div class="articles-news"> 
                                            <p>${data.articles[i].title}</p>
                                            <hr/>
                                       </div>
                                    `
        }
    })
}

