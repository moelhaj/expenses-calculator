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
import { useLoginMutation } from "@/redux/features/authApi";
import { setCredentials } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const UserSchema = z.object({
	email: z.string().email().trim().toLowerCase(),
	password: z.string().trim(),
});

export default function Login() {
	const [error, setError] = useState("");
	const dispatch = useAppDispatch();
	const [login, { isLoading, isSuccess }] = useLoginMutation();
	const { user } = useAppSelector((state: any) => state.user);
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		// defaultValues: UserSchema.parse({
		// 	email: "",
		// 	password: "",
		// }),
	});

	useEffect(() => {
		if (user) {
			redirect("/expenses");
		}
	}, [user]);

	async function onSubmit(data: z.infer<typeof UserSchema>) {
		setError("");
		try {
			const response = await login(data).unwrap();
			console.log(response);
			dispatch(setCredentials({ user: response.user, token: response.token }));
		} catch (error: any) {
			if (error.originalStatus === 400) {
				return setError("Wrong Credentials");
			}
		}
	}

	return (
		<div className="bg-white rounded-md px-3 py-5 w-[400px]">
			<h1 className="font-bold text-2xl">Sign In</h1>
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
					<Button type="submit" disabled={isLoading}>
						Sign In
					</Button>
				</form>
			</Form>
			<div className="mt-10 flex flex-col gap-3">
				<div>
					<Link className="hover:text-gray-900 duration-300" href="/forgot-password">
						Forgot Password?
					</Link>
				</div>
				<p className="flex items-center gap-1">
					Don&apos;t have an account?
					<Link href="/register" className="hover:text-gray-900 duration-300">
						Sign up now.
					</Link>
				</p>
			</div>
		</div>
	);
}
