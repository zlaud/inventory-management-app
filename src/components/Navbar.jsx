"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen w-1/5 bg-[#799364] p-2 text-slate-50 flex flex-col space-y-10 items-center pt-10 sticky">
      <div className="flex items-center">
        <Image
          src="/whisk.png"
          width={40}
          height={40}
          alt="Fridge Icon"
          className="p-2 svg"
        />
        <h1 className="text-2xl text-white font-semibold">CookNook</h1>
      </div>
      <div>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link href="/pantry">
              <div className="flex items-center hover:bg-[#C6D48D] p-2 rounded-md">
                <Image
                  src="/fridge.svg"
                  width={20}
                  height={20}
                  alt="Fridge Icon"
                  className="mx-2 svg"
                />
                <p className="font-medium tracking-wide text-lg">Pantry</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/meal-planner">
              <div className="flex items-center hover:bg-[#C6D48D] p-2 rounded-md">
                <Image
                  src="/utensil.svg"
                  width={20}
                  height={20}
                  alt="Utensil Icon"
                  className="mx-2 svg"
                />
                <p className="font-medium tracking-wide text-lg ">
                  Meal Planner
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
