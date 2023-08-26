"use client";
import Link from "next/link";
import { useState } from "react";

export default function Reset() {
	const [email, setEmail] = useState("");

	const handleSubmit = async () => {};

	return (
		<div className="bg-white rounded-md px-3 py-5 w-[400px]">
			<h1 className="font-bold text-2xl">Reset Password</h1>
			<form onSubmit={handleSubmit} className="space-y-6 w-full mt-5" method="POST">
				{/* Email */}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Email address
					</label>
					<div className="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							value={email}
							onChange={(event: any) => setEmail(event.target.value)}
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="duration-300 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Reset
					</button>
				</div>
			</form>
			<div className="mt-10 flex flex-col gap-5">
				<p>
					Your request to reset your password has been received successfully. Please check
					your mail box to proceed further.
				</p>
				<div>
					<Link href="/login" className="hover:text-gray-900 duration-300">
						Back to Sign in.
					</Link>
				</div>
			</div>
		</div>
	);
}
