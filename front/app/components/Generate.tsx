"use client";
import { useState } from "react";

export default function Generate() {
  const [token, setToken] = useState("");
  const [jwt, setJwt] = useState("");
  function handleChangeToken(event: React.ChangeEvent<HTMLInputElement>) {
    setToken(event.target.value);
  }
  async function generateJWT(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ jwt: token }),
    });
    const body = await res.json();
    setJwt(body.token);
    setToken("");
  }

  return (
    <div className="flex flex-col">
      <h2>Generate</h2>
      <form onSubmit={generateJWT}>
        <input
          type="text"
          placeholder="generate JWT"
          name="jwt"
          className="text-black"
          onChange={handleChangeToken}
          value={token}
        />
        <button type="submit">generate</button>
      </form>
      {jwt.length > 0 && jwt}
    </div>
  );
}
