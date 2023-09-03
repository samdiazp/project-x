"use client";

import { useRouter } from "next/navigation";

export default function Validate() {
  const router = useRouter();
  async function validate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jwt = formData.get("jwt");
    if (!jwt) return;
    const response = await fetch("/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: {
        revalidate: 1
      },
      body: JSON.stringify({ jwt }),
    });
    if (!response.ok) return;
    (event.target as HTMLFormElement).reset();
    router.refresh();
  }
  return (
    <div className="flex flex-col">
      <h2>Validate</h2>
      <form onSubmit={validate}>
        <input type="text" placeholder="validate JWT" name="jwt" id="jwt" />
        <button type="submit">validate</button>
      </form>
    </div>
  );
}
