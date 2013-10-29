Map {
  background-color: transparent;
}

#landownershipblm {
  line-color:#FFFFB3;
  line-width:0.5;
  polygon-opacity:0.5;
  polygon-fill:#FFFFB3;
}

#landownershipcounty {
  line-color:#80B1D3;
  line-width:0.5;
  polygon-opacity:0.5;
  polygon-fill:#80B1D3;
}

#landownershipnative {
  line-color:#FDB462;
  line-width:0.5;
  polygon-opacity:0.5;
  polygon-fill:#FDB462;
}

#landownershipprivate {
  line-color:#D9D9D9;
  line-width:0.5;
  polygon-opacity:0.5;
  polygon-fill:#D9D9D9;
}

#landownershipstate {
  line-color:#8DD3C7;
  line-width:0.5;
  polygon-opacity:0.5;
  polygon-fill:#8DD3C7;
}

#landownershipnps {
  line-color:#BEBADA;
  line-width:0.5;
  polygon-opacity:0.5;
  polygon-fill:#BEBADA;
}

#parkboundary {
  line-color:#8B7FDB;
  line-width:3;
}

#potashcontours[zoom > 9] {
  line-width:2;
  line-color:#999999;
  [zoom > 10]
    {text-name: [id];
  	text-face-name: 'Arial Regular';
  	text-fill: #666666;
  	text-size: 10;
 	text-halo-fill: fadeout(white, 30%);
  	text-halo-radius: 2;
  	text-placement: line;
  }
}

#townships[zoom > 11] {
  line-color:#c0c0c2;
  line-dasharray: 15, 2, 1;
  line-width:1.5;
  polygon-opacity:0;
  text-name: "T" + [town] + [twndir] + " R" + [range] + [rngdir];
  text-face-name: 'Arial Italic';
  text-fill: #666666;
  text-size: 10;
  text-halo-fill: fadeout(white, 30%);
  text-halo-radius: 2;
}