import { NavigatableObserver } from "./NavigatableObserver";
import axios from "axios";

export class ApiNavigateableObserver extends NavigatableObserver {
  constructor(subject, state, url, callback) {
    super(subject, state);
    this.url = url;
    this.callback = callback;
  }

  notify(state) {
    super.notify(state);
    if (this.active == true) {
      this.getRequest();
    }
  }

  getRequest() {
    axios
      .get(this.url)
      .then(response => {
        this.callback(response);
      })
      .catch(err => console.log(err));
  }
}
