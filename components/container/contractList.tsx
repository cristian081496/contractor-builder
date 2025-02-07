"use client"

import React, { useEffect, useState } from 'react'
import { ContractType } from '@/types/contracts';
import ContractItem from './contractItem';

const ContractList = () => {
  const [contracts, setContracts] = useState<ContractType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // run after render
  useEffect(() => {

    // fetch all contracts
    async function fetchContract() {
      const res = await fetch(`/api/contracts`);
      if (res.ok) {
        const contract = await res.json();
        setContracts(contract);
      }
      setLoading(false);
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

        {loading && <h1>Fetching data...</h1>}

        {contracts.length === 0 && !loading && <h1>No Contract found.</h1>}
      </ul>
    </>
  )
}

export default ContractList