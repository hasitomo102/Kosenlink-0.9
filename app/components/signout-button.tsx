'use client'

import { Button } from "@tremor/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
 
export default function SignOutButton({ email }: { email?: string | null }) {
    const [isLoading, setLoading] = useState(false);

    // define use effect to protect route
    useEffect(() => {
        if (!email) redirect("/api/auth/signin");
        console.log("Signed In Email:", email);
    }, [email]);

    // define sign out function
    const handleSignOut = async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
    };
    return (
        <Button onClick={handleSignOut} loading={isLoading} loadingText="Signing Out..." variant="light">Sign Out</Button>
    )
}