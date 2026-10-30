"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Menu } from "lucide-react";
import SheetMenu from "./Menu";

const Header = ({ open, setOpen }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section className="relative h-14 mb-10">
        <div
          className={`fixed z-[9999]  text-black bg-slate-200 sm:p-12 h-14 flex items-center justify-end top-0 left-0 right-0 sxs:px-2`}
        >
          <div className="">
            {/*  <h2 className="font-bosch uppercase sxs:tracking-wide sm:text-2xl">
                buildyoursse
            </h2> */}
            <div className="flex items-center justify-center gap-2">
              <h2 className="sm:text-xl font-bosch">Menu</h2>
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer z-[99]"
              >
                <Menu width={30} height={30} />
              </div>
            </div>
          </div>
        </div>

        <SheetMenu
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          open={open}
          setOpen={setOpen}
        />
      </section>
    </>
  );
};

export default Header;
