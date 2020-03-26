import { StateObserver } from "./StateObserver";

export class NavigatableObserver extends StateObserver {
  constructor(subject, stateContext) {
    super(subject, stateContext);
    subject.registerObserver(this);
  }

  render() {
    // you always need to check to make sure you are rendering an acive view
    if (this.active == true) {
      super.render();
      this.addNavEventListeners();
      this.subject.router.updatePageLinks();
    }
  }

  addNavEventListeners() {
    // add menu toggle to bars icon in nav bar
    document
      .querySelector(".fa-bars")
      .addEventListener("click", () =>
        document.querySelector("nav > ul").classList.toggle("hidden--mobile")
      );
  }
}
