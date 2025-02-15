const GEOAPIFY_API_KEY = "93193de7e687484eafb3aec963da6651";

export const fetchHospitals = async (location) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${location.lng},${location.lat},5000&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};