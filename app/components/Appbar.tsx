"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();

    return (
        <div className="flex justify-between items-center p-4 bg-gray-600">
                <Link href="/">
                    <Button className="text-white bg-gray-600 text-lg">
                      DigiPost
                    </Button>
                </Link>
            <div className="flex items-center space-x-4">
                <Link href="/Profile">
                    <Button>
                      View Profile
                    </Button>
                </Link>
            <div>
                {session.data?.user && <button onClick={() => signOut()}>Logout</button>}
                {!session.data?.user && <button onClick={() => signIn()}>Sign In</button>}
            </div>
            </div>
        </div>
    );
}
