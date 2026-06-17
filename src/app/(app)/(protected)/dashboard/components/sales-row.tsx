import { Sale } from '../types/index'; // Path to your Seller types file
import { ArrowUpRight, User } from 'lucide-react';

interface SalesRowProps {
  sale: Sale;
}

export function SalesRow({ sale }: SalesRowProps) {
  const formattedDate = new Date(sale.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <tr className="border-b border-neutral-100 dark:border-neutral-800/60 last:border-none hover:bg-neutral-50/40 dark:hover:bg-neutral-900/20 transition-colors">
      {/* Asset Meta Info */}
      <td className="py-3.5 pl-4 pr-3 align-middle">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden flex items-center justify-center">
            {sale.asset.thumbnailUrl ? (
              <img
                src={sale.asset.thumbnailUrl}
                alt={sale.asset.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[10px] uppercase font-bold text-neutral-400">
                {sale.asset.fileExtension}
              </span>
            )}
          </div>
          <div className="min-w-0 max-w-[180px] sm:max-w-xs">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {sale.asset.title}
            </p>
            <p className="text-xs text-neutral-400 truncate uppercase">
              .{sale.asset.fileExtension} Asset
            </p>
          </div>
        </div>
      </td>

      {/* Buyer info */}
      <td className="py-3.5 px-3 align-middle hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
            {sale.buyer.avatarUrl ? (
              <img
                src={sale.buyer.avatarUrl}
                alt={sale.buyer.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-3 w-3 text-neutral-400" />
            )}
          </div>
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[120px]">
            {sale.buyer.name}
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="py-3.5 px-3 align-middle text-xs text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">
        {formattedDate}
      </td>

      {/* Platform split accounting columns */}
      <td className="py-3.5 px-3 align-middle text-xs font-medium text-neutral-400 text-right hidden lg:table-cell">
        -${parseFloat(sale.platformFee).toFixed(2)}
      </td>

      <td className="py-3.5 pl-3 pr-4 align-middle text-right">
        <div className="inline-flex flex-col items-end">
          <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3 text-emerald-500 shrink-0" />$
            {(
              parseFloat(sale.pricePaid) - parseFloat(sale.platformFee)
            ).toFixed(2)}
          </span>
          <span className="text-[10px] text-neutral-400 line-through lg:hidden">
            ${parseFloat(sale.pricePaid).toFixed(2)} gross
          </span>
        </div>
      </td>
    </tr>
  );
}
