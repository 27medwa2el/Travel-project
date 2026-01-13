import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, Phone, User, Star } from 'lucide-react';
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
    contactInfo: '', // Added
    pricePerDay: '',
    vehicleType: 'sedan',
    rating: '5.0',
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
    setFormData({ name: '', cityId: '', phone: '', contactInfo: '', pricePerDay: '', vehicleType: 'sedan', rating: '5.0' });
    setDialogOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      cityId: driver.cityId,
      phone: driver.phone || '',
      contactInfo: driver.contactInfo || '',
      pricePerDay: driver.pricePerDay?.toString() || '',
      vehicleType: driver.vehicleType || 'sedan',
      rating: driver.rating?.toString() || '5.0',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.cityId) {
      toast.error('Name and City are required');
      return;
    }
    const payload = { ...formData, pricePerDay: parseFloat(formData.pricePerDay) || 0, rating: parseFloat(formData.rating) || 5.0 };
    const url = editingDriver ? `/api/admin/drivers/${editingDriver.id}` : '/api/admin/drivers';
    const method = editingDriver ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Driver saved successfully');
      setDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Save failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this driver?')) return;
    try {
      await fetch(`/api/admin/drivers/${id}`, { method: 'DELETE' });
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
            <Heading title="Professional Drivers" description="Manage private drivers and chauffeurs" />
            <Button onClick={handleCreate} className="bg-[#9333ea] rounded-xl px-6 font-black uppercase text-[10px]">
              <Plus className="mr-2 h-4 w-4" /> Add Driver
            </Button>
          </div>
          <Separator className="bg-gray-100" />

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" /></div>
          ) : (
            <div className="rounded-[32px] border border-gray-100 bg-white overflow-hidden shadow-xl">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">Driver</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Vehicle</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Rating</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id} className="group hover:bg-gray-50/50 transition-colors">
                      <TableCell className="px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-black">{driver.name[0]}</div>
                          <div>
                            <p className="font-black uppercase tracking-tighter text-gray-900">{driver.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{driver.contactInfo || driver.phone || 'No contact'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{cities.find(c => c.id === driver.cityId)?.name}</span></TableCell>
                      <TableCell><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{driver.vehicleType}</span></TableCell>
                      <TableCell><div className="flex items-center gap-1 font-black text-sm">⭐ {driver.rating}</div></TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(driver)} className="rounded-xl"><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(driver.id)} className="rounded-xl hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
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
          <DialogContent className="max-w-2xl rounded-[40px]">
            <div className="p-6">
              <DialogHeader><DialogTitle className="text-3xl font-black uppercase tracking-tighter">{editingDriver ? 'Edit Driver' : 'New Driver'}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Name</Label><Input className="h-14 rounded-2xl" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-gray-400">City</Label>
                  <Select value={formData.cityId} onValueChange={id => setFormData({ ...formData, cityId: id })}>
                    <SelectTrigger className="h-14 rounded-2xl"><SelectValue placeholder="City" /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Contact Info (Phone/Email)</Label><Input className="h-14 rounded-2xl" value={formData.contactInfo} onChange={e => setFormData({ ...formData, contactInfo: e.target.value })} /></div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-gray-400">Vehicle Type</Label>
                  <Select value={formData.vehicleType} onValueChange={v => setFormData({ ...formData, vehicleType: v })}>
                    <SelectTrigger className="h-14 rounded-2xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Price/Day ($)</Label><Input type="number" className="h-14 rounded-2xl" value={formData.pricePerDay} onChange={e => setFormData({ ...formData, pricePerDay: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Rating</Label><Input type="number" step="0.1" className="h-14 rounded-2xl" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} /></div>
              </div>
              <div className="mt-10 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} className="bg-gray-900 text-white rounded-2xl h-14 px-12 font-black uppercase">Save Driver</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
