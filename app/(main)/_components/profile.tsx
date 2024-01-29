import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCircleIcon } from "lucide-react";
import React from "react";

function ProfileSection() {
  return (
    <Dialog>
      <div
        role="button"
        className="transition flex items-center justify-start gap-4 w-full hover:bg-neutral-300 dark:hover:bg-[#343541] m-0 rounded-md text-sm py-3 px-2"
      >
        <DialogTrigger className="flex items-center justify-start gap-4 w-full">
          <UserCircleIcon size={20} />
          <span className="text-sm text-foreground font-semibold">Profile</span>
        </DialogTrigger>
        <DialogContent className="dark:bg-[#202123] border-none rounded-lg text-foreground px-0">
          <DialogHeader>
            <DialogTitle className="text-start flex items-center justify-between px-6">
              Settings
            </DialogTitle>
            <hr
              className="w-full my-2 border-neutral-300 dark:border-neutral-700"
              style={{ height: "1px" }}
            />
          </DialogHeader>
          <div
            className="px-6 flex items-center gap-8"
            // ismobile && "flex-col"
          >
            {/* <SettingsBar /> */}
            <div className="w-full">
              <div className="flex items-center justify-between text-sm">
                <span>Theme</span>
                <ModeToggle />
              </div>
              <hr
                className="w-full my-2 border-neutral-300 dark:border-neutral-700"
                style={{ height: "1px" }}
              />
              <div className="flex items-center justify-between text-sm">
                <span>Delete all chats</span>
                <Button
                  variant="destructive"
                  className="text-xs font-semibold py-0 px-3 bg-red-600"
                  onClick={() => console.log("delete all chats")}
                >
                  Delete all
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default ProfileSection;
