function wait(str) {

  if (text(str).waitfor()) {
    sleep(2000)
    text(str).click()
  }
  console.log(123);

}