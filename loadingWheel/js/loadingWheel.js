/*
  * Loading Wheel
  Prop: {
    svgSpoke: svg graphic to be used as one item in the wheel.
  }
*/
LoadingWheel.Main = function() {
  const Animations = LoadingWheel.Animations,
    Utils = LoadingWheel.Utils,
    Shapes = LoadingWheel.Shapes;

  const urlPropType = {
    totalSpokes: Utils.stringToInt,
    hiddenSpokes: Utils.stringToInt,
    animationDuration: Utils.stringToInt,
    spinClockwise: Utils.stringToBool,
  };

  this.defaults = {
    animationDuration: 1,
    hiddenSpokes: 0,
    totalSpokes: 5,
    spokeAnimationName: 'Fade',
    spinClockwise: true,
    fillColor: 'green',
    shape: 'circle',
  };

  this.init = () => {
    this.cacheDomObject();
    this.setProps();
    let unrenderedSvg = this.buildWheel();
    this.renderWheel(unrenderedSvg);
  };

  this.cacheDomObject = () => {
    this.$svg = document.getElementById('loadingWheel');
  };

  this.setProps = () => {
    this.props = {
      ...this.defaults,
      ...Utils.urlPropsToObj(document.location.search, urlPropType),
    };
    this.props.spokeDimensions = this.createTmpSvgGetHeightWidth();
  };

  this.createTmpSvgGetHeightWidth = () => {
    this.$svg.innerHTML = this.getShape().outerHTML;
    return Utils.getSvgHeightWidth(this.$svg);
  };

  this.buildWheel = () => {
    let newSpoke,
      unrenderedSvg = '',
      $spoke = this.getShape(),
      spokeWidthCenter = this.props.spokeDimensions.width / 2;

    for (let i = 0; i < this.props.totalSpokes; i++) {
      $oneSpoke = Utils.cloneDomNode($spoke);
      this.props.offset = this.getSpokeOffset(i);
      this.applyAnimationsToSpoke(Animations.getAnimation(this.props, i), $oneSpoke);
      unrenderedSvg += this.setRotationOnSpoke(i, spokeWidthCenter, $oneSpoke);
    }
    return unrenderedSvg;
  };

  this.getShape = () => {
    return Shapes[this.props.shape](this.props);
  };

  this.applyAnimationsToSpoke = (animations, $spoke) => {
    for (animation in animations) {
      $spoke.appendChild(animations[animation]);
    }
  };

  this.getSpokeOffset = (currentSpoke) => {
    return Number((currentSpoke / this.props.totalSpokes).toFixed(3)) || 0.01;
  };

  this.setRotationOnSpoke = (spokeNumber, offset = 0, aSpoke) => {
    let rotation = this.getRotation(spokeNumber);
    return this.svgGroup({
      svg: aSpoke.outerHTML,
      offset,
      rotation: rotation
    });
  };

  this.svgGroup = ({
    rotation,
    offset,
    svg,
  }) => `<g transform="rotate(${rotation} ${offset} 200)">${svg}</g>`;

  this.getRotation = (spokeNumber) => {
    return spokeNumber * this.spokeArc() * this.setRotationDirection();
  };

  this.spokeArc = () => {
    return Math.floor(360 / this.props.totalSpokes);
  };

  this.setRotationDirection = () => {
    return this.props.spinClockwise ? -1 : 1;
  };

  this.renderWheel = (unrenderedSvg) => {
    this.$svg.innerHTML = unrenderedSvg;
  };

  this.init();
};

new LoadingWheel.Main();