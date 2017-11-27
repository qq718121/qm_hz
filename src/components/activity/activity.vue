<template>
  <div class="activity">
    <div class="activity_header">
      <div class="activity__btn"><span @click="activity_rules('1','animated bounceIn')">活动规则</span><span
        @click="href_($url.qm_more_http)">常见问题</span><span @click="share_">邀好友领取</span></div>
      <div id="animated-number-demo" class="activity__foot_text">已有{{now}}人测算过</div>
    </div>

    <div class="activity_count">
      <div class="activity_count__sum"><span class="activity_count__img"><img :src="mouse_plan"
                                                                              alt=""></span><span
        class="activity_count__date">元/月</span></div>
      <div class="select_city" @click="activity_rules('3','animated bounceIn')"><p>
        <span>{{activity_data.city_house_data}}</span><span
        class="el-icon-arrow-right"></span></p></div>

      <div class="select_school" @click="activity_rules('6','animated bounceInRight')">
        <p><span>{{activity_data.school_data}}</span><span class="el-icon-arrow-right"></span></p>
      </div>

      <div class="select_name" @click="activity_rules('2','animated bounceIn')">
        <p><span>{{activity_data.house_data}}</span><span class="el-icon-arrow-right"></span></p>
      </div>

      <div class="select_tel">
        <el-form :model="activity_data" status-icon :rules="rules2" ref="activity_data" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item>
            <el-input v-model.number="activity_data.age" placeholder="输入手机号，补贴领取凭证将发送到您的手机"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="select_sum" @click="last_btn">马上计算</div>
    </div>

    <div class="activity_cooperation">
      <div class="activity__house">
        <p @click="href_($url.qm_look_http)">了解更多</p>
        <div class="activity___list">
          <div><img :src="this.$url.qm_icon_mofei" alt=""></div>
          <div><img :src="this.$url.qm_icon_mijia" alt=""></div>
          <div><img :src="this.$url.qm_icon_qingning" alt=""></div>
          <div><img :src="this.$url.qm_icon_zhonghe" alt=""></div>
          <div><img :src="this.$url.qm_icon_jiashang" alt=""></div>
          <div><img :src="this.$url.qm_icon_zy" alt=""></div>
          <div><img :src="this.$url.qm_icon_yizhan" alt=""></div>
          <div><img :src="this.$url.qm_icon_xinmeiyu" alt=""></div>
        </div>
      </div>
    </div>

    <div class="activity_flow">
      <div class="activity__look">
        <p><span>1</span><span>关注青芒盒子；</span></p>
        <p><span>2</span><span>测算补贴金额；</span></p>
        <p><span>3</span><span>购买青芒盒子指定楼盘；</span></p>
        <p><span>4</span><span>联系青芒盒子客服，提交资料；</span></p>
        <p><span>5</span><span>青芒盒子核对信息，发放补贴。</span></p>
      </div>
      <a
        href="http://mp.weixin.qq.com/s?__biz=MzIzMTc5NzQxMg==&mid=100006153&idx=1&sn=2efa5c1abc818afe0b881287d7371896&chksm=689ffec25fe877d444a4b71ddfefd6f1fd8f71222b0c3976ced984c4f5c1870b3c8eec201b2c#rd"
        class="activity__data">租金补贴活动详情介绍</a>
      <div class="activity__logo"></div>
    </div>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        timg_num: 0,
        people_num: this.$store.state.people_num,
        mouse_plan: '',
        share_title: '百万租金补贴疯狂派送',
        share_desc: '',
        inter: '',
        tel: new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/),
        rules2: {
          age: [
            {validator: this.checkAge, trigger: 'blur'}
          ]
        },
        activity_data: {
          city_data: '',
          school_data: '选择您的毕业院校',
          house_data: '选择您所租住的公寓品牌',
          age: '',
          city_house_data: '选择您希望购房所在的城市'
        },
      }
    },
    created(){
      this.update_people();
      //监听moban确定按钮的事件，
      this.$bus.$on('house_click', () => {
        this.render_data();
      });
      this.$bus.$on('age_clean', () => {
        this.activity_data.age = '';
      });
      this.timg(this.$url.qm_img_arr);
    },
    mounted(){
      this.city_http();
      this.house_http();
      this.city_school_http();
      let this_ = this;
      let id = setInterval(function () {
        this_.update_people();
      }, 20000);
    },
    methods: {
      //moban跳出之后渲染的内容以及动画效果
      activity_rules(num, className){
        this.$store.commit('set_motai', num);
        this.$store.commit('set_school_class', className);
      },
      //马上计算
      last_btn(){
        let state = this.$store.state;
        if (state.city_house_value == '选择您希望购房所在的城市' ||
          state.school_check_value == '选择您的毕业院校' ||
          state.house_check_value == '选择您所租住的公寓品牌'
        ) {
          this.activity_rules('4', 'animated bounceIn');
          return;
        } else if (!this.activity_data.age) {
          this.share_error('请填写手机号噢亲');
          return;
        } else if (!(this.tel.test(this.activity_data.age))) {
          this.share_error('请填写正确手机号噢亲');
          return;
        }

        let house_id = this.$store.state.house_check_num;
//        let city_id = this.$store.state.city_check_num;
        let school_id = this.$store.state.school_check_num;
        let city_house_id = this.$store.state.city_house_num;
        let age = this.activity_data.age;
        let url = this.$url.count + city_house_id + '/' + house_id + '/' + school_id + '/' + age;
        this.http_request(url);
        this.$store.commit('change_set_sum', '155');
        this.share_success();
        this.activity_rules('5', 'animated bounceIn');
      },
      href_(url){
        window.location.href = url;
      },
      share_success(){
        this.$store.commit('set_school_class', 'animated bounceOutRight');
      },
      share_error(err) {
        this.$message.error({
          title: '错误',
          message: err
        });
      },
      share_(){
        this.$store.commit('is_share');
//        this.$weixin(this.share_title, this.share_desc);
      },
      //img的定时闪动
      timg_ftn(){
        let arr = this.$url.qm_img_arr;
        let len = this.$url.qm_img_arr.length;
        this.mouse_plan = arr[this.timg_num];
        this.timg_num++;
        if (this.timg_num == len) {
          this.timg_num = 0;
        }
      },
      timg(){
        this.inter = setInterval(this.timg_ftn, 250);
      },
      people(){
        let date = new Date();
      },

      //组件销毁以后要清定时器
      destroyed(){
        clearInterval(this.inter);
      },
      //全局的状态值改变之后进行重新渲染数据
      render_data(){
        let state = this.$store.state;
//        this.mouse_plan = this.$url.qm_num_999;
        this.activity_data.city_data = state.city_check_value;
        this.activity_data.city_house_data = state.city_house_value;
        this.activity_data.school_data = state.school_check_value;
        this.activity_data.house_data = state.house_check_value;
      },
      set_sum(data){
        this.$bus.$emit('set_sum', data);
      },
      //发送请求
      http_request(url){
        let this_ = this;
        this.$Axios.post(url).then(function (res) {
          this_.$store.commit('change_set_sum', res.data);
          this_.share_success();
          this_.activity_rules('5', 'animated bounceIn');
          console.log(res.data);
        }).catch(function (err) {
          console.log(err);
        });
      },
//      获取院校城市
      city_school_http(){
        let this_ = this;
        this.$Axios.post(this.$url.get_school_city).then(function (res) {

          this_.$store.commit('city_school_arr_push', res.data);

        }).catch(function (err) {
          console.log(err);
        });
      },
      //获取公寓
      house_http(){
        let this_ = this;
        this.$Axios.post(this.$url.get_house).then(function (res) {
          this_.$store.commit('house_arr_push', res.data);
        }).catch(function (err) {
          console.log(err);
        });
      },
      //获取城市
      city_http(){
        let this_ = this;
        this.$Axios.post(this.$url.get_city).then(function (res) {
           this_.$store.commit('city_arr_push', res.data);

        }).catch(function (err) {
          console.log(err);
        });
      },
      //更新在线人数
      update_people(){
        let this_ = this;
        this.$Axios.get(this.$url.update_people + '/20/1').then(function (res) {
          this_.people_num = res.data;
          this_.share_desc = '已有' + this_.people_num + '人领取，你也快来试试';
          this_.$store.commit('people_num_change', this_.people_num);
          this_.$weixin(this_.share_title, this_.share_desc);
        }).catch(function (err) {
          console.log(err);
        });
      }
    },
    computed: {
      now: function () {
        if (!this.people_num) {
          return 0;
        }
        return this.people_num;
      }
    }
  }
</script>

<style scoped>
  .activity {
    margin: auto;
    width: 7.5rem;
  }

  .activity_header {
    width: 7.5rem;
    background-image: url("http://oxrgdeqd8.bkt.clouddn.com/banner.png");
    height: 7.8rem;
    background-size: 100%;
    position: relative;
  }

  .activity_count {
    width: 7.5rem;
    background-image: url("http://oxrgdeqd8.bkt.clouddn.com/bg_blue@3x.png?imageslim");
    height: 12.04rem;
    background-size: 100%;
    margin-top: -0.42rem;
    position: relative;
  }

  .activity_cooperation {
    width: 7.5rem;
    background-image: url("http://oxrgdeqd8.bkt.clouddn.com/bg_yellow@3x.png?imageslim");
    height: 9.05rem;
    background-size: 100%;
    margin-top: -0.42rem;
    position: relative;
  }

  .activity_flow {
    width: 7.5rem;
    background-image: url("http://oxrgdeqd8.bkt.clouddn.com/bg_purple@3x.png?imageslim");
    height: 8.03rem;
    background-size: 100%;
    margin-top: -0.42rem;
    position: relative;
  }

  .activity__btn {
    width: 7rem;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 5.5rem;
    left: 0.25rem;
  }

  .activity__btn span {
    display: inline-block;
    width: 2.2rem;
    height: 0.74rem;
    background-image: url("http://oxrgdeqd8.bkt.clouddn.com/Button_Small@3x.png?imageslim");
    background-size: 100%;
    font-family: PingFangSC-Medium, "微软雅黑";
    font-size: 0.28rem;
    color: #A63C23;
    line-height: 0.71rem;
    text-align: center;
    font-weight: 600;
  }

  .activity__foot_text {
    width: 7rem;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 6.5rem;
    left: 0.25rem;
    font-family: PingFangSC-Medium;
    font-size: 0.36rem;
    color: #FFFFFF;
    text-align: center;
  }

  .activity__house {
    width: 6.92rem;
    height: 4.94rem;
    background: #FEFEF2;
    border-radius: 0.16rem;
    margin: auto;
    position: absolute;
    top: 2.8rem;
    left: 0.29rem;
  }

  .activity__house p {
    width: 6.36rem;
    font-family: PingFangSC-Medium, "微软雅黑";
    font-size: 0.28rem;
    color: #FF8B16;
    font-weight: 600;
    text-align: right;
    margin: 0.28rem auto;
  }

  .activity___list {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }

  .activity___list div {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.25rem 0.25rem 0.25rem 0.25rem;
  }

  .activity___list div img {
    width: 1.2rem;
    height: 1.2rem;
  }

  .activity__look {
    width: 6.9rem;
    height: 3.1rem;
    background: rgba(0, 0, 0, 0.13);
    border-radius: 0.08rem;
    position: absolute;
    left: 0.3rem;
    top: 2.8rem;
    padding: 0.3rem 0 0 0;
  }

  .activity__look p {
    padding-left: 0.4rem;
  }

  .activity__look p span:nth-child(2) {
    opacity: 0.8;
    font-family: PingFangSC-Medium, "微软雅黑";
    font-size: 0.26rem;
    color: #E0D0EA;
    line-height: 0.54rem;
    margin-left: 0.2rem;
  }

  .activity__look p span:nth-child(1) {
    display: inline-block;
    font-family: PingFangSC-Medium, "微软雅黑";
    font-size: 0.24rem;
    color: #fff;
    line-height: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.3rem;
    background: rgba(0, 0, 0, 0.13);
    text-align: center;
  }

  .activity__data {
    width: 6.9rem;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 0.24rem;
    color: #FBFA1A;
    letter-spacing: -0.1px;
    position: absolute;
    left: 0.3rem;
    top: 6.5rem;
  }

  .activity__logo {
    width: 1.46rem;
    height: 0.34rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/logo@3x.png');
    background-size: 100%;
    position: absolute;
    top: 7.05rem;
    left: 3.05rem;
  }

  .activity_count__sum {
    width: 6.4rem;
    height: 1.2rem;
    margin: auto;
    background: #FEFEF2;
    border: 0.06rem solid #9BCAFF;
    border-radius: 0.04rem;
    position: absolute;
    top: 2.7rem;
    left: 0.45rem;
  }

  .activity_count__date {
    position: absolute;
    right: 0.2rem;
    top: 0.54rem;
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    color: #212832;
  }

  .activity_count__img {
    display: inline-block;
    width: 1.29rem;
    height: 0.8rem;
    position: absolute;
    right: 1rem;
    top: 0.32rem;
  }

  .activity_count__img img {
    width: 1.76rem;
    height: 0.562rem;
  }

  .select_city {
    width: 6.52rem;
    height: 0.88rem;
    position: absolute;
    top: 4.4rem;
    left: 0.45rem;
    background: #fff;
    border-radius: 0.08rem;
    font-family: PingFangSC-Medium;
    font-size: 0.26rem;
    color: #8B949E;
  }

  .select_city p {
    width: 6rem;
    line-height: 0.88rem;
    display: flex;
    justify-content: space-between;
    margin: auto;
    color: #8B949E;
  }

  .select_city span {
    line-height: 0.88rem;
  }

  .select_school {
    width: 6.52rem;
    height: 0.88rem;
    position: absolute;
    top: 5.7rem;
    left: 0.45rem;
    background: #fff;
    border-radius: 0.08rem;
    font-family: PingFangSC-Medium;
    font-size: 0.26rem;
    color: #8B949E;
  }

  .select_school p {
    width: 6rem;
    line-height: 0.88rem;
    display: flex;
    justify-content: space-between;
    margin: auto;
    color: #8B949E;
    font-family: PingFangSC-Medium;
    font-size: 0.26rem;
  }

  .select_school span {
    line-height: 0.88rem;
  }

  .select_name {
    width: 6.52rem;
    height: 0.88rem;
    position: absolute;
    top: 7rem;
    left: 0.45rem;
    background: #fff;
    border-radius: 0.08rem;
    font-family: PingFangSC-Medium;
    font-size: 0.26rem;
    color: #8B949E !important;
  }

  .select_name p {
    width: 6rem;
    line-height: 0.88rem;
    display: flex;
    justify-content: space-between;
    margin: auto;
    color: #8B949E;
  }

  .select_name span {
    line-height: 0.88rem;
  }

  .select_tel {
    width: 6.52rem;
    height: 0.88rem;
    position: absolute;
    top: 8.3rem;
    left: 0.45rem;
  }

  .select_sum {
    width: 6.52rem;
    height: 1.01rem;
    position: absolute;
    top: 9.8rem;
    left: 0.45rem;
    background-image: url('http://oxrgdeqd8.bkt.clouddn.com/Button_large@3x.png?imageslim');
    background-size: 100%;
    line-height: 1.01rem;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    color: #A63C23;
    text-align: center;
  }

</style>

<style>
  /*选择器*/
  .el-form-item__content {
    margin-left: 0px !important;
  }

  .el-input__inner {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.26rem;
    border: none;
  }

  .el-notification {
    height: 1rem;
  }
</style>
