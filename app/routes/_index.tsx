import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader(args: LoaderFunctionArgs) {
  const auth = await getAuth(args);
  console.log(auth);
  return json({ auth });
}

export default function Index() {
  const { auth } = useLoaderData<typeof loader>();
  return (
    <div>
      <SignedIn>
        <h1>Index route</h1>
        <p>You are signed in!</p>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
