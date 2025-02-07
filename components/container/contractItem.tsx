import { ContractType, QuoteType } from '@/types/contracts'
import Link from 'next/link'
import React from 'react'

type Props = {
  contract: ContractType,
  onDelete: () => void
}
const ContractItem = ({ contract, onDelete }: Props) => {
  const totalContract = (quotes: QuoteType[]) => {
    let total: number = 0;
    quotes.forEach((quote: QuoteType) => {
      total += Number(quote.price);
    });

    return Number(total).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });


  };
  return (
    <li key={contract.quoteId} className="rounded-lg border p-5 bg-white shadow-md ">
      <div className="flex justify-between">
        <Link href={`/update-contract/${contract.quoteId}`} className="font-semibold hover:underline">{contract.contractor}</Link>
        <div>
          <p>{totalContract(contract.items)}</p>
          <div className="text-right flex gap-2">
            <button className="text-sm text-red-700 text-right" onClick={onDelete}>delete</button>
            <Link href={`/update-contract/${contract.quoteId}`} className="text-sm text-blue-700 text-right" >update</Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ContractItem