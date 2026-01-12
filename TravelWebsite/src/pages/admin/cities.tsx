import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
  const [formData, setFormData] = useState({ name: '', countryId: '' });

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

  const handleCreate = () => {
    setEditingCity(null);
    setFormData({ name: '', countryId: '' });
    setDialogOpen(true);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setFormData({ name: city.name, countryId: city.countryId });
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
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Cities"
              description="Manage cities in your travel platform"
            />
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add City
            </Button>
          </div>
          <Separator />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No cities found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    cities.map((city) => (
                      <TableRow key={city.id}>
                        <TableCell className="font-medium">{city.name}</TableCell>
                        <TableCell>{getCountryName(city.countryId)}</TableCell>
                        <TableCell>
                          {new Date(city.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(city)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(city.id)}
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCity ? 'Edit City' : 'Create City'}
              </DialogTitle>
              <DialogDescription>
                {editingCity
                  ? 'Update the city details below.'
                  : 'Add a new city to your travel platform.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., New York"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.countryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, countryId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingCity ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
