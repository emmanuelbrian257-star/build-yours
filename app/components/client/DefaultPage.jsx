import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import SmoothScroll from "./SmoothScroll";
import Header from "./Header";
import Container from "../../pages/Container";
import VideoPresentation from "./VideoPresentation";
import Wrapper from "../../pages/Wrapper";
import ContainerWrapper from "./ContainerWrapper";
import client from "@/app/lib/sanity/client";
import { groq } from "next-sanity";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterDialog from "./DialogFooter";
import { toast } from "react-hot-toast";
import gsap from "gsap";
import { runConfetti } from "./CommonForms";

gsap.registerPlugin(ScrollTrigger);

const fetchProductDetailsQuery = groq`*[_type=='projects'][0]`;
const fetchCardDetailsQuery = groq`*[_type=='experience'][0]`;

const DefaultPage = () => {
  const [open, setOpen] = useState(false);
  const container = useRef();
  const finishPage = useRef();
  const [projectDetails, setProjectDetails] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fontLoaded = async () => {
    await document.fonts.ready.then(() => {
      setTimeout(() => {
        setFontsLoaded(true);
      }, 2200);
    });
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await client.fetch(fetchProductDetailsQuery);
      setProjectDetails(response);
    } catch (error) {
      console.error("Error fetching...", error);
    }
  };

  const fetchCardDetails = async () => {
    try {
      const response = await client.fetch(fetchCardDetailsQuery);
      setCardDetails(response);
    } catch (error) {
      console.error(error, "Error fetching card details...");
    }
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchCardDetails();
  }, []);

  useEffect(() => {
    fontLoaded();
  }, []);

  const containerRef = container.current;

  useLayoutEffect(() => {
    if (!containerRef) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "bottom bottom",
        onEnter: () => {
          if (!finishPage.current) {
            runConfetti();
            toast.success(
              "Make your dream come to reality with the right software. Application is still in development more to come 😂",
              { duration: 10000 }
            );
            setTimeout(() => {
              setOpenDialog(!openDialog);
            }, 1200);
            finishPage.current = true;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef]);

  if (!cardDetails) return;

  return (
    <SmoothScroll>
      <div
        ref={container}
        className={`${fontsLoaded ? "opacity-100" : "opacity-0"} bg-gray-100 duration-300 transition-all overflow-hidden md:grid gap-2 grid-cols-2`}
      >
        <div>
          <div>
            <Header open={open} setOpen={setOpen} />
          </div>
          <Container />
          <Wrapper cardDetails={cardDetails} />
        </div>
        <div className="md:block sxs:hidden relative">
          <ContainerWrapper cardDetails={cardDetails} />
        </div>

        <VideoPresentation />

        <FooterDialog
          open={openDialog}
          setOpen={setOpenDialog}
          setOpenContact={setOpen}
        />
      </div>
    </SmoothScroll>
  );
};

export default DefaultPage;
