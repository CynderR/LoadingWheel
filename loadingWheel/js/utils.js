(function(namespace) {
  let Utils = this[namespace].Utils = {};

  // Public
  Utils.getUrlParams = (search) => {
    if (search.indexOf('?') === -1) return;
    let hashes = search.slice(search.indexOf('?') + 1).split('&');
    let params = [];
    hashes.map(hash => {
      let [key, val] = hash.split('=');
      params[key] = decodeURIComponent(val);
    });
    return params;
  };

  // Private

})(document.currentScript.getAttribute('namespace'));