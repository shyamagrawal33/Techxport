import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Alert } from "@coreui/coreui";
import Alerts from "../notifications/alerts/Alerts";
import { Tag } from "primereact/tag";
import {
  CAvatar,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CHeaderDivider,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Select from "react-select";
import ApiServices from "src/services/apiservices";
import AuthService from "src/services/auth";
import { HIDE_LOADING, LOGOUT, SHOW_LOADING } from "src/action/type";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Common from "src/services/Common";
// import { ProductService } from './service/ProductService'

export default function CreateContact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;
  const data = JSON.parse(atob(search.substring(1)));
  useEffect(() => {
    if (data.prevdata) setNewContact(data.prevdata);
  }, []);
  const [create, setCreate] = useState(true);
  const [newContact, setNewContact] = useState({
    id: 0,
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone_no: "",
  });

  let createNewContact = (newContact) => {
    dispatch({
      type: SHOW_LOADING,
    });
    ApiServices.createContacts(newContact)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        });
        setTimeout(() => {
          if (Common.getErrors(response)) {
            setCreate(false);
            navigate(-1);
            // getData()
          }
        }, 100);
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate);
      });
  };

  let updateContact = (newContact) => {
    dispatch({
      type: SHOW_LOADING,
    });
    ApiServices.updateContact(newContact)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        });
        setTimeout(() => {
          if (Common.getErrors(response)) {
            setCreate(false);
            navigate(-1);
          }
        }, 100);
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate);
      });
  };
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setNewContact({ ...newContact, ...{ logo: event.target.files[0] } });
    }
  };
  const options = [
    { value: "chocolate", label: "chocolate" },
    { value: "strawberry", label: "strawberry" },
    { value: "vanilla", label: "vanilla" },
  ];
  return (
    <>
      <div className="card">
        <CModal
          backdrop="static"
          visible={create}
          onClose={() => {
            setCreate(false);
            navigate(-1);
          }}
        >
          <CModalHeader closeButton={false}>
            <div style={{ display: "flex" }}>
              <CModalTitle>Create New Contact</CModalTitle>
              <button
                type="button"
                onClick={() => {
                  setCreate(false);
                  navigate(-1);
                }}
                className="btn-close"
                style={{ border: "none" }}
                aria-label="Close"
              ></button>
            </div>
          </CModalHeader>
          <CModalBody style={{ padding: 0 }}>
            <CForm
              style={{ borderRadius: 0, boxShadow: "none", paddingTop: 0 }}
            >
              <CRow>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Importer Name</CFormLabel>
                  <CFormInput
                    type="text"
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        ...{ name: e.target.value },
                      })
                    }
                    value={newContact.name}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Importer Address</CFormLabel>
                  <CFormTextarea
                    type="textarea"
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        ...{ address: e.target.value },
                      })
                    }
                    value={newContact.address}
                  ></CFormTextarea>
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Email Address</CFormLabel>
                  <CFormInput
                    type="email"
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        ...{ email: e.target.value },
                      })
                    }
                    value={newContact.email}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Phone</CFormLabel>
                  <CFormInput
                    value={newContact.phone_no}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        ...{ phone_no: e.target.value },
                      })
                    }
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Country</CFormLabel>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    onChange={(e) =>
                      setNewContact({ ...newContact, ...{ country: e.value } })
                    }
                    defaultValue={newContact.country}
                    value={options.filter(
                      (option) => option.value === newContact.country
                    )}
                    options={options}
                  />
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>City</CFormLabel>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    onChange={(e) =>
                      setNewContact({ ...newContact, ...{ city: e.value } })
                    }
                    defaultValue={newContact.city}
                    value={options.filter(
                      (option) => option.value === newContact.city
                    )}
                    options={options}
                  />
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>State</CFormLabel>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    onChange={(e) =>
                      setNewContact({ ...newContact, ...{ state: e.value } })
                    }
                    defaultValue={newContact.state}
                    value={options.filter(
                      (option) => option.value === newContact.state
                    )}
                    options={options}
                  />
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Pin Code</CFormLabel>
                  <CFormInput
                    value={newContact.pincode}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        ...{ pincode: e.target.value },
                      })
                    }
                  ></CFormInput>
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <Button
              color="primary"
              style={{ height: 40, margin: 20 }}
              onClick={() => {
                setCreate(false);
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              style={{ height: 40, margin: 20 }}
              onClick={() => {
                if (newContact.id != 0) {
                  updateContact(newContact);
                } else {
                  createNewContact(newContact);
                }
              }}
            >
              Save
            </Button>
          </CModalFooter>
        </CModal>
      </div>
    </>
  );
}
