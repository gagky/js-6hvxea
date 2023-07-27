// Import stylesheets
import './style.css';
import exmapleJson from './example.json';

import _ from 'lodash';
import './CommonMixin.js';
import { AirSearchAnalysis } from './AirSearchAnalysis.js';

const airSearchAnalysis = new AirSearchAnalysis(exmapleJson);

const AnalysisRender = (title, result) => {
  document.write(`<h1>${title}</h1>`);
  document.write(`<pre><code>${JSON.string(result, null, 2)}</code></pre>`);
};

AnalysisRender(
  'VA1531+VA557',
  airSearchAnalysis.findItineraryPrices({
    originDestinationGroup: {
      index: 0,
      departureDateGroup: { date: '2023-06-05' },
    },
    flightSegments: [
      {
        flightNumber: '1531',
        marketingAirlineRef: 'VA',
      },
      {
        flightNumber: '557',
        marketingAirlineRef: 'VA',
      },
    ],
  })
);
AnalysisRender(
  'VA1531+VA557 / BU',
  airSearchAnalysis.findItineraryPrices({
    originDestinationGroup: {
      index: 0,
      departureDateGroup: { date: '2023-06-05' },
    },
    flightSegments: [
      {
        flightNumber: '1531',
        marketingAirlineRef: 'VA',
      },
      {
        flightNumber: '557',
        marketingAirlineRef: 'VA',
      },
    ],
    fareFamilyRef: 'BU',
  })
);

AnalysisRender(
  'VA1531+VA557 / CH',
  airSearchAnalysis.findItineraryPrices({
    originDestinationGroup: {
      index: 0,
      departureDateGroup: { date: '2023-06-05' },
    },
    flightSegments: [
      {
        flightNumber: '1531',
        marketingAirlineRef: 'VA',
      },
      {
        flightNumber: '557',
        marketingAirlineRef: 'VA',
      },
    ],
    fareFamilyRef: 'CH',
  })
);

document.write('done');
