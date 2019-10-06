export const routeOptions = {
  travelMode: "TRANSIT",
  transitOptions: { modes: ["TRAIN"] },
  provideRouteAlternatives: false
};

export const mapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680"
      }
    ]
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762"
      }
    ]
  },
  {
    featureType: "transit.station.rail",
    stylers: [
      {
        weight: 6
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70"
      }
    ]
  }
];

export const getGoogleLocationFromCoordinates = (longitude, latitude) =>
  new window.google.maps.LatLng(longitude, latitude);

export const addRoutesToMap = routes => {
  const exampleRoutes = [
    {
      userId: "10",
      origin: {
        displayName: "Zürich, Switzerland",
        latitude: 47.3768866,
        longitude: 8.541694
      },
      destination: {
        displayName: "Athens, Greece",
        latitude: 37.9838096,
        longitude: 23.7275388
      },
      distance: 2414728,
      timestamp: 1571668813,
      roundtrip: false
    },
    {
      userId: "10",
      origin: {
        displayName: "Nice, France",
        latitude: 43.7102,
        longitude: 7.262
      },
      destination: {
        displayName: "Marseilles, France",
        latitude: 43.2965,
        longitude: 5.3698
      },
      timestamp: 1569916813,
      distance: 223885,
      roundtrip: true
    }
  ];

  const { map, google } = window;
  if (!map || !google) {
    setTimeout(() => addRoutesToMap(routes), 500);
    return;
  }
  const directionsService = new window.google.maps.DirectionsService();

  (routes || exampleRoutes).forEach(route => {
    const origin = getGoogleLocationFromCoordinates(
      route.origin.latitude,
      route.origin.longitude
    );
    const destination = getGoogleLocationFromCoordinates(
      route.destination.latitude,
      route.destination.longitude
    );
    const request = {
      origin,
      destination,
      ...routeOptions
    };
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      suppressInfoWindows: true
    });
    directionsRenderer.setMap(map);
    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        const path = response.routes[0].overview_path;
        const line = new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#41ead4",
          strokeOpacity: 0.7,
          strokeWeight: 5
        });
        line.setMap(map);
      }
    });
  });
};

export const initializeMap = () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    setTimeout(initializeMap, 500);
    return;
  }
  const mapOptions = {
    zoom: 4,
    center: getGoogleLocationFromCoordinates(47.3768866, 8.541694), // Zurich
    disableDefaultUI: true,
    styles: mapStyles
  };
  const map = new window.google.maps.Map(mapContainer, mapOptions);
  window.map = map;
};
