import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, Car, Phone } from 'lucide-react';
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
import { CityCar, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function CarsPage() {
  const [cars, setCars] = useState<CityCar[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<CityCar | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    cityId: '',
    pricePerDay: '',
    transmission: 'Automatic',
    fuel: 'Petrol',
    contactInfo: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [carsRes, citiesRes] = await Promise.all([
        fetch('/api/admin/cars'),
        fetch('/api/admin/cities'),
      ]);
      const [carsData, citiesData] = await Promise.all([
        carsRes.json(),
        citiesRes.json(),
      ]);
      setCars(carsData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCar(null);
    setFormData({ name: '', type: '', cityId: '', pricePerDay: '', transmission: 'Automatic', fuel: 'Petrol', contactInfo: '', imageUrl: '' });
    setDialogOpen(true);
  };

  const handleEdit = (car: CityCar) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      type: car.type,
      cityId: car.cityId,
      pricePerDay: car.pricePerDay.toString(),
      transmission: car.transmission,
      fuel: car.fuel,
      contactInfo: car.contactInfo || '',
      imageUrl: car.imageUrl || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.cityId) {
      toast.error('Required fields missing');
      return;
    }
    const payload = { ...formData, pricePerDay: parseFloat(formData.pricePerDay) || 0 };
    const url = editingCar ? `/api/admin/cars/${editingCar.id}` : '/api/admin/cars';
    const method = editingCar ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Car saved');
      setDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Save failed');
    }
  };

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading title="Rental Cars" description="Manage premium car rentals for each city" />
            <Button onClick={handleCreate} className="bg-[#9333ea] rounded-xl px-6 font-black uppercase text-[10px]">
              <Plus className="mr-2 h-4 w-4" /> Add Car
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
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">Vehicle</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Price/Day</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Contact</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow key={car.id} className="group hover:bg-gray-50/50 transition-colors">
                      <TableCell className="px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border p-1"><img src={car.imageUrl} className="w-full h-full object-contain" /></div>
                          <div>
                            <p className="font-black uppercase tracking-tighter text-gray-900">{car.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{car.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{cities.find(c => c.id === car.cityId)?.name}</span></TableCell>
                      <TableCell className="font-black text-gray-900">${car.pricePerDay}</TableCell>
                      <TableCell className="text-xs font-medium text-gray-500"><div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {car.contactInfo || '-'}</div></TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(car)} className="rounded-xl"><Pencil className="h-4 w-4" /></Button>
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
              <DialogHeader><DialogTitle className="text-3xl font-black uppercase tracking-tighter">{editingCar ? 'Edit Car' : 'New Car'}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Name</Label><Input className="h-14 rounded-2xl" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Type</Label><Input className="h-14 rounded-2xl" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} /></div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-gray-400">City</Label>
                  <Select value={formData.cityId} onValueChange={id => setFormData({ ...formData, cityId: id })}>
                    <SelectTrigger className="h-14 rounded-2xl"><SelectValue placeholder="City" /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Price/Day</Label><Input type="number" className="h-14 rounded-2xl" value={formData.pricePerDay} onChange={e => setFormData({ ...formData, pricePerDay: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Contact Info</Label><Input className="h-14 rounded-2xl" value={formData.contactInfo} onChange={e => setFormData({ ...formData, contactInfo: e.target.value })} placeholder="Phone or Email" /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Image URL</Label><Input className="h-14 rounded-2xl" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} /></div>
              </div>
              <div className="mt-10 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} className="bg-gray-900 text-white rounded-2xl h-14 px-12 font-black uppercase">Save Car</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
