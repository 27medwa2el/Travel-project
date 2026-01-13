import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/ui/select';
import { toast } from 'sonner';
import { City, Country } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    countryId: '', 
    lat: 0, 
    lng: 0, 
    timezone: 'UTC',
    images: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [citiesRes, countriesRes] = await Promise.all([
        fetch('/api/admin/cities'),
        fetch('/api/admin/countries'),
      ]);

      if (!citiesRes.ok || !countriesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [citiesData, countriesData] = await Promise.all([
        citiesRes.json(),
        countriesRes.json(),
      ]);

      setCities(citiesData);
      setCountries(countriesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCity = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]); // Clear previous results
    
    try {
      // Use token from env if available and not placeholder, otherwise use the fallback
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'key_goes_here'
        ? process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        : 'pk.eyJ1IjoiamF2aWVyZ29uZ29yYSIsImEiOiJjbGFsYmZ0bmowMDBnMTVuc3huYmp5bncifQ';

      // Added language=en to force English results
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?types=place&language=en&access_token=${token}`);
      
      if (!res.ok) {
        throw new Error(`Mapbox API error: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.features && data.features.length > 0) {
        setSearchResults(data.features);
      } else {
        toast.info('No cities found with that name');
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error(`Search failed: ${error.message || 'Check your internet or token'}`);
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (feature: any) => {
    // Priority: 1. Forced English text (text_en) 2. Default text
    const cityName = feature.text_en || feature.text;
    const [lng, lat] = feature.center;
    
    // Find the country context
    const countryContext = feature.context?.find((c: any) => c.id.startsWith('country'));
    const countryName = countryContext?.text_en || countryContext?.text;
    const countryShortCode = countryContext?.short_code?.toUpperCase();
    
    let matchedCountryId = '';
    
    if (countryName || countryShortCode) {
      // 1. Try exact ISO code match (highest accuracy)
      let found = countries.find(c => countryShortCode && c.code === countryShortCode);
      
      // 2. Try exact name match
      if (!found && countryName) {
        found = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
      }
      
      // 3. Try fuzzy name match (contains)
      if (!found && countryName) {
        found = countries.find(c => 
          c.name.toLowerCase().includes(countryName.toLowerCase()) || 
          countryName.toLowerCase().includes(c.name.toLowerCase())
        );
      }

      if (found) {
        matchedCountryId = found.id;
      }
    }

    setFormData({
      ...formData,
      name: cityName,
      lat,
      lng,
      countryId: matchedCountryId,
      images: [`https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80`]
    });
    setSearchResults([]);
    setSearchQuery('');
    
    if (matchedCountryId) {
      const country = countries.find(c => c.id === matchedCountryId);
      toast.success(`Autofilled: ${cityName}, ${country?.name}`);
    } else {
      toast.warning(`Autofilled ${cityName}, but country "${countryName || 'Unknown'}" not found in database. Please select manually.`);
    }
  };

  const handleCreate = () => {
    setEditingCity(null);
    setFormData({ name: '', countryId: '', lat: 0, lng: 0, timezone: 'UTC', images: [] });
    setDialogOpen(true);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setFormData({ 
      name: city.name, 
      countryId: city.countryId,
      lat: city.lat || 0,
      lng: city.lng || 0,
      timezone: city.timezone || 'UTC',
      images: city.images || []
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('City name is required');
      return;
    }
    if (!formData.countryId) {
      toast.error('Please select a country');
      return;
    }

    try {
      const url = editingCity
        ? `/api/admin/cities/${editingCity.id}`
        : '/api/admin/cities';
      const method = editingCity ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save city');
      }

      toast.success(
        editingCity ? 'City updated successfully' : 'City created successfully'
      );
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this city?')) return;

    try {
      const res = await fetch(`/api/admin/cities/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete city');
      }

      toast.success('City deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCountryName = (countryId: string) => {
    return countries.find((c) => c.id === countryId)?.name || 'Unknown';
  };

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading
              title="Cities"
              description="Manage cities in your travel platform"
            />
            <Button onClick={handleCreate} className="bg-[#9333ea] hover:bg-[#a855f7] rounded-xl px-6 font-black uppercase tracking-widest text-[10px]">
              <Plus className="mr-2 h-4 w-4" />
              Add City
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
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">Name</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Country</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Coordinates</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Status</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20 text-muted-foreground font-medium">
                        No cities found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    cities.map((city) => (
                      <TableRow key={city.id} className="group hover:bg-gray-50/50 transition-colors">
                        <TableCell className="px-6">
                          <p className="font-black uppercase tracking-tighter text-lg text-gray-900">{city.name}</p>
                        </TableCell>
                        <TableCell>
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {getCountryName(city.countryId)}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-gray-400">
                          {city.lat?.toFixed(4)}, {city.lng?.toFixed(4)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Enabled</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(city)}
                              className="rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(city.id)}
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
          <DialogContent className="max-w-2xl rounded-[32px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                {editingCity ? 'Edit City' : 'Create City'}
              </DialogTitle>
              <DialogDescription className="font-medium text-gray-500">
                {editingCity
                  ? 'Update the city details below.'
                  : 'Search for a city or enter details manually.'}
              </DialogDescription>
            </DialogHeader>

            {!editingCity && (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Quick Autofill with Mapbox</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search for a city (e.g. Tokyo, Japan)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearchCity();
                      }
                    }}
                    className="rounded-xl border-gray-200"
                  />
                  <Button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearchCity();
                    }} 
                    disabled={isSearching} 
                    className="bg-gray-900 rounded-xl px-6"
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden divide-y divide-gray-50">
                    {searchResults.map(feature => (
                      <button 
                        key={feature.id}
                        onClick={() => selectSearchResult(feature)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600">
                          <Search className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{feature.text}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{feature.place_name.split(',').slice(1).join(',')}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country" className="text-xs font-black uppercase tracking-widest">Country *</Label>
                  <Select
                    value={formData.countryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, countryId: value })
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder={countries.length === 0 ? "Loading countries..." : "Select a country"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl max-h-[300px]">
                      {countries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lat" className="text-xs font-black uppercase tracking-widest">Latitude</Label>
                  <Input
                    id="lat"
                    type="number"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData({ ...formData, lat: parseFloat(e.target.value) })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lng" className="text-xs font-black uppercase tracking-widest">Longitude</Label>
                  <Input
                    id="lng"
                    type="number"
                    value={formData.lng}
                    onChange={(e) =>
                      setFormData({ ...formData, lng: parseFloat(e.target.value) })
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image" className="text-xs font-black uppercase tracking-widest">City Image URL</Label>
                <Input
                  id="image"
                  value={formData.images[0] || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, images: [e.target.value] })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="rounded-xl"
                />
                {formData.images[0] && (
                  <div className="mt-2 relative h-32 w-full rounded-2xl overflow-hidden border border-gray-100">
                    <img 
                      src={formData.images[0]} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl px-8 border-gray-100">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-[#9333ea] hover:bg-[#a855f7] rounded-xl px-10">
                {editingCity ? 'Update City' : 'Create City'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
