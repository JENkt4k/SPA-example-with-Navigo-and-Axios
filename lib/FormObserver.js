import { NavigatableObserver } from "./NavigatableObserver";
/**
 * Another demonstration sub-class, "FormObserver" contains code specific to the form page.
 * while it is unecessary to break this code out, more complex websites often benefit by
 * grouping code in more digestable chunks.
 */
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
  render() {
    super.render();
    if (this.active == true) {
      this.addPicOnFormSubmit();
    }
  }

  /**
   * add event listener to add a image to the gallery and then show the gallery.
   */
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
        this.subject.stateStore.Gallery.pictures.push(newPic);
        this.subject.router.navigate("/Gallery"); // we must use this instead of "setState"
      });
    }
  }
}
