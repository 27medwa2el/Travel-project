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
import { Driver, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cityId: '',
    phone: '',
    pricePerDay: '',
    vehicleType: '',
    rating: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [driversRes, citiesRes] = await Promise.all([
        fetch('/api/admin/drivers'),
        fetch('/api/admin/cities'),
      ]);

      if (!driversRes.ok || !citiesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [driversData, citiesData] = await Promise.all([
        driversRes.json(),
        citiesRes.json(),
      ]);

      setDrivers(driversData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingDriver(null);
    setFormData({
      name: '',
      cityId: '',
      phone: '',
      pricePerDay: '',
      vehicleType: 'sedan',
      rating: '',
    });
    setDialogOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      cityId: driver.cityId,
      phone: driver.phone || '',
      pricePerDay: driver.pricePerDay?.toString() || '',
      vehicleType: driver.vehicleType || 'sedan',
      rating: driver.rating?.toString() || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('Driver name is required');
      return;
    }
    if (!formData.cityId) {
      toast.error('Please select a city');
      return;
    }

    try {
      const url = editingDriver
        ? `/api/admin/drivers/${editingDriver.id}`
        : '/api/admin/drivers';
      const method = editingDriver ? 'PUT' : 'POST';

      const payload = {
        name: formData.name,
        cityId: formData.cityId,
        phone: formData.phone || undefined,
        pricePerDay: formData.pricePerDay
          ? parseFloat(formData.pricePerDay)
          : undefined,
        vehicleType: formData.vehicleType || undefined,
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save driver');
      }

      toast.success(
        editingDriver
          ? 'Driver updated successfully'
          : 'Driver created successfully'
      );
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this driver?')) return;

    try {
      const res = await fetch(`/api/admin/drivers/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete driver');
      }

      toast.success('Driver deleted successfully');
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
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Drivers"
              description="Manage drivers for your travel platform"
            />
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
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
                    <TableHead>City</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Price/Day</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground"
                      >
                        No drivers found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    drivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">
                          {driver.name}
                        </TableCell>
                        <TableCell>{getCityName(driver.cityId)}</TableCell>
                        <TableCell>{driver.phone || '-'}</TableCell>
                        <TableCell>
                          {driver.vehicleType || '-'}
                        </TableCell>
                        <TableCell>
                          {driver.pricePerDay ? `$${driver.pricePerDay}` : '-'}
                        </TableCell>
                        <TableCell>
                          {driver.rating ? `${driver.rating} ⭐` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(driver)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(driver.id)}
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
                {editingDriver ? 'Edit Driver' : 'Create Driver'}
              </DialogTitle>
              <DialogDescription>
                {editingDriver
                  ? 'Update the driver details below.'
                  : 'Add a new driver to your travel platform.'}
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
                  placeholder="e.g., John Smith"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City *</Label>
                <Select
                  value={formData.cityId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, cityId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1-555-0101"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vehicleType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pricePerDay">Price Per Day ($)</Label>
                <Input
                  id="pricePerDay"
                  type="number"
                  step="0.01"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerDay: e.target.value })
                  }
                  placeholder="150.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  placeholder="4.5"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingDriver ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
