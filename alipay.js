// 请求无障碍
auto.waitFor();

// 请求截图权限
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

// 打开支付宝
var appName = "支付宝";
launchApp(appName);
// 每个手机打开的速度不一样，等待1.5s
sleep(1500);

if (!click('蚂蚁森林')) {
  toast("未检查到蚂蚁森林按钮, 请将蚂蚁森林添加到首页展示");
  exit();
}

// 收能量函数 --- 写上最大时间阻断跳出函数--执行下一步
// 截一张大图，通过大图去找可收的能量的位置，然后去点击

sleep(2000);
// 滑动函数swipe(x1,y1,x2,y2,time)
var h=device.height;               //屏幕高
var w=device.width;                //屏幕宽
var x=(w/3)*2;                     //横坐标2分之3处
var h1=(h/6)*5;                    //纵坐标6分之5处
var h2=(h/6);                      //纵坐标6分之1处

swipe(x, h1, x, h2, 500);          //向下翻页(从纵坐标6分之5处拖到纵坐标6分之1处)
// swipe(x, h2, x, h1, 500);          //向上翻页(从纵坐标6分之1处拖到纵坐标6分之5处)
sleep(2000);
text("周排行榜").click()
// 绿色小手图片
let img = images.read('/sdcard/DCIM/Screenshots/IMG_20211209_151822.jpg');

var p = findImage(captureScreen(),img);
console.log(img);
if (p) {
  toast('找到了' +  p.x + '---' + p.y)
} else {
  toast('未找到')
}

// 截一张大图，通过大图去找小手(有可收取的好友能量)的位置，然后去点击





