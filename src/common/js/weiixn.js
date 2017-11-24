/**
 * Created by lenovo on 2017/11/22.
 */

export default function weixin() {
  //微信分享
  let wimg = "http://oxrgdeqd8.bkt.clouddn.com/pic_gongyu@3x.png";
  let wurl = 'http://192.168.1.247:8080/#/activity';
  let wdesc = '个人个人';
  let wtit = '个人各人各个';
  let wappid = 'wx52df35a2fb73a179';

  function shareMsg() {//<span style="font-family: Arial, Helvetica, sans-serif;">发送给好友</span><span style="font-family: Arial, Helvetica, sans-serif;">标题和内容默认都显示</span>

    WeixinJSBridge.invoke('sendAppMessage', {
      "appid": wappid,
      "img_url": wimg,
      "img_width": "200",
      "img_height": "200",
      "link": wurl,
      "desc": wdesc,
      "title": wtit,
    })
  }

  function shareQuan() {  //<span style="font-family: Arial, Helvetica, sans-serif;">分享到朋友圈只有标题显示</span>
    WeixinJSBridge.invoke('shareTimeline', {
      "img_url": wimg,
      "img_width": "200",
      "img_height": "200",
      "link": wurl,
      "desc": wdesc,
      "title": wtit
    });
  }

  function shareWeibo() {
    // <span style = "font-family: Arial, Helvetica, sans-serif;" >//</span><span style="font-family: Arial, Helvetica, sans-serif;">分享到微博只有内容显示</span>
    WeixinJSBridge.invoke('shareWeibo', {
      "content": wdesc,
      "url": wurl,
    });
  }

// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
      shareMsg();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      shareQuan();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
      shareWeibo();
    });
  }, false);
}
