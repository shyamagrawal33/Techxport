import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CForm,
  CFormSelect,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateCompany } from "src/action/auth";
import AuthService from "src/services/auth";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ApiServices from "src/services/apiservices";
import { HIDE_LOADING, LOGOUT, SHOW_LOADING } from "src/action/type";
import Common from "src/services/Common";
import { Button } from "primereact/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Settings = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "hindustan", label: "Hindustan" },
  ];
  const { isInvalidToken, isLoggedIn, UpdateSuccess } = useSelector(
    (state) => state.auth
  );
  const [dataLoad, setDataLoad] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("")

  let validate = (type, fieldname, value) => {
    if (dataLoad) {
      if ((type = "TEXT" && value == "")) {
        return fieldname + " field is required";
      } else if (type == "EMAIL") {
        if (value == "") {
          return fieldname + " field is required";
        } else {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return reg.test(value) === false
            ? fieldname + " Invalid Formate"
            : "";
        }
      } else if (type == "PASSWORD") {
        return fieldname + " field is required";
      } else if (type == "NUMBER" && !isNaN(+value)) {
        return fieldname + " is invaliid";
      } else if (type == "FILE" && value.files.length < 1) {
        return fieldname + " is invaliid";
      }
    }
    return "";
  };

  return (
    <CForm className="main-form-row">
      <CRow>
        <CCol xs={12} lg={6} xl={4}>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            style={{ float: "right" }}
          >
            Update
          </Button>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>OTP Validation*</CFormLabel>
          <CFormInput
            type="otp"
            validations={[required]}
            onChange={(e) => setOtp(e.target.value)}
            value={otp.email}
          ></CFormInput>
        </CCol>
        <CCol xs={4} lg={2} xl={2} className="mt-4">
          <CButton color="success">Send OTP</CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Reset Password*</CFormLabel>
          <CFormInput
            type="password"
            validations={[required]}
            onChange={(e) => setPassword(e.target.value)}
            value={password.email}
          ></CFormInput>

          {validate("PASSWORD", "Password", password) != "" && (
            <CFormLabel className="form_field_error">
              {validate("PASSWORD", "Password", password)}
            </CFormLabel>
          )}
        </CCol>
      </CRow>
    </CForm>
  );
};
export default Settings;
