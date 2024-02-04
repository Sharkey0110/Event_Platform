"use client"

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

export default function CheckoutButton({ event }: { event: IEvent }){
    const isClosed = new Date (event.endDateTime) < new Date()
    //get the user id, but on client side components
    const  { user } = useUser();
    const userId = user?.publicMetadata.userId as string;

    return(
        <div className="flex items-center gap-3">
            {isClosed ? (
                <p className="p-2 text-red-400">Event is over</p>
            ): (
                <>
                <SignedOut>
                    <Button asChild className="button rounded-full" size='lg'>
                        <Link href="/sign-in">Get Tickets</Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId = {userId} />
                </SignedIn>
                </>
            )
            }
        </div>
    )
}