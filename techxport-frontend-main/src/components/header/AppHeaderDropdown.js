import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { logout } from "src/action/auth";
import { useDispatch } from "react-redux";
import avatar8 from "./../../assets/images/avatars/8.jpg";
import { useNavigate } from "react-router-dom";
import profilePic from "../../assets/img/ryan.jpg";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("here");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <CDropdown className="mt-2">
        <CDropdownToggle caret>
          <CAvatar src={profilePic} size="md" />
        </CDropdownToggle>
        <CDropdownMenu style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
          {/* <CDropdownItem>
              <CIcon
                icon={cilBell}
                className="me-2 navbar-item"
              />Notifications
            </CDropdownItem>
            <CDropdownItem>
              <CIcon
                icon={cilEnvelopeOpen}
                className="me-2 navbar-item"
              />Messages
            </CDropdownItem> */}
          <CDropdownItem
            style={{ cursor: "default" }}
            onClick={() => navigate("/default/settings")}
          >
            <CIcon icon={cilUser} className="me-2 navbar-item" />
            Profile
          </CDropdownItem>
          <CDropdownItem
            style={{ cursor: "default" }}
            onClick={() => navigate("/default/company")}
          >
            <CIcon icon={cilSettings} className="me-2 navbar-item" />
            Company Settings
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem style={{ cursor: "default" }} onClick={handleLogout}>
            <CIcon icon={cilLockLocked} className="me-2 navbar-item" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  );
};

export default AppHeaderDropdown;
