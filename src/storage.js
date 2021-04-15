
class Store {
    static storeInfo(obj) {
      localStorage.setItem('myObjStorage', JSON.stringify(obj));
    }
 /* 
    static removeInfo(bookName) {
      myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
  
      myLibraryArr.forEach((book, index) => {
        if (book.title === bookName) {
          myLibraryArr.splice(index, 1);
        }
      });
  
      localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
    }
    */
  }

  export default Store;
