import Link from "next/link"

export default function Home() {
  return (
    <>
      <main>
        Hello World!
        <Link href="/actors">Actors</Link>
      </main>
    </>
  )
}
