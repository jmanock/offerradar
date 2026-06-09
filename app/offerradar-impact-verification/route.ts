export const dynamic = "force-static";

const verification =
  "Impact-Site-Verification: 2aa35de9-ce0c-4373-aa5a-64b91c7469da";

export function GET() {
  return new Response(verification, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
