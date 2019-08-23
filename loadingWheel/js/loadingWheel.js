/*
  * Loading Wheel
  Params: {
    svgSpoke: svg graphic to be used as one item in the wheel.
  }
*/
LoadingWheel.Main = function() {
  const Animations = LoadingWheel.Animations,
    Utils = LoadingWheel.Utils,
    Shapes = LoadingWheel.Shapes;

  const urlParamsType = {
    totalSpokes: Utils.stringToInt,
    hiddenSpokes: Utils.stringToInt,
    animationDuration: Utils.stringToInt,
    spinClockwise: Utils.stringToBool,
  };

  this.defaults = {
    animationDuration: 1,
    hiddenSpokes: 0,
    totalSpokes: 5,
    spokeAnimationName: 'FadeOneSeccond',
    spinClockwise: true,
    fillColor: 'green',
    shape: "circle",
  };

  this.init = () => {
    this.cacheDomObject();
    this.setParams();
    let unrenderedSvg = this.buildWheel();
    this.renderWheel(unrenderedSvg);
  };

  this.cacheDomObject = () => {
    this.$svg = document.getElementById('loadingWheel');
  };

  this.setParams = () => {
    this.params = {
      ...this.defaults,
      ...Utils.urlParamsToObj(document.location.search, urlParamsType),
    };
    this.params.spokeDimensions = this.createTmpSvgGetHeightWidth();
  };

  this.createTmpSvgGetHeightWidth = () => {
    this.$svg.innerHTML = this.getShape().outerHTML;
    return Utils.getSvgHeightWidth(this.$svg);
  };

  this.buildWheel = () => {
    let aSpoke,
      animation,
      unrenderedSvg = '';
    middleOfSpoke = this.params.spokeDimensions.width / 2;

    for (let i = 0; i < this.params.totalSpokes; i++) {
      aSpoke = this.getShape();
      animation = this.getAnimation(i);
      aSpoke.appendChild(animation);
      unrenderedSvg += this.setRotationOnSpoke(i, middleOfSpoke, aSpoke);
    }
    return unrenderedSvg;
  };

  this.getSpokeOpacity = (currentSpoke) => {
    return currentSpoke / this.params.totalSpokes;
  };

  this.setRotationOnSpoke = (spokeNumber, offset = 0, aSpoke) => {
    let rotation = this.getRotation(spokeNumber);
    return this.svgGroup({
      svg: aSpoke.outerHTML,
      offset,
      rotation: rotation
    });
  };

  this.getRotation = (spokeNumber) => {
    return spokeNumber * this.spokeArc() * this.setRotationDirection();
  };

  this.setRotationDirection = () => {
    return this.params.spinClockwise ? -1 : 1;
  };

  this.spokeArc = () => {
    return Math.floor(360 / this.params.totalSpokes);
  };

  this.svgGroup = ({
    rotation,
    offset,
    svg,
  }) => `<g transform="rotate(${rotation} ${offset} 200)">${svg}</g>`;

  this.getShape = () => {
    return Shapes[this.params.shape](this.params);
  };

  this.getAnimation = (spokeNumber) => {
    return Animations[this.params.spokeAnimationName](this.getAnimationOptions(spokeNumber));
  };

  this.getAnimationOptions = (spokeNumber) => {
    return {
      opacity: this.getSpokeOpacity(spokeNumber),
      hiddenSpokes: this.params.hiddenSpokes / this.params.totalSpokes * this.params.animationDuration,
      duration: this.params.animationDuration
    };
  };

  this.renderWheel = (unrenderedSvg) => {
    this.$svg.innerHTML = unrenderedSvg;
  };

  this.init();
};

new LoadingWheel.Main();