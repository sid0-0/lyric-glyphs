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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="p-4">Search for song/artist name</h2>
      <SongSearchInput />
      {/* <Link href="/api/auth/signin">Signin</Link> */}
    </main>
  );
}
