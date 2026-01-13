import { useState, useEffect, useRef } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, MapPin, Search } from 'lucide-react';
import Map, { Marker, NavigationControl, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/admin/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/admin/ui/dialog';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { Textarea } from '@/components/admin/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/ui/select';
import { toast } from 'sonner';
import { Activity, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'key_goes_here'
  ? process.env.NEXT_PUBLIC_MAPBOX_TOKEN 
  : 'pk.eyJ1IjoiamF2aWVyZ29uZ29yYSIsImEiOiJjbGFsYmZ0bmowMDBnMTVuc3huYmp5bncifQ';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cityId: '',
    price: '',
    currency: 'USD',
    bookingUrl: '', // Added
    lat: '',
    lng: '',
    tags: '',
    images: [] as string[],
  });

  const [viewState, setViewState] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Update map position when city changes or during edit
  useEffect(() => {
    // Only run this for initial edit mode to center on existing activity
    if (editingActivity && formData.lat && formData.lng) {
      setViewState({
        latitude: parseFloat(formData.lat),
        longitude: parseFloat(formData.lng),
        zoom: 15
      });
    }
  }, [editingActivity]);

  const handleCityChange = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    setFormData({ ...formData, cityId });
    
    if (city) {
      // Smoothly fly to the city center
      mapRef.current?.flyTo({
        center: [city.lng, city.lat],
        zoom: 12,
        duration: 2000,
        essential: true
      });
      
      // Update state so the map component stays there
      setViewState({
        latitude: city.lat,
        longitude: city.lng,
        zoom: 12
      });
    }
  };

  const fetchData = async () => {
    try {
      const [activitiesRes, citiesRes] = await Promise.all([
        fetch('/api/admin/activities'),
        fetch('/api/admin/cities'),
      ]);

      if (!activitiesRes.ok || !citiesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [activitiesData, citiesData] = await Promise.all([
        activitiesRes.json(),
        citiesRes.json(),
      ]);

      setActivities(activitiesData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${MAPBOX_TOKEN}&limit=1&language=en`
      );
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setFormData({
          ...formData,
          lat: lat.toString(),
          lng: lng.toString()
        });
        setViewState({
          latitude: lat,
          longitude: lng,
          zoom: 15
        });
        toast.success(`Found: ${data.features[0].place_name}`);
      } else {
        toast.error('Location not found');
      }
    } catch (error) {
      toast.error('Failed to search location');
    } finally {
      setIsSearching(false);
    }
  };

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setFormData({
      ...formData,
      lat: lat.toString(),
      lng: lng.toString()
    });
  };

  const handleCreate = () => {
    setEditingActivity(null);
    setFormData({
      title: '',
      description: '',
      cityId: '',
      price: '',
      currency: 'USD',
      bookingUrl: '',
      lat: '',
      lng: '',
      tags: '',
      images: [],
    });
    setSearchQuery('');
    setDialogOpen(true);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description || '',
      cityId: activity.cityId,
      price: activity.price?.toString() || '',
      currency: activity.currency || 'USD',
      bookingUrl: activity.bookingUrl || '',
      lat: activity.lat.toString(),
      lng: activity.lng.toString(),
      tags: activity.tags?.join(', ') || '',
      images: activity.images || [],
    });
    setSearchQuery('');
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error('Activity title is required');
      return;
    }
    if (!formData.cityId) {
      toast.error('Please select a city');
      return;
    }
    if (!formData.lat || !formData.lng) {
      toast.error('Please select a location on the map');
      return;
    }

    try {
      const url = editingActivity
        ? `/api/admin/activities/${editingActivity.id}`
        : '/api/admin/activities';
      const method = editingActivity ? 'PUT' : 'POST';

      const payload = {
        title: formData.title,
        description: formData.description || undefined,
        cityId: formData.cityId,
        price: formData.price ? parseFloat(formData.price) : undefined,
        currency: formData.currency || undefined,
        bookingUrl: formData.bookingUrl || undefined,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : undefined,
        images: formData.images.length > 0 ? formData.images : undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save activity');
      }

      toast.success(
        editingActivity
          ? 'Activity updated successfully'
          : 'Activity created successfully'
      );
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      const res = await fetch(`/api/admin/activities/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete activity');
      }

      toast.success('Activity deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCityName = (cityId: string) => {
    return cities.find((c) => c.id === cityId)?.name || 'Unknown';
  };

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading
              title="Activities"
              description="Manage activities for your travel platform"
            />
            <Button onClick={handleCreate} className="bg-[#9333ea] hover:bg-[#a855f7] rounded-xl px-6 font-black uppercase tracking-widest text-[10px]">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
          <Separator className="bg-gray-100" />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="rounded-[32px] border border-gray-100 bg-white overflow-hidden shadow-xl shadow-black/[0.02]">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">Title</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Price</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Status</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-20 text-muted-foreground font-medium"
                      >
                        No activities found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    activities.map((activity) => (
                      <TableRow key={activity.id} className="group hover:bg-gray-50/50 transition-colors">
                        <TableCell className="px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 shadow-sm">
                              <img 
                                src={activity.images?.[0] || 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=100&q=80'} 
                                alt={activity.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="font-black uppercase tracking-tighter text-gray-900">{activity.title}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {getCityName(activity.cityId)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <p className="font-black text-gray-900">
                            {activity.price
                              ? `${activity.currency || 'USD'} ${activity.price}`
                              : '-'}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(activity)}
                              className="rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(activity.id)}
                              className="rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto rounded-[40px] border-none shadow-2xl p-0">
            <div className="bg-[#f8faff] p-8 md:p-12">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                  {editingActivity ? 'Edit Activity' : 'New Activity'}
                </DialogTitle>
                <DialogDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  Add high-end experiences to your travel destinations
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Form Fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity Title</Label>
                    <Input
                      id="title"
                      className="h-14 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-purple-500 font-black uppercase tracking-tighter"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Luxury Seine Dinner Cruise"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</Label>
                    <Textarea
                      id="description"
                      className="rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-purple-500 font-medium min-h-[120px]"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the premium experience..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select City</Label>
                      <Select
                        value={formData.cityId}
                        onValueChange={handleCityChange}
                      >
                        <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-white shadow-sm font-black uppercase tracking-tighter">
                          <SelectValue placeholder="Destinations" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-gray-100">
                          {cities.map((city) => (
                            <SelectItem key={city.id} value={city.id} className="font-black uppercase tracking-tighter">{city.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (USD)</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                        <Input
                          id="price"
                          type="number"
                          className="h-14 pl-10 rounded-2xl border-gray-100 bg-white shadow-sm font-black uppercase tracking-tighter"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookingUrl" className="text-[10px] font-black uppercase tracking-widest text-gray-400">External Booking URL (Optional)</Label>
                    <Input
                      id="bookingUrl"
                      className="h-14 rounded-2xl border-gray-100 bg-white shadow-sm font-black lowercase tracking-tight"
                      value={formData.bookingUrl}
                      onChange={(e) => setFormData({ ...formData, bookingUrl: e.target.value })}
                      placeholder="https://www.getyourguide.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      className="h-14 rounded-2xl border-gray-100 bg-white shadow-sm font-black uppercase tracking-tighter"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g., Adventure, Romantic, Family"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity Image URL</Label>
                    <Input
                      id="image"
                      className="h-14 rounded-2xl border-gray-100 bg-white shadow-sm font-black uppercase tracking-tighter"
                      value={formData.images[0] || ''}
                      onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                      placeholder="https://images.unsplash.com/..."
                    />
                    {formData.images[0] && (
                      <div className="mt-2 relative h-32 w-full rounded-2xl overflow-hidden border border-gray-100">
                        <img 
                          src={formData.images[0]} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coordinates</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Latitude</p>
                        <p className="font-black text-gray-900">{formData.lat || '-'}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Longitude</p>
                        <p className="font-black text-gray-900">{formData.lng || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Map Selection */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pin Location on Map</Label>
                    <div className="relative">
                      <form onSubmit={handleLocationSearch} className="absolute top-4 left-4 right-4 z-10 flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Search exact location..."
                            className="h-12 pl-12 rounded-xl bg-white/90 backdrop-blur-md border-white shadow-2xl font-bold"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={isSearching}
                          className="h-12 w-12 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-xl"
                        >
                          {isSearching ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <MapPin className="w-5 h-5" />}
                        </Button>
                      </form>

                      <div className="h-[450px] rounded-[32px] overflow-hidden border border-gray-100 shadow-xl relative group">
                        <Map
                          {...viewState}
                          onMove={evt => setViewState(evt.viewState)}
                          mapStyle="mapbox://styles/mapbox/streets-v12"
                          mapboxAccessToken={MAPBOX_TOKEN}
                          onClick={handleMapClick}
                          ref={mapRef}
                        >
                          <NavigationControl position="bottom-right" />
                          {formData.lat && formData.lng && (
                            <Marker
                              latitude={parseFloat(formData.lat)}
                              longitude={parseFloat(formData.lng)}
                              anchor="bottom"
                            >
                              <div className="flex flex-col items-center">
                                <div className="bg-purple-600 text-white p-2 rounded-full shadow-2xl border-4 border-white animate-bounce">
                                  <MapPin className="w-6 h-6" />
                                </div>
                                <div className="w-2 h-2 bg-purple-600 rounded-full mt-1 blur-[1px]" />
                              </div>
                            </Marker>
                          )}
                        </Map>
                        
                        <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest text-center">
                            Click anywhere on the map to set activity location
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-end gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setDialogOpen(false)}
                  className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-gray-400 hover:text-gray-900"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-gray-900 hover:bg-black text-white rounded-2xl h-14 px-12 font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  {editingActivity ? 'Update Activity' : 'Save Experience'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
