const apiKey = process.env.SERVER_MAPS_KEY;

const googleMapsClient = require("@google/maps").createClient({
  key: apiKey
});

const getDistanceMatrix = (service, data) =>
  new Promise((resolve, reject) => {
    service.distanceMatrix(data, (stringResponse, response) => {
      console.log("stringResponse", stringResponse);
      console.log("response", response);
      if (response.status === 200 && response.json.status === "OK") {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });

module.exports = async (origin, destination) => {
  const response = await getDistanceMatrix(googleMapsClient, {
    origins: [origin],
    destinations: [destination],
    mode: "transit",
    transit_mode: ["rail"]
  });
  const { json } = response || { status: "" };
  if (!json.status === "OK") return null;

  const { status, distance } = json.rows.length > 0 && json.rows[0].elements[0];
  if (!status === "OK") return null;

  return {
    distance: distance.value,
    originName: json.origin_addresses[0],
    destinationName: json.destination_addresses[0]
  };
};
