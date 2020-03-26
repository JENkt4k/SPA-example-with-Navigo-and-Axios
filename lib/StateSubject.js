/**
 * Class "StateSubject" is the base class for the "observable" in the observer pattern.
 * The "subject" ("observable") contains the state data, when we want to update the state,
 * we do so via the StateSubject.setState method. The "observers" are coupled to the "subject"
 * via the "registerObserver". When the state is updated the "subject" calls the "update" method
 * on all registered "observers". The "observers" process/handle the update.
 * This is exactly like how event listeners work with the "addEventListener()" method.
 */
export class StateSubject {
  constructor(state, stateStore, router) {
    this.observables = [];
    this.state = state;
    this.stateStore = stateStore;
    this.router = router;
  }

  /**
   * return the current state
   */
  getState() {
    return this.state;
  }

  /**
   * Set the current state and call notify
   * @param {*} state The state to be updated to
   */
  setState(state) {
    this.state = state;
    this.notify(this.state);
  }

  /**
   * Notify all observers that state has changed
   * @param {*} state The state being updated to
   */
  notify(state) {
    this.observables.forEach(element => {
      element.update(state);
    });
  }

  /**
   * register another observer
   * @param {StateObserver} stateObserver the observer we whish to registar
   */
  registerObserver(stateObserver) {
    this.observables.push(stateObserver);
  }

  /**
   * Remove observer from the list of observers, it will no longer get notifications
   * @param {*} stateObserver the observer to be unregistered, must be exact instance.
   */
  unregisterObserver(stateObserver) {
    this.observables = this.observables.filter(obs => obs !== stateObserver);
  }

  /**
   * helper method to refresh views of all observers.
   */
  refreshStateView() {
    this.observables.forEach(element => {
      element.refreshObserver();
    });
  }
}
