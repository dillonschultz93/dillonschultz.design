import { useEffect } from 'react';
import { createNoise2D } from 'simplex-noise';

// This is taken from the spline package
function formatPoints(points, close) {
  points = [...points];
  // so that coords can be passed as objects or arrays
  if (!Array.isArray(points[0])) {
    points = points.map(({ x, y }) => [x, y]);
  }

  if (close) {
    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];

    const firstPoint = points[0];
    const secondPoint = points[1];

    points.unshift(lastPoint);
    points.unshift(secondToLastPoint);

    points.push(firstPoint);
    points.push(secondPoint);
  }

  return points.flat();
}

function spline(points = [], tension = 1, close = false, cb) {
  points = formatPoints(points, close);

  const size = points.length;
  const last = size - 4;

  const startPointX = close ? points[2] : points[0];
  const startPointY = close ? points[3] : points[1];

  let path = "M" + [startPointX, startPointY];

  cb && cb("MOVE", [startPointX, startPointY]);

  const startIteration = close ? 2 : 0;
  const maxIteration = close ? size - 4 : size - 2;
  const inc = 2;

  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? points[i - 2] : points[0];
    const y0 = i ? points[i - 1] : points[1];

    const x1 = points[i + 0];
    const y1 = points[i + 1];

    const x2 = points[i + 2];
    const y2 = points[i + 3];

    const x3 = i !== last ? points[i + 4] : x2;
    const y3 = i !== last ? points[i + 5] : y2;

    const cp1x = x1 + ((x2 - x0) / 6) * tension;
    const cp1y = y1 + ((y2 - y0) / 6) * tension;

    const cp2x = x2 - ((x3 - x1) / 6) * tension;
    const cp2y = y2 - ((y3 - y1) / 6) * tension;

    path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];

    cb && cb("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }

  return path;
}

const SVGStyles = {
  width: "98vmin",
  height: "100vmin",
  margin: "0 auto",
  zIndex: "-99",
};

const Blob = () => {
  let noiseStep = 0.0008;

  useEffect(() => {
    // Adapted from this article by @georgedoescode:
    // https://dev.to/georgedoescode/tutorial-build-a-smooth-animated-blob-using-svg-js-3pne?signin=true

    const noise2D = createNoise2D();

    // const svg = document.querySelector('#blob');
    const path = document.querySelector('#manipulated-path');
    const root = document.documentElement;

    const createPoints = () => {
      const points = [];
      const numberOfPoints = 6;
      const angleSteps = (Math.PI * 2) / numberOfPoints;
      const rad = 75;

      for (let i = 1; i <= numberOfPoints; i++) {
        const theta = i * angleSteps;

        const x = 100 + Math.cos(theta) * rad;
        const y = 100 + Math.sin(theta) * rad;

        points.push({
          x,
          y,
          originX: x,
          originY: y,
          noiseOffsetX: Math.random() * 1000,
          noiseOffsetY: Math.random() * 1000,
        });
      }

      return points;
    };

    const mapNumbers = (n, start1, end1, start2, end2) =>
      ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;

    const noise = (x, y) => noise2D(x, y);

    const generatedPoints = createPoints();

    (function animate() {
      path.setAttribute('d', spline(generatedPoints, 1, true));
      requestAnimationFrame(animate);

      generatedPoints.forEach((point) => {
        const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY);

        const x = mapNumbers(nX, -1, 1, point.originX - 20, point.originX + 20);
        const y = mapNumbers(nY, -1, 1, point.originY - 20, point.originY + 20);

        point.x = x;
        point.y = y;

        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      });

      root.style.setProperty('--startColor', '#F6FAFF');
      root.style.setProperty('--stopColor', '#4C87F9');
    })();
  });

  return (
    <svg viewBox="0 0 200 200" id="blob" style={SVGStyles}>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop id="gradientStop1" offset="0%" stopColor="var(--startColor)" />
          <stop
            id="gradientStop2 "
            offset="100%"
            stopColor="var(--stopColor)"
          />
        </linearGradient>
      </defs>
      <path
        id="manipulated-path"
        d=""
        fill="url('#gradient')"
      />
    </svg>
  );
};

export default Blob;