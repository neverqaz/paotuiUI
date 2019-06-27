<!-- <template>
//     <div class="baidu-map">
//         <div class="location">
//             <div>店名: {{storeName}}</div>
//             <div>预定位点: <input style="width: 300px" type="text" v-model="mylocation"> <button @click="goLocation" >定位</button> </div>
//             <div>定位点信息：{{JSON.stringify(mysiteinfo)}} </div>
//         </div>
//         <div id="map"></div>
//     </div> 
</template>  
<script>
// export default {
//   name: 'baiduMap',
//   data() {
//     return {
//       map: {},
//       mysiteinfo: {},
//       mylocation: this.location
//     }
//   },

//   props: {
//     location: {
//       type: String,
//       default: ''
//     },
//     storeName: {
//       type: String,
//       default: ''
//     }
//   },
//   mounted() {

//   },
//   watch: {
//     location(val) {
//       this.mylocation = val
//       if (val === '') {
//         return
//       }
//       var myGeo = new window.BMap.Geocoder()
//       const that = this
//       myGeo.getPoint(val, function(point) {
//         that.mysiteinfo = point
//         console.log(point)
//         if (point) {
//           that.map.centerAndZoom(point, 20)
//           that.map.addOverlay(new window.BMap.Marker(point))
//         } else {
//           alert('您选择地址没有解析到结果!')
//         }
//       })
//     },
//     mysiteinfo(val) {
//       this.$emit('on-siteinfo-change', val) // ③组件内对myResult变更后向外部发送事件通知
//     }
//     },
//   methods: {
//     goLocation(e) {
//       var myGeo = new window.BMap.Geocoder()
//       const that = this
//       myGeo.getPoint(that.mylocation, function(point) {
//         that.mysiteinfo = point
//         console.log(point)
//         if (point) {
//           that.map.centerAndZoom(point, 20)
//           that.map.addOverlay(new window.BMap.Marker(point))
//         } else {
//           alert('您选择地址没有解析到结果!')
//         }
//       })
//     }
//   },
//   created(){
//       const that = this
//     this.$nextTick().then(() => {
//       that.map = new window.BMap.Map('map')
//       // 创建地图实例
//       var point = new window.BMap.Point(108.953567, 34.267509)
//       // 创建点坐标
//       that.map.centerAndZoom(point, 15)
//       var geoc = new window.BMap.Geocoder()
//       // 初始化地图，设置中心点坐标和地图级别
//       that.map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
//       that.map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
//       that.map.addEventListener('click', function(e) {
//         var pt = e.point
//         that.mysiteinfo = pt
//         geoc.getLocation(pt, function(res) {
//           console.log(res)
//           that.$set(that.mysiteinfo, 'address', res.address)
//         })
//       })
//     })
//   }
// }
// </script>
// <style>
// #map{
// width: 700px;
//     height: 500px;
// }
// </style> -->
<template>
<div class="main">
<!--地图模块-->
<el-row type="flex" justify="center" style="padding-top:30px;">
  <el-col :span="8">
<el-input v-model="keyword" prefix-icon="el-icon-search" /></el-col>
</el-row>
<el-row type="flex" justify="center" style="margin-top:20px;">
  <el-col :span="22">

 <!-- getPoint方法，给地图加点击事件，点击地图获取所需要的信息，-->
 <!--scroll-wheel-zoom属性是否可以用鼠标滚轮控制地图缩放-->
<baidu-map class="map" id="mapID" center="赛罕区" :zoom="zoom" :scroll-wheel-zoom="true" :continuous-zoom="true" :pinch-to-zoom="true" :auto-resize="true" @click="getPoint" >
    <!--自动定位 -->
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  <!--地图类型，两种：一种是路线一种是绿的那种-->
  <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
  <!--地图搜索功能，绑定上面的input，-->
  <!--display: none样式很关键，因为下面默认会有地址提示信息很长，很烦，这样搜索会很舒服，-->
  <!--zoom是搜索结果的视图比例，个人觉得12.8很舒服显示-->
  <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" zoom="12.8" style="display: none"></bm-local-search>
  <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  <!--信息窗口，show属性是控制显示隐藏，infoWindowClose和infoWindowOpen是控制信息窗口关闭隐藏的方法-->
  <bm-marker :position="postionMap">
    <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
      <!-- <p>站点：{{ add.siteName }}</p> -->
      站点地址：{{ add.site }}
    </bm-info-window>
  </bm-marker>
</baidu-map>
</el-col>
</el-row>
<!-- <p>{{postionMap.lat}},{{postionMap.lng}}</p> -->
</div>
</template>

<script>
export default {
    data(){
        return{
            show:'',
            zoom:'',
            keyword:'',
            address_info:
            {     city:'',//用户所在的市级单位
            address:'',//用户输入好的完整的地址信息
            point:'',//拼接好的经纬度坐标
            },
       
            add:{
               siteName:''
               ,site:"", 
               jd:'',
               wd:''
            },
            postionMap:{
              lng:'',
                lat:''
            }

        }
    },
    methods:{
  getPoint(e){    //点击地图获取一些信息，
    this.show = true;
    this.postionMap.lng = e.point.lng;     //通过  e.point.lng获取经度
    this.postionMap.lat = e.point.lat;     //通过  e.point.lat获取纬度
    this.add.jd = e.point.lng;
    this.add.wd = e.point.lat;
    this.zoom = e.target.getZoom();
    this.address_info.point = e.point.lat+','+e.point.lng;
    
 
    let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
    geocoder.getLocation(e.point,rs=>{
      this.add.site = rs.address;
      this.$prompt('请按照地图上显示补充完整您的地址信息','添加地址', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:rs.address,
          type:'info',
          center: true
        }).then(({value}) => {
            console.log(value)
            this.address_info.address = value;
            console.log("*******************")
          this.$message({
            type: 'success',
            message: '您的地址是: ' + value
          });
          this.show = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          }); 
          this.show = false;      
        });
      //地址描述(string)=
      // console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
      // console.log(rs.addressComponents);//结构化的地址描述(object)
      // console.log(rs.addressComponents.province); //省
      this.address_info.city = rs.addressComponents.city//城市
      // console.log(rs.addressComponents.district); //区县
      // console.log(rs.addressComponents.street); //街道
      // console.log(rs.addressComponents.streetNumber); //门牌号
      // console.log(rs.surroundingPois); //附近的POI点(array)
      // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
      this.$emit('sendparentPoint',{address_info:this.address_info})//把选取的信息反馈给父组件
    });
  },
  infoWindowClose () {
    this.show = false
  },
  infoWindowOpen () {
    //这里有个问题纠结了很久，百度的信息窗口默认有个点击其他地方就消失的事件，我没有找到
    //并且信息窗口点击一次显示，一次消失
    //于是我加了一个100毫秒的定时器，保证每次点击地图都可以展示信息窗口
  //  setInterval(()=>{
  //    this.show = true
  //  },100)
  },
}
}
</script>


<style scoped>
/* The container of BaiduMap must be set width & height. */
.main{
  background: rgb(240, 243, 243)
}
.map {
  width: 100%;
  height: 300px;
}
</style>
