// export async function getStaticProps() {
// 	const response = fetch("http://localhost");
// 	return {
// 		props: {
// 			expenses: (await response).json(),
// 		},
// 		revalidate: 30,
// 	};
// }

// export default async function Page() {
// 	const res = await fetch("https://...", { next: { tags: ["collection"] } });
// 	const data = await res.json();
// 	// ...
// }

// export default async function Page() {
// 	const res = await fetch("https://...", { next: { tags: ["collection"] } });
// 	const data = await res.json();
// 	// ...
// }

// import { revalidateTag } from "next/cache";

// revalidateTag(tag);
