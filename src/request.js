import Vue from 'vue';
import VueResource from 'vue-resource';
import config from './config';

Vue.use(VueResource);

const httpRoot = config.httpRoot;

function createParams (hash) {
  let params = '';

  Object.keys(hash).forEach((key, index) => {
    if (index > 0) {
      params += '&';
    }

    params += `${key}=${hash[key]}`;
  });

  return params;
}

// Event source executes callback on every message
// callback(JSON-parsed object, close)
// ! call "close" if event source should be finished
function eventSource (callback, target, params = {}) {
  const request = `${httpRoot}/api/${target}?${createParams(params)}`;
  const evtSource = new EventSource(request);
  evtSource.onmessage = (e) => {
    callback(JSON.parse(e.data), evtSource.close.bind(evtSource));
  };
}

function fetch (target, params) {
  const request = `${httpRoot}/api/${target}`;

  return new Promise((resolve) => {
    Vue.http.get(request, { params }).then((response) => {
      resolve(response.body);
    }, (response) => {
      console.error(`Error on: ${request}`, response);
    });
  });
}

export {
  createParams,
  eventSource,
  fetch
};

