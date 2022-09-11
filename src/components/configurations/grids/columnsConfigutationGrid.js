import React from "react";
import Chip from "@mui/material/Chip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate} from "../../../utils/utils";


export const columns = ({nomRefs, configurations, domain, code}) => [
    { field: 'id', headerName: 'Code', flex: 1, maxWidth: 55, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'type', headerName: 'Type de paramétre', flex: 1, renderCell: (params) => { //FACTURE_CONFIGURATION_TYPE
        return (nomRefs.FACTURE_CONFIGURATION_TYPE[params.value] || params.value);
    }},
    { field: 'label', headerName: 'Libellé', flex: 3 },
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => { //FACTURE_CONFIGURATION_STATUS
            return (<Chip label={`${nomRefs.FACTURE_CONFIGURATION_STATUS[params.value] || params.value}`} sx={{color: 'black'}}/> )
    }},
    { field: 'timestamp', headerName: 'Période de validaté', flex: 2, renderCell: (params) => {
        return (`${convertDate(params.row?.startDate)}-${convertDate(params.row?.endDate)}`);
    }},
    { field: 'user', headerName: 'Utilisateur', flex: 1,renderCell: (params) => {
        return (params.value);
    }},
    { field: 'details', headerName: '', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {

            // return <Link to={`#`} onClick={()=> {
            //     console.log('row: ', params?.row)
            //     // configItem(params?.row?.id)
            // }}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
            return <Link to={`/configuration/${domain}/${code}/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

