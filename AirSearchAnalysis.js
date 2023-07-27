import _ from 'lodash';
import { JSONPath } from 'jsonpath-plus';

class AirSearchAnalysis {
  json;
  constructor(json) {
    this.json = json;
  }

  findItineraries(byCriteriaInput) {
    // Deep merge default
    const byCriteria = _.merge(
      {},
      {
        originDestinationGroup: {
          index: '*',
          departureDateGroup: { date: undefined },
        },
      }, // default
      byCriteriaInput
    );
    // console.log(byCriteria);
    // specific bound and date
    const departureDateGroup = JSONPath({
      json: this.json,
      path: `$.search.originDestinationGroup[${
        byCriteria.originDestinationGroup.index
      }].departureDateGroup[?(@.date${
        byCriteria.originDestinationGroup.departureDateGroup.date
          ? `=='${byCriteria.originDestinationGroup.departureDateGroup.date}'`
          : ''
      })]`,
    });

    // match originDestinationOptions
    const matchedOriginDestinationOptions = JSONPath({
      json: this.json,
      path: `$.search.originDestinationGroup[${byCriteria.originDestinationGroup.index}].originDestinationOption[*]`,
    }).filter((originDestinationOption) => {
      return departureDateGroup.some((group) =>
        group.originDestinationOptionRef.some(
          (ref) => ref.uri == originDestinationOption.uri
        )
      );
    });

    const matchedItineraries = JSONPath({
      json: this.json,
      path: '$.search.itinerary[*]',
    }).filter((itinerary) => {
      if (!byCriteriaInput) return true;
      if (
        byCriteriaInput.originDestinationGroup ||
        byCriteriaInput.departureDateGroup
      ) {
        return matchedOriginDestinationOptions.some(
          (option) => option.itineraryRef.uri == itinerary.uri
        );
      } else {
        return true;
      }
    });

    return matchedItineraries.filter((itinerary) => {
      return itinerary.originDestination.every((originDestination) => {
        return originDestination.flightSegment.every((flightSegment) => {
          return byCriteria && byCriteria.flightSegments
            ? byCriteria.flightSegments.some(
                (matchingFlightSegment) =>
                  (!matchingFlightSegment.flightNumber ||
                    matchingFlightSegment.flightNumber ==
                      flightSegment.flightNumber) &&
                  (!matchingFlightSegment.marketingAirlineRef ||
                    matchingFlightSegment.marketingAirlineRef ==
                      flightSegment.marketingAirlineRef.id)
              )
            : true;
        });
      });
    });
  }

  findFareFamilyOptions(targetItineraryPriceUri) {
    return _(this.json)
      .findParentByReferenceUri(targetItineraryPriceUri)
      .value();
  }

  listItineraryPricesByItineraryUri(targetItineraryUri, option) {
    return _(this.json)
      .findParentByReferenceUri(targetItineraryUri, ['farePrice'])
      .value()
      .filter(
        (itinerayPrice) =>
          !option ||
          this.findFareFamilyOptions(itinerayPrice.uri).find(
            (fareFamilyOption) =>
              fareFamilyOption.fareFamilyRef.id == option.fareFamilyRef
          )
      );
  }
}

export { AirSearchAnalysis };
