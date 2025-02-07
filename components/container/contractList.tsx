"use client"

import React, { useEffect, useState } from 'react'
import { ContractType } from '@/types/contracts';
import ContractItem from './contractItem';

const ContractList = () => {
  const [contracts, setContracts] = useState<ContractType[] | []>([]);

  // run after render
  useEffect(() => {

    // fetch all contracts
    async function fetchContract() {
      const res = await fetch(`/api/contracts`);
      if (res.ok) {
        const contract = await res.json();
        setContracts(contract);
      }
    }
    fetchContract();
  }, []);


  // handle delete contracts
  const handleDelete = async (quoteId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this contract?")
    if (!confirm) return false;

    const res = await fetch(`/api/contracts/${quoteId}`, {
      method: 'DELETE',
    });

    // once success
    if (res.ok) {
      setContracts((prev) => prev.filter((contract: ContractType) => contract.quoteId !== quoteId));
    } else {
      alert('Failed to delete contract');
    }
  };

  return (
    <>
      <ul className="space-y-5">
        {contracts.map((contract: ContractType, index: number) => (
          <ContractItem contract={contract} key={contract.quoteId} onDelete={() => handleDelete(contracts[index].quoteId)} />
        ))}
      </ul>
    </>
  )
}

export default ContractList