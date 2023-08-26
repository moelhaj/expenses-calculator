"use client";

import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { user } = useAppSelector((state: any) => state.user);
	useEffect(() => {
		if (!user) {
			redirect("/login");
		}
	}, [user]);
	return (
		<div className="w-screen h-screen overflow-hidden relative mx-auto md:max-w-[1200px] bg-gray-100">
			<div className="w-full rounded-md">{children}</div>
		</div>
	);
}
