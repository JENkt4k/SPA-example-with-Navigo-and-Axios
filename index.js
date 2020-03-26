import Navigo from "navigo";
import { capitalize } from "lodash";
import * as state from "./store";
import {
  StateSubject,
  NavigatableObserver,
  BlogObserver,
  FormObserver
} from "./lib";

const router = new Navigo(window.location.origin);

const appState = new StateSubject(state.Home, state, router);

const pages = [];
pages.push(new NavigatableObserver(appState, appState.stateStore.Bio));
pages.push(new FormObserver(appState, appState.stateStore.Form));
pages.push(new BlogObserver(appState, appState.stateStore.Blog));
pages.push(new NavigatableObserver(appState, appState.stateStore.Gallery));
pages.push(new NavigatableObserver(appState, appState.stateStore.Home));

//when state changes, we use a clear "setState" instead of the ambiguous "render"
router
  .on({
    ":page": params =>
      appState.setState(appState.stateStore[capitalize(params.page)]),
    "/": () => appState.setState(appState.stateStore.Home)
  })
  .resolve();
