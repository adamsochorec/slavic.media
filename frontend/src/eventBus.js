import { reactive } from "vue";

const eventBus = reactive({});

eventBus.on = (event, callback) => {
  if (!eventBus[event]) {
    eventBus[event] = [];
  }
  eventBus[event].push(callback);
};

eventBus.emit = (event, data) => {
  if (eventBus[event]) {
    eventBus[event].forEach((callback) => callback(data));
  }
};

export default eventBus;
