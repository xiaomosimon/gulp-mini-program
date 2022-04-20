let events = {};
const _hasOwnProperty = Object.prototype.hasOwnProperty;
const _hasProperty = function (source, key) {
  return _hasOwnProperty.call(source, key);
};

const addListen = function (eventName, fn, observer) {
  console.log('addListen', eventName);
  if (_hasProperty(events, eventName)) {
    const hasEvent = events[eventName].some((item) => {
      return item.observer === observer && item.fn === fn;
    });
    if (hasEvent) {
      console.log('The event has been added, please do not add it again!');
      return;
    }
    events[eventName].push({
      fn,
      observer,
      once: false
    });
    return;
  }
  events[eventName] = [{
    fn,
    observer,
    once: false
  }];
};

const addOnceListen = function (eventName, fn, observer) {
  console.log('addOnceListen', eventName);
  if (_hasProperty(events, eventName)) {
    events[eventName].push({
      fn,
      observer,
      once: true
    });
    return;
  }
  events[eventName] = [{
    fn,
    observer,
    once: true
  }];
};

const trigger = function (eventName, params) {
  if (!_hasProperty(events, eventName)) {
    console.log('Event not added!');
    return;
  }
  let hasOnce = false;
  events[eventName].forEach((item) => {
    item.fn.call(item.observer, params);
    if (!hasOnce && item.once) {
      hasOnce = true;
    }
  });
  if (hasOnce) {
    events[eventName] = events[eventName].filter((item) => !item.once);
  }
};

const unListen = function (eventName, observer) {
  if (!_hasProperty(events, eventName)) {
    return;
  }
  let foundIndex = events[eventName].findIndex((item) => item.observer === observer);
  foundIndex > -1 && events[eventName].splice(foundIndex, 1);
};

export default {
  addListen,
  addOnceListen,
  trigger,
  unListen
};