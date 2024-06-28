// src/DataTable.tsx
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
// import './DataTable.css'; // Optional: for custom styles
import { DataItem } from '../types';

interface DataTableProps {
  data: DataItem[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const columns = useMemo<ColumnDef<DataItem>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Value',
        accessorKey: 'value',
      },
      {
        header: 'Number',
        accessorKey: 'number',
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [data, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { getHeaderGroups, getRowModel, getPageCount, setPageIndex, getState } = table;
  const paginationState = getState().pagination;

  return (
    <div>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder='Search...'
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4'
      />
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={2}>Total</td>
            <td>{getRowModel().rows.reduce((total, row) => total + row.original.number, 0)}</td>
          </tr>
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => setPageIndex(paginationState.pageIndex - 1)}
          disabled={!paginationState.pageIndex}
          className='px-4 py-2 bg-gray-300 rounded-md'
        >
          Previous
        </button>
        <span className='px-4 py-2'>
          Page {paginationState.pageIndex + 1} of {getPageCount()}
        </span>
        <button
          onClick={() => setPageIndex(paginationState.pageIndex + 1)}
          disabled={paginationState.pageIndex + 1 >= getPageCount()}
          className='px-4 py-2 bg-gray-300 rounded-md'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
