;/*!module/utils/utils.js*/
define("module/utils/utils",function(e,t,n){n.exports={ajax:function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&t(JSON.parse(n.responseText))},n.open("GET",e,!0),n.send(null)}}});
;/*!module/components/home/home.js*/
define('module/components/home/home', function(require, exports, module) {

  var Util = require('module/utils/utils')
  var Home = Vue.extend({
  	template:'#tpl_home',
  	data: function() {
  		return {
  			icons:[
  			{id: '1', img: '01.png', title: '美食'},
  			{id: '2', img: '02.png', title: '电影'},
  			{id: '3', img: '03.png', title: '休闲'},
  			{id: '4', img: '04.png', title: '酒店'},
  			{id: '5', img: '05.png', title: '外卖'},
  			{id: '6', img: '06.png', title: 'ktv'},
  			{id: '7', img: '07.png', title: '周边游'},
  			{id: '8', img: '08.png', title: '丽人'},
  			{id: '9', img: '09.png', title: '小吃'},
  			{id: '10', img: '10.png', title: '火车票'}
  			],
  			ad:[],
  			list:[],
  			imgs:[
  			{img:'0.jpg',img1:'1.jpg',img2:'2.jpg'},
  			{img:'3.jpg',img1:'4.jpg',img2:'5.jpg'},
  			{img:'6.jpg',img1:'7.jpg',img2:'8.jpg'}
  			],
  			currentIndex: 0,
      		timer: ''
  		}
  	},
  	//当组件创建完成请求数据
  	mounted: function(){
  		var me = this;
  		Util.ajax('data/home.json', function(res) {		
  			if (res && res.errno === 0) {
  				me.ad = res.data.ad;
  				// 存储列表数据
  				me.list = res.data.list;
  			}
  		})
  	},
  	methods:{
  
  		 autoPlay() {
                  this.currentIndex++
                  if (this.currentIndex > this.imgs.length - 1) {
                      this.currentIndex = 0
                  }
              }
          },
         created() {
           this.$nextTick(() => {
             this.timer = setInterval(() => {
               this.autoPlay()
             }, 3000)
           })
         }	
  })
  module.exports = Home

});

;/*!module/components/list/list.js*/
define("module/components/list/list",function(t,i,e){var s=t("module/utils/utils"),r=Vue.extend({props:["route","searchQuery"],template:"#tpl_list",data:function(){return{orders:[{id:"price",text:"价格排序"},{id:"sales",text:"销量排序"},{id:"evaluate",text:"好评排序"},{id:"discount",text:"优惠排序"}],list:[],others:[],isshow:"price"}},mounted:function(){var t=this;s.ajax("data/list.json?id="+this.$parent.route[1],function(i){i&&0===i.errno&&(t.list=i.data.slice(0,3),t.others=i.data.slice(3))})},computed:{listFilterResult:function(){var t=[],i=this.searchQuery;return this.list.forEach(function(e){e.title.indexOf(i)>=0&&t.push(e)}),t}},methods:{showOthers:function(){this.list=this.list.concat(this.others),this.others=[]},listOrder:function(t){this.isshow=t,this.list.sort(function(i,e){return"discount"===t?e.originPrice-e.price-(i.originPrice-i.price):e[t]-i[t]})}}});e.exports=r});
;/*!module/components/detail/detail.js*/
define("module/components/detail/detail",function(t,a,e){var n=t("module/utils/utils"),d=Vue.extend({template:"#tpl_detail",data:function(){return{data:[]}},mounted:function(){var t=this,a=this.$parent.route[0];n.ajax("data/product.json?id="+a,function(e){e&&0===e.errno&&(t.data=e.data[a-1])})}});e.exports=d});
;/*!module/components/login/login.js*/
define("module/components/login/login",function(s,o,i){var t=Vue.extend({template:"#login_tpl",data:function(){return{ischoose1:!0,ischoose2:!1,num:30,timer:null}},methods:{goback:function(){history.go(-1)},showClass1:function(){this.ischoose1?this.ischoose1=this.ischoose1:(this.ischoose1=!this.ischoose1,this.ischoose2=!this.ischoose2),console.log(this.ischoose1)},showClass2:function(){this.ischoose2?this.ischoose2=this.ischoose2:(this.ischoose2=!this.ischoose2,this.ischoose1=!this.ischoose1)},jiaoyan:function(){var s=this;s.num=30,timer=setInterval(function(){s.num--,s.num<0&&(s.num=0,clearInterval(timer))},1e3)}}});i.exports=t});
;/*!module/components/dingdan/dingdan.js*/
define("module/components/dingdan/dingdan",function(n,e,d){var o=Vue.extend({template:"#dingdan_tpl",methods:{goback:function(){history.go(-1)}}});d.exports=o});
;/*!module/components/guide/guide.js*/
define("module/components/guide/guide",function(i,e,t){var g=Vue.extend({template:"#guide_tpl",data:function(){return{guideimg:[{id:"1",img:"0.jpg",title:"农家一碗香"},{id:"2",img:"2.jpg",title:"外婆菜"},{id:"3",img:"3.jpg",title:"佛手金卷"},{id:"4",img:"4.jpg",title:"农家一锅鲜"},{id:"5",img:"5.jpg",title:"特色创新菜"},{id:"6",img:"6.jpg",title:"酒店特色菜"},{id:"7",img:"7.jpg",title:"家常菜谱"},{id:"8",img:"8.jpg",title:"东坡肉"},{id:"8",img:"1.jpg",title:"东坡肉"}],imglist:[{url:"01.jpg"},{url:"07.jpg"},{url:"04.jpg"},{url:"03.jpg"}]}},mounted:function(){new Swiper(".swiper-container",{slidesPerView:1,spaceBetween:30,loop:!0,autoplay:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}});t.exports=g});
;/*!module/components/app.js*/
define("module/components/app",function(e,t,n){var o=e("module/components/home/home"),i=e("module/components/list/list"),c=e("module/components/detail/detail"),s=e("module/components/login/login"),u=e("module/components/dingdan/dingdan"),l=e("module/components/guide/guide");Vue.component("home",o),Vue.component("list",i),Vue.component("detail",c),Vue.component("login",s),Vue.component("dingdan",u),Vue.component("guide",l);var d=new Vue({el:"#ickt",data:{view:"home",route:[],query:"",searchValue:"",slideList:[{clickUrl:"#",desc:"nhwc",image:"08.jpg"},{clickUrl:"#",desc:"hxrj",image:"02.jpg"},{clickUrl:"#",desc:"rsdh",image:"06.jpg"}],currentIndex:0,timer:""},methods:{showSearchResult:function(){this.query=this.searchValue,this.searchValue="",this.view="list"},goback:function(){history.go(-1)},go:function(){this.timer=setInterval(this.autoPlay,4e3)},stop:function(){clearInterval(this.timer)},change:function(e){this.currentIndex=e},autoPlay:function(){this.currentIndex++,this.currentIndex>this.slideList.length-1&&(this.currentIndex=0)}},mounted:function(){this.timer=setInterval(this.autoPlay,4e3)}});n.exports=d});
;/*!module/router/router.js*/
define("module/router/router",function(e){var n=e("module/components/app"),o=function(){var e=location.hash;e=e.replace(/^#\/?/,""),e=e.split("/");var o={list:!0,home:!0,detail:!0,login:!0,dingdan:!0,guide:!0};n.view=o[e[0]]?e[0]:"home",n.route=e.slice(1)};window.addEventListener("hashchange",o),o()});