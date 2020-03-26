import { NavigatableObserver } from "./NavigatableObserver";
import axios from "axios";

/**
 * ApiNavigateableObserver is a generic base class that currently supports only one
 * get method to one url, and one callback defined by instantiation. The get request
 * is automatically called when an update is triggered (this may not be the behavior you
 * want).
 */
export class ApiNavigateableObserver extends NavigatableObserver {
  constructor(subject, state, url, callback) {
    super(subject, state);
    this.url = url;
    this.callback = callback;
  }

  // since we have 2 sublasses we need to avoid calling update twice and simple override
  update(state) {
    if (state.view == this.stateContext.view) {
      this.active = true;
      this.getRequest();
      this.render();
    } else {
      this.active = false;
    }
  }

  /**
   * getRequest uses axios to make a "get" request to the desiganted api url and call the callback
   * when the response is recieved, returning data to the appropriate recipoient.
   */
  getRequest() {
    axios
      .get(this.url)
      .then(response => {
        this.callback(response);
      })
      .catch(err => console.log(err));
  }
}
