import config from '../config.js';

/**
 * A typed API client for interacting with the CMS over HTTP.
 *
 * @class HttpClient
 * @implements {IAPIClient}
 */
export class HttpClient {
  /**
   * Base URL for the CMS API.
   * @type {string}
   * @private
   */
  #base = config.BASE_URL;

  /**
   * Base URL for public CMS assets.
   * @type {string}
   * @private
   */
  #assets = config.ASSETS_URL;

  /**
   * Public API key for authorization.
   * @type {string}
   * @private
   */
  #token = config.PUBLIC_API_KEY;

  /**
   * Executes a GET request.
   *
   * @param {string} path - Endpoint path to hit.
   * @param {Object} [options]
   * @param {IParams} [options.query] - Optional query parameters
   * @param {IHeaders} [options.headers] - Custom headers
   * @param {IRequestOptions} [options.config] - Request-level config
   * @returns {Promise<IAPIResponse>}
   */
  async get(path, options = {}) {
    const query = options.query
      ? '?' + new URLSearchParams(options.query).toString()
      : '';

    return this.#request(`${this.#base}${path}${query}`, 'GET', null, options);
  }

  /**
   * Executes a POST request.
   *
   * @param {string} path - Endpoint path to hit.
   * @param {any} body - Request payload.
   * @param {Object} [options]
   * @param {IHeaders} [options.headers] - Custom headers
   * @param {IRequestOptions} [options.config] - Request-level config
   * @returns {Promise<IAPIResponse>}
   */
  async post(path, body, options = {}) {
    return this.#request(`${this.#base}${path}`, 'POST', body, options);
  }

  /**
   * Internal request wrapper for all HTTP methods.
   *
   * @private
   * @param {string} url - Fully constructed URL.
   * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method - HTTP method.
   * @param {any} [body] - Payload to send (if applicable).
   * @param {Object} options
   * @param {IHeaders} [options.headers]
   * @param {IRequestOptions} [options.config]
   * @returns {Promise<IAPIResponse>}
   */
  #request(url, method, body, options = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        method,
        url,
        data: body ?? undefined,
        timeout: options.config?.timeout,
        header: {
          Authorization: `Bearer ${this.#token}`,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        success({ statusCode, data, header }) {
          const normalized = /** @type {IAPIResponse} */ ({
            status: statusCode,
            data: data?.data ?? data,
            headers: header,
          });

          if (statusCode >= 200 && statusCode < 300) {
            resolve(normalized);
          } else {
            reject(new Error(`[REQ. Error] ${statusCode}`));
          }
        },
        fail: reject,
      });
    });
  }
}

/**
 * Singleton instance of the CMS client.
 * Can be replaced with DI/factory later.
 *
 * @type {HttpClient}
 */
export const httpClient = new HttpClient();