export interface CitySuggestion {
  shortName: string;
  displayName: string;
  id: string;
  type: string;
  lat?: number;
  lng?: number;
}

const getCitySuggestions = async (word: string, setData: (data: CitySuggestion[]) => void) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Fallback to high-quality mock data if no Mapbox token is provided
  if (!token || token === 'key_goes_here') {
    const mockSuggestions: CitySuggestion[] = [
      { shortName: "London", displayName: "London, United Kingdom", id: "london", type: "city" },
      { shortName: "Paris", displayName: "Paris, France", id: "paris", type: "city" },
      { shortName: "New York", displayName: "New York, NY, USA", id: "nyc", type: "city" },
      { shortName: "Tokyo", displayName: "Tokyo, Japan", id: "tokyo", type: "city" },
      { shortName: "Dubai", displayName: "Dubai, United Arab Emirates", id: "dubai", type: "city" },
      { shortName: "Toronto", displayName: "Toronto, ON, Canada", id: "toronto", type: "city" },
    ].filter(s => s.displayName.toLowerCase().includes(word.toLowerCase()));
    
    setData(mockSuggestions);
    return;
  }

  try {
    // Mapbox Geocoding API is free for 100k requests/month
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(word)}.json?access_token=${token}&types=place&language=en`;
    
    const response = await fetch(url);
    const json = await response.json();

    if (json && json.features) {
      const suggestionsFormatted: CitySuggestion[] = json.features.map((feature: any) => ({
        shortName: feature.text,
        displayName: feature.place_name,
        id: feature.id,
        type: "city",
        lat: feature.center[1],
        lng: feature.center[0]
      }));
      setData(suggestionsFormatted);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching city suggestions from Mapbox:", error);
    setData([]);
  }
};

export default getCitySuggestions;
