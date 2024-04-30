"use client";

import React, { useEffect, useState } from "react";
import CharacterCard from "@/app/ui/CharacterCard";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

  return (
    <>
      <div className="m-4">
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
