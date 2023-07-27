import _ from 'lodash';
import { JSONPath } from 'jsonpath-plus';

class CommonMixin {
  static resourceTypeKey = ['uri', 'id', 'index', 'keyIdentifier'];
  static getUri(obj) {
    return obj.uri;
  }

  static mapResourceUris(collection) {
    return collection.map(CommonMixin.getUri);
  }

  static findResourcesByUri(json, uri) {
    return JSONPath({
      path: `$..*[?(@.uri=="${uri}")]`,
      json,
    }).find((candidate) =>
      Object.keys(candidate).some(
        (key) => !CommonMixin.resourceTypeKey.includes(key)
      )
    );
  }

  static findParentByReferenceUri(json, uri, shouldHaveKeys) {
    return JSONPath({
      path: `$..*[?(@.uri=="${uri}")]${'^'}@other()`,
      json,
      otherTypeCallback: (unkn) =>
        !Array.isArray(unkn) &&
        (!shouldHaveKeys ||
          shouldHaveKeys.every((k) => Object.keys(unkn).includes(k))),
    });
  }
}

_.mixin({
  getUri: CommonMixin.getUri,
  mapResourceUris: CommonMixin.mapResourceUris,
  findResourcesByUri: CommonMixin.findResourcesByUri,
  findParentByReferenceUri: CommonMixin.findParentByReferenceUri,
});
