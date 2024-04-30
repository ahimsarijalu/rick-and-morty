"use client";

import React, { useEffect, useState } from "react";
import CharacterCard from "@/app/ui/CharacterCard";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronLeftIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const LocationPage: React.FC = () => {
  const [localLocation, setLocalLocation] = useState<{
    [key: string]: CharacterObject[];
  }>({});

  useEffect(() => {
    const locations: { [key: string]: CharacterObject[] } = JSON.parse(
      localStorage.getItem("locations") || "{}"
    );
    setLocalLocation(locations);
  }, []);

  const { setTheme } = useTheme();

  const router = useRouter();

  return (
    <>
      <div className="flex justify-between content-center mx-16 mt-4 h-16 items-center">
        <Button variant="outline" size="icon" onClick={router.back}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="m-4 mx-16">
        {Object.keys(localLocation).map((key) => (
          <div key={key}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{key}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-4 m-4">
                    {localLocation[key].map((character: CharacterObject) => (
                      <CharacterCard
                        key={character.id}
                        id={character.id}
                        name={character.name}
                        status={character.status}
                        species={character.species}
                        type={character.type}
                        gender={character.gender}
                        origin={character.origin}
                        location={character.location}
                        image={character.image}
                        episode={character.episode}
                        url={character.url}
                        created={character.created}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
};

export default LocationPage;
