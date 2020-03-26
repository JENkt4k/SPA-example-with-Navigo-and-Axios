//"use strict";
//import * as state from "../store";
export class StateSubject {
  constructor(state, stateStore, router) {
    //state, stateStore) {
    this.observables = [];
    this.state = state;
    this.stateStore = stateStore; //stateStore;
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
