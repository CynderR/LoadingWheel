(function(namespace) {
  const Utils = LoadingWheel.Utils;

  let Animations = this[namespace].Animations = {};

  // Public
  Animations.Fade = (options, spokeNumber) => {
    let props = {
      hiddenSpokes: 0,
      opacity: 1,
      dur: options.animationDuration,
      from: 1,
      to: -(returnEmptyAnimationFrames(options)),
      attributeName: 'opacity',
      repeatCount: 'indefinite',
      begin: -options.opacity || 0
    };

    let animation = createElementNS('animate');
    Utils.elementAddAttributsFromObj(animation, props);
    return [animation];
  };

  Animations.Shrink = (options, spokeNumber) => {
    let props = {
      attributeName: 'transform',
      type: 'scale',
      id: 'shrink' + spokeNumber,
      from: 1,
      to: 0,
      dur: options.animationDuration
    };

    let emptyAnimationFrames = returnEmptyAnimationFrames(options);
    if (emptyAnimationFrames) {
      props.begin = -options.opacity + ';empty' + spokeNumber + '.end';
    } else {
      props.begin = -options.opacity;
      props.repeatCount = 'indefinite';
    }

    let animation = createElementNS('animateTransform');
    let result = [animation];
    if (emptyAnimationFrames) {
      result.push(doNothing(props, spokeNumber, emptyAnimationFrames));
    }
    Utils.elementAddAttributsFromObj(animation, props);
    return result;
  };

  Animations.ShrinkFade = (options, spokeNumber) => {
    return [
      Animations.Shrink(options, spokeNumber)[0],
      Animations.Fade(options, spokeNumber)[0]
    ];
  };

  // Private

  const doNothing = (options, spokeNumber, duration) => {
    let end = options.id;
    let props = {
      ...options,
      id: 'empty' + spokeNumber,
      dur: duration,
      to: 0,
      from: 0,
      begin: end + '.end'
    };
    let animation = createElementNS('animateTransform');
    Utils.elementAddAttributsFromObj(animation, props);
    return animation;
  };

  const returnEmptyAnimationFrames = (options) => {
    return animationEndsAt({
      hiddenSpokes: options.hiddenSpokes,
      totalSpokes: options.totalSpokes,
      animationDuration: options.animationDuration
    });
  };

  const animationEndsAt = (props) => {
    return props.hiddenSpokes / props.totalSpokes * props.animationDuration;
  };

  const createElementNS = (svgType) => {
    return document.createElementNS('http://www.w3.org/2000/svg', svgType);
  };

})(document.currentScript.getAttribute('namespace'));