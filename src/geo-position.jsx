// source: react-fns
// based on the code from here: https://github.com/jaredpalmer/react-fns/blob/master/src/GeoPosition/GeoPosition.tsx
// simplify the version to support just our usecase
import React from "react";

export const POSITION_OPTIONS = {
  maximumAge: 0,
  timeout: 30000,
  enableHighAccuracy: true
};

class GeoPosition extends React.Component {
  state = {
    isLoading: false
  };

  requestGeo = () => {
    this.setState({ isLoading: true });
    if (this.geoId) {
      navigator.geolocation.clearWatch(this.geoId);
    }

    this.geoId = navigator.geolocation.watchPosition(
      position =>
        this.setState({
          isLoading: false,
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: undefined
        }),
      error => this.setState({ error, isLoading: false }),
      POSITION_OPTIONS
    );
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    const { children } = this.props;

    return children({
      requestGeo: this.requestGeo,
      isGeoLoading: this.state.isLoading,
      geoEnabled: !!this.state.coords,
      geoError: this.state.error,
      coords: this.state.coords
    });
  }
}

export default GeoPosition;
