import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Pencil, Trash2, Smartphone, MonitorSmartphone } from 'lucide-react';
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
import { CityApplication, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function ApplicationsPage() {
  const [apps, setApps] = useState<CityApplication[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<CityApplication | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cityId: '',
    iconUrl: '',
    androidLink: '',
    iphoneLink: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, citiesRes] = await Promise.all([
        fetch('/api/admin/applications'),
        fetch('/api/admin/cities'),
      ]);
      const [appsData, citiesData] = await Promise.all([
        appsRes.json(),
        citiesRes.json(),
      ]);
      setApps(appsData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingApp(null);
    setFormData({ name: '', description: '', cityId: '', iconUrl: '', androidLink: '', iphoneLink: '' });
    setDialogOpen(true);
  };

  const handleEdit = (app: CityApplication) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      description: app.description,
      cityId: app.cityId,
      iconUrl: app.iconUrl || '',
      androidLink: app.androidLink || '',
      iphoneLink: app.iphoneLink || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.cityId) {
      toast.error('Required fields missing');
      return;
    }
    const url = editingApp ? `/api/admin/applications/${editingApp.id}` : '/api/admin/applications';
    const method = editingApp ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Application saved');
      setDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Save failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this app?')) return;
    try {
      await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' });
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
            <Heading title="City Applications" description="Manage recommended mobile apps for travelers" />
            <Button onClick={handleCreate} className="bg-[#9333ea] rounded-xl px-6 font-black uppercase text-[10px]">
              <Plus className="mr-2 h-4 w-4" /> Add Application
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
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] px-6">App</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">City</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Links</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apps.map((app) => (
                    <TableRow key={app.id} className="group hover:bg-gray-50/50 transition-colors">
                      <TableCell className="px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border p-1">
                            <img src={app.iconUrl || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black uppercase tracking-tighter text-gray-900">{app.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase line-clamp-1">{app.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{cities.find(c => c.id === app.cityId)?.name}</span></TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {app.iphoneLink && <Smartphone className="w-4 h-4 text-gray-400" />}
                          {app.androidLink && <MonitorSmartphone className="w-4 h-4 text-purple-400" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(app)} className="rounded-xl"><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(app.id)} className="rounded-xl hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
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
              <DialogHeader><DialogTitle className="text-3xl font-black uppercase tracking-tighter">{editingApp ? 'Edit App' : 'New App'}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="col-span-2 space-y-2">
                  <Label className="text-[10px] font-black uppercase text-gray-400">City</Label>
                  <Select value={formData.cityId} onValueChange={id => setFormData({ ...formData, cityId: id })}>
                    <SelectTrigger className="h-14 rounded-2xl"><SelectValue placeholder="Select City" /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">App Name</Label><Input className="h-14 rounded-2xl" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Icon URL</Label><Input className="h-14 rounded-2xl" value={formData.iconUrl} onChange={e => setFormData({ ...formData, iconUrl: e.target.value })} /></div>
                <div className="col-span-2 space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Description</Label><Textarea className="rounded-2xl" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">iPhone Store Link</Label><Input className="h-14 rounded-2xl" value={formData.iphoneLink} onChange={e => setFormData({ ...formData, iphoneLink: e.target.value })} /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Android Play Store Link</Label><Input className="h-14 rounded-2xl" value={formData.androidLink} onChange={e => setFormData({ ...formData, androidLink: e.target.value })} /></div>
              </div>
              {formData.iconUrl && (
                <div className="mt-6 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gray-50">
                    <img src={formData.iconUrl} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <div className="mt-10 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} className="bg-gray-900 text-white rounded-2xl h-14 px-12 font-black uppercase">Save Application</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
