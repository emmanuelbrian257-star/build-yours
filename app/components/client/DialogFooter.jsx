import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import WhatsappChat from "./WhatsappChat";
import { Button } from "@/components/ui/button";

const CallToActionModal = ({ open, setOpen, setOpenContact }) => {
  const phoneNumber = "254750552061";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  return (
    <Dialog modal={false} open={open}>
      <DialogContent
        showCloseButton={false}
        className={`sm:max-w-xl opacity-0 ${open ? "opacity-100" : "opacity-0"} transition-all duration-500 bg-zinc-950 text-white border-zinc-800 p-6 sm:p-8 rounded-xl shadow-2xl`}
      >
        {/* Header & Close Button */}
        <div className="flex items-start justify-between gap-4">
          <span
            className="p-4 bg-white rounded-full cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <X width={20} color="black" height={20} />
          </span>
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Let's build something great together
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-base leading-relaxed">
              An all in one SaaS application for your your software needs.Call
              us or chat with us on Whatsapp for more details.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Actions / Footer */}
        <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-start">
          <Button
            onClick={() => setOpenContact(true)}
            size="lg"
            className="w-full sm:w-auto bg-white text-zinc-950 hover:bg-zinc-200 font-semibold transition-colors"
          >
            Get Started
          </Button>
          <WhatsappChat />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallToActionModal;
