"use strict";
import { NavigatableObserver } from "./NavigatableObserver";
import axios from "axios";

export class ApiNavigateableObserver extends NavigatableObserver {
  constructor(subject, state, url, callback) {
    super(subject, state);
    this.url = url;
    this.callback = callback;
  }

  // since we have 2 sublasses we need to avoid calling update twice and simple overrride
  update(state) {
    super.update(state);
    if (this.active == true) {
      this.getRequest();
    }
  }

  // update(state) {
  //   if (state.view == this.stateContext.view) {
  //     this.active = true;
  //     this.getRequest();
  //     this.render();
  //   } else {
  //     this.active = false;
  //   }
  // }

  getRequest() {
    axios
      .get(this.url)
      .then(response => {
        this.callback(response);
      })
      .catch(err => console.log(err));
  }
}
