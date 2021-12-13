setScreenMetrics(1080, 2400);
// 请求无障碍
auto.waitFor();


// 定时脚本 6:20执行
toast('开始了')
var timeCurrent = 0;
var times = [
  [6, 20],
  [7, 20],
  [8, 20],
]
timing();


function timing() {
  if (timeCurrent > 2) {
    toast('今日任务已完成，3次');
    delay(random(2, 4));
    exit()
  }
  let [h, m] = times[timeCurrent]
  while (true) {
    var myDate = new Date();
    // console.log(myDate.getHours(), myDate.getMinutes());
    if (myDate.getHours() >= h && myDate.getMinutes() >= m) {
      // 判断屏幕是否亮着
      if (!device.isScreenOn()) {
        device.wakeUpIfNeeded()
        gestures([350, [300, 1400], [300, 400]])
        desc('1').click()
        delay(random(0.1, 0.3));
        desc('5').click()
        delay(random(0.1, 0.3));
        desc('2').click()
        delay(random(0.1, 0.3));
        desc('0').click()
        delay(random(0.1, 0.3));
      }
      timeCurrent++;
      init();
      main();
      break;
    }
    // sleep(60000);
    sleep(1000);
  }
}

function init() {
  
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

  sleep(2500)
  energyHarvester()
}


function energyHarvester() {
  var image, point, errorCount = 0;
  while (true) {
    image = images.captureScreen();
    point = findColor(image, '#FFCCF306', {
      region: [91, 453, 800, 500],
      threshold: 4,
    })
    errorCount++
    if (point) {
      // console.log("找到能量，坐标为(" + point.x + ", " + point.y + ")");
      click(point.x, point.y);
    }

    if (textStartsWith('返回蚂蚁森林').exists()) {
      delay(random(1, 3))
      toast('收完了');
      delay(random(1, 3))
      back()
      delay(random(1, 3))
      back()
      delay(random(1, 3))
      back()
      delay(random(1, 3))
      home()
      timing()
      // exit()
    }

    if(text('沙柳皮肤').exists()) {
      toast('沙柳和能量无法识别，下一个')
      delay(0.2)
      click(537, 1990)
      findEnergy()
      break;
    }

    // 每个人的主页暂时定义是40次
    if (errorCount > 40) {
      // toast('点击超过40次了，该去下一个人了');
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
      // 随机停顿
      delay(random(0.1, 0.3));
      energyHarvester()
      break
    }
    
  }
}


function delay(seconds) {
  sleep(1000 * seconds);
}