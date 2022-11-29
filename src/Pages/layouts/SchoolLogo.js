import { Center, Image } from "@chakra-ui/react";
import React from "react";

export default function SchoolLogo({ logo }) {
  return (
    <div>
      <Center mt={5}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src={logo}
          alt="Dan Abramov"
        />
      </Center>
    </div>
  );
}
