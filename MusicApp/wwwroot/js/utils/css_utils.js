export const setCssPropertyCrossBrowser = (
    querySelector,
    propertyName,
    propertyValue
  ) => {
    $(querySelector).css(`-webkit-${propertyName}`, propertyValue);
    $(querySelector).css(`-moz-${propertyName}`, propertyValue);
    $(querySelector).css(`-ms-${propertyName}`, propertyValue);
    $(querySelector).css(`-o-${propertyName}`, propertyValue);
    $(querySelector).css(`${propertyName}`, propertyValue);
  };

  export const convertPixelUnitStringToNumber = (pixelString) => {
    return Number(pixelString.slice(0, pixelString.length - 2));
  };