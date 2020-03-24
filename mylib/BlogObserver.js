import * as storeState from "../store";
import { ApiNavigateableObserver } from "./ApiNavigateableObserver";

export class BlogObserver extends ApiNavigateableObserver {
  constructor(subject, stateContext) {
    // can't use "this" in super call, so default to null
    super(
      subject,
      stateContext,
      "https://jsonplaceholder.typicode.com/posts",
      null
    );
    // now we can set Api Callback
    this.callback = this.processRequestResponse;
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
