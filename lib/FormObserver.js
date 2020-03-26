"use strict";
import { NavigatableObserver } from "./NavigatableObserver";
//import * as stateStore from "../store";
import { Header, Main, Nav, Footer } from "../components";

export class FormObserver extends NavigatableObserver {
  /**
   *
   * @param {*} subject is the "observable" that the observer is to observe, often called
   * observable" or "subject"
   * @param {*} stateContext state context for this observable declared when instatiated.
   * Example: state.Gallery from 'import * as state from "../store";'
   */
  constructor(subject, stateContext) {
    super(subject, stateContext);
  }

  // since we have 2 suclasses we need to completely overrride this method
  // render() {
  //   super.render();
  //   if (this.active == true) {
  //     this.addPicOnFormSubmit();
  //   }
  // }

  render() {
    if (this.active == true) {
      document.querySelector("#root").innerHTML = `
                ${Header(this.stateContext)}
                ${Nav(this.subject.stateStore.Links)}
                ${Main(this.stateContext)}
                ${Footer()}
            `;
      super.addNavEventListeners();
      this.addPicOnFormSubmit();
    }
  }

  addPicOnFormSubmit() {
    if (this.stateContext.view === "Form") {
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
        console.log(
          `addPicOnFormSubmit: this.subject.stateStore.Gallery.pictures.length = ${this.subject.stateStore.Gallery.pictures.length}`
        );
        this.subject.stateStore.Gallery.pictures.push(newPic);
        this.subject.setState(this.subject.stateStore.Gallery);
      });
    }
  }
}
