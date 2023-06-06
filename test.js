function wait(str) {

  if (text(str).waitfor()) {
    sleep(2000)
    text(str).click()
  }
  // dev
  console.log(1, 'devasd');

}