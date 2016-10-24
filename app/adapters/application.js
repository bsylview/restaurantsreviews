import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  shouldReloadAll(store, snapshotsArray) {
   return false;
 },

 shouldBackgroundReloadAll(store, snapshotsArray) {
   return true;
 }
});
