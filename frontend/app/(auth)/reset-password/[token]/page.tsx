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
import { useRegisterMutation, useVerifyTokenMutation } from "@/redux/features/authApi";
import { useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { usePathname } from "next/navigation";

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

const passwordsSchema = z.object({
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

export default function ResetPassword() {
	const pathname = usePathname();
	const token = pathname.substring(pathname.lastIndexOf("/") + 1);
	const { user } = useAppSelector((state: any) => state.user);
	const [error, setError] = useState("");
	const [register, { isLoading, isSuccess }] = useRegisterMutation();
	const [verifyToken, { isLoading: verifyLoading, isSuccess: verifySuccess }] =
		useVerifyTokenMutation();
	const form = useForm<z.infer<typeof passwordsSchema>>({
		resolver: zodResolver(passwordsSchema),
		// defaultValues: passwordsSchema.parse({
		// 	password: "",
		// 	confirmPassword: "",
		// }),
	});

	async function onSubmit(data: z.infer<typeof passwordsSchema>) {
		setError("");
		if (data.password !== data.confirmPassword) {
			return setError("Passwords didn't match");
		}

		try {
			await verifyToken(token);
			if (!verifySuccess) {
				await register({
					email: user.email,
					password: data.password,
				}).unwrap();
			}
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
			<h1 className="font-bold text-2xl">Reset Password</h1>
			{error !== "" && <p className="text-red-600 text-sm mt-3">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading || verifyLoading}
										type="password"
										{...field}
									/>
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
									<Input
										disabled={isLoading || verifyLoading}
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading || verifyLoading}>
						Reset
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
