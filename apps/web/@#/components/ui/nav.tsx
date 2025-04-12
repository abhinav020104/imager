"use client";

import { Button } from "../../../@#/components/ui/button";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-[80px] bg-gradient-to-r from-indigo-500 to-purple-500  backdrop-blur-lg flex px-6 fixed z-50 justify-center shadow-2xl">
      <div className="w-full max-w-7xl h-full flex justify-between items-center">
        <div
          className="text-white text-3xl font-extrabold tracking-tight cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Pixel
        </div>

        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-white border border-white hover:bg-white/20 rounded-full px-5 py-2 transition-all duration-300 cursor-pointer"
              >
                Login
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-6 py-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
              >
                Signup
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full px-5 py-2 transition-all duration-300"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full px-5 py-2 transition-all duration-300"
              onClick={() => {
                router.push("/train");
              }}
            >
              Train
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full px-5 py-2 transition-all duration-300"
              onClick={() => {
                router.push("/gallery");
              }}
            >
              Gallery
            </Button>

            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
