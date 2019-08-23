(function(namespace) {
  let Shapes = this[namespace].Shapes = {};

  // Public
  Shapes.circle = (options) => {
    let params = {
      cx: 50,
      cy: 50,
      r: 50,
      ...getShapeParams(options)
    };
    let svg = createElementNS('circle');
    elementAddAttributsFromObj(svg, params);
    return svg;
  };

  Shapes.triangle = (options) => {
    let params = {
      points: "80 0 0 160 160 160",
      ...getShapeParams(options)
    };

    let svg = createElementNS('polygon');
    elementAddAttributsFromObj(svg, params);
    return svg;
  };

  Shapes.shark = (options) => {
    let params = {
      d: 'M30 64 L36 26 L46 10 L52 6 L58 0 L48 2 L34 8 L22 20 L12 34 L2 48 L0 64',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.hook = (options) => {
    let params = {
      d: 'M10 64 L44 64 L56 42 L58 28 L54 12 L48 4 L40 4 L34 10 L42 12 L46 18 L44 38 L38 50 L30 58 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.star = (options) => {
    let params = {
      d: 'M 64 22 L 42 22 L 32 0 L 22 22 L 0 22 L 16 38 L 8 64 L 32 50 L 56 64 L 48 38 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.arrowHead = (options) => {
    let params = {
      d: 'M32 64 L54 52 L32 0 L6 52 L18 58 L30 60 L12 50 L32 22 L48 50 L30 60 L12 50 L16 58 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.fan = (options) => {
    let params = {
      d: 'M16 64 L32 64 L64 0 L0 0 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.diamondSquare = (options) => {
    let params = {
      d: 'M32 64 L64 32 L32 0 L0 32 L16 48 L20 44 L20 20 L44 20 L44 44 L20 44 L16 48 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.y = (options) => {
    let params = {
      d: 'M12 64 L36 32 L64 0 L36 18 L12 0 L22 32 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.antlers = (options) => {
    let params = {
      d: 'M54 48 L64 48 L64 16 L48 0 L60 20 L58 44 L50 44 L56 22 L46 14 L52 24 L44 52 L38 30 L44 6 L38 16 L34 30 L38 50 L44 58 L14 56 L26 34 L18 0 L20 34 L8 50 L14 20 L4 10 L8 22 L6 34 L0 16 L0 48 L4 60 L8 64 L14 56 L44 58 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.apature = (options) => {
    let params = {
      d: 'M8 64 L52 0 L8 8 L6 12 L4 18 L2 32 L2 42 L4 54 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.windSpinner = (options) => {
    let params = {
      d: 'M22 64 L44 34 L42 30 L40 26 L36 20 L32 16 L28 12 L24 8 L18 4 L12 0 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };

  Shapes.heart = (options) => {
    let params = {
      d: 'M60 30 L64 20 L64 16 L62 10 L58 4 L54 2 L46 0 L40 2 L36 6 L32 12 L28 6 L24 2 L16 0 L8 2 L4 6 L2 10 L0 16 L0 20 L4 30 L10 38 L28 62 L32 64 L36 62 L54 38 Z',
      transform: "scale(1.5)",
      ...getShapeParams(options)
    };
    return path(params);
  };


  // Private
  const createElementNS = (name) => {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  };

  const path = (params) => {
    let svg = createElementNS('path');
    elementAddAttributsFromObj(svg, params);
    return svg;
  };

  const elementAddAttributsFromObj = (svg, obj) => {
    for (item in obj) {
      elementAddAttribute(svg, item, obj[item]);
    }
  };

  const elementAddAttribute = (svg, key, value) => {
    svg.setAttribute(key, value);
  };

  const getShapeParams = (options) => {
    let shapeParam = {
      fill: options.fillColor
    };
    if (options.transform) {
      shapeParam.transform = options.transform;
    }
    return shapeParam;
  };

})(document.currentScript.getAttribute('namespace'));