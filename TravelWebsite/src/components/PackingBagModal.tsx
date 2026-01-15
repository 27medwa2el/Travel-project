import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  ShoppingBagIcon, 
  DocumentIcon, 
  SparklesIcon, 
  DevicePhoneMobileIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { Trip, TripPackingItem, City, CityDocument, CityRecommendedItem, CityApplication } from '@/types/domain';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
  allCities: City[];
  allDocs: CityDocument[];
  allRecommendedItems: CityRecommendedItem[];
  allApps: CityApplication[];
};

const PackingBagModal = ({ isOpen, onClose, trip, allCities, allDocs, allRecommendedItems, allApps }: Props) => {
  const [items, setItems] = useState<TripPackingItem[]>(trip.packingList || []);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'document' | 'product' | 'app' | 'custom'>('all');

  // Load items when modal opens or trip changes
  useEffect(() => {
    if (isOpen && trip.id) {
      const fetchItems = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/trips/${trip.id}/packing-list`);
          if (res.ok) {
            setItems(await res.json());
          }
        } catch (error) {
          console.error('Failed to fetch packing list:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchItems();
    }
  }, [isOpen, trip.id]);
  const [search, setSearch] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<string>(trip.cities[0]?.cityId || '');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [customItemTitle, setCustomItemTitle] = useState('');
  const [customItemDesc, setCustomItemDesc] = useState('');

  // Fetch or find city data
  const selectedCity = useMemo(() => allCities.find(c => c.id === selectedCityId), [allCities, selectedCityId]);
  
  const cityDocs = useMemo(() => allDocs.filter(d => d.cityId === selectedCityId), [allDocs, selectedCityId]);
  const cityProducts = useMemo(() => allRecommendedItems.filter(i => i.cityId === selectedCityId), [allRecommendedItems, selectedCityId]);
  const cityApps = useMemo(() => allApps.filter(a => a.cityId === selectedCityId), [allApps, selectedCityId]);

  const progress = useMemo(() => {
    if (items.length === 0) return 0;
    const packed = items.filter(i => i.isPacked).length;
    return Math.round((packed / items.length) * 100);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesFilter = filter === 'all' || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [items, filter, search]);

  const togglePacked = async (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    try {
      const res = await fetch(`/api/trips/${trip.id}/packing-list/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPacked: !item.isPacked }),
      });
      if (!res.ok) throw new Error();
      
      setItems(items.map(i => i.id === itemId ? { ...i, isPacked: !i.isPacked } : i));
    } catch (error) {
      toast.error('Failed to update item');
    }
  };

  const addItem = async (title: string, category: TripPackingItem['category'], refId?: string, description?: string) => {
    try {
      const res = await fetch(`/api/trips/${trip.id}/packing-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: trip.id,
          cityId: selectedCityId,
          title,
          description,
          category,
          isPacked: false,
          referenceId: refId
        }),
      });
      if (!res.ok) throw new Error();
      const newItem = await res.json();
      setItems([...items, newItem]);
      toast.success(`Added ${title} to bag`);
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const updateItem = async (itemId: string, title: string, description: string) => {
    try {
      const res = await fetch(`/api/trips/${trip.id}/packing-list/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error();
      setItems(items.map(i => i.id === itemId ? { ...i, title, description } : i));
      setEditingItemId(null);
      toast.success('Item updated');
    } catch (error) {
      toast.error('Failed to update item');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/trips/${trip.id}/packing-list/${itemId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setItems(items.filter(i => i.id !== itemId));
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 md:p-10 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                <ShoppingBagIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">My Travel Bag</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {items.filter(i => i.isPacked).length} of {items.length} completed
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="bg-white/80 backdrop-blur-md border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm focus:ring-2 ring-purple-500 transition-all outline-none"
              >
                {trip.cities.map(tc => {
                  const city = allCities.find(c => c.id === tc.cityId);
                  return <option key={tc.cityId} value={tc.cityId}>{city?.name.toUpperCase()}</option>;
                })}
              </select>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all shadow-sm"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
              <span className="text-sm font-black text-orange-500">{progress}%</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="px-10 py-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-white">
          <div className="flex p-1.5 bg-gray-50 rounded-2xl overflow-x-auto w-full md:w-auto no-scrollbar">
            {[
              { id: 'all', label: 'All', icon: SparklesIcon },
              { id: 'document', label: 'Docs', icon: DocumentIcon },
              { id: 'product', label: 'Products', icon: ShoppingBagIcon },
              { id: 'app', label: 'Apps', icon: DevicePhoneMobileIcon },
              { id: 'custom', label: 'Custom', icon: PlusIcon },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  filter === t.id 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-white"
                )}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input 
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-gray-900 placeholder:text-gray-300 focus:ring-2 ring-purple-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-white no-scrollbar">
          {/* Add Custom Item Button */}
          <button 
            onClick={() => setIsAddingCustom(true)}
            className="w-full py-5 rounded-3xl border-2 border-dashed border-gray-100 text-gray-300 font-black uppercase tracking-widest text-xs hover:border-purple-200 hover:text-purple-600 transition-all flex items-center justify-center gap-3 group"
          >
            <PlusIcon className="w-5 h-5 group-hover:scale-125 transition-transform" /> Add Custom Item
          </button>

          {/* Items List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading your bag...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  className={cn(
                    "flex items-center justify-between p-6 rounded-3xl border transition-all",
                    item.isPacked ? "bg-green-50/30 border-green-100" : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-100 hover:scale-[1.01]"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => togglePacked(item.id)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                        item.isPacked ? "text-green-500" : "text-gray-200 hover:text-gray-400"
                      )}
                    >
                      {item.isPacked ? <CheckCircleIconSolid className="w-8 h-8" /> : <CheckCircleIcon className="w-8 h-8" />}
                    </button>
                    
                    <div className="flex items-center gap-4 flex-1">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                        item.category === 'document' ? "bg-blue-50 text-blue-500" :
                        item.category === 'product' ? "bg-orange-50 text-orange-500" :
                        item.category === 'app' ? "bg-indigo-50 text-indigo-500" :
                        "bg-gray-50 text-gray-500"
                      )}>
                        {item.category === 'document' ? <DocumentIcon className="w-6 h-6" /> :
                         item.category === 'app' ? <DevicePhoneMobileIcon className="w-6 h-6" /> :
                         <ShoppingBagIcon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={cn(
                            "text-lg font-black uppercase tracking-tight",
                            item.isPacked ? "text-gray-400 line-through" : "text-gray-900"
                          )}>
                            {item.title}
                          </h4>
                          {/* Red Dot Status Indicator from mockup */}
                          {!item.isPacked && (
                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                          )}
                        </div>
                        {item.description && (
                          <p className={cn(
                            "text-[11px] font-medium mt-0.5",
                            item.isPacked ? "text-gray-300 line-through" : "text-gray-500"
                          )}>
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={cn(
                            "px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm border",
                            item.category === 'document' ? "bg-blue-50 text-blue-600 border-blue-100" :
                            item.category === 'product' ? "bg-orange-50 text-orange-600 border-orange-100" :
                            item.category === 'app' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                            "bg-gray-50 text-gray-600 border-gray-100"
                          )}>
                            {item.category === 'custom' ? 'Custom Item' : item.category.replace(/^\w/, c => c.toUpperCase())}
                          </span>
                          {item.referenceId && (
                            <span className="bg-purple-600 text-white px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                              <SparklesIcon className="w-2.5 h-2.5" /> Auto
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingItemId(item.id);
                        setCustomItemTitle(item.title);
                        setCustomItemDesc(item.description || '');
                      }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-gray-900 hover:bg-gray-50 transition-all"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                  <ShoppingBagIcon className="w-10 h-10" />
                </div>
                <div>
                  <h5 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Your bag is empty</h5>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Add items or select from recommended list below</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Section */}
          <div className="pt-10 border-t border-gray-100">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Recommended for {selectedCity?.name}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cityDocs.filter(doc => !items.find(i => i.referenceId === doc.id)).map(doc => (
                <button 
                  key={doc.id}
                  onClick={() => addItem(doc.name, 'document', doc.id)}
                  className="flex items-center justify-between p-5 bg-purple-50 rounded-[30px] border border-purple-100 hover:border-purple-300 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                      <DocumentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-purple-900 uppercase tracking-tight">{doc.name}</span>
                      <p className="text-[8px] font-bold text-purple-400 uppercase tracking-widest mt-0.5">Required Document</p>
                    </div>
                  </div>
                  <PlusIcon className="w-5 h-5 text-purple-400 group-hover:scale-125 transition-transform" />
                </button>
              ))}

              {cityProducts.filter(p => !items.find(i => i.referenceId === p.id)).map(product => (
                <button 
                  key={product.id}
                  onClick={() => addItem(product.name, 'product', product.id)}
                  className="flex items-center justify-between p-5 bg-orange-50 rounded-[30px] border border-orange-100 hover:border-orange-300 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
                      <ShoppingBagIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-orange-900 uppercase tracking-tight">{product.name}</span>
                      <p className="text-[8px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">Recommended Item</p>
                    </div>
                  </div>
                  <PlusIcon className="w-5 h-5 text-orange-400 group-hover:scale-125 transition-transform" />
                </button>
              ))}

              {cityApps.filter(app => !items.find(i => i.referenceId === app.id)).map(app => (
                <button 
                  key={app.id}
                  onClick={() => addItem(app.name, 'app', app.id)}
                  className="flex items-center justify-between p-5 bg-blue-50 rounded-[30px] border border-blue-100 hover:border-blue-300 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <DevicePhoneMobileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-blue-900 uppercase tracking-tight">{app.name}</span>
                      <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Essential Utility</p>
                    </div>
                  </div>
                  <PlusIcon className="w-5 h-5 text-blue-400 group-hover:scale-125 transition-transform" />
                </button>
              ))}

              {cityDocs.length === 0 && cityProducts.length === 0 && cityApps.length === 0 && (
                <p className="col-span-2 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest py-10">No specific recommendations for this city</p>
              )}
            </div>
          </div>
        </div>

        {/* Custom Item Input Modal/Overlay */}
        <AnimatePresence>
          {(isAddingCustom || editingItemId) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-white/95 backdrop-blur-md"
            >
              <div className="w-full max-w-md text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-purple-600 shadow-xl shadow-purple-50">
                  {editingItemId ? <PencilIcon className="w-10 h-10" /> : <PlusIcon className="w-10 h-10" />}
                </div>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                  {editingItemId ? 'Edit Item' : 'Add Custom Item'}
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">
                  {editingItemId ? 'Update your item details' : 'Personalize your travel essentials'}
                </p>
                
                <div className="space-y-4 mb-8">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="e.g. Extra Camera Lens"
                    value={customItemTitle}
                    onChange={(e) => setCustomItemTitle(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 text-lg font-black text-gray-900 placeholder:text-gray-200 focus:ring-4 ring-purple-100 transition-all outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Short description (optional)"
                    value={customItemDesc}
                    onChange={(e) => setCustomItemDesc(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-8 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-200 focus:ring-4 ring-purple-100 transition-all outline-none"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      if (customItemTitle) {
                        if (editingItemId) {
                          updateItem(editingItemId, customItemTitle, customItemDesc);
                        } else {
                          addItem(customItemTitle, 'custom', undefined, customItemDesc);
                        }
                        setCustomItemTitle('');
                        setCustomItemDesc('');
                        setIsAddingCustom(false);
                      }
                    }}
                    disabled={!customItemTitle}
                    className="flex-1 py-5 bg-purple-600 text-white rounded-[25px] font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all disabled:opacity-50"
                  >
                    {editingItemId ? 'Save Changes' : 'Add to Bag'}
                  </button>
                  <button 
                    onClick={() => {
                      setIsAddingCustom(false);
                      setEditingItemId(null);
                      setCustomItemTitle('');
                      setCustomItemDesc('');
                    }}
                    className="flex-1 py-5 bg-gray-50 text-gray-400 rounded-[25px] font-black uppercase tracking-widest text-xs hover:bg-gray-100 hover:text-gray-900 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PackingBagModal;
