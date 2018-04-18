import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const USERS_COLLECTION = 'users';
const FOLDERS_COLLECTION = 'folders';

exports.onUserCreated = functions.auth.user().onCreate(event => {
  // Grab user ID
  const userUID = event.uid;

  // Add user root folder to FireStore
  admin.firestore().doc(`${FOLDERS_COLLECTION}/${userUID}`).set({displayName: 'Root'}, {merge: true})
    .then(() => {
      console.log(`Created a root folder! ;-)`);
    });
});

exports.onUserDeleted = functions.auth.user().onDelete(event => {
  // Grab user ID
  const userUID = event.uid;
  const displayName = event.displayName;

  // Check for user folders
  const folderRef = admin.firestore().doc(`${FOLDERS_COLLECTION}/${userUID}`);
  console.log('Checking folder...');
  folderRef.get()
    .then(doc => {
      if (doc.exists) {
        folderRef.delete()
          .then(() => {
            console.log('Deleted User Folder');
          });
      } else {
        console.log(`${displayName} had no folder... :(`);
      }
    });

  // Delete User document from FireStore
  admin.firestore().doc(`${USERS_COLLECTION}/${userUID}`).delete()
    .then(() => {
      console.log(`${displayName} deleted!`);
    });
});
