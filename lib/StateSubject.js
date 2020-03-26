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

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notify(this.state);
  }

  notify(state) {
    this.observables.forEach(element => {
      element.update(state);
    });
  }

  registerObserver(stateObserver) {
    this.observables.push(stateObserver);
  }

  unregisterObserver(stateObserver) {
    this.observables = this.observables.filter(obs => obs !== stateObserver);
  }

  refreshStateView() {
    this.observables.forEach(element => {
      element.refreshObserver();
    });
  }
}
