function wait(str) {

  if (text(str).waitfor()) {
    sleep(2000)
    text(str).click()
  }
  // 主分支
  console.log(1);
  console.log(2);
  console.log(3);
  console.log(4);

}