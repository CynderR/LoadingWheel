# LoadingWheel
A SVG loading wheel customizable via the url

A loading wheel that is customizable. 


A simple loading wheel
```xml
    <object type="image/svg+xml" data="loadingWheel/loadingWheel.svg">
      Your browser does not support SVG
    </object>
```

Using URL parameters you can genertate custom loadingWheels.

```xml
	<object type="image/svg+xml" data="loadingWheel/loadingWheel.svg?fillColor=black&totalSpokes=6&shape=shark&hiddenSpokes=1&transform=scale%283.5%29">
      Your browser does not support SVG
  </object>
```


Current URL parameters are:
* totalSpokes
* spokeAnimationName
* hiddenSpokes
* animationDuration
* fillColor
* shape
..* circle
..* triangle
..* shark
..* hook
..* star
..* arrowHead
..* fan
..* diamondSquare
..* y
..* antlers
..* apature
..* windSpinner
..* heart
* transform
* spinClockwise