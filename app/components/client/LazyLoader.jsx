"use client";

import Loader from "./Loader";
import useAppReady from "../../hooks/AppReady";
import { useLoader } from "../../hooks/LoadContext";
import DefaultPage from "./DefaultPage";
import { useContext } from "react";
import { LoaderContext } from "@/providers/loader";

export default function LazyLoader() {
  const loader = useLoader();
  const { isLoading } = useContext(LoaderContext);
  const ready = useAppReady();

  if (!ready) {
    loader.start();
    return (
      <div className="flex min-h-screen  justify-center items-center">
        <Loader />
      </div>
    );
  } else {
    loader.stop();
  }

  return (
    <>
      <DefaultPage />
    </>
  );
}
