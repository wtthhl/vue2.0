define("module/utils/utils",function(e,t,n){n.exports={ajax:function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&t(JSON.parse(n.responseText))},n.open("GET",e,!0),n.send(null)}}});