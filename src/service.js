/** Returns a promise that resolves to results of Github API.
 * Rejects with error message.
 * Example usage:
 *    callAPI(params)
 *      .then(results=>{
 *       // Got data
 *       // data is guthub API result. sample format is shown below.
 *      }).catch(error=>{
 *       // Error is result of error if one happened.
 *      });
 *
 * @param bool String representing if test mode.
 * @return Async Function that calls github users api: https://api.github.com/search/users
 **/
function setupAPI(testMode = false) {
  // params passed is an objectare converted to query params
  return async function callAPI(params) {
    if (testMode) {
      return {
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            login: "jack",
            id: 444,
            node_id: "MDQ6VXNlcjE4MTAzNDY=",
            avatar_url: "https://avatars3.githubusercontent.com/u/1810346?v=4",
            gravatar_id: "",
          },
        ],
      };
    }

    try {
      return await fetch(
        "https://api.github.com/search/users" + toQueryParams(params)
      ).then((req) =>
        req.ok && req.status < 300
          ? req.json()
          : Promise.reject(Error(req.statusText))
      );
    } catch (e) {
      throw Error({ error: e.message });
    }
  };
}
function toQueryParams(params) {
  if (!params) return "";
  return (
    "?" +
    Object.keys(params)
      .reduce((acc, k) => {
        acc.push(`${k}=${params[k]}`);
        return acc;
      }, [])
      .join("&")
  );
}

export { setupAPI };
