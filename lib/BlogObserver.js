import { ApiNavigateableObserver } from "./ApiNavigateableObserver";

/**
 * BlogObserver manages the updates to the Blog page. This inherits from the
 * ApiNavigateableObserver class and sets the url to our blog API url.
 * We create a custom callback to be passed to the ApiNavigateableObserver
 * and called when the response is recieved. This is just another example,
 * currently the functionality is limited to one "get" and providing
 * "get","post", "put", "delete" actions would be more appropriate.
 */
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
      this.subject.stateStore.Blog.posts.push(post);
    });
    this.refreshObserver();
  }
}
