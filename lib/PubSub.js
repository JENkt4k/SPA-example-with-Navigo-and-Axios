export class PubSub {
  constructor() {
    this.subscribers = null;
  }

  publish(event, data) {
    if (this != null)
      if (this.subscribers != null) {
        if (!this.subscribers[event]) {
          return;
        }

        this.subscribers[event].forEach(subscriberCallback =>
          subscriberCallback(data)
        );
      }
  }

  subscribe(event, callback) {
    if (this.subscribers == null) {
      this.subscribers = {};
    }
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }
}
