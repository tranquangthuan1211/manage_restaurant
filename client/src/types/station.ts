import * as yup from "yup";

export interface Station {
  id: number;
  name: string;
  address: string;
  station_head_id: number;
  num_staff: number;
  type: string;
}

export interface StationConnection {
  static_ip?: string;
  static_camera_key?: string;
  static_camera_id?: string;
}

export interface StationDetail extends Station {
  station_head_name: string;
  station_connection: StationConnection;
}

export const stationType: { [name: string]: string } = {
  stone: "Trạm cân đá",
  brick: "Trạm cân gạch",
};

export const stationSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập name"),
  address: yup.string().required("Vui lòng nhập address"),
  station_head_id: yup.string().required("Vui lòng nhập station_head"),
  num_staff: yup.number().required("Vui lòng nhập num_staff"),
  type: yup.string().required("Vui lòng nhập type"),
});

export const initialStation: StationDetail = {
  id: 0,
  name: "",
  address: "",
  station_head_id: 0,
  num_staff: 0,
  type: "",
  station_head_name: "",
  station_connection: {},
};
