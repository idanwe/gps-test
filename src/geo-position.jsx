// source: react-fns
// based on the code from here: https://github.com/jaredpalmer/react-fns/blob/master/src/GeoPosition/GeoPosition.tsx
// simplify the version to support just our usecase
import React from "react";
import PropTypes from "prop-types";

export const POSITION_OPTIONS = {
  maximumAge: 0,
  timeout: 30000,
  enableHighAccuracy: true
};

class GeoPosition extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.requestGeo();
  }

  requestGeo = () => {
    this.setState({ isLoading: true });
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
      isGeoLoading: this.state.isLoading,
      geoEnabled: !!this.state.coords,
      geoError: this.state.error,
      coords: this.state.coords
    });
  }
}

export default GeoPosition;
