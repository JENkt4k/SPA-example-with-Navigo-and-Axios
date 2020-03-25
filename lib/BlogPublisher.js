import { PubSub } from "./PubSub";
import axios from "axios";
export class BlogPublisher extends PubSub {
  constructor() {
    super();
    this.url = "https://jsonplaceholder.typicode.com/posts";
  }

  intiateRequest() {
    //var self = this;
    if (this != null) {
      axios
        .get(this.url)
        .then(response => {
          //self.onResultRecieved.bind(response);
          if (this != null) {
            this.onResultRecieved(response);
          }
        })
        .catch(err => console.log(err));
    }
    return true;
  }

  onResultRecieved(response) {
    //super.publish("blogs", response);
    this.publish("blogs", response);
  }
}
