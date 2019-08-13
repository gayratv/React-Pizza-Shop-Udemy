import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // cloud DB
import firebaseui from "firebaseui";

const firebaseConfig = {
    apiKey: "AIzaSyCV0n7Wj6LxCbi500G_1ohF3A5ws3JmYcs",
    authDomain: "react-pizza-shop-udemy.firebaseapp.com",
    databaseURL: "https://react-pizza-shop-udemy.firebaseio.com",
    projectId: "react-pizza-shop-udemy",
    storageBucket: "",
    messagingSenderId: "588701957763",
    appId: "1:588701957763:web:92a6effdf7ef7d9d"
};


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );
        return await newUser.user.updateProfile({
            displayName: name
        });
    }

    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }

    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }
}

const firebase = new Firebase();
export default firebase;