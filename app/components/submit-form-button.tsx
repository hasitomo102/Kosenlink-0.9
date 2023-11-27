'use client'

import { Button, ButtonProps } from "@tremor/react";
import { useFormStatus } from 'react-dom';
 
/**
 * Button will display loading state if nested in parent form
 *
 * @export
 * @param {{ redirectURL?: string }} { redirectURL }
 * @return {*} 
 */
export default function SignOutButton({ redirectURL, ...params }: { redirectURL?: string } & ButtonProps) {
    // get parent form status
    const { pending } = useFormStatus();
 
    return (
        <Button loading={pending} loadingText="Loading..." variant="light" {...params}>{params.children}</Button>
    )
}