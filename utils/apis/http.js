import { config } from '../config.js';

/**
 * A typed API client for interacting with Amadeus over HTTP.
 * @class HttpClient
 */
export class HttpClient {
  #base = config.BASE_URL;
  #token = null;

  /**
   * Sets a runtime token for authorization.
   * @param {string} token - Access token.
   */
  setToken(token) {
    this.#token = token;
  }

  /**
   * Executes a GET request.
   * @param {string} path
   * @param {Object} [options]
   * @returns {Promise<IUnifiedResponse>}
   */
  async get(path, options = {}) {
    const query = options.query
      ? '?' + new URLSearchParams(options.query).toString()
      : '';
    return this.#request(`${this.#base}${path}${query}`, 'GET', null, options);
  }

  /**
   * Executes a POST request.
   * @param {string} path
   * @param {any} body
   * @param {Object} [options]
   * @returns {Promise<IUnifiedResponse>}
   */
  async post(path, body, options = {}) {
    return this.#request(`${this.#base}${path}`, 'POST', body, options);
  }

  /**
   * Internal request wrapper.
   * @private
   * @param {string} url
   * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method
   * @param {any} [body]
   * @param {Object} options
   * @returns {Promise<IUnifiedResponse>}
   */
  #request(url, method, body, options = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        method,
        url,
        data: body ?? undefined,
        timeout: options.config?.timeout,
        header: {
          ...(this.#token ? { Authorization: `Bearer ${this.#token}` } : {}),
          'Content-Type': options.contentType || 'application/json',
          ...(options.headers || {}),
        },
        success({ statusCode, data, header }) {
          const success = statusCode >= 200 && statusCode < 300;
          const payload = {
            success,
            data: success ? data : null, // (data?.data ?? data)
            error: success ? null : { code: statusCode, message: data?.errors ?? 'Request failed' },
            headers: header,
            status: statusCode,
          }

          if (success) {
            resolve(payload);

            return
          }
          reject(payload);
        },
        fail(err) {
          reject({ success: false, data: null, error: { message: err.errMsg }, headers: {}, status: 0 });
        },
      });
    });
  }
}

export const httpClient = new HttpClient();