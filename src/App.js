import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";
import awsExports from "./aws-exports";
import Alerts from "./components/OpsConsole";
import logo from "./octank-logo.png";

const Header = styled("div")`
  background-color: #31465f;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  height: 80px;
  z-index: 2;
`;
const Image = styled.img`
  height: 100px;
  width: 100px
  padding: 16px;
`;

const Title = styled("h1")`
  text-align: center;
  color: #ffffff;
  margin-bottom: 8px;
`;

const theme = {
  formContainer: {
    margin: 0,
    padding: "8px 24px 24px"
  },
  formSection: {
    backgroundColor: "#31465f",
    borderRadius: "4px"
  },
  sectionHeader: {
    color: "#ffffff"
  },
  inputLabel: {
    color: "#ffffff"
  },
  input: {
    backgroundColor: "#152939",
    color: "#FFAC31"
  },
  hint: {
    color: "#ffffff"
  },
  button: {
    borderRadius: "3px",
    backgroundColor: "#FFAC31"
  },
  a: {
    color: "#FFAC31"
  }
};

function App() {
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return state.isLoggedIn ? (
    <Alerts />
  ) : (
    <>
      <Header>
        <Image src={logo} />
        <Title>Hotel Operator Console </Title>
      </Header>
      <Authenticator
        onStateChange={authState => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
        amplifyConfig={awsExports}
        theme={theme}
      />
    </>
  );
}

export default App;
