import React, { useState } from "react";
import { Stack, Button , Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const CustomSearch = ({ search = "", output, schooltype }) => {
  const navigate = useNavigate();

  
  return (
    <div style={{height:"200px",overflowY:"scroll",backgroundColor:"rgb(199, 219, 235)"}}>
      {search || schooltype  ? (
        output.filter(
          (k) =>
            k.Name.toLowerCase().includes(search.toLowerCase()) &&
            k.SchoolType.toLowerCase().includes(schooltype.toLowerCase()) 
        ).length >= 1 ? (
          output
            .filter(
              (k) =>
                k.Name.toLowerCase().includes(search.toLowerCase()) &&
                k.SchoolType.toLowerCase().includes(schooltype.toLowerCase()) 
            )
            .map((row) => {
              const { Name, SchoolType , Address } = row;
              console.log(row);
              return (
                <Stack mt={4}>
                  <Button
                    mb={4}
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
                 
                 <Text mr={3}>
                 {Name}
                 <br/>
               <span style={{fontSize:"13px;font-weight:normal"}}>{Address}</span>
                  
                 </Text> | 
                 <h6 style={{fontSize:"12px",marginLeft:"5px"}}>{SchoolType}</h6>
                  
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
