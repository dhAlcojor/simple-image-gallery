import {collection, doc, getDocs, serverTimestamp, setDoc} from 'firebase/firestore';
import {db} from '../lib/firebase.config';

export const Firestore = {
  readDocs: (...args) => {
    let docs = [];
    const ref = collection(db, "stocks");
    return new Promise(async resolve => {
      try {
        const snapshots = await getDocs(ref);
        snapshots.forEach(doc => docs.push({...doc.data(), id: doc.id}));
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
        const newDoc = {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp(),
          user: inputs.user
        };
        await setDoc(docRef, newDoc);
        resolve('New doc created');
      } catch (e) {
        console.error(e);
        resolve('Error inserting new doc');
      }
    })
  }
}
