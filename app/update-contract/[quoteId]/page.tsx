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

export default function UpdateContract() {
  const router = useRouter();
  const { quoteId } = useParams();

  const [contractor, setContractor] = useState('');
  const [items, setItems] = useState<FieldType[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchContract() {
      const res = await fetch(`/api/contracts/${quoteId}`);
      if (res.ok) {
        const contract = await res.json();
        setContractor(contract.contractor);
        setItems(contract.items);
      }
    }
    fetchContract();
  }, [quoteId]);

  const handleItemChange = (index: number, field: keyof FieldType, value: string | number) => {
    const updatedItems = [...items]; 
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedContract = {
      quoteId,
      contractor,
      items: items.map((item, index) => ({
        ...item,
        id: index + 1,
        price: item.price || 0,
      })),
    };

    const res = await fetch(`/api/contracts/${quoteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContract),
    });

    if (res.ok) {
      setMessage('Contract updated successfully!');
      setTimeout(() => router.push('/'), 2000);
    } else {
      setMessage('Failed to update contract.');
    }
  };

  return (
    <PageContent title="Update Contract">
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Contractor Name */}
        <Input
          name="contractor-name"
          label="Contractor Name"
          placeholder="Enter Contractor name"
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
          required
        />

        {/* Items */}
        <h2 className="text-xl font-semibold mt-4">Items</h2>
        {items.map((item, index) => (
          <div key={index} className="border m-4 mt-2 p-4 rounded-md space-y-4 bg-gray-300">
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
              placeholder="Enter the item Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
              required
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" name="Update Contract" />
        </div>
      </form>
    </PageContent>
  );
}
