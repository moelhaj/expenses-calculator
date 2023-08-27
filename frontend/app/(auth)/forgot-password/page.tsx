"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgetPasswordMutation } from "@/redux/features/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const UserSchema = z.object({
	email: z.string().email().trim().toLowerCase(),
});

export default function Reset() {
	const [error, setError] = useState("");
	const [forgetPassword, { isLoading, isSuccess }] = useForgetPasswordMutation();
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		// defaultValues: UserSchema.parse({
		// 	email: "",
		// }),
	});

	async function onSubmit(data: z.infer<typeof UserSchema>) {
		setError("");
		try {
			await forgetPassword({
				email: data.email,
			}).unwrap();
		} catch (error: any) {
			if (error.originalStatus === 409) {
				return setError("Error resting password, try again later");
			}
		}
	}

	useEffect(() => {
		if (isSuccess) {
			redirect("/login");
		}
	}, [isSuccess]);

	return (
		<div className="bg-white rounded-md px-3 py-5 w-[400px]">
			<h1 className="font-bold text-2xl">Sign Up</h1>
			<p>An email will send to you, please follow the instructions</p>
			{error !== "" && <p className="text-red-600 text-sm mt-3">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading}>
						Send Email
					</Button>
				</form>
			</Form>
			<div className="mt-10">
				<p className="flex items-center gap-1">
					Already have an account?
					<Link href="/login" className="hover:text-gray-900 duration-300">
						Sign in.
					</Link>
				</p>
			</div>
		</div>
	);
}
