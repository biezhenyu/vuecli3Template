// 全局过滤器配置

import moment from "moment"; // 时间处理库
import Vue from "vue";

let filtersData = {
  dateFormat: (value, fmt = "YYYY-MM-DD") => {
    return value ? moment(value).format(fmt) : "";
  }
};

for (let key in filtersData) {
  Vue.filter(key, filtersData[key]);
}
export default filtersData;