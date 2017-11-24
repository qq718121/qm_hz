import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    motai: false,
    motai_num: '',
    school_class: '',
    share_: false,

    house_check_num: '选择您所租住的公寓品牌',
    city_check_num: '选择您希望购房所在的城市',
    school_check_num: '选择您的毕业院校',
    city_house_num: '选择您希望购房所在的城市',

    house_check_value: '选择您所租住的公寓品牌',
    city_check_value: '选择您希望购房所在的城市',
    school_check_value: '选择您的毕业院校',
    city_house_value: '选择您希望购房所在的城市',

    set_sum: '300',

    city_arr: [],
    house_arr: []
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
    //点击每一项进行赋值
    house_click(state, data){
      state.house_check_num = data;
    },
    city_click(state, data){
      state.city_check_num = data;
    },
    city_house_click(state, data){
      state.city_house_num = data;
    },
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
    is_share(state){
      state.share_ = !state.share_;
    },
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
    //拿到所有院校
    house_arr_push(state, data){
      if (state.house_arr.length == 0) {
        data.forEach((key, index) => {
          state.house_arr.push(key);
        })
      }
      return;
    },
    //根据index为value赋值
    house_arr_value(state, data){
      state.house_check_value = state.house_arr[data].apartmentName;
    },
    //根据index为value赋值
    city_check_value(state, data){
      state.city_check_value = state.city_arr[data].provinceName;
    },
    city_house_value(state, data){
      state.city_house_value = state.city_arr[data].provinceName;
    },
    //根据index为value赋值
    school_check_value(state, data){
      state.school_check_value = data;
    }
  },

});
export default store;
