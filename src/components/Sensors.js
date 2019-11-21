import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import styled from "@emotion/styled";

import Listing from "./Sensor";
import { listSensorRoomDatas } from "../graphql/queries";
import { onUpdateSensorRoomData } from "../graphql/subscriptions";

const Container = styled("div")`
  max-width: 1000px;
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
  API.graphql(graphqlOperation(onUpdateSensorRoomData)).subscribe({
      next: (e) => {
          setListings(prevValue => {
          console.log("Invoked onUpdateSensorRoomData Subscription callback " + e.value.data.onUpdateSensorRoomData.id);  
                const updatedListings = prevValue.map(l => {
                  console.log("In onUpdateSensorRoomData processing, received sensorId = " + e.value.data.onUpdateSensorRoomData.sensorId);
                  console.log("In onUpdateSensorRoomData processing, received id = " + e.value.data.onUpdateSensorRoomData.id);
                  if (l.sensorId == e.value.data.onUpdateSensorRoomData.sensorId) {
                  console.log("In onUpdateSensorRoomData processing, matched");
                    return e.value.data.onUpdateSensorRoomData;
                  } else {
                    console.log("In onUpdateSensorRoomData processing, Not matched");
                    return l;
                  }
                });
                return updatedListings;
          });
      }
    });
  }, []);
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
