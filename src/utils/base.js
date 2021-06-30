const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const _hasProperty = (source, key) => {
  return _hasOwnProperty.call(source, key);
};

export const deepClone = (value) => {
  return JSON.parse(JSON.stringify(value));
};