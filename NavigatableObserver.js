import { StateObserver } from "./StateObserver";

export class NavigatableObserver extends StateObserver {
  constructor(subject, stateContext) {
    super(subject, stateContext);
    subject.registerObserver(this);
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
