init();
main();

function init() {
  setScreenMetrics(1080, 2400);

  // 请求无障碍
  auto.waitFor();
  threads.start(function () {
    let startBtn = textContains('立即开始').findOne(2000);
    sleep(500)
    if (startBtn) {
      startBtn.click()
      threads.currentThread().interrupt();
    }
  })
  // 请求截图权限
  if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
  }
}

function main() {
  launchApp('支付宝');
  // 每个手机打开的速度不一样，等待1.5s
  sleep(1500);

  if (!click('蚂蚁森林', 0)) {
    toast("未检查到蚂蚁森林按钮, 请将蚂蚁森林添加到首页展示");
    exit();
  }

  sleep(1500)
  energyHarvester()
}


function energyHarvester() {
  // toast(('开始了'));
  var image, point, errorCount = 0;
  while (true) {
    image = images.captureScreen();
    point = findColor(image, '#FFCCF306', {
      region: [91, 453, 800, 500],
      threshold: 4,
    })
    errorCount++
    if (point) {
      console.log("找到红色，坐标为(" + point.x + ", " + point.y + ")");
      click(point.x, point.y);
    }
    
    if (text('返回蚂蚁森林 >')) {
      toast('收完了');
      home()
      exit()
    }

    // 每个人的主页暂时定义是30次
    if (errorCount > 30) {
      // toast('点击超过30次了，该去下一个人了');
      findEnergy()
      break;
    }
    
  }
}

function findEnergy() {
  var image, btnPoint;
  
  while(true) {
    image = images.captureScreen();
    // 找能量按钮
    btnPoint = findColor(image, '#F78710', {
      region: [952, 1565, 60, 20],
      threshold: 4
    });
    if (btnPoint) {
      click(btnPoint.x, btnPoint.y);
      energyHarvester()
      break
    }
    // 随机停顿--真人模拟
    // delay(5);
  }
}

//↓↓↓ 下面是一些工具人方法 用来获取控件、点击、延时之类的
function findViewByClassAndId(name, viewId) {
  return className(name).id(viewId).findOne(1000);
}

function findViewByClassAndText(name, s) {
  return className(name).text(s).findOne(1000);
}

function delay(seconds) {
  sleep(1000 * seconds);
}