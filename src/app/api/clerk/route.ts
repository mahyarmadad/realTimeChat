// import {WebhookEventType} from "@clerk/nextjs/api";

import {updateUserProfileImage} from "@/server/functions/user";

export async function POST(request: Request) {
  const payload = await request.json();
  const eventType = payload.type;
  if (eventType === "user.updated") {
    const userId = payload.data.id;
    const profileImageUrl = payload.data.image_url;
    await updateUserProfileImage(userId, profileImageUrl);
  }
  return Response.json({message: "Received"});
}
