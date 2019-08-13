import { useEffect, useState } from "react";

// var firebase = require('firebase');
const firebase = window.firebase;
// var firebaseui = require('firebaseui');
// import {firebaseui} from "firebaseui";

const auth = window.firebase.auth();
// const provider = new window.firebase.auth.GoogleAuthProvider();
const provider = new window.firebase.auth.EmailAuthProvider();


export function useAuthentication() {
  const [authenticated, setAuthenticated] = useState('loading');

  function login(){
    // auth.signInWithPopup(provider);

    firebase.ui.start('#firebaseui-auth-container', {
      signInOptions: [
        provider.PROVIDER_ID
      ],
      // Other config options...
    });

  }

  function logout() {
    auth
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      if(user){
        setAuthenticated(user);
      }else{
        setAuthenticated();
      }
    }, function(error){
      console.log(error);
    });
  }, []);

  return {login, logout, loggedIn: authenticated};
}
