import { useState, useEffect } from 'react';
import AdminLayout from './_layout';
import PageContainer from '@/components/admin/layout/page-container';
import { Heading } from '@/components/admin/ui/heading';
import { Separator } from '@/components/admin/ui/separator';
import { Button } from '@/components/admin/ui/button';
import { Plus, Trash2, Lightbulb, FileText, ShoppingBag, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/admin/ui/select';
import { toast } from 'sonner';
import { City, CityTip, CityDocument, CityRecommendedItem } from '@/types/domain';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function EssentialsPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const [tips, setTips] = useState<CityTip[]>([]);
  const [docs, setDocs] = useState<CityDocument[]>([]);
  const [items, setItems] = useState<CityRecommendedItem[]>([]);

  const [newTip, setNewTip] = useState('');
  const [newDoc, setNewDoc] = useState({ name: '', exampleUrl: '' });
  const [newItem, setNewItem] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCityId) fetchEssentials();
  }, [selectedCityId]);

  const fetchCities = async () => {
    const res = await fetch('/api/admin/cities');
    const data = await res.json();
    setCities(data);
    if (data.length > 0) setSelectedCityId(data[0].id);
    setLoading(false);
  };

  const fetchEssentials = async () => {
    const [tRes, dRes, iRes] = await Promise.all([
      fetch(`/api/admin/tips?cityId=${selectedCityId}`),
      fetch(`/api/admin/documents?cityId=${selectedCityId}`),
      fetch(`/api/admin/items?cityId=${selectedCityId}`),
    ]);
    setTips(await tRes.json());
    setDocs(await dRes.json());
    setItems(await iRes.json());
  };

  const handleAdd = async (type: 'tips' | 'documents' | 'items', data: any, setter: any) => {
    const body = type === 'tips' ? { cityId: selectedCityId, content: data } : { cityId: selectedCityId, ...data };
    if (type === 'tips' && !data.trim()) return;
    if (type !== 'tips' && !data.name.trim()) return;

    const res = await fetch(`/api/admin/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      toast.success('Added successfully');
      setter(type === 'tips' ? '' : { name: '', exampleUrl: '', imageUrl: '' });
      fetchEssentials();
    }
  };

  const handleDelete = async (type: 'tips' | 'documents' | 'items', id: string) => {
    await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    fetchEssentials();
  };

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Heading title="City Essentials" description="Manage tips, requirements, and packing lists" />
            <div className="w-64">
              <Select value={selectedCityId} onValueChange={setSelectedCityId}>
                <SelectTrigger className="rounded-xl border-gray-200"><SelectValue placeholder="Select City" /></SelectTrigger>
                <SelectContent>{cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <Separator />

          <Tabs defaultValue="tips" className="w-full">
            <TabsList className="bg-white border p-1 rounded-2xl mb-8">
              <TabsTrigger value="tips" className="rounded-xl px-8 font-black uppercase text-[10px] data-[state=active]:bg-purple-600 data-[state=active]:text-white">Tips & Advice</TabsTrigger>
              <TabsTrigger value="docs" className="rounded-xl px-8 font-black uppercase text-[10px] data-[state=active]:bg-blue-600 data-[state=active]:text-white">Required Docs</TabsTrigger>
              <TabsTrigger value="items" className="rounded-xl px-8 font-black uppercase text-[10px] data-[state=active]:bg-orange-600 data-[state=active]:text-white">Packing List</TabsTrigger>
            </TabsList>

            <TabsContent value="tips" className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
                <div className="flex gap-4 mb-8">
                  <Input placeholder="Enter a useful travel tip..." value={newTip} onChange={e => setNewTip(e.target.value)} className="rounded-xl h-14" />
                  <Button onClick={() => handleAdd('tips', newTip, setNewTip)} className="bg-purple-600 h-14 rounded-xl px-8 font-black uppercase text-[10px]"><Plus className="w-4 h-4 mr-2" /> Add Tip</Button>
                </div>
                <div className="grid gap-4">
                  {tips.map(tip => (
                    <div key={tip.id} className="flex items-center justify-between p-6 bg-purple-50/30 rounded-2xl border border-purple-100 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><Lightbulb className="w-5 h-5" /></div>
                        <p className="font-bold text-gray-700">{tip.content}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete('tips', tip.id)} className="opacity-0 group-hover:opacity-100 rounded-full hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="docs" className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Input placeholder="Document Name (e.g. Visa)" value={newDoc.name} onChange={e => setNewDoc({...newDoc, name: e.target.value})} className="rounded-xl h-14" />
                  <div className="flex gap-4">
                    <Input placeholder="Example URL (optional)" value={newDoc.exampleUrl} onChange={e => setNewDoc({...newDoc, exampleUrl: e.target.value})} className="rounded-xl h-14" />
                    <Button onClick={() => handleAdd('documents', newDoc, setNewDoc)} className="bg-blue-600 h-14 rounded-xl px-8 font-black uppercase text-[10px] whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Add Doc</Button>
                  </div>
                </div>
                <div className="grid gap-4">
                  {docs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-6 bg-blue-50/30 rounded-2xl border border-blue-100 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><FileText className="w-5 h-5" /></div>
                        <div>
                          <p className="font-bold text-gray-700">{doc.name}</p>
                          {doc.exampleUrl && <a href={doc.exampleUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 font-black uppercase tracking-widest hover:underline">View Example</a>}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete('documents', doc.id)} className="opacity-0 group-hover:opacity-100 rounded-full hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Input placeholder="Item Name (e.g. Hiking Boots)" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="rounded-xl h-14" />
                  <div className="flex gap-4">
                    <Input placeholder="Photo URL (optional)" value={newItem.imageUrl} onChange={e => setNewItem({...newItem, imageUrl: e.target.value})} className="rounded-xl h-14" />
                    <Button onClick={() => handleAdd('items', newItem, setNewItem)} className="bg-orange-600 h-14 rounded-xl px-8 font-black uppercase text-[10px] whitespace-nowrap"><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-orange-50/30 rounded-2xl border border-orange-100 group">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-orange-100 border border-orange-200 overflow-hidden flex items-center justify-center text-orange-600">
                          {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : <ShoppingBag className="w-6 h-6" />}
                        </div>
                        <p className="font-bold text-gray-700">{item.name}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete('items', item.id)} className="opacity-0 group-hover:opacity-100 rounded-full hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
