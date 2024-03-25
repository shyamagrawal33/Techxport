import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import {
  cilArrowThickToBottom,
  cilOptions,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import { OverlayPanel } from "primereact/overlaypanel";
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import Select from "react-select/creatable";
import ApiServices from "src/services/apiservices";
import Common from "src/services/Common";
import { useDispatch } from "react-redux";
const ExportCreateFile = () => {
  const search = useLocation().search;
  const data = JSON.parse(atob(search.substring(1)));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [ports, setPorts] = useState([]);
  const [masterFormData, setMasterFormData] = useState([
    [
      {
        type: "1. First Half",
        value: [
          {
            label: "Invoice No.*",
            type: "text",
            value: "test1",
          },
          {
            label: "Invoice Date*",
            type: "date",
            value: "test2",
          },
          {
            label: "PO No.*",
            type: "text",
            value: "test2",
          },
          {
            label: "PO Date",
            type: "date",
            value: "test2",
          },
          {
            label: "Exporter Name*",
            type: "text",
            value: "test2",
          },
          {
            label: "Exporter Address*",
            type: "textarea",
            value: "test2",
          },
          {
            label: "Consignee Name*",
            type: "text",
            value: "test2",
          },
          {
            label: "Consignee Address*",
            type: "textarea",
            value: "test2",
          },
          {
            label: "Notify Party Name*",
            type: "text",
            value: "test2",
          },
          {
            label: "Terms of Payment*",
            type: "text",
            value: "test2",
          },
        ],
      },
      {
        type: "2. Second Half",
        value: [
          {
            label: "Incoterm*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "EXW (Ex Works)",
                value: "exw",
              },
              {
                label: "FAS (Free Alongside Ship)",
                value: "fas",
              },
              {
                label: "FOB (Free on Board)",
                value: "fob",
              },
              {
                label: "CFR (Cost and Freight)",
                value: "cfr",
              },
              {
                label: "CIF (Cost, Insurance, and Freight)",
                value: "cif",
              },
              {
                label: "CPT (Carriage Paid To)",
                value: "cpt",
              },
              {
                label: "CIP (Carriage and Insurance Paid To)",
                value: "cip",
              },
              {
                label: "DAT (Delivered at Terminal)",
                value: "dat",
              },
              {
                label: "DAP (Delivered at Place)",
                value: "dap",
              },
              {
                label: "DDP (Delivered Duty Paid)",
                value: "ddp",
              },
            ],
            optionfrom: "contactAPI",
          },
          {
            label: "Country of Destination*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
          {
            label: "Origin of Goods*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
          {
            label: "Mode of Transport*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "Road",
                value: "road",
              },
              {
                label: "Rail",
                value: "rail",
              },
              {
                label: "Sea",
                value: "sea",
              },
              {
                label: "Air",
                value: "air",
              },
            ],
            optionfrom: "contactAPI",
          },
          {
            label: "Port of Loading*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: ports,
            optionfrom: "contactAPI",
          },
          {
            label: "Port of Discharge*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: ports,
            optionfrom: "contactAPI",
          },
          {
            label: "ETD",
            type: "date",
            value: "test2",
          },
          {
            label: "ETA",
            type: "date",
            value: "test2",
          },
          {
            label: "BL No.",
            type: "text",
            value: "test2",
          },
          {
            label: "Insurance Policy No.",
            type: "text",
            value: "test2",
          },
          {
            label: "Transport Company",
            type: "text",
            value: "test2",
          },
          {
            label: "Carrier No.",
            type: "text",
            value: "test2",
          },
          {
            label: "Country of Final Destination*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
        ],
      },
    ],
  ]);
  const [otherFormsData, setOtherFormsData] = useState([
    {
      type: "Tax Invoice",
      value: [
        [
          {
            label: "Invoice No.*",
            type: "text",
            value: "",
          },
          {
            label: "Invoice Date*",
            type: "date",
            value: "",
          },
        ],
        [
          {
            label: "PO No.*",
            type: "text",
            value: "",
          },
          {
            label: "PO Date",
            type: "date",
            value: "",
          },
        ],
        [
          {
            label: "Exporter Name*",
            type: "text",
            value: "",
          },
          {
            label: "Exporter Address*",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Consignee Name*",
            type: "text",
            value: "",
          },
          {
            label: "Consignee Address*",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Notify Party Name",
            type: "text",
            value: "",
          },
          {
            label: "Notify Party Address",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Terms of Payment",
            type: "text",
            value: "",
          },
          {
            label: "Incoterm",
            type: "select",
            value: "test1",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "EXW (Ex Works)",
                value: "exw",
              },
              {
                label: "FAS (Free Alongside Ship)",
                value: "fas",
              },
              {
                label: "FOB (Free on Board)",
                value: "fob",
              },
              {
                label: "CFR (Cost and Freight)",
                value: "cfr",
              },
              {
                label: "CIF (Cost, Insurance, and Freight)",
                value: "cif",
              },
              {
                label: "CPT (Carriage Paid To)",
                value: "cpt",
              },
              {
                label: "CIP (Carriage and Insurance Paid To)",
                value: "cip",
              },
              {
                label: "DAT (Delivered at Terminal)",
                value: "dat",
              },
              {
                label: "DAP (Delivered at Place)",
                value: "dap",
              },
              {
                label: "DDP (Delivered Duty Paid)",
                value: "ddp",
              },
            ],
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Country of Destination*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
          {
            label: "Country of Goods*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Mode of Transport*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "Road",
                value: "road",
              },
              {
                label: "Rail",
                value: "rail",
              },
              {
                label: "Sea",
                value: "sea",
              },
              {
                label: "Air",
                value: "air",
              },
            ],
            optionfrom: "contactAPI",
          },
          {
            label: "Port of Loading*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: ports,
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Port of Discharge*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: ports,
            optionfrom: "contactAPI",
          },
          {
            label: "ETD",
            type: "text",
            value: "test1",
          },
        ],
        [
          {
            label: "ETA",
            type: "text",
            value: "",
          },
          {
            label: "BL No.",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Insurance Policy No.",
            type: "text",
            value: "",
          },
          {
            label: "Transport Company",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Carrier No.",
            type: "text",
            value: "",
          },
          {
            label: "Country of Final Destination*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Serial No.*",
            type: "text",
            value: "",
          },
          {
            label: "Description of Goods*",
            type: "select",
            value: "",
            options: [
              {
                label: "abcd",
                value: "abcd",
              },
              {
                label: "efgh",
                value: "efgh",
              },
              {
                label: "ijkl",
                value: "ijkl",
              },
            ],
          },
        ],
        [
          {
            label: "Type of Packaging",
            type: "text",
            value: "",
          },
          {
            label: "HS Code*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Marks & Numbers",
            type: "text",
            value: "",
          },
          {
            label: "Quantity",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Unit of measurement*",
            type: "select",
            value: "",
            options: [
              {
                label: "Litre",
                value: "litre",
              },
              {
                label: "Gallons",
                value: "gallons",
              },
              {
                label: "Kg",
                value: "kg",
              },
              {
                label: "gms",
                value: "gms",
              },
              {
                label: "MT",
                value: "mt",
              },
              {
                label: "mg",
                value: "mg",
              },
              {
                label: "Doz",
                value: "doz",
              },
              {
                label: "sqft",
                value: "sqft",
              },
              {
                label: "Boxes",
                value: "boxes",
              },
              {
                label: "Pcs",
                value: "pcs",
              },
              {
                label: "Nos",
                value: "nos",
              },
            ],
          },
          {
            label: "Currency*",
            type: "select",
            value: "",
            options: [
              {
                label: "Litre",
                value: "litre",
              },
              {
                label: "Gallons",
                value: "gallons",
              },
              {
                label: "Kg",
                value: "kg",
              },
              {
                label: "gms",
                value: "gms",
              },
              {
                label: "MT",
                value: "mt",
              },
              {
                label: "mg",
                value: "mg",
              },
              {
                label: "Doz",
                value: "doz",
              },
              {
                label: "sqft",
                value: "sqft",
              },
              {
                label: "Boxes",
                value: "boxes",
              },
              {
                label: "Pcs",
                value: "pcs",
              },
              {
                label: "Nos",
                value: "nos",
              },
            ],
          },
        ],
        [
          {
            label: "Amount*",
            type: "text",
            value: "",
          },
          {
            label: "Net weight",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Gross weight",
            type: "text",
            value: "",
          },
          {
            type: "Discount",
            text: "text",
            value: "",
          },
        ],
        [
          {
            type: "Insurance Amount",
            text: "text",
            value: "",
          },
          {
            type: "Other Expense",
            text: "text",
            value: "",
          },
        ],
        [
          {
            type: "Declaration",
            text: "text",
            value: "",
          },
          {
            type: "Stamp*",
            text: "file",
            value: "",
          },
        ],
        [
          {
            type: "Sign*",
            text: "file",
            value: "",
          },
        ],
      ],
    },
    {
      type: "Sales Contract",
      value: [
        [
          {
            label: "PO No.*",
            type: "text",
            value: "test1",
          },
          {
            label: "PO Date",
            type: "date",
            value: "",
          },
        ],
        [
          {
            label: "Exporter Name*",
            type: "text",
            value: "",
          },
          {
            label: "Exporter Address*",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Buyer Name*",
            type: "text",
            value: "",
          },
          {
            label: "Buyer Address*",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Description of Goods*",
            type: "select",
            value: "test1",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "abcd",
                value: "abcd",
              },
              {
                label: "efgh",
                value: "efgh",
              },
              {
                label: "ijkl",
                value: "ijkl",
              },
            ],
            optionfrom: "contactAPI",
          },
          {
            label: "HS Code*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Terms of Payment*",
            type: "text",
            value: "",
          },
          {
            label: "Incoterm*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "EXW (Ex Works)",
                value: "exw",
              },
              {
                label: "FAS (Free Alongside Ship)",
                value: "fas",
              },
              {
                label: "FOB (Free on Board)",
                value: "fob",
              },
              {
                label: "CFR (Cost and Freight)",
                value: "cfr",
              },
              {
                label: "CIF (Cost, Insurance, and Freight)",
                value: "cif",
              },
              {
                label: "CPT (Carriage Paid To)",
                value: "cpt",
              },
              {
                label: "CIP (Carriage and Insurance Paid To)",
                value: "cip",
              },
              {
                label: "DAT (Delivered at Terminal)",
                value: "dat",
              },
              {
                label: "DAP (Delivered at Place)",
                value: "dap",
              },
              {
                label: "DDP (Delivered Duty Paid)",
                value: "ddp",
              },
            ],
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Type of Packaging*",
            type: "text",
            value: "",
          },
          {
            label: "Quantity*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Unit of measurement*",
            type: "select",
            value: "",
            options: [
              {
                label: "Litre",
                value: "litre",
              },
              {
                label: "Gallons",
                value: "gallons",
              },
              {
                label: "Kg",
                value: "kg",
              },
              {
                label: "gms",
                value: "gms",
              },
              {
                label: "MT",
                value: "mt",
              },
              {
                label: "mg",
                value: "mg",
              },
              {
                label: "Doz",
                value: "doz",
              },
              {
                label: "sqft",
                value: "sqft",
              },
              {
                label: "Boxes",
                value: "boxes",
              },
              {
                label: "Pcs",
                value: "pcs",
              },
              {
                label: "Nos",
                value: "nos",
              },
            ],
          },
          {
            label: "Price per unit*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Amount*",
            type: "text",
            value: "",
          },
          {
            label: "Port of Loading*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: ports,
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Port of Discharge*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: ports,
            optionfrom: "contactAPI",
          },
          {
            label: "Country of Origin*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
        ],
        [
          {
            label: "Country of Final Destination*",
            type: "select",
            value: "",
            placeholder: "Find or add a contact",
            options: countries,
            optionfrom: "contactAPI",
          },
          {
            label: "Net weight*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Gross weight*",
            type: "text",
            value: "",
          },
          {
            label: "Declaration",
            type: "text",
            value: "",
          },
        ],
      ],
    },
    {
      type: "Packing List",
      value: [
        [
          {
            label: "Invoice No.*",
            type: "text",
            value: "",
          },
          {
            label: "Invoice Date",
            type: "date",
            value: "",
          },
        ],
        [
          {
            label: "PO No.*",
            type: "text",
            value: "",
          },
          {
            label: "PO Date",
            type: "date",
            value: "",
          },
        ],
        [
          {
            label: "Exporter Name*",
            type: "text",
            value: "",
          },
          {
            label: "Exporter Address*",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Consignee Name*",
            type: "text",
            value: "",
          },
          {
            label: "Consignee Address*",
            type: "textarea",
            value: "",
          },
        ],
        [
          {
            label: "Notify Party Name",
            type: "text",
            value: "",
          },
          {
            label: "Terms of Payment*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Incoterm",
            type: "select",
            value: "test1",
            placeholder: "Find or add a contact",
            options: [
              {
                label: "EXW (Ex Works)",
                value: "exw",
              },
              {
                label: "FAS (Free Alongside Ship)",
                value: "fas",
              },
              {
                label: "FOB (Free on Board)",
                value: "fob",
              },
              {
                label: "CFR (Cost and Freight)",
                value: "cfr",
              },
              {
                label: "CIF (Cost, Insurance, and Freight)",
                value: "cif",
              },
              {
                label: "CPT (Carriage Paid To)",
                value: "cpt",
              },
              {
                label: "CIP (Carriage and Insurance Paid To)",
                value: "cip",
              },
              {
                label: "DAT (Delivered at Terminal)",
                value: "dat",
              },
              {
                label: "DAP (Delivered at Place)",
                value: "dap",
              },
              {
                label: "DDP (Delivered Duty Paid)",
                value: "ddp",
              },
            ],
            optionfrom: "contactAPI",
          },
          {
            label: "Country of Destination*",
            type: "select",
            value: "",
            options: countries,
          },
        ],
        [
          {
            label: "Origin of Goods*",
            type: "select",
            value: "",
            options: countries,
          },
          {
            label: "Mode of Transport*",
            type: "select",
            value: "",
            options: [
              {
                label: "Road",
                value: "road",
              },
              {
                label: "Rail",
                value: "rail",
              },
              {
                label: "Sea",
                value: "sea",
              },
              {
                label: "Air",
                value: "air",
              },
            ],
          },
        ],
        [
          {
            label: "Port of Loading*",
            type: "select",
            value: "",
            options: ports,
          },
          {
            label: "Port of Discharge*",
            type: "select",
            value: "",
            options: ports,
          },
        ],
        [
          {
            label: "BL No.",
            type: "text",
            value: "",
          },
          {
            label: "Country of Final Destination*",
            type: "select",
            value: "",
            options: countries,
          },
        ],
        [
          {
            label: "Description of Goods*",
            type: "select",
            value: "",
            options: [
              {
                label: "abcd",
                value: "abcd",
              },
              {
                label: "efgh",
                value: "efgh",
              },
              {
                label: "ijkl",
                value: "ijkl",
              },
            ],
          },
          {
            label: "Type of packaging",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "HS Code",
            type: "text",
            value: "",
          },
          {
            label: "Quantity*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Unit of measurement*",
            type: "select",
            value: "",
            options: [
              {
                label: "Litre",
                value: "litre",
              },
              {
                label: "Gallons",
                value: "gallons",
              },
              {
                label: "Kg",
                value: "kg",
              },
              {
                label: "gms",
                value: "gms",
              },
              {
                label: "MT",
                value: "mt",
              },
              {
                label: "mg",
                value: "mg",
              },
              {
                label: "Doz",
                value: "doz",
              },
              {
                label: "sqft",
                value: "sqft",
              },
              {
                label: "Boxes",
                value: "boxes",
              },
              {
                label: "Pcs",
                value: "pcs",
              },
              {
                label: "Nos",
                value: "nos",
              },
            ],
          },
          {
            label: "Price per unity*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Amount*",
            type: "text",
            value: "",
          },
          {
            label: "Net weight*",
            type: "text",
            value: "",
          },
        ],
        [
          {
            label: "Gross weight*",
            type: "text",
            value: "",
          },
          {
            label: "Declaration",
            type: "text",
            value: "",
          },
        ],
      ],
    },
  ]);

  useEffect(() => {
    ApiServices.getCountries().then((countriesResponse) => {
      if (countriesResponse?.data?.StatusCode !== 0) {
        setCountries(countriesResponse?.data?.countries)
      }
    }).catch((error) => {
      Common.getErrors(error, dispatch, navigate)
    })
    ApiServices.getPorts().then((portsResponse) => {
      if (portsResponse?.data?.StatusCode !== 0) {
        setPorts(portsResponse?.data?.ports)
      }
    }).catch((error) => {
      Common.getErrors(error, dispatch, navigate)
    })
  }, [])

  let index = otherFormsData.findIndex((el) => {
    return el?.type == data.id.value.toUpperCase();
  });

  const getOptions = (label) => {
    if (label.toLowerCase().includes("port")) {
      return ports;
    } else if (label.toLowerCase().includes("country") || label.toLowerCase().includes("origin")) {
      return countries;
    }
  }

  return (
    <CRow className="main-form-row">
      <CCol xs={12} lg={12} xl={12}>
        <div
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: "20px 20px 0px 20px",
            textAlign: "end",
          }}
        >
          <Button
            style={{ marginRight: 10, height: 40 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button style={{ height: 40 }}>Save</Button>
        </div>
        {data.id.value == "Master File" && <h4>Master File</h4>}
        {data.id.value == "Master File" &&
          masterFormData.map((el, index1) => {
            return (
              <>
                {el.map((el, index2) => {
                  return (
                    <>
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: 15,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: "black",
                              fontWeight: 600,
                              fontSize: 18,
                              minHeight: 30,
                            }}
                          >
                            {el.type}
                          </div>

                          <hr style={{ borderColor: "black" }}></hr>
                          <CRow>
                            {el.value.map((el3, index3) => {
                              return (
                                <CCol
                                  xs={12}
                                  lg={6}
                                  xl={4}
                                  key={index3 + "" + 1}
                                >
                                  <CFormLabel
                                    style={{
                                      fontSize: 12,
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {el3.label}
                                    {el3.needRadio && (
                                      <>
                                        <div style={{ display: "flex" }}>
                                          {el3.radioOption.map((ell, index) => {
                                            return (
                                              <>
                                                <div style={{ marginLeft: 10 }}>
                                                  <input
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id={
                                                      "flexRadioDefault" + index
                                                    }
                                                  />
                                                  <label
                                                    htmlFor="flexRadioDefault1"
                                                    style={{ marginLeft: 5 }}
                                                  >
                                                    {ell.value}
                                                  </label>
                                                </div>
                                              </>
                                            );
                                          })}
                                        </div>
                                      </>
                                    )}
                                  </CFormLabel>

                                  <div>
                                    {el3.type == "text" && (
                                      <CFormInput
                                        placeholder={el3.placeholder}
                                      ></CFormInput>
                                    )}
                                    {el3.type == "select" && (
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="color"
                                        placeholder={
                                          <div>{el3.placeholder}</div>
                                        }
                                        onChange={(e) => {
                                          let formD = [...masterFormData];
                                          formD[index1][index2].value[
                                            index3
                                          ].value = e.value;
                                          formD[index1][index2].value[
                                            index3
                                          ].extraInput.isDisabled =
                                            e.value == "Yes" ? false : true;
                                          setMasterFormData(formD);
                                        }}
                                        defaultValue={el3.value}
                                        options={el3.options.length != 0 ? el3.options : getOptions(el3.label)}
                                      />
                                    )}
                                    {el3.type == "date" && (
                                      <CFormInput
                                        type="date"
                                        placeholder={el3.placeholder}
                                      ></CFormInput>
                                    )}
                                    {el3.extraInput && (
                                      <CFormInput
                                        type="text"
                                        placeholder={el3.placeholder}
                                        style={{ marginTop: 10 }}
                                        disabled={
                                          masterFormData[index1][index2].value[
                                            index3
                                          ].extraInput.isDisabled
                                        }
                                      ></CFormInput>
                                    )}
                                  </div>
                                </CCol>
                              );
                            })}
                          </CRow>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            );
          })}
        {data.id.value == "Tax Invoice" && (
          <>
            <div
              style={{
                backgroundColor: "white",
                padding: 15,
              }}
            >
              <h4>{data.id.value}</h4>
              {otherFormsData[0].value.map((el, index) => {
                return (
                  <CRow key={index}>
                    {el.map((el1, index1) => {
                      return (
                        <CCol
                          xs={12}
                          lg={6}
                          xl={6}
                          key={index1 + "" + 1}
                        >
                          <CFormLabel
                            style={{
                              fontSize: 12,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {el1.label}
                            {el1.needRadio && (
                              <>
                                <div style={{ display: "flex" }}>
                                  {el1.radioOption.map((ell, index) => {
                                    return (
                                      <>
                                        <div style={{ marginLeft: 10 }}>
                                          <input
                                            type="radio"
                                            name="flexRadioDefault"
                                            id={
                                              "flexRadioDefault" + index
                                            }
                                          />
                                          <label
                                            htmlFor="flexRadioDefault1"
                                            style={{ marginLeft: 5 }}
                                          >
                                            {ell.value}
                                          </label>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </CFormLabel>

                          <div>
                            {el1.type == "text" && (
                              <CFormInput
                                placeholder={el1.placeholder}
                              ></CFormInput>
                            )}
                            {el1.type == "select" && (
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                placeholder={
                                  <div>{el1.placeholder}</div>
                                }
                                onChange={(e) => {
                                  let formD = [...masterFormData];
                                  formD[index1][index2].value[
                                    index1
                                  ].value = e.value;
                                  formD[index1][index2].value[
                                    index1
                                  ].extraInput.isDisabled =
                                    e.value == "Yes" ? false : true;
                                  setMasterFormData(formD);
                                }}
                                defaultValue={el1.value}
                                options={el1.options.length != 0 ? el1.options : getOptions(el1.label)}
                              />
                            )}
                            {el1.type == "date" && (
                              <CFormInput
                                type="date"
                                placeholder={el1.placeholder}
                              ></CFormInput>
                            )}
                            {el1.extraInput && (
                              <CFormInput
                                type="text"
                                placeholder={el1.placeholder}
                                style={{ marginTop: 10 }}
                                disabled={
                                  masterFormData[index1][index2].value[
                                    index1
                                  ].extraInput.isDisabled
                                }
                              ></CFormInput>
                            )}
                          </div>
                        </CCol>
                      );
                    })}
                  </CRow>
                );
              })}
            </div>
          </>
        )}
        {data.id.value == "Sales Contract" && (
          <>
            <div
              style={{
                backgroundColor: "white",
                padding: 15,
              }}
            >
              <h4>{data.id.value}</h4>
              {otherFormsData[1].value.map((el, index) => {
                return (
                  <CRow key={index}>
                    {el.map((el1, index1) => {
                      return (
                        <CCol
                          xs={12}
                          lg={6}
                          xl={6}
                          key={index1 + "" + 1}
                        >
                          <CFormLabel
                            style={{
                              fontSize: 12,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {el1.label}
                            {el1.needRadio && (
                              <>
                                <div style={{ display: "flex" }}>
                                  {el1.radioOption.map((ell, index) => {
                                    return (
                                      <>
                                        <div style={{ marginLeft: 10 }}>
                                          <input
                                            type="radio"
                                            name="flexRadioDefault"
                                            id={
                                              "flexRadioDefault" + index
                                            }
                                          />
                                          <label
                                            htmlFor="flexRadioDefault1"
                                            style={{ marginLeft: 5 }}
                                          >
                                            {ell.value}
                                          </label>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </CFormLabel>

                          <div>
                            {el1.type == "text" && (
                              <CFormInput
                                placeholder={el1.placeholder}
                              ></CFormInput>
                            )}
                            {el1.type == "select" && (
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                placeholder={
                                  <div>{el1.placeholder}</div>
                                }
                                onChange={(e) => {
                                  let formD = [...masterFormData];
                                  formD[index1][index2].value[
                                    index1
                                  ].value = e.value;
                                  formD[index1][index2].value[
                                    index1
                                  ].extraInput.isDisabled =
                                    e.value == "Yes" ? false : true;
                                  setMasterFormData(formD);
                                }}
                                defaultValue={el1.value}
                                options={el1.options.length != 0 ? el1.options : getOptions(el1.label)}
                              />
                            )}
                            {el1.type == "date" && (
                              <CFormInput
                                type="date"
                                placeholder={el1.placeholder}
                              ></CFormInput>
                            )}
                            {el1.extraInput && (
                              <CFormInput
                                type="text"
                                placeholder={el1.placeholder}
                                style={{ marginTop: 10 }}
                                disabled={
                                  masterFormData[index1][index2].value[
                                    index1
                                  ].extraInput.isDisabled
                                }
                              ></CFormInput>
                            )}
                          </div>
                        </CCol>
                      );
                    })}
                  </CRow>
                );
              })}
            </div>
          </>
        )}
        {data.id.value == "Packing List" && (
          <>
            <div
              style={{
                backgroundColor: "white",
                padding: 15,
              }}
            >
              <h4>{data.id.value}</h4>
              {otherFormsData[2].value.map((el, index) => {
                return (
                  <CRow key={index}>
                    {el.map((el1, index1) => {
                      return (
                        <CCol
                          xs={12}
                          lg={6}
                          xl={6}
                          key={index1 + "" + 1}
                        >
                          <CFormLabel
                            style={{
                              fontSize: 12,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {el1.label}
                            {el1.needRadio && (
                              <>
                                <div style={{ display: "flex" }}>
                                  {el1.radioOption.map((ell, index) => {
                                    return (
                                      <>
                                        <div style={{ marginLeft: 10 }}>
                                          <input
                                            type="radio"
                                            name="flexRadioDefault"
                                            id={
                                              "flexRadioDefault" + index
                                            }
                                          />
                                          <label
                                            htmlFor="flexRadioDefault1"
                                            style={{ marginLeft: 5 }}
                                          >
                                            {ell.value}
                                          </label>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </CFormLabel>

                          <div>
                            {el1.type == "text" && (
                              <CFormInput
                                placeholder={el1.placeholder}
                              ></CFormInput>
                            )}
                            {el1.type == "select" && (
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                placeholder={
                                  <div>{el1.placeholder}</div>
                                }
                                onChange={(e) => {
                                  let formD = [...masterFormData];
                                  formD[index1][index2].value[
                                    index1
                                  ].value = e.value;
                                  formD[index1][index2].value[
                                    index1
                                  ].extraInput.isDisabled =
                                    e.value == "Yes" ? false : true;
                                  setMasterFormData(formD);
                                }}
                                defaultValue={el1.value}
                                options={el1.options.length != 0 ? el1.options : getOptions(el1.label)}
                              />
                            )}
                            {el1.type == "date" && (
                              <CFormInput
                                type="date"
                                placeholder={el1.placeholder}
                              ></CFormInput>
                            )}
                            {el1.extraInput && (
                              <CFormInput
                                type="text"
                                placeholder={el1.placeholder}
                                style={{ marginTop: 10 }}
                                disabled={
                                  masterFormData[index1][index2].value[
                                    index1
                                  ].extraInput.isDisabled
                                }
                              ></CFormInput>
                            )}
                          </div>
                        </CCol>
                      );
                    })}
                  </CRow>
                );
              })}
            </div>
          </>
        )}
      </CCol>
    </CRow>
  );
};
export default ExportCreateFile;
