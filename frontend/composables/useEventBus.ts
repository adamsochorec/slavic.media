import { reactive } from "vue";

// Removed duplicate declaration of eventBus

interface EventBus {
  [key: string]: Array<(data: any) => void> | undefined;
}

interface EventBusMethods {
  on: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
}

const eventBus = reactive<EventBus & EventBusMethods>({});

eventBus.on = (event: string, callback: (data: any) => void): void => {
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
