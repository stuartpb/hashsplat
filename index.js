var hashblot = hashblot;

function hashsplat(bytes, document) {
  var channels = ['y','c','m'];
  var lastByte = bytes[63];
  var boxed = lastByte & 2;
  var invert = lastByte & 1;
  document.getElementById('bottomrect').setAttribute('fill',
    invert ? '#000' : '#fff');
  for (var i = 0; i < 3; ++i) {
    var c = channels[i];
    var hueByte = bytes[60+i];
    var strength = hueByte & 3;
    var hue = i*120 + Math.round(hueByte/255*120);
    var hsl = 'hsl('+hue+',100%,50%)';
    var blotpath = document.getElementById('blotpath-'+c);
    var gradient = document.getElementById('gradient-'+c);
    var gradStart = document.getElementById('gradient-start-'+c);
    var gradFinish = document.getElementById('gradient-finish-'+c);
    var ltr = lastByte & (128 >> i*2);
    var ttb = lastByte & (64 >> i*2);

    blotpath.setAttribute('d', hashblot.pd.q(
      bytes.slice(i*20, (i+1)*20)));
    blotpath.setAttribute('style', 'mix-blend-mode:' +
      (invert ? 'screen' : 'multiply'));
    gradient.setAttribute('x1', ltr ? 0 : '100%');
    gradient.setAttribute('x2', ltr ? '100%' : 0);
    gradient.setAttribute('y1', ttb ? 0 : '100%');
    gradient.setAttribute('y2', ttb ? '100%' : 0);
    gradient.setAttribute('gradientUnits',
      boxed ? 'objectBoundingBox' : 'userSpaceOnUse');
    gradStart.setAttribute('stop-color', hsl);
    gradFinish.setAttribute('stop-color', hsl);
    gradFinish.setAttribute('stop-opacity', strength/4);
  }
}

if (!hashblot && typeof(require) !== 'undefined') {
  hashblot = require("hashblot");
  module.exports = hashsplat;
}
