import React from "react";
import Header from "../../components/header/header";
import DefaultBtn from "../../components/defaultBtn/defaultBtn";

const AdminPage = () => {
  return (
    <div>
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Admin </span>
          </>
        }
      />
      <DefaultBtn text="Pull data" backgroundColor="#FF7F23   " />
    </div>
  );
};  

export default AdminPage;
