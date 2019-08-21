(function(namespace) {
  let Shapes = this[namespace].Shapes = {};

  // Public
  Shapes.circle = (options) => {
    let params = {
      cx: 50,
      cy: 50,
      r: 50,
      ...options
    };
    let svg = createElementNS('circle');
    for (item in params) {
      setAttr(svg, item, params[item]);
    }
    return svg;
  };

  Shapes.triangle = (options) => {
    let params = {
      points: "80 0 0 160 160 160",
      ...options
    };

    let svg = createElementNS('polygon');
    for (item in params) {
      setAttr(svg, item, params[item]);
    }
    return svg;
  };

  Shapes.shark = (options) => {
    let params = {
      d: 'M30 64 L36 26 L46 10 L52 6 L58 0 L48 2 L34 8 L22 20 L12 34 L2 48 L0 64',
      transform: "scale(1.5)",
      ...options
    };
    return path(params);
  };

  Shapes.hook = (options) => {
    let params = {
      d: 'M10 64 L44 64 L56 42 L58 28 L54 12 L48 4 L40 4 L34 10 L42 12 L46 18 L44 38 L38 50 L30 58 Z',
      transform: "scale(1.5)",
      ...options
    };
    return path(params);
  };

  Shapes.star = (options) => {
    let params = {
      d: 'M 64 22 L 42 22 L 32 0 L 22 22 L 0 22 L 16 38 L 8 64 L 32 50 L 56 64 L 48 38 Z',
      transform: "scale(1.5)",
      ...options
    };
    return path(params);
  };


  // Private
  const createElementNS = (svgType) => {
    return document.createElementNS('http://www.w3.org/2000/svg', svgType);
  };

  const path = (params) => {
    let svg = createElementNS('path');
    for (item in params) {
      setAttr(svg, item, params[item]);
    }
    return svg;
  };

  const setAttr = (svg, key, value) => {
    svg.setAttribute(key, value);
  };

})(document.currentScript.getAttribute('namespace'));