import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import styled from "@emotion/styled";

import Listing from "./Sensor";
import { listSensorRoomDatas } from "../graphql/queries";

const Container = styled("div")`
  max-width: 800px;
  margin: 16px auto;
`;

const Listings = styled("div")`
  margin-top: 24px;
`;

export default () => {
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    API.graphql(graphqlOperation(listSensorRoomDatas))
      .then(result => {
          console.log("Invoked listSensorRoomDatas callback " + result.data.listSensorRoomDatas.items[0]);  
        setListings(
          result.data.listSensorRoomDatas.items.sort((a, b) => {
          console.log("Invoked listSensorRoomDatas callback a.sensorId=" + a.sensorId + ", b.sensorId=" + b.sensorId);  
            if (a.updatedAt > b.updatedAt) return -1;
            else return 1;
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
      }
  return (
    <Container>
      <Listings>
        {listings.map(listing => (
          <Listing
            key={listing.id}
            sensor={listing}
          />
        ))}
      </Listings>
    </Container>
  );
};
