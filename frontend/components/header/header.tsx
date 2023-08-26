"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeCredentials } from "@/redux/slices/userSlice";
import { redirect } from "next/navigation";

export default function Header() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.user);
	if (status === "loading") {
		return <div>Loading</div>;
	}
	const logout = () => {
		dispatch(removeCredentials());
		redirect("/login");
	};
	return (
		<div className="flex justify-between p-3 items-center border-b">
			<div className="font-bold text-lg">Expenses Calculator</div>

			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="bg-gray-300 w-10 h-10 rounded-full grid place-content-center cursor-pointer">
							<Image src={Avatar} width={30} height={30} alt="avatar" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-44 mr-3">
						<DropdownMenuItem className="cursor-pointer" onClick={logout}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
