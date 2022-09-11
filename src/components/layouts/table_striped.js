import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
export default function Table_striped(props) {
  const Theader = props.table_header.thead;
  const Tbody = props.table_body;
  const header = Theader.map((tableheader) => <Th>{tableheader.th}</Th>);
  return (
    <TableContainer userSelect={"none"}>
      <Table variant="striped" colorScheme="blue" size={"md"}>
        <Thead>{header}</Thead>
        <Tbody fontSize={14}>{Tbody}</Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
}
