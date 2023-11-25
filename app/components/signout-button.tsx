'use client'

import { Button } from "@tremor/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
 
export default function SignOutButton({ redirectURL }: { redirectURL?: string }) {
    const [isLoading, setLoading] = useState(false);

    // define sign out function
    const handleSignOut = async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
        if (redirectURL) redirect(redirectURL);
    }
 
    return (
        <Button onClick={handleSignOut} loading={isLoading} loadingText="Signing Out..." variant="light">Sign Out</Button>
    )
}