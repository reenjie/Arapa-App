import React, { useState, useEffect } from "react";
import { Text, Input, Checkbox } from "@chakra-ui/react";

export const Manage = ({
  userdata,
  name,
  setName,
  email,
  setEmail,
  contact,
  setContact,
}) => {
  useEffect(() => {
    setName(userdata.Name);
    setEmail(userdata.Email);
    setContact(userdata.Contact);
  }, []);
  return (
    <div>
      <Text>Name</Text>
      <Input
        variant="filled"
        onChange={(e) => {
          setName(e.target.value);
        }}
        defaultValue={userdata.Name}
        mb={2}
      />

      <Text>Email</Text>
      <Input
        variant="filled"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        defaultValue={userdata.Email}
        mb={2}
      />

      <Text>Contact Number</Text>
      <Input
        onChange={(e) => {
          setContact(e.target.value);
        }}
        defaultValue={userdata.Contact}
        variant="filled"
        mb={2}
      />
    </div>
  );
};

export const ChangePass = ({
  oldpass,
  setOldpass,
  newpass,
  setNewpass,
  repass,
  setRepass,
  defnm,
  setDefnm,
  notmatch,
  setNotmatch,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Text>Old Password</Text>
      <Input
        variant="filled"
        value={oldpass}
        onChange={(e) => {
          setOldpass(e.target.value);
          setDefnm(false);
        }}
        mb={2}
        type={show ? "text" : "password"}
        isInvalid={defnm}
      />
      {defnm && (
        <span style={{ color: "red", fontSize: "13px" }}>
          entered password does not match in your current password
        </span>
      )}
      <Text>New Password</Text>
      <Input
        variant="filled"
        value={newpass}
        onChange={(e) => {
          setNewpass(e.target.value);
        }}
        mb={2}
        type={show ? "text" : "password"}
      />
      <Text>Re Enter Password</Text>
      <Input
        variant="filled"
        value={repass}
        onChange={(e) => {
          setRepass(e.target.value);
          setNotmatch(false);
        }}
        mb={2}
        type={show ? "text" : "password"}
        isInvalid={notmatch}
      />
      {notmatch && (
        <>
          <span style={{ color: "red", fontSize: "13px" }}>
            password does not match
          </span>
          <br />
        </>
      )}
      <Checkbox
        onChange={() => {
          show ? setShow(false) : setShow(true);
        }}
      >
        Show Password
      </Checkbox>
    </div>
  );
};
