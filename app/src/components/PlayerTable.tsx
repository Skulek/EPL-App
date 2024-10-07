import React, { useMemo } from 'react';
import { Player } from '../types/types.ts';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  FilterFn,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { formatDate } from '../utills';
import PlayerTableItem from './PlayerTableItem';

interface PlayerTableProps {
  players: Player[];
  clubName: string;
}

const fuzzyFilter: FilterFn<Player> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columnHelper = createColumnHelper<Player>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('photoUrl', {
        header: '',
        cell: info => info.row.original,
        enableSorting: false,
        enableGlobalFilter: false,
      }),
      columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
        id: 'fullName',
        header: 'Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('birthDate', {
        header: 'Birth Date',
        cell: info => formatDate(info.getValue()),
      }),
      columnHelper.accessor('position', {
        header: 'Position',
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: players,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <input
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(e.target.value)}
        className="p-2 font-lg shadow border border-block mb-4 w-full"
        placeholder="Search all columns..."
      />
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-xs sm:text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} scope="col" className={`px-3 py-3 ${header.index > 1 ? 'hidden sm:table-cell' : ''}`}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
                <th scope="col" className="px-2 py-3 w-12 sm:hidden"></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <PlayerTableItem key={row.id} player={row.original} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PlayerTable;