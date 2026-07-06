type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  type?: unknown;
  projectLink?: unknown;
  timeline?: unknown;
  details?: unknown;
};

const DISCORD_FIELD_LIMIT = 1024;
const DISCORD_DESCRIPTION_LIMIT = 4096;

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { message: "Contact webhook is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const company = clean(payload.company);
  const type = clean(payload.type);
  const projectLink = clean(payload.projectLink);
  const timeline = clean(payload.timeline);
  const details = clean(payload.details);

  if (!name || !email || !type || !details) {
    return Response.json(
      { message: "Name, email, request type, and details are required." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [
        {
          title: "New Atlantic Contact Request",
          description: truncate(details, DISCORD_DESCRIPTION_LIMIT),
          color: 0xffffff,
          fields: [
            field("Type", type, true),
            field("Name", name, true),
            field("Email", email, true),
            field("Company / Studio", company || "Not provided", true),
            field("Timeline", timeline || "Not provided", true),
            field("Project / Game Link", projectLink || "Not provided", false),
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordResponse.ok) {
    return Response.json(
      { message: "Unable to send request right now." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Request sent." });
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function field(name: string, value: string, inline: boolean) {
  return {
    name,
    value: truncate(value, DISCORD_FIELD_LIMIT) || "Not provided",
    inline,
  };
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit - 3)}...`;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
