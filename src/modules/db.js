import idb from "idb";
import { shortFormatDate } from "./formatter";

const EMPTY_RECORD = {
  morning: [],
  noon: [],
  evening: [],
  snack: [],
  notes: "",
  date: null
};

const dbPromise = idb.open("keyval-store", 1, upgradeDB => {
  const store = upgradeDB.createObjectStore("keyval");
  store.put({ ...EMPTY_RECORD, date: shortFormatDate() }, shortFormatDate());
});

const db = {
  get(key) {
    return dbPromise.then(db => {
      if (Array.isArray(key)) {
        const transaction = db.transaction("keyval");
        return Promise.all(key.map(i => transaction.objectStore("keyval").get(i)));
      } else {
        return db
          .transaction("keyval")
          .objectStore("keyval")
          .get(key);
      }
    });
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction("keyval", "readwrite");
      tx.objectStore("keyval").put(val, key);
      return tx.complete;
    });
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction("keyval", "readwrite");
      tx.objectStore("keyval").delete(key);
      return tx.complete;
    });
  }
};

export default db;
export { EMPTY_RECORD };
