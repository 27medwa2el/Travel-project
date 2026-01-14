import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { toast } from 'sonner';
import { AppSettings } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { Settings2Icon, SaveIcon } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <PageContainer>
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        </PageContainer>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <Heading
              title="Global Settings"
              description="Configure application-wide parameters and pricing"
            />
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-[#9333ea] hover:bg-[#a855f7] rounded-xl px-6 font-black uppercase tracking-widest text-[10px]"
            >
              {saving ? 'Saving...' : <><SaveIcon className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
          </div>
          <Separator className="bg-gray-100" />

          <div className="grid gap-6">
            <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-black/[0.02] overflow-hidden">
              <CardHeader className="bg-gray-50/50 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                    <Settings2Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black uppercase tracking-tighter">Pricing Settings</CardTitle>
                    <CardDescription className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Set standard fees for city bookings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="cityPrice" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Standard City Fee *</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">$</span>
                      <Input
                        id="cityPrice"
                        type="number"
                        value={settings?.standardCityPrice}
                        onChange={(e) => setSettings(prev => prev ? { ...prev, standardCityPrice: parseFloat(e.target.value) } : null)}
                        className="pl-8 h-14 rounded-2xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all font-black text-lg"
                        placeholder="250.00"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
                      This price applies to every city added to a trip itinerary.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="currency" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Global Currency *</Label>
                    <Input
                      id="currency"
                      value={settings?.currency}
                      onChange={(e) => setSettings(prev => prev ? { ...prev, currency: e.target.value } : null)}
                      className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all font-black uppercase tracking-widest"
                      placeholder="USD"
                    />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
                      Used for all pricing displays across the app.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-black/[0.02] opacity-50 cursor-not-allowed">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-black uppercase tracking-tighter">System Configuration</CardTitle>
                <CardDescription className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Coming soon: Advanced system settings
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
