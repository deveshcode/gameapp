import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  checkUserName(username) {
    return this.db.doc(`usernames/${username}`).valueChanges();
  }

  createUserName(username) {
    return this.db.doc(`usernames/${username}`).set({ username: username });
  }

  createUser(email, username) {
    return this.db
      .collection(`users`)
      .add({ email: email, username: username });
  }

  createUserFromCredentials(credentials) {
    const user = {};
    if (credentials.user.displayName) {
      user["name"] = credentials.user.displayName;
    }
    if (credentials.user.email) {
      user["email"] = credentials.user.email;
    }
    if (credentials.user.photoURL) {
      user["profilePic"] = credentials.user.photoURL;
    }
    if ("username" in credentials) {
      user["username"] = credentials.username;
    }

    const userID = credentials.user.uid;
    user["userID"] = userID;

    return this.db.doc(`users/${userID}`).set(user);
  }

  getUser(userID) {
    return this.db.doc(`users/${userID}`).valueChanges();
  }
}
