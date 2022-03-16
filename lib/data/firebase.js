const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
// require('firebase/analytics')

// const isClientSide = require('../isClientSide')
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "savez-ssd-bbz.firebaseapp.com",
  databaseURL: "https://savez-ssd-bbz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "savez-ssd-bbz",
  storageBucket: "savez-ssd-bbz.appspot.com",
  messagingSenderId: "370853621900",
  appId: "1:370853621900:web:f883887d68d393f446cba9",
  measurementId: "G-N9QJ1J3QJY"
}

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const firebaseDB = firebaseApp.firestore()
// if (isClientSide()) firebase.analytics()

// Helpers
const docWithId = (doc) => ({ id: doc.id, ...doc.data() })

const getDocumentItem = async (docRef) => docWithId(await docRef.get())

const getCollectionItems = async (collectionRef) => {
  const collectionSnapshots = await collectionRef.get()
  const snapshots = []
  collectionSnapshots.forEach((snapshot) => {
    snapshots.push(docWithId(snapshot))
  })
  return snapshots
}

// To avoid “cannot be serialized as JSON” error
const convertDates = (doc) => ({
  ...doc,
  dateCreated: doc.dateCreated ? doc.dateCreated.toDate().toString() : null,
  dateUpdated: doc.dateUpdated ? doc.dateUpdated.toDate().toString() : null
})

module.exports = {
  firebase,
  firebaseApp,
  firebaseDB,

  docWithId,
  getDocumentItem,
  getCollectionItems,

  convertDates
}
