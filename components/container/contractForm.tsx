'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageContent from '@/components/page-content';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

type FieldType = {
  name: string;
  description: string;
  price: number;
};

const emptyItem: FieldType = { name: '', description: '', price: 0 };

export default function ContractForm({ isUpdate = false }: { isUpdate?: boolean }) {
  const router = useRouter();
  const { quoteId } = useParams();
  
  const [contractor, setContractor] = useState('');
  const [items, setItems] = useState<FieldType[]>([{ ...emptyItem }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUpdate && quoteId) {
      async function fetchContract() {
        const res = await fetch(`/api/contracts/${quoteId}`);
        if (res.ok) {
          const contract = await res.json();
          setContractor(contract.contractor);
          setItems(contract.items);
        }
      }
      fetchContract();
    }
  }, [isUpdate, quoteId]);

  const handleItemChange = (index: number, field: keyof FieldType, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { ...emptyItem }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const contractData = {
      quoteId: isUpdate ? quoteId : Math.random().toString(36).substr(2, 9),
      contractor,
      items: items.map((item, index) => ({
        ...item,
        id: index + 1,
        price: Number(item.price) || 0,
      })),
    };

    const url = isUpdate ? `/api/contracts/${quoteId}` : '/api/contracts';
    const method = isUpdate ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractData),
      });

      if (res.ok) {
        setMessage(isUpdate ? 'Contract updated successfully!' : 'Contract created successfully!');
        if (!isUpdate) {
          setContractor('');
          setItems([{ ...emptyItem }]);
        }
        setTimeout(() => router.push('/'), 1000);
      } else {
        setMessage(isUpdate ? 'Failed to update contract.' : 'Failed to create contract.');
      }
    } catch (error) {
      setMessage(isUpdate ? 'Error updating contract.' : 'Error creating contract.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  };

  return (
    <PageContent title={isUpdate ? 'Update Contract' : 'Add Contract'}>
      {message && <p className={`${message.includes('Failed') || message.includes('Error') ? 'text-red-600' : 'text-green-700'}`}>
        {message}
      </p>}

      <form onSubmit={handleSubmit}>
        <Input
          name="contractor-name"
          label="Contractor Name"
          placeholder="Enter Contractor name"
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
          required
        />

        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-semibold">Items</h2>
        </div>

        {items.map((item, index) => (
          <div key={index} className="border m-4 mt-2 p-4 rounded-md space-y-4 bg-gray-300 relative">
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 p-1"
                title="Remove item"
              >
                ✕
              </button>
            )}

            <Input
              name={`item-name-${index}`}
              label="Item Name"
              placeholder="Enter the item name"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              required
            />
            <Input
              name={`item-description-${index}`}
              label="Item Description"
              placeholder="Enter the item description"
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              required
            />
            <Input
              type="number"
              name={`item-price-${index}`}
              label="Item Price"
              min="1"
              placeholder="Enter the item Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addItem} className="px-4 py-2 text-blue-700">
          + Add Item
        </button>

        <div className="mt-4 text-right">
          <p className="text-xl font-bold">
            Total: ${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="text-right mt-4">
          <Button type="submit" name={loading ? (isUpdate ? "Updating..." : "Creating...") : isUpdate ? "Update Contract" : "Create Contract"} disabled={loading} />
        </div>
      </form>
    </PageContent>
  );
}
