import Link from "next/link";

export default function Header() {
  return (
    <header className="p-5 bg-blue-500">
      <Link href="/articles" className="px-2 py-2 bg-white text-blue-500 rounded-lg">
        Articles
      </Link>
    </header>
  );
}
