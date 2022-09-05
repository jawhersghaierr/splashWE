import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate} from "../utils/utils";



{/********************************* Act *******************************/}
{/*grid columns from {factLines[]}*/}

{/*N {numLigne}*/}
{/*Acter {codeActe}*/}
{/*Mt {codeActe}                ????????????????????????????????????????????????*/}
{/*DCS {dcs}*/}
{/*DMt {dmt}*/}
{/*Periode {dateDebutSoins} - {dateFinSoins}*/}
{/*Coeff {coef}*/}
{/*Qte {quant}*/}
{/*Pu {pu} in 'Eu'*/}
{/*Base SS {br} in 'Eu'*/}
{/*Tx RO {taux} in '%'*/}
{/*Mnt RO {ro} in 'Eu'*/}
{/*DR {depense} in 'Eu'*/}
{/*Mnt RC {rc} in 'Eu'*/}
{/*Rac {rac} in 'Eu'*/}
export const columns = disciplines => [
    { field: 'numLigne', headerName: '№', maxWidth: '20px', flex: 1, sortable: false, renderCell: (params) => {
        // console.log(params)
        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        return (params.value);
    }},
    { field: 'codeActe', headerName: 'ACTE', flex: 1 },
    { field: 'dcs', headerName: 'DCS', flex: 1, renderCell: (params) => {
        return (params.value)
    }},
    { field: 'dmt', headerName: 'DMT', flex: 1 },
    { field: 'Periode', headerName: 'Période', flex: 2, minWeight: '150px', renderCell: (params) => { //
            return (`${convertDate(params?.row?.dateDebutSoins)} - ${convertDate(params?.row?.dateFinSoins)}`)
    }},
    { field: 'coef', headerName: 'COEFF', flex: 1 },
    { field: 'quant', headerName: 'QTE', flex: 1 },
    { field: 'pu', headerName: 'PU', flex: 1 , renderCell: (params) => { //
            return (`${params.value} €`)
        }},
    { field: 'br', headerName: 'Base SS', flex: 1, renderCell: (params) => { //
            return (`${params.value} €`)
    }},
    { field: 'taux', headerName: 'TX RO', flex: 1, renderCell: (params) => { //
            return (`${params.value} %`)
    }},
    { field: 'ro', headerName: 'MNT RO', flex: 1, renderCell: (params) => { //
            return (`${params.value} €`)
    }},
    { field: 'depense', headerName: 'DR', flex: 1, renderCell: (params) => { //
            return (`${params.value} €`)
    }},
    { field: 'rc', headerName: 'MNT RC', flex: 1, renderCell: (params) => { //
            return (`${params.value} €`)
    }},
    { field: 'rac', headerName: 'RAC', flex: 1, renderCell: (params) => { //
            return (`${params.value} €`)
    }},
];


// dateEntree: "2022-08-17"
// dateNai: 19500201
// domaine: "HOSP"
// id: 3
// nom: "BRUNO"
// numAdh: "445555667"
// numClient: "00401182"
// numFact: 63800087
// numId: 450000088
// prenom: "THIERRY"
// rc: 5
// receivedDate: "2022-08-17"
// receivedTime: "19:19:51"
// status: "BAP"
