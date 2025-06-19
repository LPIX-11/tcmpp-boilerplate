import config from './../config';

export class BackendAPI {
  /** @type {string} */
  base = config.BASE_URL;

  /** @type {string} */
  assets = config.ASSETS_URL;

  /** @type {string} */
  token = config.PUBLIC_API_KEY;

  /**
   * General fetch utility for CMS
   * @param {string} path
   * @returns {Promise<any>}
   */
  async #get(path) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.base}${path}`,
        header: {
          Authorization: `Bearer ${this.token}`,
        },
        success({ statusCode, data }) {
          if (statusCode === 200) resolve(data.data);
          else reject(new Error(`[CMS Error] ${statusCode}`));
        },
        fail: reject,
      });
    });
  }

  /**
   * General fetch utility for CMS
   * @param {string} path
   * @returns {Promise<any>}
   */
  async #post(path, body) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${this.base}${path}`,
        header: {
          Authorization: `Bearer ${this.token}`,
        },
        data: body,
        success({ statusCode, data }) {
          if ([200, 201].includes(statusCode)) resolve(data.data);
          else reject(new Error(`[CMS Error] ${statusCode}`));
        },
        fail: reject,
      });
    });
  }
}

// Singleton export for now, can be replaced with DI later
export const backendAPI = new BackendAPI();