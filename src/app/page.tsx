import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

// import { CreatePost } from "@/app/_components/create-post";
// import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
// import { LoginButton } from "./_components/LoginButton";
// import { Input } from "@/app/_components/input";
import { SongSearchInput } from "./_components/SongSearchInput";

export default async function Home() {
	noStore();
	// const hello = await api.post.hello.query({ text: "from tRPC" });
	// const session = await getServerAuthSession();

	return (
		<main className="mx-auto flex min-h-screen w-[70vw] flex-col items-center">
			<h1 className="pb-12 pt-32 text-2xl">
				Welcome to Lyric-Glyph, your go-to destination for exploring and sharing
				the lyrics that resonate with your soul! Whether you're looking to
				relive the magic of a favorite song or discover new lyrical gems, we've
				got you covered.
			</h1>
			<h2 className="p-4 pb-12 text-xl">
				How It Works:
				<ol className="list-decimal">
					<li>Search for a song </li>
					<li>Select the lines that resonate with you</li>
					<li>Create a personalized lyric image</li>
					<li>Share it with the world!</li>
				</ol>
			</h2>

			<SongSearchInput />
			{/* <Link href="/api/auth/signin">Signin</Link> */}
		</main>
	);
}
