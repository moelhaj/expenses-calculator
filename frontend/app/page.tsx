"use client";
import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";

export default function Home() {
	const { user } = useAppSelector((state: any) => state.user);

	if (!user) {
		return redirect("/login");
	} else {
		return redirect("/expenses");
	}
}
