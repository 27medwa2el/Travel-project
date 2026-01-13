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
import { toast } from 'sonner';
import { Country } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '' });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetch('/api/admin/countries');
      if (!res.ok) throw new Error('Failed to fetch countries');
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      toast.error('Failed to load countries');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCountry(null);
    setFormData({ name: '', code: '' });
    setDialogOpen(true);
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
    setFormData({ name: country.name, code: country.code || '' });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('Country name is required');
      return;
    }

    try {
      const url = editingCountry
        ? `/api/admin/countries/${editingCountry.id}`
        : '/api/admin/countries';
      const method = editingCountry ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save country');
      }

      toast.success(
        editingCountry ? 'Country updated successfully' : 'Country created successfully'
      );
      setDialogOpen(false);
      fetchCountries();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this country?')) return;

    try {
      const res = await fetch(`/api/admin/countries/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete country');
      }

      toast.success('Country deleted successfully');
      fetchCountries();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading
              title="Countries"
              description="Manage countries for your travel platform"
            />
            <Button onClick={handleCreate} className="bg-[#9333ea] hover:bg-[#a855f7] rounded-xl px-6 font-black uppercase tracking-widest text-[10px]">
              <Plus className="mr-2 h-4 w-4" />
              Add Country
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
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Code</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Status</TableHead>
                    <TableHead className="text-right font-black uppercase tracking-[0.2em] text-[10px] px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">
                        No countries found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    countries.map((country) => (
                      <TableRow key={country.id} className="group hover:bg-gray-50/50 transition-colors">
                        <TableCell className="px-6">
                          <p className="font-black uppercase tracking-tighter text-lg text-gray-900">{country.name}</p>
                        </TableCell>
                        <TableCell>
                          <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg font-mono text-xs font-black">
                            {country.code || '-'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Enabled</span>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(country)}
                              className="rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(country.id)}
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
                {editingCountry ? 'Edit Country' : 'Create Country'}
              </DialogTitle>
              <DialogDescription>
                {editingCountry
                  ? 'Update the country details below.'
                  : 'Add a new country to your travel platform.'}
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
                  placeholder="e.g., United States"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Country Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="e.g., US"
                  maxLength={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingCountry ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
