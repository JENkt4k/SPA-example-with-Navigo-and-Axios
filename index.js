import * as state from "./store";
import { StateSubject } from "./lib/StateSubject";
import { NavigatableObserver } from "./lib/NavigatableObserver";
import Navigo from "navigo";
import { capitalize } from "lodash";
import { BlogObserver } from "./lib/BlogObserver";

const router = new Navigo(window.location.origin);

const appState = new StateSubject(state.Home);
const pages = [];
pages.push(new NavigatableObserver(appState, state.Bio));
pages.push(new NavigatableObserver(appState, state.Form));
pages.push(new BlogObserver(appState, state.Blog));
pages.push(new NavigatableObserver(appState, state.Gallery));
pages.push(new NavigatableObserver(appState, state.Home));

//when state changes, we use a clear "setState" instead of the abiguois "render"
router
  .on({
    ":page": params => appState.setState(state[capitalize(params.page)]),
    "/": () => appState.setState(state.Home)
  })
  .resolve();
