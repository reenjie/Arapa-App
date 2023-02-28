import React, { useState } from "react";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const CustomSearch = ({ search, output }) => {
  const navigate = useNavigate();

  return (
    <div>
      {search ? (
        output.filter((k) =>
          k.Name.toLowerCase().includes(search.toLowerCase())
        ).length >= 1 ? (
          output
            .filter((k) => k.Name.toLowerCase().includes(search.toLowerCase()))
            .map((row) => {
              const { Name, SchoolType } = row;
              return (
                <Stack mt={4}>
                  <Button
                    colorScheme="cyan"
                    variant="link"
                    onClick={(e) => {
                      navigate("Searchkey/Results", {
                        state: {
                          data: [{ data: { contents: row } }],
                          searchkey: Name,
                          searchType: SchoolType,
                        },
                      });
                    }}
                  >
                    {Name}
                    <i
                      className="fas fa-link"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  </Button>
                </Stack>
              );
            })
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                fontSize: "30px",
                textTransform: "upppercase",
                color: "gray.400",
              }}
            >
              No Data Found.
            </h1>
          </>
        )
      ) : (
        ""
      )}
    </div>
  );
};
