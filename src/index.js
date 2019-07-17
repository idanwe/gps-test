import React from "react";
import ReactDOM from "react-dom";

import GeoError from "./geo-error";
import GeoPosition from "./geo-position";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>בדיקת GPS</h1>
      <GeoPosition>
        {({ requestGeo, isGeoLoading, geoEnabled, geoError, coords }) => (
          <div>
            <div>טוען: {isGeoLoading ? "כן" : "לא"}</div>
            <div>מאופשר: {geoEnabled ? "כן" : "לא"}</div>
            <br />
            {geoError ? (
              <div>
                שגיאה?: <GeoError error={geoError} />
              </div>
            ) : null}

            <br />
            {coords ? (
              <div>
                <div>
                  מיקום: {coords.lat} {coords.lng}
                </div>
              </div>
            ) : null}

            <br />
            <div>
              <button
                style={{ fontSize: 24, padding: "10px 20px" }}
                onClick={e => {
                  e.preventDefault();
                  requestGeo();
                }}
              >
                התחל בדיקה
              </button>
            </div>

            <div style={{ marginTop: 50 }}>
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  window.location.reload();
                }}
              >
                טען מחדש
              </a>
            </div>
          </div>
        )}
      </GeoPosition>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
