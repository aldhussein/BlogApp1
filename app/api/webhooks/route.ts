import { Webhook } from 'svix';
import { headers } from 'next/headers';
// import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import type { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: NextRequest): Promise<Response> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  // Extract Svix headers
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  // Get request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook signature using Svix
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook event received: ID ${id}, type ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {

     console.log("user created", evt.data)

    // const {
    //   id,
    //   first_name,
    //   last_name,
    //   image_url,
    //   email_addresses,
    //   username,
    // } = evt.data;

    // try {
    //   const user = await createOrUpdateUser(
    //     id,
    //     first_name,
    //     last_name,
    //     image_url,
    //     email_addresses,
    //     username
    //   );

    //   if (user && eventType === 'user.created') {
    //     try {
    //       await clerkClient.users.updateUserMetadata(id, {
    //         publicMetadata: {
    //           userMongoId: user._id,
    //           isAdmin: user.isAdmin,
    //         },
    //       });
    //     } catch (error) {
    //       console.error('Error updating user metadata:', error);
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error creating or updating user:', error);
    //   return new Response('User processing error', { status: 400 });
    // }
  }

  if (eventType === 'user.deleted') {
    console.log("user deleted" , evt.data.id)
    // try {
    //   await deleteUser(id);
    // } catch (error) {
    //   console.error('Error deleting user:', error);
    //   return new Response('Delete user error', { status: 400 });
    // }
  }

  return new Response('Webhook processed', { status: 200 });
}
