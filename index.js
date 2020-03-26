import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import {
  StateSubject,
  NavigatableObserver,
  BlogObserver,
  FormObserver
} from "./lib";
// import { StateSubject } from "./lib/StateSubject";
// import { NavigatableObserver } from "./lib/NavigatableObserver";
// import { BlogObserver } from "./lib/BlogObserver";
// import { FormObserver } from "./lib/FormObserver";

const router = new Navigo(window.location.origin);

const appState = new StateSubject(state.Home, state);
// create a page set for the website, as state changes all of these
// will update via the notification mechanism of the Subject/Observer
// design pattern
const pages = [];
pages.push(new NavigatableObserver(appState, appState.stateStore.Bio)); //state.Bio));
pages.push(new FormObserver(appState, appState.stateStore.Form)); // state.Form));
pages.push(new BlogObserver(appState, appState.stateStore.Blog)); // state.Blog));
pages.push(new NavigatableObserver(appState, appState.stateStore.Gallery)); // state.Gallery));
pages.push(new NavigatableObserver(appState, appState.stateStore.Home)); // state.Home));

//when state changes, we use a clear "setState" instead of the abiguois "render"
router
  .on({
    ":page": params =>
      appState.setState(appState.stateStore[capitalize(params.page)]),
    "/": () => appState.setState(appState.stateStore.Home)
  })
  .resolve();
