import {collection, doc, getDocs, serverTimestamp, setDoc} from 'firebase/firestore';
import {db} from '../lib/firebase.config';

export const Firestore = {
  readDocs: (...args) => {
    let docs = [];
    const ref = collection(db, "stocks");
    return new Promise(async resolve => {
      try {
        const snapshots = await getDocs(ref);
        snapshots.forEach(doc => docs.push(doc.data()));
        resolve(docs);
      } catch (e) {
        console.error(e);
        resolve('Error reading docs');
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collectionName] = args;
    return new Promise(async resolve => {
      const randomIndex = Math.floor(Math.random() * 100000000);
      try {
        const docRef = doc(db, collectionName || 'stocks', `${randomIndex}`);
        await setDoc(docRef, {title: inputs.title, path: inputs.path, createdAt: serverTimestamp()});
        resolve('New doc successfully inserted');
      } catch (e) {
        console.error(e);
        resolve('Error inserting new doc');
      }
    })
  }
}
