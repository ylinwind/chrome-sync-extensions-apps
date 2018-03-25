var token = ''
chrome.app.runtime.onLaunched.addListener(function(launchData) {

  // Center window on screen.
  var screenWidth = screen.availWidth
  var screenHeight = screen.availHeight
  var width = 830
  var height = 620
  console.log('token',token);
  console.log('ininde',launchData);
  console.log(token!=launchData.url,'token!=launchData.url')
  //判断token  记录上次的token
  if(token!=''&&token!=launchData.url){
    console.log('ininin')
    var notification2 = new Notification('提示',{icon:"./Icon.png",body:"请先关闭现有的手写面板!"});
  }
  // var notification2 = new Notification('提示',{icon:"./Icon.png",body:"请先关闭现有的手写面板!"});
  //关闭后还原token
  else{
    chrome.app.window.create('popup.html', {
      id: "syncMainWindow",
      innerBounds: {
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
        left: Math.round((screenWidth-width)/2),
        top: Math.round((screenHeight-height)/2)
      },
      outerBounds: {
      },
      resizable:false,
      alwaysOnTop:false,
      // alwaysOnTop:true,
      frame:"none"
    },function(createdWindow){
      //console.log(AppWindow)
      console.log(createdWindow)
      createdWindow.url = launchData.url;
      createdWindow.referrerUrl = launchData.referrerUrl;
      console.log(createdWindow)
      //popup.url = launchData.url;
    });
  }
  

  token = launchData.url;
})


chrome.runtime.onSuspend.addListener(function() {
  // 做一些简单的清理任务。
  console.log("app suspend~");
});

console.log(chrome.runtime,chrome.runtime.onMessageExternal,'---=p-=')
// chrome.runtime.onMessageExternal.addListener(
//   function(request, sender, sendResponse) {
//     console.log(request, sender, sendResponse,'request, sender, sendResponse')
//     // if (sender.url == blacklistedWebsite)
//     //   return;  // don't allow this web page access
//     // if (request.openUrlInEditor)
//     //   openUrl(request.openUrlInEditor);
//   });
  chrome.runtime.onMessageExternal.addListener( 
    function(request, sender, sendResponse) { 
      if (request) { 
        if (request.message) { 
          if (request.message == "version") { 
            sendResponse({version: 1.0}); 
          } 
        } 
      } 
    return true; 
  }); 



