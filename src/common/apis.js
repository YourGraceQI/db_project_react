const API_PREFIX = '/insurancesys';

export const API_SIGNIN = `${API_PREFIX}/signin`;
export const API_SIGNOUT = `${API_PREFIX}/signout`;
export const API_GET_CUSOTMER = `${API_PREFIX}/customer`;
export const API_GET_POLICY = `${API_PREFIX}/policy`;

const parseJson = (response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204) {
      return {};
    }
    return response.json();
  }
  if (response.status >= 400 && response.status < 600) {
    return response.text().then(text => {
      throw new Error(`${response.status} ${response.statusText}: ${text}`);
    });
  }
  throw new Error(`${response.status} ${response.statusText}: Unexpected status code`);
};

export const encodeObjectAsQueryString = (obj) => {
  const nonArrayUriParams = Object
    .keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined && !Array.isArray(obj[k]))
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(typeof obj[k] === 'object'
      ? JSON.stringify(obj[k])
      : obj[k])}`)
    .join('&');

  const arrayUriParams = Object
    .keys(obj)
    .filter(k => Array.isArray(obj[k]))
    .map(k => {
      return obj[k]
        .map((item) => `${encodeURIComponent(k)}=${encodeURIComponent(typeof item === 'object'
          ? JSON.stringify(item)
          : item)}`)
        .join('&');
    })
    .join('&');

  return `${nonArrayUriParams}&${arrayUriParams}`;
};

export const getJsonWithQuery = (url, data) => {
  const options = {
    method: 'get',
    headers: {
      Accept: 'application/json',
    },
  };

  return fetch(`${encodeURI(url)}?${encodeObjectAsQueryString(data)}`, options).then(parseJson);
};

export const requestWithJsonBody = (url, data, method) => {
  const options = {
    method,
    body: JSON.stringify(data),
  };
  return fetch(url, options).then(parseJson);
};
