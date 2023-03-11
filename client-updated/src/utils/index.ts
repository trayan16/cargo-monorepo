import styled from 'styled-components';
export const mobileVersionWidth = 900;
export type IVehicleStatus = {
    [key: string]: string;
}
export const VEHICLE_STATUSES: IVehicleStatus = {
    "AT_TERMINAL" : "At Terminal",
    "DISPATCHED" : "Dispatched",
    "DELIVERED" : "Delivered",
}
export enum TRUCK_STATUSES {
    "LOADED" = "LOADED",
    "AVAILABLE" = "AVAILABLE",
    "ASSIGNED" = "ASSIGNED",
}
export const GridActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`