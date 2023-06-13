"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
    return (
        <button
            style={{ marginRight: 10 }}
            onClick={() => signIn('cognito', {
                callbackUrl: `${window.location.origin}/protected`
            })}
        >
            Sign in
        </button>
    );
};

export const HomeButton = () => {
    return (
        <Link href="/" style={{ marginRight: 10 }}>
            Home
        </Link>
    );
};

export const LogoutButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};

export const ProfileButton = () => {
    return <Link href="/protected">Profile</Link>;
};