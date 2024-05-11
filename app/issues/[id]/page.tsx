import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <Grid
      columns={{
        initial: "1",
        md: "2",
      }}
      gap="5"
    >
      <Box>
        <Flex gapX="3">
          <Heading>{issue.title}</Heading>
          <Text size="1">{`#${issue.id}`}</Text>
        </Flex>
        <Flex gapX="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt="4" className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
