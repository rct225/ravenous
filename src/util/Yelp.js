const clientId = 'WgZc1KEr7nxW0-XUXWKdDg';
const secret = '8sTGe8Cgaq33OxG782IhyEdpQxogCpsEeBBOvb9mjAOZqy32vmouuv3nAs2z3bZv';
const accessToken = '';

const Yelp = {
  getAccessToken() {
    if (accessToken !== '') {
      return new Promise( resolve => {
        resolve(accessToken);
      });
    }
    return fetch(`https://cors-anywhere.herokuapp.com/api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
    { method: 'POST'}).then( response => {
      return response.json();
    }).then( jsonResponse = > {
      accessToken = jsonResponse.access_token;
    });
  },
  search(term, location, sortBy) {
    return Yelp.getAccessToken().then( () => {
      return fetch(`https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sort_by}`,
      { headers: { Authorization: `Bearer ${accessToken}`}}).then (response => {
        return response.json();
      }).then( jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map( business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories,
                rating: business.rating,
                reviewCount: business.review_count
              }
          });
        }
      })
    });
  }
};

export default Yelp;
