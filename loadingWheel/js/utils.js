(function(namespace) {
  let Utils = this[namespace].Utils = {};

  // Public
  Utils.urlParamsToObj = (urlParams, listOfInts) => {
    if (urlParams.indexOf('?') === -1) return;
    let hashes = urlParams.slice(urlParams.indexOf('?') + 1).split('&');
    let params = [];
    hashes.map(hash => {
      let [key, val] = hash.split('=');
      params[key] = listOfInts.hasOwnProperty(key) ? listOfInts[key](val) : decodeURIComponent(val);
    });
    return params;
  };


  Utils.getSvgHeightWidth = (svg) => {
    return { width, height } = svg.getBBox();
  };

  Utils.stringToBool = val => val === 'true';
  Utils.stringToInt = val => Number(val);

  // Private

})(document.currentScript.getAttribute('namespace'));