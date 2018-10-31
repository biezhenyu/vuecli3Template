// 工具类
export default {

  /**
   * 
   * @param {*} data 接口需要的数据
   * @param {*} url 接口地址
   */
  exportExcl(data, url) {
    var formHtml = `<form id='downLoadForm' style='display:none' method='post' action=${url}>`;
    for (let key in data) {
      formHtml += `<input type='hidden' name='${key}' value='${data[key]}'>`
    }
    formHtml  += `</form>`;
    var divDom = document.createElement("div")
    divDom.innerHTML = formHtml
    document.body.appendChild(divDom)
    document.getElementById("downLoadForm").submit()
    document.body.removeChild(divDom)
  },
  
  
  // 四舍五入保留小数
  /*
   *  num 传入的值
   *  len 保留小数的长度
   */
  getRound(num, len) {
    return Math.round(num * Math.pow(10, len)) / Math.pow(10, len)
  },

  // 验证邮箱
  isEmail(val) {
    let myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/
    return myreg.test(val)
  },

  // 转换图片为base64
  conversionImageToBase64(file, cb) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(this.result);
    }
  }
};