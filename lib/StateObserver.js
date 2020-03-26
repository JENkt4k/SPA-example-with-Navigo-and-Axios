import { Header, Main, Nav, Footer } from "../components";

/**
 * StateObserver is the base class observer for the StateSubject "observable". It is the
 * Observer component of the GoF Observer Pattern. When the StateSubject notifies the
 * SateObserver of a change, it will be processed here, on in a subclass of this class.
 */
export class StateObserver {
  constructor(subject, stateContext) {
    this.subject = subject;
    this.stateContext = stateContext;
    //this.stateContext = Object.assign(this.stateContext, stateContext); //Object.assign(
    this.active = subject.state.view == stateContext.view;
    subject.registerObserver(this);
  }

  /**
   * Called from the StateSubject notify method
   * @param {*} state the state we are transitioning to.
   */
  update(state) {
    // make sure I'm the appropriate observer to handled this transition
    if (state.view == this.stateContext.view) {
      this.active = true;
      this.render();
    } else {
      // if not, do nothing, and set active to false
      this.active = false;
    }
  }

  /**
   * render all changes associated with this transition
   */
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

  /**
   * helper method for simple refreshes not captured/induced by state changes
   */
  refreshObserver() {
    this.render();
  }
}
