import * as storeState from "../store";
import { NavigatableObserver } from "./NavigatableObserver";

export class BlogPublisherObserver extends NavigatableObserver {
  constructor(subject, stateContext) {
    // can't use "this" in super call, so default to null
    super(subject, stateContext);
  }

  processRequestResponse(response) {
    console.log("response.data", response.data);
    response.data.forEach(post => {
      storeState.Blog.posts.push(post);
    });
    // lets just "refresh", router params shouldn't matter
    this.subject.refreshStateView();
  }
}
