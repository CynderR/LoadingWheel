(function(namespace) {
  let Utils = this[namespace].Utils = {};

  // Public
  Utils.urlPropsToObj = (urlParams, listOfInts) => {
    if (urlParams.indexOf('?') === -1) return;
    let hashes = urlParams.slice(urlParams.indexOf('?') + 1).split('&');
    let params = [];
    hashes.map(hash => {
      let [key, val] = hash.split('=');
      params[key] = listOfInts.hasOwnProperty(key) ? listOfInts[key](val) : decodeURIComponent(val);
    });
    return params;
  };

  Utils.cloneDomNode = (element, deep) => {
    return element.cloneNode(deep);
  };

  Utils.getSvgHeightWidth = (svg) => {
    return { width, height } = svg.getBBox();
  };

  Utils.stringToBool = val => val === 'true';
  Utils.stringToInt = val => Number(val);

  Utils.elementAddAttributsFromObj = (svg, obj) => {
    for (item in obj) {
      elementAddAttribute(svg, item, obj[item]);
    }
  };

  // Private
  const elementAddAttribute = (svg, key, value) => {
    svg.setAttribute(key, value);
  };

})(document.currentScript.getAttribute('namespace'));