import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

export const TYPE = 'LOCATION';

export function location() {
  return function (dispatch) {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((granted) => {
          if (granted) {
            watchLocation(dispatch);
          }
        });
    } else {
      watchLocation(dispatch);
    }
  }
}

// TODO: Does this need to be unregistered on application exit?
function watchLocation(dispatch) {
  navigator.geolocation.watchPosition((location) => {
      dispatch(updateLocation(location));
    },
    null,
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 0});
}

function updateLocation(location) {
  return {
    type: TYPE,
    location: location,
  };
}
