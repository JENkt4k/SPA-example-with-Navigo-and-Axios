import * as views from "../components/views";
import { Header, Nav, Footer } from "../components";

export class StateObserver {
  constructor(subject, stateContext) {
    this.subject = subject;
    this.stateContext = stateContext;
    this.active = subject.state.view == stateContext.view;
    subject.registerObserver(this);
  }

  notify(state) {
    if (state.view == this.stateContext.view) {
      this.active = true;
    } else {
      this.active = false;
    }
    this.render();
  }

  render() {
    if (this.active == true) {
      document.querySelector("#root").innerHTML = `
                ${Header(this.stateContext)}
                ${Nav(this.subject.stateStore.Links)}
                ${views[this.stateContext.view](this.stateContext)}
                ${Footer()}
            `;
    }
  }

  refreshObserver() {
    this.render();
  }
}
