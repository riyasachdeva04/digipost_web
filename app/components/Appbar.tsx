"use client";

import {signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();
        

    return (
        <div className="flex justify-between items-center p-4 bg-gray-600">
            <div className="text-xl font-bold ">
                DigiPost
            </div>
            <div>
                {session.data?.user && <button onClick={() => signOut()}>Logout</button>}
                {!session.data?.user && <button onClick={() => signIn()}>Sign In</button>}
            </div>
        </div>
    );
}
