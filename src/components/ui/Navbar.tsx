import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-12">
                <a
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <img src="/area.png" alt="Logo" className="h-10" />
                </a>
                <div className="flex flex-1 justify-center">
                    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <a
                            href="/pricing"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Pricing
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Documentation
                        </a>
                        <a
                            href="/team"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Team
                        </a>
                        <a
                            href="/services-vitrine"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Services
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">User</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <a href="/profile">Profile</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                        <nav className="flex flex-col gap-4 p-4">
                            <a href="/pricing" className="text-lg font-semibold">
                                Pricing
                            </a>
                            <a href="#" className="text-lg font-semibold">
                                Documentation
                            </a>
                            <a href="/team" className="text-lg font-semibold">
                                Team
                            </a>
                            <a href="/services-vitrine" className="text-lg font-semibold">
                                Services
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </>
    );
}
