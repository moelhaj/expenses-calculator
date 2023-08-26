import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateExpenseMutation } from "@/redux/features/expenses";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/redux/store";

type Category = {
	value: string;
	label: string;
};

const categories: Category[] = [
	{
		value: "rent",
		label: "Rent",
	},
	{
		value: "shopping",
		label: "Shopping",
	},
	{
		value: "transportation",
		label: "Transportation",
	},
	{
		value: "entertainment",
		label: "Entertainment",
	},
	{
		value: "health",
		label: "Health",
	},
	{
		value: "utilities",
		label: "Utilities",
	},
	{
		value: "others",
		label: "Others",
	},
];

const ExpenseSchema = z.object({
	title: z.string().trim().default(""),
	details: z.string().trim().default(""),
	amount: z.string().default(""),
});

export default function EditExpense({ expense, open, setOpen }: any) {
	const formRef = useRef<any>(null);
	const { user } = useAppSelector((state: any) => state.user);
	const [error, setError] = useState("");
	const [categoryError, setCategoryError] = useState("");
	const [category, setCategory] = useState("");
	const form = useForm<z.infer<typeof ExpenseSchema>>({
		resolver: zodResolver(ExpenseSchema),
		defaultValues: ExpenseSchema.parse({
			title: expense.title,
			details: expense.details,
			amount: expense.amount,
		}),
	});

	const [updateExpense, { isLoading, isSuccess }] = useUpdateExpenseMutation();

	async function onSubmit(data: z.infer<typeof ExpenseSchema>) {
		setError("");
		setCategoryError("");
		try {
			const response: any = await updateExpense({
				id: expense.id,
				title: data.title,
				details: data.details,
				amount: data.amount.toString(),
				category: category !== "" ? category : expense.category,
				userId: user.id,
			});
			formRef.current.reset();
			if (response.error) return setError("Something wrong try again later");
		} catch (error: any) {
			return setError("Something wrong try again later");
		}
	}

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
		}
	}, [isSuccess]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Expense</DialogTitle>
				</DialogHeader>
				{error !== "" && <p className="text-red-600 text-sm mt-2">{error}</p>}
				<Form {...form}>
					<form
						ref={formRef}
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-4 mt-2"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="details"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Details</FormLabel>
									<FormControl>
										<Textarea
											className="resize-none"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input disabled={isLoading} type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-3 flex flex-col gap-3">
							<Label>Category</Label>
							<Select
								value={category !== "" ? category : expense.category.toLowerCase()}
								onValueChange={setCategory}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{categories.map((category: Category) => (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							{categoryError !== "" && (
								<p className="text-red-600 text-sm mt-3">{categoryError}</p>
							)}
						</div>
						<div className="mt-3 flex justify-end">
							<Button type="submit" disabled={isLoading}>
								Update
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
