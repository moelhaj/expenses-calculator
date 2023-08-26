import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";
import { LuEdit, LuTimerReset, LuTrash2 } from "react-icons/lu";
import { BsUpload } from "react-icons/bs";
import DeleteExpense from "../expenses/delete";

export default function Menu({ row, setAction, setExpense }: any) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<FiMoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="border-slate">
				{/* Edit */}
				<DropdownMenuItem
					className="flex gap-2 items-center cursor-pointer"
					onClick={() => {
						setExpense(row.original);
						setAction("edit");
					}}
				>
					<LuEdit />
					Edit
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<div
						onClick={() => {
							setExpense(row.original);
							setAction("delete");
						}}
						className="w-full hover:text-red duration-300 flex gap-2 items-center cursor-pointer"
					>
						<LuTrash2 />
						Delete
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
