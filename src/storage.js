class Store {
  static storeInfo(obj) {
    localStorage.setItem('myObjStorage', JSON.stringify(obj));
  }
}

export default Store;
