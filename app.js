import { Bus } from "./utils/event/index";

//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    /** @type {EventBus} */
    eventBus: Bus
  }
})