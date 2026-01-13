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
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading
              title="Drivers"
              description="Manage professional drivers for your travel platform"
            />
            <Button onClick={handleCreate} className="bg-[#9333ea] hover:bg-[#a855f7] rounded-xl px-6 font-black uppercase tracking-widest text-[10px]">
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
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
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Vehicle</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Price/Day</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Rating</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-20 text-muted-foreground font-medium">
                        No drivers found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    drivers.map((driver) => (
                      <TableRow key={driver.id} className="group hover:bg-gray-50/50 transition-colors">
                        <TableCell className="px-6">
                          <p className="font-black uppercase tracking-tighter text-lg text-gray-900">{driver.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{driver.phone || 'No Phone'}</p>
                        </TableCell>
                        <TableCell>
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {getCityName(driver.cityId)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{driver.vehicleType || '-'}</span>
                        </TableCell>
                        <TableCell>
                          <p className="font-black text-gray-900">${driver.pricePerDay || '0'}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-black text-gray-900">{driver.rating || '0'}</span>
                            <div className="w-3 h-3 text-yellow-400">★</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(driver)}
                              className="rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(driver.id)}
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
