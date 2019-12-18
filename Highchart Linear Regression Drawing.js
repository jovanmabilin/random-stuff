// Highchart Linear Regression Drawing 

/**
 * Parameter: 
 * data = [ [0,0], [1,2], [2,9] ]
 */

export function linearRegression(data) {
  let dataLength = data.length;
  let xAxisMean = 0;
  let yAxisMean = 0;
  let xAxisSummation = 0;
  let yAxisSummation = 0;
  let xMultiply = 0;
  let yMultiply = 0;
  let xyMultiply = 0;
  let dataDistance = [];
  let dataDistanceSquared = [];
  let dataDistanceMultiply = [];
  for( let counter = 0; counter < dataLength; counter++ ) {
    xAxisSummation += data[counter][0];
    yAxisSummation += data[counter][1];
    xMultiply += data[counter][0] * data[counter][0];
    yMultiply += data[counter][1] * data[counter][1];
    xyMultiply += data[counter][0] * data[counter][1];
  }
  xAxisMean = xAxisSummation / dataLength;
  yAxisMean = yAxisSummation / dataLength;

  let gradient = (dataLength * xyMultiply - xAxisSummation * yAxisSummation) / (dataLength * xMultiply - xAxisSummation * xAxisSummation);
  gradient = isNaN(gradient) ? 0 : gradient;

  let intercept = (yAxisSummation / dataLength) - (gradient * xAxisSummation) / dataLength;

  for( let counter = 0; counter < dataLength; counter++ ) {
    let xDistance = data[counter][0] - xAxisMean;
    let yDistance = data[counter][1] - yAxisMean;
    dataDistance.push([xDistance, yDistance]);
  }

  for( let counter = 0; counter < dataDistance.length; counter++ ) {
    let xDistanceSquared = Math.pow(dataDistance[counter][0],2);
    let yDistanceSquared = Math.pow(dataDistance[counter][1],2);
    let distanceMultiply = dataDistance[counter][0] * dataDistance[counter][1];
    dataDistanceSquared.push([xDistanceSquared, yDistanceSquared]);
    dataDistanceMultiply.push(distanceMultiply);
  }

  let slopeNumerator = 0;
  let slopeDenominator = 0;
  let slope = 0;

  for( let counter = 0; counter < dataDistanceSquared.length; counter++ ) {
    slopeNumerator += dataDistanceMultiply[counter]; 
  }

  for( let counter = 0; counter < dataDistanceMultiply.length; counter++ ) {
    slopeDenominator += dataDistanceSquared[counter][0]; 
  }

  slope = slopeNumerator / slopeDenominator;

  let yIntercept = yAxisMean - ( slope * xAxisMean ); 

  const estimatedPriceCalculator = (xAxis) => { 
    return yIntercept + ( slope * xAxis ) 
  }

  let coordinates = [];
  for( let counter = 0; counter < data.length; counter++) {
    coordinates.push([data[counter][0], estimatedPriceCalculator(data[counter][0])]);
  }

  coordinates = coordinates.sort(sortAscendingOrderArray);
  return { equation: [gradient, intercept], points: coordinates, string: string };
}

export function sortAscendingOrderArray(a,b) {
  return a[0] - b[0];
}