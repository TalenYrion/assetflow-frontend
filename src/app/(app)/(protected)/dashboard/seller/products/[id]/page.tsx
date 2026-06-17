import { EditAssetContainer } from './components/edit-asset-container';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const numericId = parseInt(resolvedParams.id, 10);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900/20 shadow-sm">
        <EditAssetContainer assetId={numericId} />
      </div>
    </div>
  );
}
