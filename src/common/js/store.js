import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    motai: false,
    is_oban:false,
    motai_num: '',
    //模态窗口动画
    school_class: '',
    //分享模态窗口的显示状态
    share_: false,
    //公寓ID
    house_check_num: '选择您所租住的公寓品牌',
    //选择院校城市的ID
    city_check_num: '选择您希望购房所在的城市',
    //毕业院校的ID
    school_check_num: '选择您的毕业院校',
    //城市ID
    city_house_num: '选择您希望购房所在的城市',
    //公寓名
    house_check_value: '选择您所租住的公寓品牌',
    //选择院校城市名
    city_check_value: '选择您希望购房所在的城市',
    //选择院校名
    school_check_value: '选择您的毕业院校',
    //城市名
    city_house_value: '选择您希望购房所在的城市',
    //计算结果
    set_sum: '300',
    //实时更新人数
    people_num: 0,
    //所有城市名称
    city_arr: [],
    //所有公寓名称
    house_arr: [],
    //院校侧拉框的城市以及院校
    city_school_city_arr: []
  },
  mutations: {

    //遮罩框的显示状态
    ismotai(state){
      state.motai = !state.motai;
    },
    //确认渲染哪一个遮罩框组件
    set_motai(state, data){
      state.motai_num = data;
    },
    //遮罩框显示的样式
    set_school_class(state, data){
      state.school_class = data;
    },
    //记录每一次点击的公寓ID
    house_click(state, data){
      state.house_check_num = data;
    },
    //记录每一次点击的院校城市ID
    city_click(state, data){
      state.city_check_num = data;
    },
    //记录每一次点击的城市ID
    city_house_click(state, data){
      state.city_house_num = data;
    },
    //记录每一次点击的院校ID
    school_click(state, data){
      state.school_check_num = data;
    },
    //清除学校的val
    clean_state(state){
      state.school_check_num = '';
      state.school_check_value = '选择您的毕业院校'
    },
    //清除所有默认val
    clean_all(state){
      state.city_check_num = '';
      state.school_check_num = '';
      state.city_house_num = '';
      state.house_check_num = '';
      state.city_check_value = '选择您希望购房所在的城市';
      state.city_house_value = '选择您希望购房所在的城市';
      state.school_check_value = '选择您的毕业院校';
      state.house_check_value = '选择您所租住的公寓品牌';
    },
    //分享模态窗口的显示状态
    is_share(state){
      state.share_ = !state.share_;
    },
    //更改计算结果
    change_set_sum(state, data){
      state.set_sum = data;
    },
    //拿到所有城市
    city_arr_push(state, data){
      if (state.city_arr.length == 0) {
        data.forEach((key, index) => {
          state.city_arr.push(key);
        })
      }
      return;
    },
    //拿到所有院校城市
    city_school_arr_push(state, data){
      if (state.city_school_city_arr.length == 0) {
        data.forEach((key, index) => {
          state.city_school_city_arr.push(key);
        })
      }
      return;
    },
    //拿到所有院校
    house_arr_push(state, data){
      if (state.house_arr.length == 0) {
        data.forEach((key, index) => {
          state.house_arr.push(key);
        })
      }
      return;
    },
    //记录每一次点击的公寓名
    house_arr_value(state, data){
      state.house_check_value = state.house_arr[data].apartmentName;
    },
    //记录每一次点击的院校城市名
    city_check_value(state, data){
      state.city_check_value = state.city_arr[data].provinceName;
    },
    //记录每一次点击的城市名
    city_house_value(state, data){
      state.city_house_value = state.city_arr[data].cityName;
    },
    //记录每一次点击的院校名
    school_check_value(state, data){
      state.school_check_value = data;
    },
    //更改测试人数
    people_num_change(state, data){
      state.people_num = data;
    },
    change_is_oban(state){
      state.is_oban = !state.is_oban;
    }
  },

});
export default store;
