// // Copyright (c) 2014 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.

// /**
//  * Get the current URL.
//  *
//  * @param {function(string)} callback - called when the URL of the current tab
//  *   is found.
//  **/
// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, function(tabs) {
//     // chrome.tabs.query invokes the callback with a list of tabs that match the
//     // query. When the popup is opened, there is certainly a window and at least
//     // one tab, so we can safely assume that |tabs| is a non-empty array.
//     // A window can only have one active tab at a time, so the array consists of
//     // exactly one tab.
//     var tab = tabs[0];

//     // A tab is a plain object that provides information about the tab.
//     // See https://developer.chrome.com/extensions/tabs#type-Tab
//     var url = tab.url;

//     // tab.url is only available if the "activeTab" permission is declared.
//     // If you want to see the URL of other tabs (e.g. after removing active:true
//     // from |queryInfo|), then the "tabs" permission is required to see their
//     // "url" properties.
//     console.assert(typeof url == 'string', 'tab.url should be a string');

//     callback(url);
//   });

//   // Most methods of the Chrome extension APIs are asynchronous. This means that
//   // you CANNOT do something like this:
//   //
//   // var url;
//   // chrome.tabs.query(queryInfo, function(tabs) {
//   //   url = tabs[0].url;
//   // });
//   // alert(url); // Shows "undefined", because chrome.tabs.query is async.
// }

// /**
//  * @param {string} searchTerm - Search term for Google Image search.
//  * @param {function(string,number,number)} callback - Called when an image has
//  *   been found. The callback gets the URL, width and height of the image.
//  * @param {function(string)} errorCallback - Called when the image is not found.
//  *   The callback gets a string that describes the failure reason.
//  */
// function getImageUrl(searchTerm, callback, errorCallback) {
//   // Google image search - 100 searches per day.
//   // https://developers.google.com/image-search/
//   var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//     '?v=1.0&q=' + encodeURIComponent(searchTerm);
//   var x = new XMLHttpRequest();
//   x.open('GET', searchUrl);
//   // The Google image search API responds with JSON, so let Chrome parse it.
//   x.responseType = 'json';
//   x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected respose from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
//   };
//   x.send();
// }

// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }

// document.addEventListener('DOMContentLoaded', function() {
//   getCurrentTabUrl(function(url) {
//     // Put the image URL in Google search.
//     renderStatus('Performing Google Image search for ' + url);

//     getImageUrl(url, function(imageUrl, width, height) {

//       renderStatus('Search term: ' + url + '\n' +
//           'Google image search result: ' + imageUrl);
//       var imageResult = document.getElementById('image-result');
//       // Explicitly set the width/height to minimize the number of reflows. For
//       // a single image, this does not matter, but if you're going to embed
//       // multiple external images in your page, then the absence of width/height
//       // attributes causes the popup to resize multiple times.
//       imageResult.width = width;
//       imageResult.height = height;
//       imageResult.src = imageUrl;
//       imageResult.hidden = false;

//     }, function(errorMessage) {
//       renderStatus('Cannot display image. ' + errorMessage);
//     });
//   });
// });
var nowDomain="";
var url = "";
var currntwindow = this.chrome.app.window.current();
console.log("currntwindow",currntwindow,currntwindow.referrerUrl);
var tempLen = currntwindow.referrerUrl;
nowDomain = getNowDomain(tempLen);
console.log(nowDomain,'nowDomain')
function getNowDomain(tempLen){
  let num = 0,str="";
  for(let i=0,len = tempLen.length;i<len;i++){
    let char = tempLen.charAt(i);
    if(char=='/'){
      num++;
    }
    if(num<=2){
      str+=char;
    }else{
      break;
    }
  }
  return str;
}
// console.log("init popup.html");
var endpoint_id = currntwindow.url.split("/")[currntwindow.url.split("/").length-3];
var signPlaceWidth = currntwindow.url.split("/")[currntwindow.url.split("/").length-2];
var signPlaceHight = currntwindow.url.split("/")[currntwindow.url.split("/").length-1];
// console.log("111222333",endpoint_id,"---- ",signPlaceWidth," ---",signPlaceHight,signPlaceHight.substring(7));

// $("#canvas_hide").attr({"width":signPlaceWidth,"height":signPlaceHight});
// $("#canvas_hide").height=signPlaceHight;
// $("#canvas_hide").width=signPlaceWidth;
// $('<canvas id="canvas_hide"></canvas>').appendTo($("#canvasdiv"))

// console.log($("#canvas_hide"))

      // initialize the element's model
var appObject = {
  ready: function() {
    this.xCoordinate = $("#x");
    this.yCoordinate = $("#y");
    this.pressure = $("#pressure");
    this.xCoordinate = 'N/A'
    this.yCoordinate = 'N/A'
    this.pressure = 'N/A'
    console.log($("#canvas1"))
    this.canvas = $("#canvas1")[0];
    this.canvas_hide = $("#canvas_hide")[0];
    this.canvas_last = $("#canvas_last")[0];
    // this.canvas_hide.width=signPlaceWidth;
    // this.canvas_hide.height=signPlaceHight;
    this.context = this.canvas.getContext('2d')
    this.context_hide = this.canvas_hide.getContext('2d');
    this.pathsArray=[];

    this.x_scale=this.canvas.width / SyncStreamingManager.MAX_X;
    this.y_scale=this.canvas.height / SyncStreamingManager.MAX_Y;

    this.maxPathX=0;
    this.maxPathY=0;
    this.minPathX=this.canvas.height;
    this.minPathY=this.canvas.width;

    this.setupContext()
    this.streamingManager = SyncStreamingManager.getInstance()
    this.streamingManager.addObserver(this)
    this.state = this.streamingManager.getState()
    this.stateString = this.stringForState(this.state)
    this.devices = this.streamingManager.getDevices()
    console.log("this.devices is",this.devices)
  },
  erase: function() {
    console.log(this)
    this.maxPathX=0;
    this.maxPathY=0;
    this.minPathX=this.canvas.height;
    this.minPathY=this.canvas.width;
    this.context.clearRect(0, 0, SyncStreamingManager.MAX_X, SyncStreamingManager.MAX_Y)
    // this.context_hide.clearRect(0, 0, SyncStreamingManager.MAX_X, SyncStreamingManager.MAX_Y)
    this.streamingManager.erase()
  },
  // digitizer: function() {
  //   this.streamingManager.setMode(this.streamingManager.modes.DIGITIZER)
  // },
  capture: function() {
    console.log("set mode to capture")
    this.streamingManager.setMode(this.streamingManager.modes.CAPTURE)
    console.log("set done")
  },
  connect: function() {
    var device = this.devices[0];
    console.log(device);
    if(device==undefined){
      var notification = new Notification('提示',{icon:"./Icon.png",body:"系统无法检测到签字板设备如果需要使用签字板，请尝试重新拔插签字板!"});
      // sendEvent('123','close',null,null);
      setTimeout(function(){
        window.close();   
      },500);
      //  
    }
    else {
      this.streamingManager.connect(device.deviceId);
    }
  },
  disconnect: function() {
    var device = this.device;
    this.streamingManager.disconnect(device.deviceId)
  },
  setupContext: function() {
    this.context.scale(this.canvas.width / SyncStreamingManager.MAX_X, this.canvas.height / SyncStreamingManager.MAX_Y)
    //this.context.rotate(-Math.PI)
    //this.context.rotate(0)
    //this.context.translate(-SyncStreamingManager.MAX_X, 0)
    //this.context.translate(-SyncStreamingManager.MAX_X, 0)
    this.context.fillStyle = '#000000'
    this.context.lineCap = 'round'
    this.context.lineJoin = 'round'

    this.context_hide.scale(this.canvas.width / SyncStreamingManager.MAX_X, this.canvas.height / SyncStreamingManager.MAX_Y)
    this.context_hide.fillStyle = '#000000'
    this.context_hide.lineCap = 'round'
    this.context_hide.lineJoin = 'round'
  },
  stateChanged : function(oldState, newState) {
    this.stateString = this.stringForState(newState)
    this.state = newState
  },
  receivedSyncCaptureReport: function(report) {
    //console.log("receivedSyncCaptureReport",report.getX(),report.getY())
    // this.xCoordinate = report.getX()
    // this.yCoordinate = report.getY()
    // this.pressure = report.getPressure()
  },
  receivedPaths: function(paths) {
    for (var index in paths) {
      var path = paths[index]
      this.context.beginPath()
      this.context.lineWidth = path.getLineWidth()*2
      //console.log(path.getX1(), path.getY1()," to ",path.getX2(), path.getY2())
      this.context.moveTo(path.getX1(), path.getY1())
      this.context.lineTo(path.getX2(), path.getY2())
      // this.context.moveTo(path.getX1(), path.getY1())
      // this.context.lineTo(path.getX2(), path.getY2())
      this.context.stroke()
      // console.log(path.getX1(),path.getY1(),path.getX2(), path.getY2())

      this.pathsArray.push({
        "x1":path.getX1(),
        "y1":path.getY1(),
        "x2":path.getX2(),
        "y2":path.getY2(),
        "lineWidth":path.getLineWidth()
      });

      if(path.getX1()*this.x_scale<this.minPathX){
        this.minPathX=path.getX1()*this.x_scale;
      }
      if(path.getX1()*this.x_scale>this.maxPathX){
        this.maxPathX=path.getX1()*this.x_scale;
      }
      if(path.getX2()*this.x_scale<this.minPathX){
        this.minPathX=path.getX2()*this.x_scale;
      }
      if(path.getX2()*this.x_scale>this.maxPathX){
        this.maxPathX=path.getX2()*this.x_scale;
      }

      if(path.getY1()*this.y_scale<this.minPathY){
        this.minPathY=path.getY1()*this.y_scale;
      }
      if(path.getY1()*this.y_scale>this.maxPathY){
        this.maxPathY=path.getY1()*this.y_scale;
      }
      if(path.getY2()*this.y_scale<this.minPathY){
        this.minPathY=path.getY2()*this.y_scale;
      }
      if(path.getY2()*this.y_scale>this.maxPathY){
        this.maxPathY=path.getY2()*this.y_scale;
      }

      // this.context_hide.beginPath()
      // this.context_hide.lineWidth = path.getLineWidth()*2
      // this.context_hide.moveTo(path.getX1(), path.getY1())
      // this.context_hide.lineTo(path.getX2(), path.getY2())
      // this.context_hide.stroke();
    }
  },
  updatedDevices: function() {
    this.devices = this.streamingManager.getDevices()
  },
  stringForState: function(state) {
    var states = this.streamingManager.states
    switch(state) {
      case states.CONNECTED:
        return '已连接'
      case states.DISCONNECTED:
        return '已断开'
      case states.CONNECTING:
        return '连接中'
      case states.DISCONNECTING:
        return '断开中'
    }
    return 'N/A'
  }
}

console.log("appObject",appObject);


$(function(){
   appObject.ready();

   $("#clear").click(function(){
    appObject.erase();
    // sendEvent('123','clear','test',null)
  });

  $("#save").click(function(){
    // console.log(appObject.canvas.toDataURL())
    // console.log(appObject.canvas.toDataURL());
    // console.log(appObject.minPathX,appObject.minPathY,appObject.maxPathX,appObject.maxPathY,signPlaceWidth,signPlaceHight);
    const last_width = (appObject.maxPathX-appObject.minPathX)+5;
    const last_height = (appObject.maxPathY-appObject.minPathY)+5;
    console.log(last_width,'last_width',last_height,'last_height')
    // console.log(appObject.maxPathX-appObject.minPathX,appObject.maxPathY-appObject.minPathY);
    // console.log(signPlaceWidth,signPlaceHight)
    if((appObject.maxPathX-appObject.minPathX>signPlaceWidth)||(appObject.maxPathY-appObject.minPathY>signPlaceHight)){
      var zoomScale_X=Math.ceil((appObject.maxPathX-appObject.minPathX)/signPlaceWidth);
      var zoomScale_Y=Math.ceil((appObject.maxPathY-appObject.minPathY)/signPlaceHight);
       zoomScale_X=((appObject.maxPathX-appObject.minPathX)/signPlaceWidth);
       zoomScale_Y=((appObject.maxPathY-appObject.minPathY)/signPlaceHight);
      var zoomScale;
      if(zoomScale_X<zoomScale_Y){
        zoomScale=zoomScale_Y;
      }
      else zoomScale=zoomScale_X;
      $.each(appObject.pathsArray,function(i,val){
        appObject.context_hide.beginPath();
        appObject.context_hide.lineWidth = val.lineWidth*zoomScale;
        //console.log(path.getX1(), path.getY1()," to ",path.getX2(), path.getY2())
        appObject.context_hide.moveTo(val.x1/zoomScale, val.y1/zoomScale)
        appObject.context_hide.lineTo(val.x2/zoomScale, val.y2/zoomScale)
        // this.context.moveTo(path.getX1(), path.getY1())
        // this.context.lineTo(path.getX2(), path.getY2())
        appObject.context_hide.stroke()
      })
      console.log("send zoom picture")
      // $("#img").append(img,img2);
      // 
      $.post("http://127.0.0.1:8081/setDataInfo",{imgSrc:appObject.canvas.toDataURL()},function(result){
        console.log(result,'get datas');
      });
      // 
      // sendEvent('123','save','save ok',appObject.canvas_hide.toDataURL());
    }
    else{
      console.log("send real picture");
      //canvas clip
      appObject.canvas_last.width = last_width;
      appObject.canvas_last.height = last_height;
      var cxt3=appObject.canvas_last.getContext("2d");
      cxt3.drawImage(appObject.canvas,appObject.minPathX-1,appObject.minPathY-1,last_width,last_height,0,0,last_width,last_height);
      console.log(cxt3,'---=-==-=-')
      // 
      $.ajax({
          url:`${nowDomain}/workflow/request/picAjax.jsp`,
          type:"POST",
          data:{
            // img:appObject.canvas.toDataURL(),
            img:appObject.canvas_last.toDataURL(),
            type:'save',
            // token:'1d67a459-f179-4854-a4ff-6416c44dce88'
            token:signPlaceHight.substring(7)//访问点击路径不得修改 需按照格式来，路径变这里的位置要改变
          },
          success:function(data){
              console.log(data,'get datas');
          }
      });
      appObject.erase()
    // 
      // sendEvent('123','save','save ok',appObject.canvas.toDataURL());
    }
    // sendEvent('123','save','save ok',appObject.canvas_hide.toDataURL());
    // appObject.erase()
    // window.close();
  });

  $("#close").click(function(){
    // sendEvent('123','close',null,null);
    window.close();
    appObject.erase()
  });
   
   setTimeout(function(){
    appObject.updatedDevices();
    // console.log(appObject.devices)
    appObject.connect();
      
    // console.log("SyncStreamingManager.MAX_X",SyncStreamingManager.MAX_X)
    // console.log("SyncStreamingManager.MAX_Y",SyncStreamingManager.MAX_Y)
    // console.log(1)
     setTimeout(function(){
      appObject.capture();
      
    },500);
    
   },1000); 

  //  setInterval(()=>{
  //   appObject.receivedPaths();
  //  },500)
   // appObject.updatedDevices();
   // appObject.connect();

   connect();
   //send
   
})



var stompClient = null;

function setConnected(connected) {
    // document.getElementById('connect').disabled = connected;
    // document.getElementById('disconnect').disabled = !connected;
    // document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    // document.getElementById('response').innerHTML = '';
}

function connect() {
    var socket = new SockJS('http://127.0.0.1:8080/signatureEvent');
    // var socket = new SockJS('http://192.168.8.209/signatureEvent');
    stompClient = Stomp.over(socket);
    console.log(stompClient,'stompClient')
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        // stompClient.subscribe('/event/broadcast', function(greeting){
          stompClient.subscribe('/app/broadcast', function(greeting){
            // console.log(JSON.parse(greeting.body).eventType)
            // console.log(greeting)
            eventHandler(greeting.body);
        });
    });
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function sendEvent(id,eventType,message,imageBase64) {
    //var name = document.getElementById('name').value;
    stompClient.send("/app/broadcastingEvent/"+endpoint_id, {}, JSON.stringify({ 'id':id,'eventType': eventType,'message':message,"imageBase64":imageBase64 }));
}

function eventHandler(event) {
    var event = JSON.parse(event)
    if (event.id == appid)
    {
        showMessage(event.eventType+"    "+event.message)
    }
}

function showMessage(msg)
{
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(msg));
    response.appendChild(p);
}
   
    