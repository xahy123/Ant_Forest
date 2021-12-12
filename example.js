// https://blog.csdn.net/weixin_44337681/article/details/116568032

main();

function main() {
  console.log("等待获取无障碍权限");
  auto.waitFor();
  console.log("申请截屏权限");
  requestScreenCapturePermision();

  console.log("打开支付宝");
  launchApp("支付宝");
  var search;
  while (!(search = findViewByClassAndText("Button", "搜索")));

  console.log("打开蚂蚁森林");
  randomDelayClick(1, 2, search);
  while (!(search = findViewByClassAndText("TextView", "搜索")));
  delay(random(1, 2));
  search.parent().parent().child(1).child(2).setText("蚂蚁森林");
  delay(random(1, 2));
  randomClickBounds(search);
  delay(random(1, 2));
  click("蚂蚁森林，为你在荒漠种下一棵真树");

  console.log("能量收割机");
  while (!(findViewByClassAndText("Button", "我的大树养成记录")));
  delay(random(1, 2));
  energyHarvester();
}

/**
 * 申请截屏权限 个别系统需要每次都申请截图权限 子线程自动允许
 */
function requestScreenCapturePermision() {
  threads.start(function () {
    for (let i = 0; i < 100; i++) {
      if (textExists("立即开始")) {
        click("立即开始");
        threads.currentThread().interrupt();
      }
    }
  });
  if (!requestScreenCapture()) {
    toast("请允许截图权限后重试");
    exit();
  }
  captureScreen();
}

/**
 * 循环获取能量 随机延迟半秒到一秒是为了看起来更像人。。。
 * 也许大家会有 为什么没有点击找能量代码的疑惑
 * 是因为经过我的测试 #ffc2ff01 这个颜色 不仅在能量球上面有 而且找能量按钮也有这个颜色！
 * 于是我只需要用一个找色循环就可以实现收取能量球与进入下一页面两个操作 是不是很牛呢？ 嘻嘻嘻
 */
function energyHarvester() {
  var image, point, errorCount;
  while (true) {
    delay(random(0.5, 1));
    if (!findViewByClassAndText("Button", "返回我的森林")) {
      //截图
      image = captureScreen();
      //获取能量球颜色坐标
      point = findColor(image, "#ffc2ff01", { threshold: 4 });
      if (point) {
        //获取成功则收取能量
        errorCount = 0;
        click(point.x, point.y);
        console.log("收集能量 : " + point);
        continue;
      }
    } else {
      console.info("能量收集完毕,返回首页");
      click("返回我的森林");
      break;
    }
  }
  console.log("退出支付宝");
  for (let i = 0; i < 3; i++) {
    delay(0.5);
    back();
  }
}

//↓↓↓ 下面是一些工具人方法 用来获取控件、点击、延时之类的
function findViewByClassAndId(name, viewId) {
  return className(name).id(viewId).findOne(1000);
}

function findViewByClassAndText(name, s) {
  return className(name).text(s).findOne(1000);
}

function randomDelayClick(t1, t2, view) {
  delay(random(t1, t2));
  randomClickBounds(view);
}

function randomClickBounds(view) {
  if (view) {
    bounds = view.bounds();
    return click(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom));
  }
  console.log("randomClickBounds view == null");
  return false;
}

function delay(seconds) {
  sleep(1000 * seconds);
}

function delayBack(seconds) {
  delay(seconds);
  back();
}

function textExists(str) {
  return textContains(str).exists();
}
