(this["webpackJsonpvr-tracking-tool"]=this["webpackJsonpvr-tracking-tool"]||[]).push([[0],{20:function(e,t,a){e.exports=a(52)},25:function(e,t,a){},27:function(e,t,a){},3:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),i=a.n(c),s=(a(25),a(17)),o=a(19),l={counter:0,connected:!1,trainSearchQuery:"",trains:{},liveTrains:{},filteredLiveTrains:[],trainSearch:!1,stations:{},stationInfo:{},meta:{version:{majorVersion:0,minorVersion:2,releaseType:"ALPHA"}}},u=function(e,t){var a=Object(o.a)({},e);switch(t.type){case"CONNECTION_SUCCESFULL":return a.connected=!0,a;case"CONNECTION_FAILED":case"DISCONNECTED":return a.connected=!1,a;case"TRAIN_SEARCH_QUERY_UPDATED":return a.trainSearchQuery=t.query,a;case"SET_STATION_INFO":return a.stationInfo=t.data,a;case"CREATE_TRAIN":case"UPDATE_TRAIN":return a.trains[t.trainObject.trainName]=t.trainObject,a;case"TRACKING":return a.trains[t.train].currentStation=t.data.station,a;case"LIVE_TRAINS_UPDATED":return a.liveTrains=t.data,a;case"FILTERED_LIVE_TRAINS_UPDATED":return a.filteredLiveTrains=t.data,a;case"TRAIN_SEARCH_ACTIVE":return a.trainSearch=!0,a;case"TRAIN_SEARCH_ENDED":return a.trainSearch=!1,a;default:throw new Error}},m=Object(n.createContext)(l),d=m.Provider,f=a(1),p=a.n(f),E=(a(27),a(15)),h=a(4),v=a(28).default,T=a(46),N=function e(t){Object(h.a)(this,e),this.scheduledTime=t.scheduledTime,this.differenceInMinutes=t.differenceInMinutes?t.differenceInMinutes:0,this.liveEstimateTime=t.actualTime||t.liveEstimateTime,!this.liveEstimateTime&Object.entries(t).length>0&&(this.liveEstimateTime=new Date(new Date(this.scheduledTime).getTime()+6e4*this.differenceInMinutes)),this.scheduledTime||(this.differenceInMinutes=void 0)},y=function e(t){Object(h.a)(this,e),this.arrival=new N(t.arrival),this.departure=new N(t.departure),this.stationShortCode=t.arrival.stationShortCode||t.departure.stationShortCode,this.commercialStop=t.arrival.commercialStop||t.departure.commercialStop,this.commercialTrack=t.arrival.commercialTrack||t.departure.commercialTrack,this.differenceInMinutes=t.arrival.differenceInMinutes||t.departure.differenceInMinutes},w=function(){function e(t){Object(h.a)(this,e),this.trainNumber=t.trainNumber,this.trainType=t.trainType,this.trainName="".concat(this.trainType).concat(this.trainNumber),this.runningCurrently=t.runningCurrently,this.timeTableRows=this.getTimeTableRowObjects(t.timeTableRows),this.fromStation=this.timeTableRows[0],this.toStation=this.timeTableRows[this.timeTableRows.length-1],this.elementStatus=t.elementStatus,this.currentStation=t.currentStation}return Object(E.a)(e,[{key:"getTimeTableRowObjects",value:function(e){return e.reduce((function(e,t,a,n){return a%2!==0&&a>0&&a<n.length-1?e.push({arrival:n[a],departure:n[a+1]}):0===a?e.push({arrival:{},departure:n[a]}):a===n.length-1&&e.push({arrival:n[a],departure:{}}),e}),[]).map((function(e){return new y(e)}))}}]),e}(),g={getData:function(e,t){var a;return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p.a.awrap(v.get("https://rata.digitraffic.fi/api/v1/".concat(e)));case 3:return a=t.sent,t.abrupt("return",a);case 7:throw t.prev=7,t.t0=t.catch(0),new Error(t.t0);case 10:case"end":return t.stop()}}),null,null,[[0,7]])},getTrains:function(e){var t,a,n,r=arguments;return p.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return t=r.length>1&&void 0!==r[1]?r[1]:"latest",a=r.length>2&&void 0!==r[2]?r[2]:0,c.next=4,p.a.awrap(g.getData("trains/".concat(t,"/").concat(e,"?version=").concat(a)));case 4:return n=c.sent,c.abrupt("return",new w(n.data[0]));case 6:case"end":return c.stop()}}))},getTracking:function(e){var t,a,n,r=arguments;return p.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return t=r.length>1&&void 0!==r[1]?r[1]:"latest",a=r.length>2&&void 0!==r[2]?r[2]:0,c.next=4,p.a.awrap(g.getData("train-tracking/".concat(t,"/").concat(e,"?version=").concat(a)));case 4:return n=c.sent,c.abrupt("return",n.data[0]);case 6:case"end":return c.stop()}}))},getStationInfo:function(){var e,t;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.awrap(g.getData("metadata/stations"));case 2:return e=a.sent,t=e.data.reduce((function(e,t){return e[t.stationShortCode]=t,e}),{}),a.abrupt("return",t);case 5:case"end":return a.stop()}}))},getLiveTrains:function(){var e,t;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.awrap(g.getData("live-trains"));case 2:return e=a.sent,t=e.data.map((function(e){return{trainNumber:e.trainNumber,trainType:e.trainType,trainName:e.trainType+e.trainNumber,firstStation:e.timeTableRows[0].stationShortCode,lastStation:e.timeTableRows[e.timeTableRows.length-1].stationShortCode}})),a.abrupt("return",t);case 5:case"end":return a.stop()}}))},MQTT:{client:new T.Client("rata.digitraffic.fi",443,"js-utility-WDL4i"),topics:[],success:function(e){return console.log("Connected: ",e)},failure:function(e){return console.log("Error: ",e)},connectionLost:function(e){return console.log("Connection lost: ",e)},messageArrived:function(e){var t=function(e){return e.split("/")},a=t(e.topic);g.MQTT.topics.map((function(n){var r,c=t(n.topic);(r=a,c.map((function(e,t){return a=e,n=r[t],"+"===a||"#"===a||a===n;var a,n}))).every((function(e){return!0===e}))&&n.callback(e)}))},connect:function(e){try{g.MQTT.client.connect({timeout:3,keepAliveInterval:60,useSSL:!0,onSuccess:function(t){return e({success:!0,res:t})},onFailure:function(t){return e({success:!1,res:t})}}),g.MQTT.client.onConnectionLost=g.MQTT.connectionLost,g.MQTT.client.onMessageArrived=g.MQTT.messageArrived}catch(t){console.log(t)}},subscribeToTopic:function(e,t){g.MQTT.topics.push({topic:e,callback:t}),g.MQTT.client.subscribe(e)}},disconnect:function(e){return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.a.awrap(g.MQTT.client.disconnect());case 2:e();case 3:case"end":return t.stop()}}))},subscribeToTrainUpdates:function(e,t){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}))}},S=(a(48),function(e){var t=Object(n.useContext)(m),a=t.state;t.dispatch;return r.a.createElement("div",{className:"module header"},r.a.createElement("h1",{className:"application-title"},"VR Tracking Tool ",r.a.createElement("span",{className:"version"},"[".concat(a.meta.version.majorVersion,".").concat(a.meta.version.minorVersion," ").concat(a.meta.version.releaseType,"]"))),r.a.createElement("nav",null,r.a.createElement("span",{className:"nav-item current"},r.a.createElement("a",{href:"trains"},"Trains")),r.a.createElement("span",{className:"nav-item"},r.a.createElement("a",{href:"stations"},"Stations")),r.a.createElement("span",{className:"nav-item"},r.a.createElement("a",{href:"stations"},"About")),r.a.createElement("span",{className:"nav-item"},r.a.createElement("a",{href:"stations"},"News"))),r.a.createElement("div",{className:"description"},r.a.createElement("h2",null)))}),b=a(16),C=a.n(b);a(3);var I=function(e){return r.a.createElement("button",{className:e.className,disabled:e.disabled,onClick:e.onClick},e.children)};var k=function(){return r.a.createElement("svg",{viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",className:"SVG_symbol_close"},r.a.createElement("g",{"fill-opacity":"1","stroke-linecap":"round"},r.a.createElement("circle",{cx:"50",cy:"50",r:"45","stroke-width":"5"}),r.a.createElement("line",{x1:"33",y1:"33",x2:"67",y2:"67","stroke-width":"15"}),r.a.createElement("line",{x1:"33",y1:"67",x2:"67",y2:"33","stroke-width":"15"})))};var x=function(e){return r.a.createElement(I,{className:"close",onClick:e.callback},r.a.createElement(k,null))};var A=function(){return r.a.createElement("svg",{viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",className:"SVG_symbol_minify"},r.a.createElement("g",{"fill-opacity":"1","stroke-linecap":"round"},r.a.createElement("circle",{cx:"50",cy:"50",r:"45","stroke-width":"5"}),r.a.createElement("line",{x1:"28",y1:"50",x2:"72",y2:"50","stroke-width":"15"})))};var _=function(e){return r.a.createElement(I,{className:"minify",onClick:e.callback},r.a.createElement(A,null))};var O=function(e){var t=r.a.createElement("g",{"fill-opacity":"1",stroke:"#00cc00"},r.a.createElement("circle",{cx:"50",cy:"50",r:"45","stroke-width":"5"}),r.a.createElement("path",{d:"M33    25.5   L75.5   25.5    L75.5   67  Z","stroke-width":"0"}),r.a.createElement("path",{d:"M25.5  33     L25.5   75.5    L67   75.5  Z","stroke-width":"0"})),a=r.a.createElement("g",{"fill-opacity":"1",stroke:"#00cc00"},r.a.createElement("circle",{cx:"50",cy:"50",r:"45","stroke-width":"5"}),r.a.createElement("path",{d:"M33    25.5   L75.5   25.5    L75.5   67  Z","stroke-width":"0",transform:"rotate(180, 61.33, 39.33)"}),r.a.createElement("path",{d:"M25.5  33     L25.5   75.5    L67   75.5  Z","stroke-width":"0",transform:"rotate(180, 39.33, 61.33)"}));return r.a.createElement("svg",{viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",className:"SVG_symbol_expand"},e.expanded?a:t)};var R=function(e){return r.a.createElement(I,{className:"expand",onClick:e.callback},r.a.createElement(O,null))};var D=function(){return r.a.createElement("svg",{viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",className:"SVG_symbol_minify"},r.a.createElement("g",{"fill-opacity":"1",stroke:"#dddddd"},r.a.createElement("circle",{cx:"20",cy:"50",r:"10",fill:"#ffffff","stroke-width":"5"}),r.a.createElement("circle",{cx:"50",cy:"50",r:"10",fill:"#ffffff","stroke-width":"5"}),r.a.createElement("circle",{cx:"80",cy:"50",r:"10",fill:"#ffffff","stroke-width":"5"})))};var L=function(e){return r.a.createElement(I,{className:"contextMenuButton",onClick:e.callback},r.a.createElement(D,null))},M=(a(49),function(e){return e?C()(e,"HH:MM"):""}),j=function(e){var t=Object(n.useContext)(m),a=t.state;t.dispatch;return r.a.createElement("div",{className:"TrainItem "+e.data.elementStatus},r.a.createElement("div",{className:"controls"},r.a.createElement(x,{callback:function(){return console.log("Close")}}),r.a.createElement(_,{callback:function(){return console.log("Minify")}}),r.a.createElement(R,{expanded:!1,callback:function(){return console.log("Toggle expansion")}})),r.a.createElement("div",{className:"title"},e.data.trainName),r.a.createElement("div",{className:"settings"},r.a.createElement(L,{callback:function(){console.log("Open context menu")}})),r.a.createElement("div",{className:"o-d"},r.a.createElement("span",{className:"startTime"},"".concat(M(e.data.fromStation.departure.scheduledTime))),r.a.createElement("span",{className:"from"},a.stationInfo[e.data.fromStation.stationShortCode].stationName),r.a.createElement("span",{className:"separator"}," \u2192 "),r.a.createElement("span",{className:"to"},a.stationInfo[e.data.toStation.stationShortCode].stationName),r.a.createElement("span",{className:"endTime"},"".concat(M(e.data.toStation.arrival.scheduledTime)))),r.a.createElement("div",{className:"timetable"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Station"),r.a.createElement("th",null,"Track"),e.data.runningCurrently?r.a.createElement("th",null,"Arrival time"):r.a.createElement("th",null,"Time"),e.data.runningCurrently?r.a.createElement("th",null,"Arrival delay"):r.a.createElement("th",null,"Delay"),e.data.runningCurrently?r.a.createElement("th",null,"Arrival estimate"):r.a.createElement("th",null,"Estimate"),e.data.runningCurrently?r.a.createElement("th",null,"Departure time"):"",e.data.runningCurrently?r.a.createElement("th",null,"Departure delay"):"",e.data.runningCurrently?r.a.createElement("th",null,"Departure estimate"):"")),r.a.createElement("tbody",null,e.data.timeTableRows.map((function(t){return function(t){return r.a.createElement("tr",{key:t.stationShortCode,className:"row ".concat(t.commercialStop?"STOP":"PASS"," ").concat(t.stationShortCode===e.data.currentStation&&e.data.runningCurrently?"currentStation":"")},r.a.createElement("td",{className:"stationShortCode"},a.stationInfo[t.stationShortCode].stationName),r.a.createElement("td",{className:"commercialTrack"},t.commercialTrack),r.a.createElement("td",{className:"arrival_time"},M(t.arrival.scheduledTime)),r.a.createElement("td",{className:"arrival_delay"},t.arrival.differenceInMinutes),r.a.createElement("td",{className:"arrival_liveEstimateTime"},M(t.arrival.liveEstimateTime)),e.data.runningCurrently?r.a.createElement("td",{className:"departure_time"},M(t.departure.scheduledTime)):"",e.data.runningCurrently?r.a.createElement("td",{className:"departure_delay"},t.departure.differenceInMinutes):"",e.data.runningCurrently?r.a.createElement("td",{className:"departure_liveEstimateTime"},M(t.departure.liveEstimateTime)):"")}(t)}))))),r.a.createElement("div",{className:"status "+(e.data.runningCurrently?"online":"offline")},e.data.runningCurrently?"ONLINE":"OFFLINE"),r.a.createElement("div",{className:"info"},"No additional info"))},Q=a(18);a(50);function U(e){var t=Object(n.useContext)(m),a=t.state;t.dispatch;return r.a.createElement("li",{className:"AutocompleteItem",key:e.trainName,id:e.item.trainName},r.a.createElement("span",{className:"trainName"},e.item.trainName,":"),r.a.createElement("span",{className:"from"},a.stationInfo[e.item.firstStation].stationName),r.a.createElement("span",{className:"separator"},"\u2192"),r.a.createElement("span",{className:"to"},a.stationInfo[e.item.lastStation].stationName))}var V=function(e){var t=Object(n.useContext)(m),a=t.state;return t.dispatch,r.a.createElement("div",{className:"Autocomplete"},a.trainSearch?r.a.createElement("ol",{className:"AutocompleteItems"},e.items?Object(Q.a)(new Set(e.items)).slice(0,20).map((function(e){return r.a.createElement(U,{item:e})})):void 0):void 0)},P=(a(51),{Header:S,TrainView:function(e){var t=Object(n.useContext)(m),a=t.state,c=t.dispatch;function i(){var e;return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.a.awrap(g.getLiveTrains());case 2:e=t.sent,c({type:"LIVE_TRAINS_UPDATED",data:e});case 4:case"end":return t.stop()}}))}Object(n.useEffect)((function(){if(Object.entries(a.liveTrains).length>1){var e=a.liveTrains.filter((function(e){return e.trainName.match(new RegExp(a.trainSearchQuery,"g"))}));c({type:"FILTERED_LIVE_TRAINS_UPDATED",data:e})}}),[a.trainSearchQuery]);var s=function(){var e,t;return p.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,p.a.awrap(g.getTrains(a.trainSearchQuery));case 2:return e=n.sent,c({type:"CREATE_TRAIN",trainObject:e}),n.next=6,p.a.awrap(g.getTracking(a.trainSearchQuery));case 6:t=n.sent,c({type:"TRACKING",train:e.trainName,data:t}),g.MQTT.subscribeToTopic("trains/+/".concat(e.trainNumber,"/#"),(function(e){var t=new w(JSON.parse(e.payloadString));c({type:"UPDATE_TRAIN",trainObject:t})})),g.MQTT.subscribeToTopic("train-tracking/+/".concat(e.trainNumber,"/#"),(function(t){return c({type:"TRACKING",train:e.trainName,data:JSON.parse(t.payloadString)})}));case 10:case"end":return n.stop()}}))};return r.a.createElement("div",{className:"module TrainView"},r.a.createElement("div",{className:"search"},r.a.createElement("div",{className:"searchBar"},r.a.createElement("input",{className:"trainSearchBar",type:"text",placeholder:"trainNumber",onChange:function(e){c({type:"TRAIN_SEARCH_QUERY_UPDATED",query:e.target.value})},autofocus:"true",onFocus:function(e){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:i(),c({type:"TRAIN_SEARCH_ACTIVE"});case 2:case"end":return e.stop()}}))},onBlur:function(e){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:c({type:"TRAIN_SEARCH_ENDED"});case 1:case"end":return e.stop()}}))},value:a.trainSearchQuery,onKeyPress:function(e){return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:"Enter"===e.key&&(s(),c({type:"TRAIN_SEARCH_QUERY_UPDATED",query:""}));case 1:case"end":return t.stop()}}))}}),r.a.createElement("input",{className:"trainSearchSubmit",type:"button",onClick:s,value:"Create train"})),r.a.createElement(V,{items:a.filteredLiveTrains})),r.a.createElement("div",{className:"trainList"},function(e){var t=[];for(var a in e)t.push(r.a.createElement(j,{key:e[a].trainName,data:e[a]}));return t}(a.trains)))}});var F=function(){var e=Object(n.useContext)(m),t=e.state,a=e.dispatch,c=function(){t.connected||(g.MQTT.client.isConnected()?a({type:"CONNECTION_SUCCESFULL"}):g.MQTT.connect((function(e){e.success?a({type:"CONNECTION_SUCCESFULL"}):a({type:"CONNECTION_FAILED"})})))};return Object(n.useEffect)((function(){t.connected&&function(){var e;p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.a.awrap(g.getStationInfo());case 2:e=t.sent,a({type:"SET_STATION_INFO",data:e});case 4:case"end":return t.stop()}}))}()}),[t.connected]),Object(n.useEffect)((function(){p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:c();case 1:case"end":return e.stop()}}))}),[]),r.a.createElement("div",{className:"vr-tracking-tool"},r.a.createElement(P.Header,null),r.a.createElement("input",{type:"button",value:"Connect",onClick:c}),r.a.createElement("input",{type:"button",value:"Disconnect",onClick:function(){return g.disconnect((function(){a({type:"DISCONNECTED"})}))}}),r.a.createElement(P.TrainView,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement((function(e){var t=e.children,a=Object(n.useReducer)(u,l),c=Object(s.a)(a,2),i=c[0],o=c[1];return r.a.createElement(d,{value:{state:i,dispatch:o}},t)}),null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.18b50c8b.chunk.js.map