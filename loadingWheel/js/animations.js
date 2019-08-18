(function(namespace) {
  let Animations = this[namespace].Animations = {};

  let ani = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  // Public
  Animations.FadeOneSeccond = (options) => {
    let params = {
      hiddenSpokes: 0,
      opacity: 1,
      duration: 1,
      ...options
    };
    ani.setAttribute('dur', params.duration + 's');
    ani.setAttribute('repeatCount', 'indefinite');
    ani.setAttribute('attributeName', 'opacity');
    ani.setAttribute('from', '1');
    ani.setAttribute('to', -params.hiddenSpokes);
    ani.setAttribute('begin', -params.opacity);
    return ani;
  };

  // Private

})(document.currentScript.getAttribute('namespace'));