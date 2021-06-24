Page({
  onLoad() {
    this.testPromise()
  },
  test() {
    console.log(11);
    this.testPromise();
    console.log(2);
  },
  testPromise() {
    return new Promise((resolve)=> {
      console.log(3);
      resolve()
    })
  }
});
