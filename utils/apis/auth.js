import { httpClient } from './http.js';
import { config } from '../config.js';

const TOKEN_KEY = 'backend_access_token';
const TOKEN_EXP_KEY = 'backend_token_expiry';

/**
 * Handles authentication with Amadeus API.
 */
export async function auth() {
  const now = Date.now();
  const storedToken = wx.getStorageSync(TOKEN_KEY);
  const storedExp = wx.getStorageSync(TOKEN_EXP_KEY);

  if (storedToken && storedExp && now < storedExp) {
    httpClient.setToken(storedToken);
    return storedToken;
  }

  const body = `grant_type=${config.GRANT_TYPE}&client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}`;

  const res = await new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url: `${config.BASE_URL}/v1/security/oauth2/token`,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: body,
      success: ({ data, statusCode }) => {
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data);
        } else reject(new Error(`Auth failed: ${statusCode}`));
      },
      fail: reject,
    });
  });

  const { access_token, expires_in } = res;
  const expiry = now + (expires_in * 1000) - 5000; // refresh 5s early

  wx.setStorageSync(TOKEN_KEY, access_token);
  wx.setStorageSync(TOKEN_EXP_KEY, expiry);
  httpClient.setToken(access_token);

  return access_token;
}