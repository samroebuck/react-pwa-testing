import firebase from "firebase/app";

class FirebaseApp {
  constructor(config = {}) {
    if (!FirebaseApp.defaultApp) {
      FirebaseApp.defaultApp = firebase.initializeApp(firebaseConfig);
    }
  }

  messaging() {
    if (!FirebaseApp.messaging) {
      require("firebase/messaging");
      FirebaseApp.messaging = FirebaseApp.defaultApp.messaging();
    }
    return FirebaseApp.messaging;
  }

  firestore() {
    if (!FirebaseApp.firestore) {
      require("firebase/firestore");
      FirebaseApp.firestore = FirebaseApp.defaultApp.firestore();
      FirebaseApp.firestore.settings({
        timestampsInSnapshots: true
      });
    }
    return FirebaseApp.firestore;
  }
}

FirebaseApp.defaultApp = undefined;
FirebaseApp.messaging = undefined;
FirebaseApp.firestore = undefined;

export default FirebaseApp;
