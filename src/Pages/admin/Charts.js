import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Container, Box, Grid, GridItem, Center } from "@chakra-ui/react";

function Charts({ usercount, schoolregistered, pending, approved }) {
  const data = [
    {
      name: "Approved Schools",
      Approved: approved,
    },
    {
      name: "Pending Schools",
      Pending: pending,
    },
    {
      name: "School Registered",
      Registered: schoolregistered,
    },
    {
      name: "All Users",
      All: usercount,
    },
  ];
  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" gap={2}>
        <GridItem colSpan={[6, 6, 6, 6]}>
          <Box width={"100%"} overflowX={"scroll"}>
            <Center>
              <BarChart
                width={900}
                height={400}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Approved" fill="#38A169" />
                <Bar dataKey="Pending" fill="#E53E3E" />
                <Bar dataKey="Registered" fill="#3182CE" />
                <Bar dataKey="All" fill="#319795" />
              </BarChart>
            </Center>
          </Box>
        </GridItem>
        {/* <GridItem colSpan={[6, 6, 6, 3]}>
          <Box width={"100%"} overflowX={"scroll"}>
            <LineChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />

              <Line type="monotone" dataKey="Approved" stroke="#38A169" />
              <Line type="monotone" dataKey="Pending" stroke="#E53E3E" />
              <Line type="monotone" dataKey="Registered" stroke="#3182CE" />
              <Line type="monotone" dataKey="All" stroke="#319795" />
            </LineChart>
          </Box>
        </GridItem> */}
      </Grid>
    </>
  );
}

export default Charts;
