"use client";

import dynamic from "next/dynamic";

// The whole site is a client-rendered SPA (hash routing + browser APIs),
// loaded client-side only so it renders identically to the original.
const App = dynamic(() => import("@/site/App.jsx"), { ssr: false });

export default function Page() {
  return <App />;
}
