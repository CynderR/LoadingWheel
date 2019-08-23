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
  <object type="image/svg+xml" data="loadingWheel/loadingWheel.svg?flilColor=black&totalSpokes=6&shape=shark&hiddenSpokes=1&transform=scale%283.5%29">
      Your browser does not support SVG
  </object>
```


Current URL parameters are:

| Param                | type     | Desc 
| -------------------- |:--------:| -------------------------------------------------------------------------
|totalSpokes          | int      | Spokes in one rotation 
|spokeAnimationName   | string   | Animations can currently only be FadeOneSeccond
|hiddenSpokes         | int      | How many spokes to be invisable on the wheel
|animationDuration    | int      | How long should it take for a spoke to fade away
|flilColor            | string   | Color of the spoke
|transform            | string   | Used to scale a spoke (urlencoded eg. transform=scale%280.5%29 is transform=scale(0.5)) 
|spinClockwise        | bool     | Set which direction to spin the wheel in
|shape                | string   | The shape to use for the spoke

Shapes
<ul><li> circle</li><li> triangle</li><li> shark</li><li> hook</li><li> star</li><li> arrowHead</li><li> fan</li><li> diamondSquare</li><li> y</li><li> antlers</li><li> apature</li><li> windSpinner</li><li> heart </li></ul>
