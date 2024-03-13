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
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                label: ",FAS (Free Alongside Ship)",
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
            label: "Origin of Goods*",
            type: "select",
            value: "",
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
            label: "Port of Discharge*",
            type: "select",
            value: "",
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
        ],
      },
    ],
  ]);
  const [otherFormsData, setOtherFormsData] = useState([
    {
      type: "Tax Invoice",
      value: [
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
              label: ",FAS (Free Alongside Ship)",
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
          label: "Country of Goods*",
          type: "select",
          value: "",
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
          label: "Port of Discharge*",
          type: "select",
          value: "",
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
          label: "ETD",
          type: "text",
          value: "test1",
        },
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
        {
          type: "Sign*",
          text: "file",
          value: "",
        },
      ],
    }, 
    {
      type: "Sales Contract",
      value: [
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
              label: ",FAS (Free Alongside Ship)",
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
          label: "Type of Packaging*",
          type: "text",
          value: "",
        },
        {
          label: "Quantity*",
          type: "text",
          value: "",
        },
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
          label: "Port of Discharge*",
          type: "select",
          value: "",
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
          label: "Country of Origin*",
          type: "select",
          value: "",
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
          label: "Country of Final Destination*",
          type: "select",
          value: "",
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
          label: "Net weight*",
          type: "text",
          value: "",
        },
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
    },
    {
      type: "Packing List",
      value: [
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
              label: ",FAS (Free Alongside Ship)",
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
          label: "Origin of Goods*",
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
        {
          label: "Port of Loading*",
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
          label: "Port of Discharge*",
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
          label: "BL No.",
          type: "text",
          value: "",
        },
        {
          label: "Country of Final Destination*",
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
    },
  ]);

  let index = otherFormsData.findIndex((el) => {
    return el?.type == data.id.value.toUpperCase();
  });

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
                                        options={el3.options}
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
        {data.id.value == "Packing List" && (
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
                  textAlign: "center",
                }}
              >
                {otherFormsData[index]?.type}
              </div>

              <hr style={{ borderColor: "black" }}></hr>

              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={6}
                  xl={6}
                  style={{ border: "1px sloid", border: "1px solid" }}
                >
                  <CFormLabel>
                    {otherFormsData[index]?.value[0].label}
                  </CFormLabel>
                  <CFormInput
                    placeholder={otherFormsData[index]?.value[0].placeholder}
                    value={otherFormsData[index]?.value[0].value}
                    onChange={(e) => {
                      updateData(0, e.target.value);
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} style={{ border: "1px solid" }}>
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} style={{ textAlign: "end" }}>
                      <CFormLabel>Page</CFormLabel>
                      <br />
                      <CFormLabel style={{ fontWeight: 600 }}>
                        1 of 1
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12}>
                      <CRow>
                        <CCol className="bB bT pB" xs={12} lg={6} xl={6}>
                          <div style={{ display: "flex", gap: 10 }}>
                            <div>
                              <CFormLabel>
                                {otherFormsData[index]?.value[2].label}
                              </CFormLabel>
                              <CFormInput
                                placeholder={
                                  otherFormsData[index]?.value[2].placeholder
                                }
                                value={otherFormsData[index]?.value[2].value}
                                onChange={(e) => {
                                  updateData(2, e.target.value);
                                }}
                              ></CFormInput>
                            </div>
                            <div>
                              <CFormLabel>
                                {otherFormsData[index]?.value[3].label}
                              </CFormLabel>
                              <CFormInput
                                type="date"
                                placeholder={""}
                                value={otherFormsData[index]?.value[3].value}
                                onChange={(e) => {
                                  updateData(3, e.target.value);
                                }}
                              ></CFormInput>
                            </div>
                          </div>
                        </CCol>
                        <CCol className="bL bB bT pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>
                            {otherFormsData[index]?.value[4].label}
                          </CFormLabel>
                          <CFormInput
                            type="date"
                            placeholder={""}
                            value={otherFormsData[index]?.value[4].value}
                            onChange={(e) => {
                              updateData(3, e.target.value);
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol className="pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>
                            {otherFormsData[index]?.value[5].label}
                          </CFormLabel>
                          <CFormInput
                            placeholder={
                              otherFormsData[index]?.value[5].placeholder
                            }
                            value={otherFormsData[index]?.value[5].value}
                            onChange={(e) => {
                              updateData(2, e.target.value);
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol className="bL pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>
                            {otherFormsData[index]?.value[6].label}
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            placeholder={""}
                            value={otherFormsData[index]?.value[6].value}
                            onChange={(e) => {
                              updateData(3, e.target.value);
                            }}
                          ></CFormInput>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className="rowStyle ">
                <CCol xs={12} lg={6} xl={6} className="bB bL">
                  <CFormLabel>
                    {otherFormsData[index]?.value[7].label}
                  </CFormLabel>
                  <CFormInput
                    placeholder={otherFormsData[index]?.value[7].label}
                    value={otherFormsData[index]?.value[7].value}
                    onChange={(e) => {
                      updateData(7, e.target.value);
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <CFormLabel>
                    {otherFormsData[index]?.value[8].label}
                  </CFormLabel>
                  <CFormInput
                    placeholder={otherFormsData[index]?.value[8].label}
                    value={otherFormsData[index]?.value[8].value}
                    onChange={(e) => {
                      updateData(5, e.target.value);
                    }}
                  ></CFormInput>
                </CCol>
              </CRow>
              <CRow className="rowStyle ">
                <CCol xs={12} lg={6} xl={6} className="bB bL">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[9].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[9].value}
                        options={otherFormsData[index]?.value[9].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(9, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>
                        {otherFormsData[index]?.value[10].label}
                      </CFormLabel>
                      {/* <CFormInput
                        placeholder={''}
                        value={otherFormsData[index]?.value[10].value}
                        onChange={(e) => {
                          updateData(10, e.target.value)
                        }}
                      ></CFormInput> */}
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[11].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[11].value}
                        options={otherFormsData[index]?.value[11].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(11, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>
                        {otherFormsData[index]?.value[12].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[12].value}
                        options={otherFormsData[index]?.value[12].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(12, e.value);
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bL">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[13].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[13].value}
                        onChange={(e) => {
                          updateData(13, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[14].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[14].value}
                        onChange={(e) => {
                          updateData(14, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[15].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[15].value}
                        options={otherFormsData[index]?.value[15].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(15, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[16].label}
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder={""}
                        value={otherFormsData[index]?.value[16].value}
                        onChange={(e) => {
                          updateData(16, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[17].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[17].value}
                        options={otherFormsData[index]?.value[17].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(17, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[18].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[18].value}
                        onChange={(e) => {
                          updateData(18, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      height: "100%",
                    }}
                  >
                    <CFormLabel>
                      {otherFormsData[index]?.value[19].label}
                    </CFormLabel>
                    <textarea
                      placeholder={""}
                      rows={6}
                      value={otherFormsData[index]?.value[13].value}
                      style={{
                        width: "100%",
                        resize: "none",
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: "rgba(0,0,0,0.1)",
                        height: "78%",
                      }}
                      onChange={(e) => {
                        updateData(19, e.target.value);
                      }}
                    ></textarea>
                  </div>
                </CCol>
              </CRow>

              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={12}
                  xl={12}
                  style={{
                    border: "1px sloid",
                    border: "1px solid",
                    paddingBottom: 100,
                  }}
                >
                  <CRow>
                    <CCol xs={12} lg={2} xl={2} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[0]}
                      </CFormLabel>
                    </CCol>
                    <CCol
                      xs={12}
                      lg={12 - otherFormsData[index]?.value[20].header.length}
                      xl={12 - otherFormsData[index]?.value[20].header.length}
                      className="bB bR"
                    >
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[1]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[2]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[3]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[4]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[5]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[6]}
                      </CFormLabel>
                    </CCol>
                  </CRow>
                  {otherFormsData[index]?.value[20].value.map((el, index) => {
                    console.log(el);
                    return (
                      <>
                        {el.placeholder}
                        <CRow>
                          <CCol
                            xs={12}
                            lg={2}
                            xl={2}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={el[0].placeholder}
                              value={el[0].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 0);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={12 - el.length}
                            xl={12 - el.length}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[1].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 1);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[2].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 2);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[3].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 3);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[4].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 4);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[5].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 5);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[6].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 6);
                              }}
                            ></CFormInput>
                          </CCol>
                        </CRow>
                      </>
                    );
                  })}
                  <Button
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      addNewLine(index, 20, "Packing List");
                    }}
                  >
                    Add Another Line{" "}
                  </Button>
                </CCol>
              </CRow>

              <CRow className="rowStyle rowStyle2 bL bR">
                <CCol
                  xs={12}
                  lg={12 - otherFormsData[index]?.value[21].value.length}
                  xl={12 - otherFormsData[index]?.value[21].value.length}
                  className="bB"
                >
                  <CFormLabel style={{ width: "100%", textAlign: "start" }}>
                    {otherFormsData[index]?.value[21].label}
                  </CFormLabel>
                </CCol>
                {otherFormsData[index]?.value[21].value.map((el, i) => {
                  return (
                    <CCol xs={12} lg={1} xl={1} key={i} className="bB">
                      <CFormLabel style={{ width: "100%", textAlign: "start" }}>
                        {el}
                      </CFormLabel>
                    </CCol>
                  );
                })}
              </CRow>
              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      height: "100%",
                    }}
                  >
                    <CFormLabel>
                      {otherFormsData[index]?.value[22].label}
                    </CFormLabel>
                    <textarea
                      placeholder={""}
                      rows={6}
                      value={otherFormsData[index]?.value[22].value}
                      style={{
                        width: "100%",
                        resize: "none",
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: "rgba(0,0,0,0.1)",
                        height: "78%",
                      }}
                      onChange={(e) => {
                        updateData(22, e.target.value);
                      }}
                    ></textarea>
                  </div>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bR">
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} className="bB pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[23].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[23].value}
                        onChange={(e) => {
                          updateData(23, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12} className="bB pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[24].label}
                      </CFormLabel>
                      <div style={{ display: "flex", gap: 10 }}>
                        {otherFormsData[index]?.value[24].value.map(
                          (el, ind) => {
                            return (
                              <CFormInput
                                key={ind}
                                placeholder={
                                  otherFormsData[index]?.value[24].placeholder
                                }
                                value={el.value}
                                onChange={(e) => {
                                  updateData(24, e.target.value, ind);
                                }}
                              ></CFormInput>
                            );
                          }
                        )}
                      </div>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12} className="pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[25].label}
                      </CFormLabel>
                      <div style={{ display: "flex", gap: 15, height: 100 }}>
                        <CFormInput
                          type="file"
                          placeholder={""}
                          value={""}
                          onChange={(e) => {
                            // console.log(e)
                            const files = Array.from(e.target.files);
                            updateData(25, files);
                            // console.log('files:', files)
                          }}
                        ></CFormInput>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </div>
          </div>
        )}
        {data.id.value == "Tax Invoice" && (
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
                  textAlign: "center",
                }}
              >
                {otherFormsData[index]?.type}
              </div>

              <hr style={{ borderColor: "black" }}></hr>

              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={6}
                  xl={6}
                  style={{ border: "1px sloid", border: "1px solid" }}
                >
                  <CFormLabel>
                    {otherFormsData[index]?.value[0].label}
                  </CFormLabel>
                  <CFormInput
                    placeholder={otherFormsData[index]?.value[0].placeholder}
                    value={otherFormsData[index]?.value[0].value}
                    onChange={(e) => {
                      updateData(0, e.target.value);
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} style={{ border: "1px solid" }}>
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} style={{ textAlign: "end" }}>
                      <CFormLabel>Page</CFormLabel>
                      <br />
                      <CFormLabel style={{ fontWeight: 600 }}>
                        1 of 1
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12}>
                      <CRow>
                        <CCol className="bB bT pB" xs={12} lg={6} xl={6}>
                          <div style={{ display: "flex", gap: 10 }}>
                            <div>
                              <CFormLabel>
                                {otherFormsData[index]?.value[2].label}
                              </CFormLabel>
                              <CFormInput
                                placeholder={
                                  otherFormsData[index]?.value[2].placeholder
                                }
                                value={otherFormsData[index]?.value[2].value}
                                onChange={(e) => {
                                  updateData(2, e.target.value);
                                }}
                              ></CFormInput>
                            </div>
                            <div>
                              <CFormLabel>
                                {otherFormsData[index]?.value[3].label}
                              </CFormLabel>
                              <CFormInput
                                type="date"
                                placeholder={""}
                                value={otherFormsData[index]?.value[3].value}
                                onChange={(e) => {
                                  updateData(3, e.target.value);
                                }}
                              ></CFormInput>
                            </div>
                          </div>
                        </CCol>
                        <CCol className="bL bB bT pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>
                            {otherFormsData[index]?.value[4].label}
                          </CFormLabel>
                          <CFormInput
                            type="date"
                            placeholder={""}
                            value={otherFormsData[index]?.value[4].value}
                            onChange={(e) => {
                              updateData(3, e.target.value);
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol className="pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>
                            {otherFormsData[index]?.value[5].label}
                          </CFormLabel>
                          <CFormInput
                            placeholder={
                              otherFormsData[index]?.value[5].placeholder
                            }
                            value={otherFormsData[index]?.value[5].value}
                            onChange={(e) => {
                              updateData(2, e.target.value);
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol className="bL pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>
                            {otherFormsData[index]?.value[6].label}
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            placeholder={""}
                            value={otherFormsData[index]?.value[6].value}
                            onChange={(e) => {
                              updateData(3, e.target.value);
                            }}
                          ></CFormInput>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className="rowStyle ">
                <CCol xs={12} lg={6} xl={6} className="bB bL">
                  <CFormLabel>
                    {otherFormsData[index]?.value[7].label}
                  </CFormLabel>
                  <CFormInput
                    placeholder={otherFormsData[index]?.value[7].label}
                    value={otherFormsData[index]?.value[7].value}
                    onChange={(e) => {
                      updateData(7, e.target.value);
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <CFormLabel>
                    {otherFormsData[index]?.value[8].label}
                  </CFormLabel>
                  <CFormInput
                    placeholder={otherFormsData[index]?.value[8].label}
                    value={otherFormsData[index]?.value[8].value}
                    onChange={(e) => {
                      updateData(5, e.target.value);
                    }}
                  ></CFormInput>
                </CCol>
              </CRow>
              <CRow className="rowStyle ">
                <CCol xs={12} lg={6} xl={6} className="bB bL">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[9].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[9].value}
                        options={otherFormsData[index]?.value[9].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(9, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>
                        {otherFormsData[index]?.value[10].label}
                      </CFormLabel>
                      {/* <CFormInput
                        placeholder={''}
                        value={otherFormsData[index]?.value[10].value}
                        onChange={(e) => {
                          updateData(10, e.target.value)
                        }}
                      ></CFormInput> */}
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[11].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[11].value}
                        options={otherFormsData[index]?.value[11].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(11, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>
                        {otherFormsData[index]?.value[12].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[12].value}
                        options={otherFormsData[index]?.value[12].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(12, e.value);
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bL">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[13].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[13].value}
                        onChange={(e) => {
                          updateData(13, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[14].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[14].value}
                        onChange={(e) => {
                          updateData(14, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[15].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[15].value}
                        options={otherFormsData[index]?.value[15].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(15, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[16].label}
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder={""}
                        value={otherFormsData[index]?.value[16].value}
                        onChange={(e) => {
                          updateData(16, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[17].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{"test"}</div>}
                        defaultValue={otherFormsData[index]?.value[17].value}
                        options={otherFormsData[index]?.value[17].options}
                        onChange={(e) => {
                          console.log(e);
                          updateData(17, e.value);
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[18].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[18].value}
                        onChange={(e) => {
                          updateData(18, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      height: "100%",
                    }}
                  >
                    <CFormLabel>
                      {otherFormsData[index]?.value[19].label}
                    </CFormLabel>
                    <textarea
                      placeholder={""}
                      rows={6}
                      value={otherFormsData[index]?.value[13].value}
                      style={{
                        width: "100%",
                        resize: "none",
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: "rgba(0,0,0,0.1)",
                        height: "78%",
                      }}
                      onChange={(e) => {
                        updateData(19, e.target.value);
                      }}
                    ></textarea>
                  </div>
                </CCol>
              </CRow>

              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={12}
                  xl={12}
                  style={{
                    border: "1px sloid",
                    border: "1px solid",
                    paddingBottom: 100,
                  }}
                >
                  <CRow>
                    <CCol xs={12} lg={2} xl={2} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[0]}
                      </CFormLabel>
                    </CCol>
                    <CCol
                      xs={12}
                      lg={12 - otherFormsData[index]?.value[20].header.length}
                      xl={12 - otherFormsData[index]?.value[20].header.length}
                      className="bB bR"
                    >
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[1]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[2]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[3]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[4]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[5]}
                      </CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[20].header[6]}
                      </CFormLabel>
                    </CCol>
                  </CRow>
                  {otherFormsData[index]?.value[20].value.map((el, index) => {
                    console.log(el);
                    return (
                      <>
                        {el.placeholder}
                        <CRow>
                          <CCol
                            xs={12}
                            lg={2}
                            xl={2}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={el[0].placeholder}
                              value={el[0].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 0);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={12 - el.length}
                            xl={12 - el.length}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[1].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 1);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[2].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 2);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[3].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 3);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[4].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 4);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[5].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 5);
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={""}
                              value={el[6].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 6);
                              }}
                            ></CFormInput>
                          </CCol>
                        </CRow>
                      </>
                    );
                  })}
                  <Button
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      addNewLine(index, 20, "Tax Invoice");
                    }}
                  >
                    Add Another Line{" "}
                  </Button>
                </CCol>
              </CRow>

              <CRow className="rowStyle rowStyle2 bL bR">
                <CCol
                  xs={12}
                  lg={12 - otherFormsData[index]?.value[21].value.length}
                  xl={12 - otherFormsData[index]?.value[21].value.length}
                  className="bB"
                >
                  <CFormLabel style={{ width: "100%", textAlign: "start" }}>
                    {otherFormsData[index]?.value[21].label}
                  </CFormLabel>
                </CCol>
                {otherFormsData[index]?.value[21].value.map((el, i) => {
                  return (
                    <CCol xs={12} lg={1} xl={1} key={i} className="bB">
                      <CFormLabel style={{ width: "100%", textAlign: "start" }}>
                        {el}
                      </CFormLabel>
                    </CCol>
                  );
                })}
              </CRow>
              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      height: "100%",
                    }}
                  >
                    <CFormLabel>
                      {otherFormsData[index]?.value[22].label}
                    </CFormLabel>
                    <textarea
                      placeholder={""}
                      rows={6}
                      value={otherFormsData[index]?.value[22].value}
                      style={{
                        width: "100%",
                        resize: "none",
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: "rgba(0,0,0,0.1)",
                        height: "78%",
                      }}
                      onChange={(e) => {
                        updateData(22, e.target.value);
                      }}
                    ></textarea>
                  </div>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bR">
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} className="bB pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[23].label}
                      </CFormLabel>
                      <CFormInput
                        placeholder={""}
                        value={otherFormsData[index]?.value[23].value}
                        onChange={(e) => {
                          updateData(23, e.target.value);
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12} className="bB pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[24].label}
                      </CFormLabel>
                      <div style={{ display: "flex", gap: 10 }}>
                        {otherFormsData[index]?.value[24].value.map(
                          (el, ind) => {
                            return (
                              <CFormInput
                                key={ind}
                                placeholder={
                                  otherFormsData[index]?.value[24].placeholder
                                }
                                value={el.value}
                                onChange={(e) => {
                                  updateData(24, e.target.value, ind);
                                }}
                              ></CFormInput>
                            );
                          }
                        )}
                      </div>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12} className="pB">
                      <CFormLabel>
                        {otherFormsData[index]?.value[25].label}
                      </CFormLabel>
                      <div style={{ display: "flex", gap: 15, height: 100 }}>
                        <CFormInput
                          type="file"
                          placeholder={""}
                          value={""}
                          onChange={(e) => {
                            // console.log(e)
                            const files = Array.from(e.target.files);
                            updateData(25, files);
                            // console.log('files:', files)
                          }}
                        ></CFormInput>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </div>
          </div>
        )}
        {data.id.value == "Sales Contract" && 
          (<>
            <div
              style={{
                backgroundColor: "white",
                padding: 15,
              }}
            >
              {otherFormsData[2].value.map((el, index) => {
                return (<CRow>
                  <CCol xs={12} lg={6} xl={6}>
                    <CFormLabel>
                      {el.label}
                    </CFormLabel>
                    <CFormInput
                      placeholder={el.placeholder}
                      value={el.value}
                      onChange={(e) => {
                        updateData(0, e.target.value);
                      }}
                      type={el.type}
                    ></CFormInput>
                  </CCol>
                </CRow>);
              })}
            </div>
          </>
        )}
      </CCol>
    </CRow>
  );
};
export default ExportCreateFile;
