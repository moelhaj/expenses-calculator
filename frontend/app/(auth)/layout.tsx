export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-screen min-h-screen grid place-content-center bg-gray-100">
			{children}
		</div>
	);
}
