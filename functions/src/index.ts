import * as functions from 'firebase-functions';

exports.uploadedFileToStorage = functions.storage.object().onFinalize(event => {
  console.log('New file uploaded!');
});
