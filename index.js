import * as state from "./store";
import { StateSubject } from "./StateSubject";
import { StateObserver } from "./StateObserver";
import { NavigatableObserver } from "./NavigatableObserver";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo(window.location.origin);

const appState = new StateSubject(state.Home);
const pages = [];
pages.push(new NavigatableObserver(appState, state.Bio));
pages.push(new NavigatableObserver(appState, state.Form));
//pages.push(new NavigatableObserver(appState, state.Blog));
pages.push(new NavigatableObserver(appState, state.Gallery));
pages.push(new NavigatableObserver(appState, state.Home));

router
  .on({
    ":page": params => appState.setState(state[capitalize(params.page)]),
    "/": () => appState.setState(state.Home)
  })
  .resolve();

//appState.setState(state.Home);
