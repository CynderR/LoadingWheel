
/*
  * Loading Wheel
  Params: {
    svgSpoke: svg graphic to be used as one item in the wheel.
  }
*/
LoadingWheel.Main = function() {
  const Utils = LoadingWheel.Utils;
  const Animations = LoadingWheel.Animations;
 
  const getTotalSpokes = () => Number(this.params.totalSpokes);
  const getOverlap = () => Number(this.params.overlap);

  this.defaults = {
    totalSpokes: 5,
    overlap: 0,
    animationName: 'FadeOneSeccond',
    hiddenSpokes: 2,
    animationDuration: 1,
    fillColor: 'green',
    unrenderedSvg: '',
    spokeRotation: () => {
      return Math.floor(360 / getTotalSpokes());
    },
    spokeOpacity: (count) => {
      return count / getTotalSpokes() + getOverlap();
    },
    svgGroup: ({
      rotation,
      offset,
      svg,
    }) => `<g transform="rotate(${rotation} ${offset} 200)">${svg}</g>` ,
  };

  this.init = () => {
    this.cacheDomObject();
    this.setParams();
    this.buildWheel();
    this.renderWheel();
  };

  this.cacheDomObject = () => {
    this.$svg = document.getElementById('loadingWheel');
    this.$svg.id = '';
  };

  this.setParams = () => {
    this.params = {
      ...this.defaults,
      ...Utils.getUrlParams(document.location.search),
    };
    this.calculateSpokeDimensions();
  };

  this.calculateSpokeDimensions = () => {
    this.$svg.innerHTML = this.getSpoke();
    this.getSpokeDimensions(this.$svg);
    this.$svg.innerHTML = '';
  };

  this.getSpokeDimensions = (domObj) => {
    this.params.spokeDimensions = { width, height } = domObj.getBBox();
  };

  this.buildWheel = () => {
    const spokes = getTotalSpokes() + getOverlap();
    for (let i = 0; i < spokes; i++) {
      let aSpoke = this.getSpoke();
      let animation = this.getAnimation(i);
      aSpoke.appendChild(animation);

      this.params.unrenderedSvg += this.getSpokeWithRotation(i, this.params.spokeDimensions.width / 2, aSpoke);
    }
  };

  this.getSpokeOpacity = (currentSpoke) => {
    return this.params.spokeOpacity(currentSpoke);
  };

  this.getSpokeWithRotation = (spokeNumber, offset = 0, aSpoke) => {
    return this.params.svgGroup({
      offset,
      svg: aSpoke.outerHTML,
      rotation: -this.params.spokeRotation() * spokeNumber,
    });
  };

  this.getSpoke = () => {
    // To be cleaned
var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
circle.setAttribute("r", "50");
circle.setAttribute("fill", this.params.fillColor);
return circle;
    // To be cleaned
  };

  this.getAnimation = (spokeNumber) => {
    return Animations[this.params.animationName](this.getAnimationOptions(spokeNumber));
  };

  this.getAnimationOptions = (spokeNumber) => {
    return {
      opacity: this.getSpokeOpacity(spokeNumber),
      hiddenSpokes: this.params.hiddenSpokes / getTotalSpokes(),
      duration: this.params.animationDuration
    };
  };

  this.renderWheel = () => {
    this.$svg.innerHTML = this.params.unrenderedSvg;
    this.params.unrenderedSvg = '';
  };

  this.init();
};

new LoadingWheel.Main();