import Head from "next/head";

export default function Home() {
  return <div>{process.env.NEXT_PUBLIC_PORT}</div>;
}
