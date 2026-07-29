import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * POST, not GET, and reached from a <form> rather than a <Link>.
 *
 * Next prefetches links, and a prefetch of a GET handler would silently clear
 * the draft-mode cookie out from under an editor who merely hovered the button.
 */
export async function POST(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const referer = request.headers.get("referer");
  const path = referer ? new URL(referer).pathname : "/";
  redirect(path);
}
