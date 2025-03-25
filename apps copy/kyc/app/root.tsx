import React from "react";
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { SessionProvider } from "~/context/SessionContext";

import Error from "../components/Error/Error";

import tailwindStyles from "../styles/tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: tailwindStyles }];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    //TODO: this default message is shown to customer and needs refinement and translation.
    const errorMessage = isRouteErrorResponse(error)
        ? error.data
        : "Something went wrong. Please try again later.";

    return (
        //TODO: the title is shown to customer and needs refinement and translation.
        <Error title="An error occured!">
            <p className="text-xl my-5"> {errorMessage}</p>
        </Error>
    );
}

export default function App() {
    return (
        <SessionProvider>
            <Outlet />
        </SessionProvider>
    );
}
