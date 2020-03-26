import { StateObserver } from "./StateObserver";

/**
 * NavigatableObserver is a sub-class of StateObserver that encapsulates the
 * "addNavEventListeners" method for navigation. It's mostly for demonstration
 * purposes as "addNavEventListeners" could be included in StateObserver. test.
 */
export class NavigatableObserver extends StateObserver {
  constructor(subject, stateContext) {
    super(subject, stateContext);
    subject.registerObserver(this);
  }

  /**
   * render content
   */
  render() {
    // you always need to check to make sure you are rendering an acive view
    if (this.active == true) {
      super.render();
      this.addNavEventListeners();
    }
  }

  /**
   * add on click listener to show nav link menu when hidden
   */
  addNavEventListeners() {
    // add menu toggle to bars icon in nav bar
    document
      .querySelector(".fa-bars")
      .addEventListener("click", () =>
        document.querySelector("nav > ul").classList.toggle("hidden--mobile")
      );
  }
}
