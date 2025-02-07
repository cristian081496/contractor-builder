import ContractList from "@/components/container/contractList";
import PageContent from "@/components/page-content";
import Link from "next/link";

export default function Home() {
  return (
    <PageContent title="Contracts">
      <div>
        <div className="flex justify-end mb-5">
          <Link href="/add-contract" className="text-blue-700 text-sm hover:underline">Add Contract</Link>
        </div>
        <ContractList />
      </div>
    </PageContent>
  );
}
