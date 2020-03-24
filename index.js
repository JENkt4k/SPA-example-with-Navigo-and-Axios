import * as state from "./store";
import { StateSubject } from "./StateSubject";
import { NavigatableObserver } from "./NavigatableObserver";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo(window.location.origin);

//we make the api call here one time when we load the page, we could
// make the call one time when we create the "Blog" observer
axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    console.log("response.data", response.data);
    response.data.forEach(post => {
      state.Blog.posts.push(post);
    });
    const params = router.lastRouteResolved().params;
    console.log(params);
    if (params) {
      //when state changes, we use a clear "setState" instead of the abiguois "render"
      appState.setState(state[params.page]);
    }
  })
  .catch(err => console.log(err));

const appState = new StateSubject(state.Home);
const pages = [];
pages.push(new NavigatableObserver(appState, state.Bio));
pages.push(new NavigatableObserver(appState, state.Form));
pages.push(new NavigatableObserver(appState, state.Blog));
pages.push(new NavigatableObserver(appState, state.Gallery));
pages.push(new NavigatableObserver(appState, state.Home));

//when state changes, we use a clear "setState" instead of the abiguois "render"
router
  .on({
    ":page": params => appState.setState(state[capitalize(params.page)]),
    "/": () => appState.setState(state.Home)
  })
  .resolve();
