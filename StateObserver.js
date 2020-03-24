import * as views from "./components/views";
import { Header, Nav, Footer } from "./components";
import * as stateStore from "./store";

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
                ${Nav(stateStore.Links)}
                ${views[this.stateContext.view](this.stateContext)}
                ${Footer()}
            `;
      this.addPicOnFormSubmit(this.stateContext);
    }
  }

  addPicOnFormSubmit(st) {
    if (st.view === "Form") {
      document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        // convert HTML elements to Array
        let inputList = Array.from(event.target.elements);
        // remove submit button from list
        inputList.pop();
        // construct new picture object
        let newPic = inputList.reduce((pictureObject, input) => {
          pictureObject[input.name] = input.value;
          return pictureObject;
        }, {});
        // add new picture to state.Gallery.pictures
        st.Gallery.pictures.push(newPic);
        this.subject.setState(st.Gallery);
      });
    }
  }
}
