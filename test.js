function wait(str) {

  if (text(str).waitfor()) {
    sleep(1000)
    text(str).click()
  }

}