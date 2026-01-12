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
import { Textarea } from '@/components/admin/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/ui/select';
import { toast } from 'sonner';
import { Activity, City } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cityId: '',
    price: '',
    currency: 'USD',
    lat: '',
    lng: '',
    tags: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [activitiesRes, citiesRes] = await Promise.all([
        fetch('/api/admin/activities'),
        fetch('/api/admin/cities'),
      ]);

      if (!activitiesRes.ok || !citiesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [activitiesData, citiesData] = await Promise.all([
        activitiesRes.json(),
        citiesRes.json(),
      ]);

      setActivities(activitiesData);
      setCities(citiesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingActivity(null);
    setFormData({
      title: '',
      description: '',
      cityId: '',
      price: '',
      currency: 'USD',
      lat: '',
      lng: '',
      tags: '',
    });
    setDialogOpen(true);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description || '',
      cityId: activity.cityId,
      price: activity.price?.toString() || '',
      currency: activity.currency || 'USD',
      lat: activity.lat.toString(),
      lng: activity.lng.toString(),
      tags: activity.tags?.join(', ') || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error('Activity title is required');
      return;
    }
    if (!formData.cityId) {
      toast.error('Please select a city');
      return;
    }
    if (!formData.lat || !formData.lng) {
      toast.error('Latitude and longitude are required');
      return;
    }

    try {
      const url = editingActivity
        ? `/api/admin/activities/${editingActivity.id}`
        : '/api/admin/activities';
      const method = editingActivity ? 'PUT' : 'POST';

      const payload = {
        title: formData.title,
        description: formData.description || undefined,
        cityId: formData.cityId,
        price: formData.price ? parseFloat(formData.price) : undefined,
        currency: formData.currency || undefined,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save activity');
      }

      toast.success(
        editingActivity
          ? 'Activity updated successfully'
          : 'Activity created successfully'
      );
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      const res = await fetch(`/api/admin/activities/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete activity');
      }

      toast.success('Activity deleted successfully');
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
              title="Activities"
              description="Manage activities for your travel platform"
            />
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
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
                    <TableHead>Title</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No activities found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">
                          {activity.title}
                        </TableCell>
                        <TableCell>{getCityName(activity.cityId)}</TableCell>
                        <TableCell>
                          {activity.price
                            ? `${activity.currency || 'USD'} ${activity.price}`
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {activity.tags?.join(', ') || '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(activity)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(activity.id)}
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingActivity ? 'Edit Activity' : 'Create Activity'}
              </DialogTitle>
              <DialogDescription>
                {editingActivity
                  ? 'Update the activity details below.'
                  : 'Add a new activity to your travel platform.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Statue of Liberty Tour"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the activity..."
                  rows={3}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, currency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lat">Latitude *</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData({ ...formData, lat: e.target.value })
                    }
                    placeholder="40.6892"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lng">Longitude *</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) =>
                      setFormData({ ...formData, lng: e.target.value })
                    }
                    placeholder="-74.0445"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="e.g., adventure, family, outdoor"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingActivity ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
