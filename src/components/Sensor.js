import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  FaRegEdit,
  FaRegHeart,
  FaHeart,
  FaRegStickyNote,
  FaExternalLinkAlt,
  FaRegTrashAlt,
  FaRegAddressBook,
  FaRegEnvelope,
  FaPhone
} from "react-icons/fa";


const SensorRoomData = styled("div")`
  background-color: #31465f;
  border-radius: 4px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
`;

const JobTitle = styled("h2")`
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 0;
`;

const Company = styled("h3")`
  color: #ffac31;
  margin-top: 0;
  margin-bottom: 24px;
`;

const Icon = styled("button")`
  padding: 8px 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
  flex: 1;
  background-color: #55667d;

  &:hover {
    background-color: #31465f;
  }
`;

const StatusContainer = styled("div")`
  min-width: 200px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: auto;

  @media (max-width: 800px) {
    justify-content: flex-start;
  }
`;

const Status = styled("div")`
  background-color: #55667d;
  padding: 6px 12px;
  color: #ffac31;
  border-radius: 3px;
  font-size: 12px;
  display: inline;
  margin-bottom: 4px;
  font-weight: bold;
`;

const DueDate = styled("span")`
  color: #ffac31;
  text-transform: uppercase;
  font-size: 12px;
  display: block;
`;

const SensorRoomDataInfo = styled("div")``;

const SensorRoomDataMetaData = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const SensorRoomDataDetails = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;
const SensorRoomDataDetailWrapper = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
`;

const SensorRoomDataDetailFieldName = styled("span")`
  color: #ffac31;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SensorRoomDataDetailFieldValue = styled("span")`
  color: #ffffff;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SensorRoomDataDetailFieldValueHighlight = styled("span")`
  color: #ffac31;
  background: #b51609;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Divider = styled("div")`
  height: 1px;
  background-color: #152939;
`;

const ExternalLink = styled("a")`
  color: #ffffff;
  flex: 1;
`;

const STATUSES = {
  TRACKING: "Tracking",
  APPLIED: "Applied",
  TAKE_HOME_ASSIGNMENT: "Take Home Assignment",
  INTERVIEWING: "Interviewing"
};

const hasContactInfo = listing =>
  !!(listing.contactName || listing.contactEmail || listing.contactPhoneNumber);

export default props => {

  return (
    <SensorRoomData>
      <SensorRoomDataInfo>
        <SensorRoomDataMetaData>
          <div>
            <JobTitle>{"Sensor ID: " + props.sensor.sensorId}</JobTitle>
          </div>
        </SensorRoomDataMetaData>
          <>
            <Divider />
            <SensorRoomDataDetails>
              <SensorRoomDataDetailWrapper>
                <SensorRoomDataDetailFieldName>
                  {"Sensor Type: "}
                </SensorRoomDataDetailFieldName>
                <SensorRoomDataDetailFieldValue>
                  {"Water flow"}
                </SensorRoomDataDetailFieldValue>
              </SensorRoomDataDetailWrapper>
              <SensorRoomDataDetailWrapper>
                <SensorRoomDataDetailFieldName>
                  {"Current Flow Rate: "}
                </SensorRoomDataDetailFieldName>
                {props.sensor.flowRate != 100 || props.sensor.occupied == true   ? 
                  (
                    <SensorRoomDataDetailFieldValue>
                      {props.sensor.flowRate + " mL/min"}
                    </SensorRoomDataDetailFieldValue>
                  ) : 
                  (
                    <SensorRoomDataDetailFieldValueHighlight>
                      {props.sensor.flowRate + " mL/min"}
                    </SensorRoomDataDetailFieldValueHighlight>
                  )}
              </SensorRoomDataDetailWrapper>
              <SensorRoomDataDetailWrapper>
                <SensorRoomDataDetailFieldName>
                  {"Room Number: "}
                </SensorRoomDataDetailFieldName>
                <SensorRoomDataDetailFieldValue>
                  {props.sensor.roomId}
                </SensorRoomDataDetailFieldValue>
              </SensorRoomDataDetailWrapper>
              <SensorRoomDataDetailWrapper>
                <SensorRoomDataDetailFieldName>
                  {"Room Occupancy Status: "}
                </SensorRoomDataDetailFieldName>
                <SensorRoomDataDetailFieldValue>
                  {props.sensor.occupied ? ("Occupied") : ("Vacant")}
                </SensorRoomDataDetailFieldValue>
              </SensorRoomDataDetailWrapper>
            </SensorRoomDataDetails>
          </>
      </SensorRoomDataInfo>

    </SensorRoomData>
  );
};
