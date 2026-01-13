import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, User, Phone, Mail } from 'lucide-react';
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
import { Textarea } from '@/components/admin/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/ui/select';
import { toast } from 'sonner';
import { CityTourGuide, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function TourGuidesPage() {
  const [guides, setGuides] = useState<CityTourGuide[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<CityTourGuide | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    cityId: '',
    languages: '',
    pricePerHour: '',
    rating: '5.0',
    contactInfo: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [guidesRes, citiesRes] = await Promise.all([
        fetch('/api/admin/tour-guides'),
        fetch('/api/admin/cities'),
      ]);
      const [guidesData, citiesData] = await Promise.all([
        guidesRes.json(),
        citiesRes.json(),
      ]);
      setGuides(guidesData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingGuide(null);
    setFormData({ name: '', bio: '', cityId: '', languages: '', pricePerHour: '', rating: '5.0', contactInfo: '', imageUrl: '' });
    setDialogOpen(true);
  };

  const handleEdit = (guide: CityTourGuide) => {
    setEditingGuide(guide);
    setFormData({
      name: guide.name,
      bio: guide.bio,
      cityId: guide.cityId,
      languages: guide.languages.join(', '),
      pricePerHour: guide.pricePerHour.toString(),
      rating: guide.rating.toString(),
      contactInfo: guide.contactInfo || '',
      imageUrl: guide.imageUrl || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.cityId) {
      toast.error('Required fields missing');
      return;
    }
    const payload = { 
      ...formData, 
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
      pricePerHour: parseFloat(formData.pricePerHour) || 0,
      rating: parseFloat(formData.rating) || 5.0
    };
    const url = editingGuide ? `/api/admin/tour-guides/${editingGuide.id}` : '/api/admin/tour-guides';
    const method = editingGuide ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Tour Guide saved');
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
            <Heading title="Tour Guides" description="Manage certified local guides" />
            <Button onClick={handleCreate} className="bg-[#9333ea] rounded-xl px-6 font-black uppercase text-[10px]">
              <Plus className="mr-2 h-4 w-4" /> Add Guide
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
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">Guide</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Price/Hr</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Contact</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guides.map((guide) => (
                    <TableRow key={guide.id} className="group hover:bg-gray-50/50 transition-colors">
                      <TableCell className="px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border"><img src={guide.imageUrl} className="w-full h-full object-cover" /></div>
                          <div>
                            <p className="font-black uppercase tracking-tighter text-gray-900">{guide.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{guide.languages.join(', ')}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{cities.find(c => c.id === guide.cityId)?.name}</span></TableCell>
                      <TableCell className="font-black text-gray-900">${guide.pricePerHour}</TableCell>
                      <TableCell className="text-xs font-medium text-gray-500"><div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {guide.contactInfo || '-'}</div></TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(guide)} className="rounded-xl"><Pencil className="h-4 w-4" /></Button>
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
              <DialogHeader><DialogTitle className="text-3xl font-black uppercase tracking-tighter">{editingGuide ? 'Edit Guide' : 'New Guide'}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Name</Label><Input className="h-14 rounded-2xl" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-gray-400">City</Label>
                  <Select value={formData.cityId} onValueChange={id => setFormData({ ...formData, cityId: id })}>
                    <SelectTrigger className="h-14 rounded-2xl"><SelectValue placeholder="City" /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Bio</Label><Textarea className="rounded-2xl" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Languages</Label><Input className="h-14 rounded-2xl" value={formData.languages} onChange={e => setFormData({ ...formData, languages: e.target.value })} placeholder="English, Spanish..." /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Price/Hour</Label><Input type="number" className="h-14 rounded-2xl" value={formData.pricePerHour} onChange={e => setFormData({ ...formData, pricePerHour: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Contact Info</Label><Input className="h-14 rounded-2xl" value={formData.contactInfo} onChange={e => setFormData({ ...formData, contactInfo: e.target.value })} placeholder="Phone or Email" /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Image URL</Label><Input className="h-14 rounded-2xl" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} /></div>
              </div>
              <div className="mt-10 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} className="bg-gray-900 text-white rounded-2xl h-14 px-12 font-black uppercase">Save Guide</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
