(function(namespace) {
  const Utils = LoadingWheel.Utils;

  let Animations = this[namespace].Animations = {
    // Public
    getAnimation: (props, spokeNumber) => {
      let animationObj = [showNothing({
  id: 'invis' + spokeNumber,
  dur: props.offset
})];
      return animationObj.concat(Animations[props.spokeAnimationName](props, spokeNumber));
    },

    // Private
    Fade: (options, spokeNumber) => {
      let props = {
        hiddenSpokes: 0,
        opacity: 1,
        dur: options.animationDuration,
        from: 1,
        to: -(getTimeHidden(options)),
        attributeName: 'opacity',
        repeatCount: 'indefinite',
        begin: 'invis' + spokeNumber + '.end'
      };

      let animation = createElementNS('animate');
      Utils.elementAddAttributsFromObj(animation, props);
      return [animation];
    },

    Shrink: (options, spokeNumber) => {
      let timeHidden = getTimeHidden(options);
      let props = {
        id: 'shrink' + spokeNumber,
        attributeName: 'transform',
        type: 'scale',
        begin: 'invis' + spokeNumber + '.end;empty' + spokeNumber + '.end',
        from: 1,
        to: 0,
        dur: options.animationDuration - timeHidden
      };

      let animation = createElementNS('animateTransform');
      Utils.elementAddAttributsFromObj(animation, props);
      return [
        animation,
        showNothing({
          ...props,
          id: 'empty' + spokeNumber,
          begin: 'shrink' + spokeNumber + '.end',
          dur: timeHidden
        })
      ];
    },

    ShrinkFade: (options, spokeNumber) => {
      return Animations.Shrink(options, spokeNumber).concat(Animations.Fade(options, spokeNumber));
    }
  };

  const showNothing = (options) => {
    let props = {
      ...options,
      to: 0,
      from: 0,
      opacity: 0,
      attributeName: 'opacity'
    };

    let animation = createElementNS('animate');
    Utils.elementAddAttributsFromObj(animation, props);
    return animation;
  };

  const getTimeHidden = (options) => {
    return animationEndsAt({
      hiddenSpokes: options.hiddenSpokes,
      totalSpokes: options.totalSpokes,
      animationDuration: options.animationDuration
    });
  };

  const animationEndsAt = (props) => {
    if (props.hiddenSpokes === 0) return 0.01;
    return props.hiddenSpokes / props.totalSpokes * props.animationDuration;
  };

  const createElementNS = (svgType) => {
    return document.createElementNS('http://www.w3.org/2000/svg', svgType);
  };

})(document.currentScript.getAttribute('namespace'));