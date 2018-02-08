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
