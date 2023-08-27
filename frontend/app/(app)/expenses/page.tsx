"use client";

import Report from "@/components/expenses/report";
import Header from "@/components/header/header";
import DataTable from "@/components/table/dataTable";
import { useGetExpensesQuery } from "@/redux/features/expenses";
import { filterArray } from "@/utils/filterArray";
import { parseFilters } from "@/utils/parseFilters";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Expenses() {
	const [data, setData] = useState<any>(null);
	const [options, setOptions] = useState<any>(null);
	const [filters, setFilters] = useState<any>([]);
	const {
		data: expenses,
		isLoading,
		isFetching,
		isError,
	} = useGetExpensesQuery(undefined, {
		refetchOnFocus: true,
	});

	useEffect(() => {
		if (expenses) {
			const categories = expenses.map((expense: any) => expense.category);
			setOptions(parseFilters(categories));
		}
	}, [expenses]);

	useEffect(() => {
		if (expenses && expenses.length) {
			setData(expenses);
		}
	}, [expenses]);

	useEffect(() => {
		if (filters && filters?.length) {
			const result = filterArray(filters, expenses, "category");
			if (result.length > 0) setData(result);
		} else {
			setData(expenses);
		}
	}, [expenses, filters]);

	if (isLoading)
		return (
			<div className="w-screen h-screen grid place-content-center">
				<CgSpinnerTwo className="animate-spin" size={20} />
			</div>
		);

	return (
		<div>
			<div className="p-3 flex flex-col gap-3">
				<Header />
				{/* overview */}
				<div className="flex items-center mt-5">
					{data && data.length > 0 && <Report />}
					{data && data.length < 1 && (
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<AiOutlineInfoCircle />
							<span>Add expenses to be able to generate reports</span>
						</div>
					)}
				</div>
				{/* Table */}
				<div className="mt-5">
					{data && (
						<DataTable
							data={data}
							options={options}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
