auto.waitFor()

threads.start(function () {
  let startBtn = textContains('立即开始').findOne(2000);
  sleep(600)
  if (startBtn) {
    startBtn.click()
  }
})
//请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败，请检查后再试");
  exit();
}

launchApp("QQ");