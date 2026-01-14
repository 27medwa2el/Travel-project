import React, { useState, useEffect } from 'react';
import { CloudIcon, SunIcon, WaterDropIcon } from '@heroicons/react/24/outline';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherWidgetProps {
  lat?: number;
  lng?: number;
  cityName?: string;
}

const WeatherWidget = ({ lat, lng, cityName }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat === undefined || lng === undefined) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        
        if (!apiKey) {
          console.error('WeatherAPI key is missing! Please ensure NEXT_PUBLIC_WEATHER_API_KEY is set in your .env file.');
          throw new Error('API key missing');
        }

        // Using WeatherAPI.com
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}&aqi=no`
        );

        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();
        setWeather({
          temp: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          humidity: data.current.humidity,
          windSpeed: Math.round(data.current.wind_kph),
          icon: data.current.condition.icon.startsWith('//') 
            ? `https:${data.current.condition.icon}` 
            : data.current.condition.icon,
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to load weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[32px] border border-white/20 shadow-2xl min-w-[220px] animate-pulse">
        <div className="h-14 w-14 bg-white/20 rounded-2xl mb-4" />
        <div className="h-8 w-24 bg-white/20 rounded mb-2" />
        <div className="h-4 w-32 bg-white/20 rounded" />
      </div>
    );
  }

  if (error || !weather) {
    const isApiKeyMissing = !process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    return (
      <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[32px] border border-white/20 shadow-2xl min-w-[220px]">
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
          {isApiKeyMissing ? 'API Key Missing' : 'Weather unavailable'}
        </p>
        {isApiKeyMissing && (
          <p className="text-white/50 text-[8px] mt-1 leading-tight">
            Please add NEXT_PUBLIC_WEATHER_API_KEY to your .env file and restart the server.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[32px] border border-white/20 shadow-2xl min-w-[220px]">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
          <img 
            src={weather.icon} 
            alt={weather.condition}
            className="w-12 h-12"
          />
        </div>
        <div className="text-right">
          {cityName && <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">{cityName}</p>}
          <p className="text-5xl font-black text-white leading-none">{weather.temp}°C</p>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">{weather.condition}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-lg">💧</span>
          <span className="text-white font-black text-sm">{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-lg">💨</span>
          <span className="text-white font-black text-sm">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
