import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.bitaEvents.findMany({
    include: {
      event: {
        select: { description: true },
      },
    },
  });
  res.json(result);
}
