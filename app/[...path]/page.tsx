import { notFound } from "next/navigation";

type UnknownRouteProps = {
  params: Promise<{ path: string[] }>;
};

export default async function UnknownRoutePage({ params }: UnknownRouteProps) {
  await params;
  notFound();
}
