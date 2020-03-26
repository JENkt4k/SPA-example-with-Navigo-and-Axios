//import * as views from "../components/views";
"use strict";
import { Header, Main, Nav, Footer } from "../components";

export class StateObserver {
  constructor(subject, stateContext) {
    this.subject = subject;
    this.stateContext = stateContext;
    //this.stateContext = Object.assign(this.stateContext, stateContext); //Object.assign(
    this.active = subject.state.view == stateContext.view;
    subject.registerObserver(this);
  }

  update(state) {
    if (state.view == this.stateContext.view) {
      this.active = true;
      this.render();
    } else {
      this.active = false;
    }
  }

  render() {
    if (this.active == true) {
      document.querySelector("#root").innerHTML = `
                ${Header(this.stateContext)}
                ${Nav(this.subject.stateStore.Links)}
                ${Main(this.stateContext)}
                ${Footer()}
            `;
      this.subject.router.updatePageLinks();
    }
  }

  refreshObserver() {
    this.render();
  }
}
