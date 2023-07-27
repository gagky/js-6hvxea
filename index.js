// Import stylesheets
import './style.css';
import exmapleJson from './example.json';

import _ from 'lodash';
import './CommonMixin.js';
import { AirSearchAnalysis } from './AirSearchAnalysis.js';

const airSearchAnalysis = new AirSearchAnalysis(exmapleJson);
// console.log('anything', airSearchAnalysis.findItineraries());

// console.log(
//   'with 3593',
//   airSearchAnalysis.findItineraries({
//     flightSegments: [
//       {
//         flightNumber: '3593',
//       },
//     ],
//   })
// );
// console.log(
//   'with 1531 & 557',
//   airSearchAnalysis.findItineraries({
//     flightSegments: [
//       {
//         flightNumber: '1531',
//       },
//       {
//         flightNumber: '557',
//       },
//     ],
//   })
// );
// console.log(
//   'with VA 1531 & VA 557',
//   airSearchAnalysis.findItineraries({
//     flightSegments: [
//       {
//         flightNumber: '1531',
//         marketingAirlineRef: 'VA',
//       },
//       {
//         flightNumber: '557',
//         marketingAirlineRef: 'VA',
//       },
//     ],
//   })
// );

// console.log(
//   'with VA 1531 & VA 557 / originDestinationGroup.index',
//   airSearchAnalysis.findItineraries({
//     originDestinationGroup: { index: 0 },
//     flightSegments: [
//       {
//         flightNumber: '1531',
//         marketingAirlineRef: 'VA',
//       },
//       {
//         flightNumber: '557',
//         marketingAirlineRef: 'VA',
//       },
//     ],
//   })
// );
//
// console.log(
//   'with VA 1531 & VA 557 / originDestinationGroup.index / departureDateGroup.date',
//   airSearchAnalysis.findItineraries({
//     originDestinationGroup: { index: 0 },
//     departureDateGroup: { date: '2023-06-05' },
//     flightSegments: [
//       {
//         flightNumber: '1531',
//         marketingAirlineRef: 'VA',
//       },
//       {
//         flightNumber: '557',
//         marketingAirlineRef: 'VA',
//       },
//     ],
//   })
// );

/** Deliverable */
const targetItinerary = airSearchAnalysis.findItineraries({
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
})[0];
console.log('findItineraries', targetItinerary);

const targetItineraryUri = _.getUri(targetItinerary);

console.log('findItineraries -> uri', targetItineraryUri);

// console.log(
//   'find resources by targetItineraryUri ',
//   _.chain(airSearchAnalysis.json).findResourcesByUri(targetItineraryUri).value()
// );

// console.log(
//   'find parent by targetItineraryUri',
//   _.chain(airSearchAnalysis.json)
//     .findParentByReferenceUri(targetItineraryUri)
//     .value()
// );

// console.log(
//   'find parent by targetItineraryUri with farePrice',
//   _.chain(airSearchAnalysis.json)
//     .findParentByReferenceUri(targetItineraryUri, ['farePrice'])
//     .value()
// );

// console.log(
//   'find parent by targetItineraryUri with farePrice, map uri',
//   _.chain(airSearchAnalysis.json)
//     .findParentByReferenceUri(targetItineraryUri, ['farePrice'])
//     .mapResourceUris()
//     .value()
// );

// const itineraryPrices =
//   airSearchAnalysis.findItineraryPrices(targetItineraryUri);
// console.log('findItineraryPrices', itineraryPrices);

// const itineraryPricesUris = _.mapResourceUris(itineraryPrices);
// console.log('findItineraryPrices -> uri', itineraryPricesUris);
/** Deliverable */
const itineraryPricesOfBu = airSearchAnalysis.listItineraryPricesByItineraryUri(
  targetItineraryUri,
  { fareFamilyRef: 'BU' }
);
console.log('listItineraryPricesByItineraryUri', itineraryPricesOfBu);

console.log(
  '1531+557 / BU',
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

document.write('read console');
