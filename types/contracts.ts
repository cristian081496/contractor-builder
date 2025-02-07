export type QuoteType = {
  id: number,
  name: string,
  description: string,
  price: number
}

export type ContractType = {
  quoteId: string,
  contractor: string
  items: QuoteType[]
}