import React, { useEffect, useState } from "react";
import { useSplashScreen } from "../providers/SplashScreenContext";
import { SearchGridWrapper, Pagination } from "shared_lib_ui/Lib/grids";
import { columns } from "./SplashScreenGridColumn";
import { Button, FormControlLabel, Typography } from "@mui/material";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import { CustomTextField, CustomNumberField, MetaInfo } from "shared_lib_ui/Lib/components";
import { BoxSection } from "shared_lib_ui/Lib/layout";
import { Switch, AutoCompleteField } from "shared_lib_ui/Lib/components";
import { useTheme } from "@mui/material/styles";
import TextEditor from "./TextEditor";
import CreateSplash from "./CreateSplash";
import { convertFromRaw, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import DisplaySplash from "./ModalConsultSplash";
import { useSelector } from "react-redux";
import { isPS, isAuthenticated, getBaseClaims } from "shared_lib_ui/host";
import SplashDetails from "./splashScreenDetails/ModalSplashDetails";

const AdminPage = () => {

  const { splashList, updateSplashScreen, deleteSplashScreen, isFetching, isSuccess, createSplashScreen, contentSplash, setIdSplash } = useSplashScreen();
  const [message, setMessage] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedSplash, setSelectedSplash] = useState([]);
  const [openCreateSplashModal, setOpenCreateSplashModal] = useState(false);
  const [openModalDisplaySplash, setOpenModalDisplaySplash] = useState(false);
  const [openD, setOpenD] = useState(false);

  const handleOpenSplashDetails = (id) => {

    setOpenD(true);
    setIdSplash(id);
  };


  const handleOpenAndSetSplash = (id) => {
    setOpenModalDisplaySplash(true);
    setIdSplash(id);
  };

  const handleMotifsChange = newValue => {
    setSelectedSplash([...newValue]);
  };

  const handleSave = () => {
    console.log("contet save", contentSplash);

    createSplashScreen(contentSplash)
      .then(() => {
        alert("Splash Screen created successfully!");
        resetForm();
      });

  };

  const handleEdit = (id) => {
    const splashScreen = splashList.find(screen => screen.id === id);
    setMessage(splashScreen.message);
    setShowSplash(splashScreen.showSplash);
    setEditMode(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    deleteSplashScreen(id)
      .then(() => {
        alert("Splash Screen deleted successfully!");
      });
  };

  const resetForm = () => {
    setMessage("");
    setShowSplash(false);
    setEditMode(false);
    setEditId(null);
  };
  const getRowId = (row) => `${row.id}`;

  useEffect(() => {
    console.log("Splash List: ", splashList?.map(spalsh => { return { value: spalsh?.id, label: spalsh?.label }; }));
  }, [splashList]);



  return (
    <div className="admin-page" style={{ padding: "15px" }}>
      {openCreateSplashModal && (
        <CreateSplash
          onClose={() => setOpenCreateSplashModal(false)}
          onOpen={() => setOpenCreateSplashModal(true)}
          opened={openCreateSplashModal}
          onSave={handleSave}
        />)
      }
      {openModalDisplaySplash && (
        <DisplaySplash
          onClose={() => setOpenModalDisplaySplash(false)}
          opened={openModalDisplaySplash}
        />)
      }

      {openD && (
        <SplashDetails
          onClose={() => setOpenD(false)}
          opened={openD}
          onOpen={() => setOpenD(true)}
        />
      )
      }
      <h1>Gérer vos splash Screens</h1>
      <h2>Liste des Splash Screens</h2>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}>
          <div className="test" style={{ width: "40%" }}
          >

            <AutoCompleteField
              id="id"
              name={"spalsh"}
              multiple
              placeholder={"Rechercher une spalsh"}
              input={{ value: selectedSplash, onChange: handleMotifsChange }}
              options={splashList && splashList.length > 0 && splashList?.map(spalsh => { return { value: spalsh?.id, title: spalsh?.label }; })}
              selectedMsg={"spalshs sélectionnées"}
            />
          </div>


          <Button type="button" variant="contained" size="medium" style={{ marginRight: "10px", marginLeft: "20px" }} onClick={() => setOpenCreateSplashModal(true)}>
            <ControlPointTwoToneIcon />
            {"CREER UNe SPLASH SCREEN"}
          </Button>
        </div>
        <SearchGridWrapper
          rowHeight={40}
          getRowId={getRowId}
          showProgress={isFetching}
          showNoSearchResults={!isFetching && isSuccess && (!splashList || splashList && splashList?.length === 0)}
          showNoData={!isFetching && !splashList && !error}
          showGrid={!isFetching && isSuccess && splashList && splashList?.length > 0}
          columns={columns({ handleDisplay: handleOpenAndSetSplash, handleDisplayDetails: handleOpenSplashDetails, handleEdit, handleDelete })}
          pageSize={12}
          rows={splashList}

        />
      </>


    </div>
  );
};

export default AdminPage;
