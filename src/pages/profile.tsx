import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";

export default function Component() {
  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6 py-36">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <img
              src="/profile-picture.jpeg"
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Robinson Richardson</h1>
              <Button size="sm">Change photo</Button>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="E.g. Jane Doe" defaultValue="Robison Richardson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Enter your bio" className="mt-1" style={{ minHeight: "100px" }} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>Change Password</div>
              <div>For your security, please do not share your password with others.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" id="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" id="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" id="confirm-password" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
