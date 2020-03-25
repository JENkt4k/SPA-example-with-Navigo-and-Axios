//import { PubSub } from "./PubSub";
export class BlogSubscriber {
  constructor(publisher, observer) {
    //super();
    this.publisher = publisher;
    this.observer = observer;
  }

  processResponse(data) {
    if (this != null) {
      this.observer.processRequestResponse(data);
    }
  }

  subscribe() {
    this.publisher.subscribe("blogs", this.processResponse);
  }
}
