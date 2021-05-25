/**
 * 网络请求配置
 */
import axios from 'axios';

//  超时
axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'http://fmu.tencentcloudapi.com';

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log('过期');
    }
    return response;
  },
  (error) => {
    console.log('请求出错：', error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: string, data: any) {
  let date = new Date()
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          // v3 签名 数据类型：json
          'Content-Type': 'application/json;charset=UTF-8',
          // 必须公共参数 Header
          'X-TC-Action':'StyleImagePro',
          'X-TC-Timestamp':+ date,
          'X-TC-Version':'2019-12-13',
          'Authorization':`TC3-HMAC-SHA256 Credential=AKID4xaw1pNdcJjtmOimZ5LL4WgZBVYJo1xb/${date.toUTCString()}/fmu/tc3_request, SignedHeaders=content-type;host, Signature=fe5f80f77d5fa3beca038a248ff027d0445342fe2855ddc963176630326f1024`,


        },
      })
      .then(
        (response) => {
          //关闭进度条
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

//失败提示
function msag(err: any) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert('未授权，请登录');
        break;

      case 403:
        alert('拒绝访问');
        break;

      case 404:
        alert('请求地址出错');
        break;

      case 408:
        alert('请求超时');
        break;

      case 500:
        alert('服务器内部错误');
        break;

      case 501:
        alert('服务未实现');
        break;

      case 502:
        alert('网关错误');
        break;

      case 503:
        alert('服务不可用');
        break;

      case 504:
        alert('网关超时');
        break;

      case 505:
        alert('HTTP版本不受支持');
        break;
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url: string, params: any, data: any) {
  if (data.code === -1) {
  }
}
