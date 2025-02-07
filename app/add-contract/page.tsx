'use client';

import PageContent from '@/components/page-content';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type FieldType = {
  name: string,
  description: string,
  price: number
}

export default function CreateContract() {
  const router = useRouter();
  const [contractor, setContractor] = useState('');
  const [items, setItems] = useState<FieldType[]>([{ name: '', description: '', price: 0 }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const addItem = () => {
    setItems([...items, { name: '', description: '', price: 0 }]);
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newContract = {
      quoteId: Math.random().toString(36).substr(2, 9), // Generate random ID
      contractor,
      items: items.map((item, index) => ({
        id: index + 1,
        ...item,
        price: item.price || 0
      }))
    };

    const res = await fetch('/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContract)
    });

    if (res.ok) {
      setMessage('Contract created successfully!');
      setContractor('');
      setItems([{ name: '', description: '', price: 0 }]);

      setTimeout(() => router.push('/'), 2000);
    } else {
      alert('Failed to create contract.');
    }
  };

  const btnName = !loading ? "Create Contract" : "Creating Contract...";


  return (
    <PageContent title="Add Contract">
      {message && <p className="text-green-700">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Contractor Name */}
        <Input name="contractor-name" label="Contractor Name" placeholder="Enter Contractor name" value={contractor} onChange={(e) => setContractor(e.target.value)} required/>

        {/* Items */}
        <h2 className="text-xl font-semibold mt-4">Items</h2>
        {items.map((item, index) => (
          <div key={index} className="border m-4 mt-2 p-4 rounded-md space-y-4 bg-gray-300">
            <Input name="item-name" label="Item Name" placeholder="Enter the item name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} required/>
            <Input name="item-description" label="Item Description" placeholder="Enter the item description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} required/>
            <Input type="number" min="1" name="item-price" label="Item Price" placeholder="Enter the item Price" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} required/>
          </div>
        ))}

        {/* Add Item Button */}
        <button type="button" onClick={addItem} className="px-4 py-2 text-blue-700">
          + Add Item
        </button>

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" name={btnName} />
        </div>
      </form>
    </PageContent >
  );
}
