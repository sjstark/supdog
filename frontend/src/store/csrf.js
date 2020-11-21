import Cookies from 'js-cookie';


//
// ─── FETCH FUNCTION ─────────────────────────────────────────────────────────────
//
// Creates a fetch function that is wrapped in the window global object in order
// to set an XSRF-TOKEN header on the fetch call


export async function fetch(url, options={}) {
  options.headers = options.headers || {};

  options.method = options.method || 'GET'

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json'
  }

  const res = await window.fetch(url, options);

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data
  }

  if (res.status >= 400) throw res;

  return res;
}

//
// ─── RESTORE CSRF ───────────────────────────────────────────────────────────────
//
// Makes a call to the API backend in development for the XSRF-TOKEN

export function restoreCSRF() {
  return fetch('/api/csrf/restore')
}
