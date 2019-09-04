(function(namespace) {
  const Utils = LoadingWheel.Utils;

  let Animations = this[namespace].Animations = {
    // Public
    getAnimation: (props, spokeNumber) => {
      return Animations[props.spokeAnimationName](props, spokeNumber);
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
        begin: -options.offset || 0
      };

      let animation = createElementNS('animate');
      Utils.elementAddAttributsFromObj(animation, props);
      return [animation];
    },

    Shrink: (options, spokeNumber) => {
      let timeHidden = getTimeHidden(options);
      let props = {
        attributeName: 'transform',
        type: 'scale',
        id: 'shrink' + spokeNumber,
        from: 1,
        to: 0,
        dur: options.animationDuration - timeHidden
      };
      let result = [];
      if (timeHidden) {
        startTime = options.offset - timeHidden;
        if (options.offset === 0) startTime += 1;
        let showNothingProps = {
          ...props,
          begin: startTime + 's;shrink' + spokeNumber + '.end',
          dur: timeHidden
        };
        result.push(showNothing(showNothingProps, spokeNumber));
        props.begin = 'empty' + spokeNumber + '.end';
      } else {
        props.begin = -options.offset;
        props.repeatCount = 'indefinite';
      }

      let animation = createElementNS('animateTransform');
      result.push(animation);
      Utils.elementAddAttributsFromObj(animation, props);
      return result;
    },

    ShrinkFade: (options, spokeNumber) => {
      return [
        Animations.Shrink(options, spokeNumber)[0],
        Animations.Fade(options, spokeNumber)[0]
      ];
    }
  };

  const showNothing = (options, spokeNumber) => {
    let props = {
      ...options,
      id: 'empty' + spokeNumber,
      to: 0,
      from: 0,
    };

    let animation = createElementNS('animateTransform');
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
    if (props.hiddenSpokes === 0) return 0;
    return props.hiddenSpokes / props.totalSpokes * props.animationDuration;
  };

  const createElementNS = (svgType) => {
    return document.createElementNS('http://www.w3.org/2000/svg', svgType);
  };

})(document.currentScript.getAttribute('namespace'));