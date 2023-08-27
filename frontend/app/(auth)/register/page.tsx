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
import { useRegisterMutation } from "@/redux/features/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

const UserSchema = z.object({
	name: z.string().trim(),
	email: z.string().email().trim().toLowerCase(),
	password: z
		.string()
		.regex(passwordRegex, {
			message:
				"Password must have 1 lower case letter, 1 upper case letter, 1 number, and 1 special character",
		})
		.min(8, {
			message: " Password should be at least 8 character",
		}),
	confirmPassword: z.string().min(8),
});

export default function Register() {
	const [error, setError] = useState("");
	const [register, { isLoading, isSuccess }] = useRegisterMutation();
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		// defaultValues: UserSchema.parse({
		// 	name: "",
		// 	email: "",
		// 	password: "",
		// 	confirmPassword: "",
		// }),
	});

	async function onSubmit(data: z.infer<typeof UserSchema>) {
		setError("");
		if (data.password !== data.confirmPassword) {
			return setError("Passwords didn't match");
		}
		try {
			await register({
				name: data.name,
				email: data.email,
				password: data.password,
			}).unwrap();
		} catch (error: any) {
			if (error.originalStatus === 409) {
				return setError("Account taken");
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
			{error !== "" && <p className="text-red-600 text-sm mt-3">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input disabled={isLoading} type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>confirm Password</FormLabel>
								<FormControl>
									<Input disabled={isLoading} type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading}>
						Sign Up
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
