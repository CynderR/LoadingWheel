(function(namespace) {
  let Animations = this[namespace].Animations = {};

  // Public
  Animations.FadeOneSeccond = (options) => {
    let params = {
      hiddenSpokes: 0,
      opacity: 1,
      duration: 1,
      ...options
    };
    let ani = createElementNS('animate');
    ani.setAttribute('dur', params.duration + 's');
    ani.setAttribute('repeatCount', 'indefinite');
    ani.setAttribute('attributeName', 'opacity');
    ani.setAttribute('from', '1');
    ani.setAttribute('to', -params.hiddenSpokes);
    ani.setAttribute('begin', -params.opacity);
    return ani;
  };

  // Private
  const createElementNS = (svgType) => {
    return document.createElementNS('http://www.w3.org/2000/svg', svgType);
  };



})(document.currentScript.getAttribute('namespace'));