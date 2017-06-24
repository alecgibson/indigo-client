export default class Http {
  static post(url, body) {
    return fetch('http://' + url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        try {
          response.json = JSON.parse(response._bodyText);
        } catch (e) {
        }

        return response;
      });
  }
}
