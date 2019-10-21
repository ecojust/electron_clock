<template>
  <div id="main">
    <div class="menu"  style="-webkit-app-region: drag;">
      <Icon type="ios-close" color="black" @click="win('close')"/>
      <Icon type="ios-remove" color="black" @click="win('min')"/>
    </div>

        <div class="button" @click="toggle" style="position:absolute;top:40px;color:white;z-index:9">
          toggleii
        </div>
    <!-- 时钟 -->
    <transition name="fadeToggle">
      <div class="clock">
        <div class="top">
          <div class="h">
            {{h}}
            <div class="line"></div>
          </div>
          <div class="dot">
            {{dot}}
          </div>
          <div class="m">
            {{m}}
            <div class="line"></div>
          </div>
          <div class="dot">
            {{dot}}
          </div>
          <div class="s">
            {{s}}
            <div class="line"></div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 闹钟 -->
    <transition name="fadeToggle">
      <div class="clocklist">
        <div class="alarm" v-for="(item,index) in alarmlist" :key="index">
          {{item.time}}
          <i-switch v-model="item.open" size="small" true-color="rgba(255,255,255,0.8)" false-color="rgba(255,255,255,0.1)"></i-switch>
          <Icon type="md-settings" />
          <div class="weeks">
            <span @click="toggleweek(index,idx)" :class="{'week':true,'active':i.value}"  v-for="(i,idx) in item.week" :key="'w'+idx">
              {{i.name[0]}}
            </span>
          </div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import { setTimeout } from 'timers';
var mp3 = require("../../../static/song/真爱你的云.mp3");


export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      music:mp3,
      h:0,
      m:0,
      s:0,
      dot:':',
      dotopacity:1,
      timefiled:'AM',
      alarm:false,
      alarmlist:[
        {
          time:'14:39',
          open:true,
          week:[
            {
              name:'Sunday',
              key:0,
              value:false
            },
            {
              name:'Monday',
              key:1,
              value:true
            },
            {
              name:'Tuesday',
              key:2,
              value:true
            },
            {
              name:'Wednesday',
              key:3,
              value:true
            },
            {
              name:'Thursday',
              key:4,
              value:true
            },
            {
              name:'Friday',
              key:5,
              value:true
            },
            {
              name:'Saturday',
              key:6,
              value:true
            },
          ]
        },
        {
          time:'14:39',
          open:true,
          week:[
            {
              name:'Sunday',
              key:0,
              value:false
            },
            {
              name:'Monday',
              key:1,
              value:true
            },
            {
              name:'Tuesday',
              key:2,
              value:true
            },
            {
              name:'Wednesday',
              key:3,
              value:true
            },
            {
              name:'Thursday',
              key:4,
              value:true
            },
            {
              name:'Friday',
              key:5,
              value:true
            },
            {
              name:'Saturday',
              key:6,
              value:true
            },
          ]
        },
        {
          time:'14:39',
          open:true,
          week:[
            {
              name:'Sunday',
              key:0,
              value:false
            },
            {
              name:'Monday',
              key:1,
              value:true
            },
            {
              name:'Tuesday',
              key:2,
              value:true
            },
            {
              name:'Wednesday',
              key:3,
              value:true
            },
            {
              name:'Thursday',
              key:4,
              value:true
            },
            {
              name:'Friday',
              key:5,
              value:true
            },
            {
              name:'Saturday',
              key:6,
              value:true
            },
          ]
        },
        {
          time:'14:39',
          open:true,
          week:[
            {
              name:'Sunday',
              key:0,
              value:false
            },
            {
              name:'Monday',
              key:1,
              value:true
            },
            {
              name:'Tuesday',
              key:2,
              value:true
            },
            {
              name:'Wednesday',
              key:3,
              value:true
            },
            {
              name:'Thursday',
              key:4,
              value:true
            },
            {
              name:'Friday',
              key:5,
              value:true
            },
            {
              name:'Saturday',
              key:6,
              value:true
            },
          ]
        },
        {
          time:'14:39',
          open:true,
          week:[
            {
              name:'Sunday',
              key:0,
              value:false
            },
            {
              name:'Monday',
              key:1,
              value:true
            },
            {
              name:'Tuesday',
              key:2,
              value:true
            },
            {
              name:'Wednesday',
              key:3,
              value:true
            },
            {
              name:'Thursday',
              key:4,
              value:true
            },
            {
              name:'Friday',
              key:5,
              value:true
            },
            {
              name:'Saturday',
              key:6,
              value:true
            },
          ]
        }
      ]
    }
  },
  created(){
      this.getNowFormatDate();
  },
  mounted(){
    this.ipcRenderer$on();
    setInterval(()=>{
      this.getNowFormatDate();
    },1000)
  },
  methods:{
    getNowFormatDate() {
      var date = new Date();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      this.h = h>9?h:('0'+h);
      this.m = m>9?m:('0'+m);
      this.s = s>9?s:('0'+s);
      if(h > 12){
        this.timefiled = 'PM'
      }else{
        this.timefiled = 'AM'
      }
      for(var i=0,size=this.alarmlist.length;i<size;i++){
        var item = this.alarmlist[i];
        var hm=  this.h +':'+ this.m;
        if(!this.alarm&&hm==item.time&&item.open){
          this.clockstart();
          item.open = false;
        }
      }
    },
    win(type){
      ipcRenderer.send('win-'+type)
    },
    toggle(){
      if(this.alarm){
        this.clockstop();
        this.alarm = false;
      }else{
        this.clockstart();
        this.alarm = true;
      }
    },
    toggleweek(index,idx){
      var value = this.alarmlist[index].week[idx].value;
      this.alarmlist[index].week[idx].value = !value;
    },
    clockstart(){
      var vm = this;
      var clock = document.getElementsByClassName('clock')[0];
      var audio = document.createElement('audio');
      audio.setAttribute('class','audio');
      audio.setAttribute('autoplay',true);
      audio.setAttribute('loop',true);
      audio.setAttribute('muted',true);
      audio.setAttribute('src',vm.music);
      audio.style.cssText = `
        display:none;
      `;
      clock.appendChild(audio);
      this.alarm = true;
    },
    clockstop(){
      var clock = document.getElementsByClassName('clock')[0];
      var audio = document.getElementsByClassName('audio')[0];
      clock.removeChild(audio);
      this.alarm = false;
    },
    open(){
      const {dialog} = require('electron').remote;
      dialog.showOpenDialog()//可默认打开文件
    },
    ipcRenderer$on(){
      ipcRenderer.on('moveScreen',(sender,data)=>{
        console.log(data.toString())//{"type":"enter","value":1}
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#main{
  height:100%;
  width:100%;
  position:relative;
  .menu{
    background: rgba(255, 255, 255, 0.8);
    height:26px;
    position:absolute;
    top:0;
    width:100%;
    text-align:left;
    padding-top:3px;
    >i{
      margin-left:8px;
    }
    .ivu-icon-ios-close:before,.ivu-icon-ios-remove:before{
      width:10px;
      height:10px;
      border-radius:50%;
      font-weight:900;
      box-shadow:0 0 5px 0px rgba(0,0,0, 0.29);
    }
    .ivu-icon-ios-close:before{
      background: #ed6c60;
    }
    .ivu-icon-ios-remove:before{
      background: #f6be4f;
    }
  }
  .clock{
    // border:1px solid red;
    height:100%;
    width:100%;
    .top,.bottom,.center{
      position:absolute;
      margin:0 auto;
      width:100%;
      text-align: center;
      overflow: hidden;
      .h,.dot,.m,.s{
        display:inline-block;
        color:rgba(255, 255, 255, 0.89);
        font-family: 'Times New Roman', Times, serif;
        font-size:240px;
        line-height: 250px;
        font-weight:700;
        width:250px;
        position:relative;
        .line{
          width:100%;
          height:10px;
          position:absolute;
          top:126px;
          background: black;
        }
      }
      .h,.m,.s{
        border-radius:10px;
        background:rgba(255, 255, 255, 0.19)
      }
      .dot{
        vertical-align: 20px;
        width:140px;
        text-align:center;
      }
    }
    .top{
      top:150px;
      z-index:3;
      background:black;
      // border:1px solid red;
      // height:205px;

    }
  }
  .clocklist{
    background:rgba(255, 255, 255, 0.19);
    color:white;
    position:absolute;
    width:230px;
    padding:10px;
    top:130px;
    left:0;
    z-index:99;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    .alarm{
      border:1px solid red;
      padding:5px;
      margin-bottom:5px;
      .weeks{
        .week{
          display:inline-block;
          width:18px;
          height:18px;
          line-height:18px;
          border:1px solid rgba(255, 255, 255, 0.6);
          color:white;
          border-radius:50%;
          margin:5px;
          cursor:pointer;
        }
        .active{
          background:rgba(255, 255, 255, 1.0);
          color:black
        }
      }
    }
    
  }
  // 淡入淡出,<transition  name="fadeToggle">
  .fadeToggle-enter,.fadeToggle-leave-to{
      opacity: 0;
  }
  .fadeToggle-enter-to,.fadeToggle-leave{
      opacity: 1;
  }
  .fadeToggle-enter-active{
      transition: all 2s;
  }
  .fadeToggle-leave-active{
      transition: all 0.3s;
  }
}
</style>
