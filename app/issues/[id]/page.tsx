import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issueIdNum = parseInt(params.id);

  if (isNaN(issueIdNum)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueIdNum },
  });

  if (!issue) notFound();

  return (
    <>
      <h1>Issue Detail</h1>
      <div>{issue.id}</div>
      <div>{issue.title}</div>
      <div>{issue.description}</div>
      <div>{issue.status}</div>
      <div>{issue.createdAt.toDateString()}</div>
      <div>{issue.updatedAt.toDateString()}</div>
    </>
  );
};

export default IssueDetailPage;
