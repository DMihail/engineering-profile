import { notFound } from "next/navigation";

type UnknownRouteProps = {
  params: Promise<{ path: string[] }>;
};

/** Catch-all → 404; allowed to block under Cache Components. */
export const instant = false;

export default async function UnknownRoutePage({ params }: UnknownRouteProps) {
  await params;
  notFound();
}
