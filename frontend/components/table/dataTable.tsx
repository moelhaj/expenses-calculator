"use client";

import { useState, useEffect } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/table/filters";
import Pagination from "@/components/table/pagination";
import NewExpense from "../expenses/new";
import Menu from "./menu";
import EditExpense from "../expenses/edit";
import DeleteExpense from "../expenses/delete";

export default function DataTable({ data, options, filters, setFilters }: any) {
	const [action, setAction] = useState("");
	const [expense, setExpense] = useState<any>(null);
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "title",
			header: () => <div className="font-bold text-green">Title</div>,
		},
		{
			accessorKey: "details",
			header: () => <div className="font-bold text-green">Details</div>,
		},
		{
			accessorKey: "category",
			header: () => <div className="font-bold text-green">Category</div>,
		},
		{
			accessorKey: "amount",
			header: () => <div className="font-bold text-green">Amount</div>,
		},
		{
			header: () => <div className="text-center font-bold text-green"></div>,
			id: "actions",
			cell: ({ row }) => {
				// const payment = row.original;

				return (
					<div className="flex justify-center">
						<Menu row={row} setAction={setAction} setExpense={setExpense} />
					</div>
				);
			},
		},
	];
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
		},
		enableRowSelection: true,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<div className="bg-white rounded-md p-3">
				{/* filters */}
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-1 items-center space-x-2">
						<Input
							placeholder="Search"
							value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
							onChange={event =>
								table.getColumn("title")?.setFilterValue(event.target.value)
							}
							className="h-8 w-[150px] lg:w-[250px]"
						/>
						<Filters options={options} filters={filters} setFilters={setFilters} />
					</div>
					<NewExpense />
				</div>
				{/* table */}
				<div className="rounded-md border mt-5">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup: any) => (
								<TableRow key={headerGroup.id} className="border-slate">
									{headerGroup.headers.map((header: any) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row: any) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className="border-slate"
									>
										{row.getVisibleCells().map((cell: any) => (
											<TableCell key={cell.id} className="font-[16px]">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				{/* pagination */}
				<Pagination table={table} />
			</div>
			{expense && action === "edit" && (
				<EditExpense
					expense={expense}
					open={expense && action === "edit"}
					setOpen={() => {
						setAction("");
						setExpense("");
					}}
				/>
			)}
			{expense && (
				<DeleteExpense
					expense={expense}
					open={expense && action === "delete"}
					setOpen={() => {
						setAction("");
						setExpense("");
					}}
				/>
			)}
		</>
	);
}
