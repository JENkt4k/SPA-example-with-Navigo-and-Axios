export class StateSubject {
  constructor(state) {
    this.observables = [];
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notifyObservers(this.state);
  }

  notifyObservers(state) {
    this.observables.forEach(element => {
      element.notify(state);
    });
  }

  registerObserver(stateObserver) {
    this.observables.push(stateObserver);
  }

  unregisterObserver(stateObserver) {
    this.observables = this.observables.filter(obs => obs !== stateObserver);
  }
}
