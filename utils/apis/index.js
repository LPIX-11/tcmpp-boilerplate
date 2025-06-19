import { httpClient } from './http.js';

export class BackendAPI {
  /**
   * @type {IAPIClient}
   */
  #client

  constructor() {
    this.#client = httpClient;
  }
}

// Singleton export for now, can be replaced with DI later
export const backendAPI = new BackendAPI();