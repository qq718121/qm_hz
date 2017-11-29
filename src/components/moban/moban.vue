<template>
  <div class="moban">
    <div class="floor" @touchmove.prevent></div>
    <div :class="['moban_',this.$store.state.school_class]" @click.self="cloce($event)" @touchmove.prevent
         v-if='this.$store.state.school_class'>
      <div class='centers' v-if="this.$store.state.motai_num == '0' ">
        <div class='loadText'><p>下载APP查看报告详情</p>
          <p>更多楼盘质量数据尽在鹰眼鉴房</p><span @click='loadHref'>下载APP</span><img :src=this.$url.moban_pic_load_title><i
            v-on:click.prevent="cloce" class='el-icon-close'></i></div>
      </div>
      <div class='guize' v-if="this.$store.state.motai_num == '1' ">
        <div class="qm_motai">
          <span class="close" v-on:click="cloce"></span>
          <span class="title_guize"></span>

          <div class="inner_">
            <p>1、城市以所购青芒盒子指定楼盘所在城市为准</p>
            <p>2、合作公寓租客需要在两年内购买指定楼盘</p>
            <p>3、每套公寓房源仅支持1人领取补贴</p>
            <p>4、用户可在购买青芒盒子指定楼盘（签订购房合同）后在“青芒盒子”微信公众号联系客服，领取补贴</p>
          </div>

        </div>
      </div>
      <div class='guize' v-if="this.$store.state.motai_num == '2' ">
        <div class="qm_motai">
          <span class="close" v-on:click="cloce"></span>
          <span class="title_house"></span>
          <div class="inner_">
            <div class="house_div">
              <span class="house_" :class="[{'active_house' : $store.state.house_check_num == value.id }]"
                    v-for="(value,index) in $store.state.house_arr"
                    @click="house_click(value,index)">{{value.apartmentName}}</span>
              <div class="house_btn" @click="house_yes_check">确定</div>
            </div>
          </div>

        </div>
      </div>

      <div class='guize' v-if="this.$store.state.motai_num == '3' ">
        <div class="qm_motai">
          <span class="close" v-on:click="cloce"></span>
          <span class="title_city"></span>
          <div class="inner_">
            <div class="house_div">
              <span class="house_" :class="[{'active_house' : $store.state.city_house_num == value.id }]"
                    v-for="(value,index) in $store.state.city_arr"
                    @click="city_click_check(value,index)">{{value.cityName}}</span>
            </div>
            <div class="house_btn" @click="city_yes_check">确定</div>
          </div>
        </div>
      </div>
      <div class='guize' v-if="this.$store.state.motai_num == '4' ">
        <div class="qm_motai">
          <span class="close" v-on:click="cloce"></span>
          <span class="title_guize"></span>

          <div class="inner_">
            <p class="plese_check">请选择城市／院校／公寓</p>
            <div class="house_btn" @click="cloce">好的</div>
          </div>

        </div>
      </div>

      <div class='guize' v-if="this.$store.state.motai_num == '5' ">
        <div class="qm_motai">
          <div class="close" v-on:click="cloce"></div>

          <div class="inner_">
            <div class="get_div">
              <p class="get_">恭喜你获得了</p>
              <p class="get_">每月<span>{{this.$store.state.set_sum}}</span>元租金补贴资格</p>
            </div>
          </div>
          <div class="house_btn_dable" @click="dabel_btn">再测一次</div>
          <div class="house_btn" @click="share_btn">分享</div>
        </div>
      </div>

    </div>

    <div :class="['school_check',this.$store.state.school_class]" v-if="this.$store.state.motai_num == '6' ">

      <div class="school__city"><span @click="city_click(value,index)"
                                      :class="[{'school__city_active' : $store.state.city_check_num == value.id }]"
                                      v-for="(value,index) in $store.state.city_school_city_arr">{{value.provinceName}}</span>
      </div>

      <div class="school__park_school"><span @click="check_school(value,index)"
                                             :class="[{'school__city_active' : $store.state.school_check_num == value.id }]"
                                             v-for="(value,index) in city_school_data">{{value.universityName}}</span>
      </div>
    </div>

    <div class="share_" @click="is__share" @touchmove.prevent v-if="$store.state.share_">
      <div class="written__"></div>
      <div class="fx__"></div>
    </div>

  </div>


</template>

<script>
  export default {
    data(){
      return {
//        house_num: 0,
//        school_num: 0,
//        animated_six: '',
        //记录当前切换的城市对应的院校集合
        city_school_data: [],
        //初始化微信jssdk参数
        share_desc: '',
        share_title: '百万租金补贴疯狂派送'
      }
    },
    methods: {
      //关闭模态窗口组件
      cloce(e){

        this.$store.commit('set_school_class', 'animated bounceOutRight');
        let this_ = this;
        setTimeout(function () {
          this_.$store.commit('change_is_oban');
        }, 500)
      },

      loadHref(){
        window.location.href = '#';
        this.$store.commit('ismotai');
      },

      //每次点击选择公寓项执行的函数
      house_click(sum, num){
        //调用store的方法每次点击记录id以及给value赋值
        this.$store.commit('house_click', sum.id);
        this.$store.commit('house_arr_value', num);
      },
      //选择公寓之后点击确定按钮执行的函数
      house_yes_check(){
        //点击确定之后首先关闭模态窗口
        this.cloce();
        //触发house_click并且调用组件里面监听的回调函数进行页面的渲染值
        this.$bus.$emit('house_click');
      },

      //选择城市之后点击确定按钮执行的函数
      city_yes_check(){
        //触发house_click并且调用组件里面监听的回调函数进行页面的渲染值
        this.cloce();
        this.$bus.$emit('house_click');
      },
      //每次点击选择城市项执行的函数
      city_click_check(sum, num){
        //首先触发监听事件进行组件渲染
        //每一次点击更改当前的ID
        //再通过当前的INDEX在store的数组里面进行查找对应点击的城市名进行组件渲染
        this.$bus.$emit('house_click');
        this.$store.commit('city_house_click', sum.id);
        this.$store.commit('city_house_value', num);
      },

      //每次点击选择院校城市项执行的函数
      city_click(sum, num){
        /*
         * 点击切换每一个院校城市必须要清除上一次选中的院校ID以及value
         * 每一次点击更改当前的ID
         * 每一次点击更改当前的vlaue
         * 触发监听事件进行组件渲染
         * 每一次切换城市拿到当前的院校集合
         */
        this.$store.commit('clean_state');
        this.$store.commit('city_click', sum.id);
        this.$store.commit('city_check_value', num);
        this.$bus.$emit('house_click');
        let school_arr = this.$store.state.city_school_city_arr[num].universityList;
        this.city_school_data = school_arr;
      },

      //每一次切换院校执行的函数
      check_school(sum, num){
        /*
         * 每一次切换院校更改当前的ID
         * 每一次切换院校更改当前的value
         * 触发监听事件更新组件
         */
        this.$store.commit('school_click', sum.id);
        this.$store.commit('school_check_value', this.city_school_data[num].universityName);
        this.$bus.$emit('house_click');
      },
      //再测一次
      dabel_btn(){
        /*
         * 用户点击再测一次，首先清除所有当前的ID以及value
         * 触发监听事件对组件进行清除渲染工作
         * 触发监听事件对组件手机号进行清除渲染工作
         * 清除渲染当前城市的院校集合
         * 关闭模态窗口
         */
        this.$store.commit('clean_all');
        this.$bus.$emit('house_click');
        this.$bus.$emit('age_clean');
        this.city_school_data = [];
        this.cloce();
      },

      //分享
      share_btn(){
        /*
         * 让浏览器窗口置顶
         * 分享模态窗口打开
         * 更改微信jssdk分享的参数
         * 重新初始化微信jssdk
         */
        window.scrollTo(0, 0);
        this.$store.commit('is_share');
        this.share_desc = '我已测得每月' + this.$store.state.set_sum + '元补贴，你也快来试试！';
        this.$weixin(this.share_title, this.share_desc);
      },
      //点击分享模态窗口进行关闭
      is__share(){
        this.$store.commit('is_share');
      }
    }
  }
</script>

<style>
  .share_, .moban_ {
    left: 0;
    right: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.40);
    bottom: 0;
    top: 0;
    z-index: 10;
  }

  .centers {
    margin: 4.28rem 0.9rem auto 0.9rem;
  }

  .guize {
    margin-top: .58rem;
  }

  .qm_motai {
    margin: auto;
    position: relative;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/pic_tankuangbg@3x.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .close {
    display: inline-block;
    width: 0.68rem;
    height: 0.68rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/icon_Close@3x.png');
    background-size: 100%;
    position: absolute;
    right: -0.24rem;
    top: -0.34rem;
  }

  .title_guize {
    display: inline-block;
    width: 2.08rem;
    height: 0.52rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/pic_guize@3x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0.58rem 2.16rem auto 2.16rem;
  }

  .title_house {
    display: inline-block;
    width: 3.64rem;
    height: 0.52rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/pic_gongyu@3x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0.58rem 2.16rem auto 1.36rem;
  }

  .title_city {
    display: inline-block;
    width: 5.20rem;
    height: 0.52rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/pic_chengshi%20@3x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0.58rem 2.16rem auto 0.6rem;
  }

  .inner_ {
    width: 5.94rem;
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    color: #FFFFFF;
    line-height: 0.52rem;
    margin: 0.4rem auto;
  }

  .house_div {
    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
    margin-bottom: 0.4rem;
  }

  .house_ {
    display: inline-block;
    width: 1.69rem;
    height: 0.56rem;
    border: 0.02rem solid #FFFFFF;
    border-radius: 1rem;
    text-align: center;
    margin: 0.12rem;
    background: rgba(0, 0, 0, 0);
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    color: #FFFFFF;
  }

  .house_btn {
    width: 5.2rem;
    height: 1.01rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/Button_fenxiang@3x.png');
    background-size: 100%;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    color: #A63C23;
    line-height: 1.01rem;
    text-align: center;
    font-weight: 600;
    margin: 0.3rem auto;
  }

  .house_btn_dable {
    width: 5.2rem;
    height: 1.01rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/Button_again@3x.png');
    background-size: 100%;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    color: #A63C23;
    line-height: 1.01rem;
    text-align: center;
    font-weight: 600;
    margin: 0.2rem auto;
  }

  .active_house {
    background: #FFFFFF;
    border-radius: 1rem;
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    color: #A63C23;
  }

  .plese_check {
    font-family: PingFangSC-Medium;
    font-size: 0.4rem;
    color: #FFFFFF;
    text-align: center;
    margin: 0.4rem;
  }

  .get_ {
    font-family: PingFangSC-Medium;
    font-size: 0.4rem;
    color: #FFFFFF;
    line-height: 0.6rem;
    display: inline-block;
    width: 4.32rem;
    text-align: center;

  }

  .get_div {
    text-align: center;
    padding-top: 1rem;
    margin-bottom: 0.8rem;
  }

  .get_ span {
    font-family: PingFangSC-Medium;
    font-size: 0.4rem;
    color: #000000;
    line-height: 0.6rem;
  }

  .school_check {
    width: 5.65rem;
    height: 100%;
    background: #f5f5f5;
    /*float: right;*/
    position: fixed;
    top: 0;
    z-index: 999;
    right: 0;
  }

  .school__city {
    width: 2.37rem;
    height: 100%;
    background: #fff;
    float: left;
    overflow: auto; /* winphone8和android4+ */
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }

  .school__city span {
    display: inline-block;
    width: 2.1rem;
    height: 0.88rem;
    border-bottom: 1px solid #E7E7E7;
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    font-weight: 600;
    line-height: 0.88rem;
    text-align: left;
    padding-left: 0.27rem;
  }

  .school__park_school {
    width: 3.1rem;
    height: 100%;
    background: #F5F5F5;
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    color: #8B949E;
    float: right;
    overflow: auto; /* winphone8和android4+ */
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }

  .school__park_school span {
    display: inline-block;
    width: 3.5rem;
    height: 0.88rem;
    border-bottom: 1px solid #E7E7E7;
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    font-weight: 600;
    line-height: 0.88rem;
    text-align: left;
    padding-left: 0.27rem;
    white-space: nowrap;
  }

  .school__city_active {
    background: #F5F5F5;
    color: #FF892D;
  }

  .school__park_school_active {
    color: #FF892D;
  }

  .loadText {
    width: 5.7rem;
    height: 4.1rem;
    background: #fff;
    border-radius: 0.08rem;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    position: relative;
  }

  .loadText p:nth-child(1) {
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #030303;
    letter-spacing: -0.39px;
    margin-top: 1rem;
  }

  .loadText p:nth-child(2) {
    opacity: 0.4;
    font-family: PingFangSC-Regular;
    font-size: 0.26rem;
    color: #030303;
    letter-spacing: -0.08px;
    line-height: 0.32rem;
    margin-top: 0.22rem;
  }

  .loadText span {
    display: inline-block;
    width: 4.5rem;
    height: 0.989rem;
    background: #5880F3;
    border-radius: 0.08rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #FFFFFF;
    line-height: 0.3rem;
    text-align: center;
    line-height: 0.98rem;
    margin-top: 0.43rem
  }

  .loadText img {
    position: absolute;
    top: -1.08rem;
    left: 1.7rem;
  }

  .loadText i {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    color: #42464D;
  }

  .qm_motai {
    width: 6.4rem;
    padding-bottom: 0.2rem;
  }

  .written__ {
    width: 5.14rem;
    height: 2.337rem;
    position: fixed;
    right: 1.77rem;
    top: 1.9rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/Written%20words@3x.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .fx__ {
    width: 1.43rem;
    height: 1.75rem;
    position: fixed;
    right: 0.41rem;
    top: 0.7rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/pic_fenxiang@3x.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .err__ {
    font-family: PingFangSC-Medium, "微软雅黑";
    font-size: 0.4rem;
    color: #FFFFFF;
  }
</style>
