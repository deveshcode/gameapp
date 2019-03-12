import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from "rxjs/operators";
import AuthProvider = firebase.auth.AuthProvider;
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  loginWithEmailAndPassword(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  $isLoggedIn() {
    return this.afAuth.authState;
  }

  registerWithEmailAndPassword(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  signInWithProvider(type: string): Promise<any> {
    switch (type) {
      case "facebook":
        return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
      case "google":
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }
  }

  private oauthSignIn(provider: AuthProvider): Promise<any> {
    if (!(<any>window).cordova) {
      console.log("Popup");
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      console.log("Redirected");
      return this.afAuth.auth.signInWithRedirect(provider).then(() => {
        return this.afAuth.auth.getRedirectResult();
      });
    }
  }

  async signInWithGoogle(user) {
    return await this.afAuth.auth.signInAndRetrieveDataWithCredential(
      firebase.auth.GoogleAuthProvider.credential(user.idToken)
    );
  }

  async signInWithFacebook(credential) {
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
      credential
    );

    return await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(facebookCredential);
  }
}
