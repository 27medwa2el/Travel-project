import { useState, useEffect, useRef } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, MapPin, Search, CalendarDays } from 'lucide-react';
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
import { CityEvent, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'key_goes_here'
  ? process.env.NEXT_PUBLIC_MAPBOX_TOKEN 
  : 'pk.eyJ1IjoiamF2aWVyZ29uZ29yYSIsImEiOiJjbGFsYmZ0bmowMDBnMTVuc3huYmp5bncifQ';

export default function EventsPage() {
  const [events, setEvents] = useState<CityEvent[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CityEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cityId: '',
    date: '',
    location: '',
    lat: '',
    lng: '',
    imageUrl: '',
    bookingUrl: '',
  });

  const [viewState, setViewState] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleCityChange = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    setFormData({ ...formData, cityId });
    if (city) {
      mapRef.current?.flyTo({ center: [city.lng, city.lat], zoom: 12, duration: 2000 });
      setViewState({ latitude: city.lat, longitude: city.lng, zoom: 12 });
    }
  };

  const fetchData = async () => {
    try {
      const [eventsRes, citiesRes] = await Promise.all([
        fetch('/api/admin/events'),
        fetch('/api/admin/cities'),
      ]);
      const [eventsData, citiesData] = await Promise.all([
        eventsRes.json(),
        citiesRes.json(),
      ]);
      setEvents(eventsData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setFormData({ ...formData, lat: lat.toString(), lng: lng.toString() });
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setFormData({ title: '', description: '', cityId: '', date: '', location: '', lat: '', lng: '', imageUrl: '', bookingUrl: '' });
    setDialogOpen(true);
  };

  const handleEdit = (event: CityEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      cityId: event.cityId,
      date: event.date,
      location: event.location,
      lat: event.lat?.toString() || '',
      lng: event.lng?.toString() || '',
      imageUrl: event.imageUrl || '',
      bookingUrl: event.bookingUrl || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.cityId || !formData.lat) {
      toast.error('Please fill required fields and pin location');
      return;
    }
    const payload = { ...formData, lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) };
    const url = editingEvent ? `/api/admin/events/${editingEvent.id}` : '/api/admin/events';
    const method = editingEvent ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Event saved successfully');
      setDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Save failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try {
      await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading title="City Events" description="Manage local events and festivals" />
            <Button onClick={handleCreate} className="bg-[#9333ea] rounded-xl px-6 font-black uppercase tracking-widest text-[10px]">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
          <Separator className="bg-gray-100" />

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" /></div>
          ) : (
            <div className="rounded-[32px] border border-gray-100 bg-white overflow-hidden shadow-xl shadow-black/[0.02]">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">Event</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Date</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id} className="group hover:bg-gray-50/50 transition-colors">
                      <TableCell className="px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100"><img src={event.imageUrl} className="w-full h-full object-cover" /></div>
                          <p className="font-black uppercase tracking-tighter text-gray-900">{event.title}</p>
                        </div>
                      </TableCell>
                      <TableCell><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{cities.find(c => c.id === event.cityId)?.name}</span></TableCell>
                      <TableCell className="font-bold text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(event)} className="rounded-xl"><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} className="rounded-xl hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto rounded-[40px] border-none shadow-2xl p-0">
            <div className="bg-[#f8faff] p-8 md:p-12">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{editingEvent ? 'Edit Event' : 'New Event'}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Title</Label>
                    <Input className="h-14 rounded-2xl border-gray-100" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</Label>
                    <Textarea className="rounded-2xl border-gray-100" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">City</Label>
                      <Select value={formData.cityId} onValueChange={handleCityChange}>
                        <SelectTrigger className="h-14 rounded-2xl"><SelectValue placeholder="City" /></SelectTrigger>
                        <SelectContent>{cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date</Label>
                      <Input type="date" className="h-14 rounded-2xl" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location Name</Label>
                    <Input className="h-14 rounded-2xl" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image URL</Label>
                    <Input className="h-14 rounded-2xl border-gray-100" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Booking URL (Optional)</Label>
                    <Input className="h-14 rounded-2xl border-gray-100" value={formData.bookingUrl} onChange={e => setFormData({ ...formData, bookingUrl: e.target.value })} placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-6">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pin on Map</Label>
                  <div className="h-[400px] rounded-[32px] overflow-hidden border border-gray-100 shadow-xl">
                    <Map {...viewState} onMove={evt => setViewState(evt.viewState)} mapStyle="mapbox://styles/mapbox/streets-v12" mapboxAccessToken={MAPBOX_TOKEN} onClick={handleMapClick} ref={mapRef}>
                      <NavigationControl position="bottom-right" />
                      {formData.lat && <Marker latitude={parseFloat(formData.lat)} longitude={parseFloat(formData.lng)} anchor="bottom"><MapPin className="w-8 h-8 text-purple-600 animate-bounce" /></Marker>}
                    </Map>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} className="bg-gray-900 text-white rounded-2xl h-14 px-12 font-black uppercase">Save Event</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
