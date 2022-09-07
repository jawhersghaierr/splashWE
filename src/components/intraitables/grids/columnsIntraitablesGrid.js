import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {env_IP, ports} from '../../../../env-vars'
import {Link} from "@material-ui/core";
import {convertDate} from "../../../utils/utils";
import download from '../../../../assets/download-blue.svg'

export const columns = () => [
    { field: 'file_name', headerName: 'Nom du fichier', flex: 2 },
    { field: 'integration_date', headerName: 'Date d\'integration', flex: 2, renderCell: (params) => (convertDate(params.value))},
    { field: 'line_count', headerName: 'Nombre de lignes', flex: 1, type: 'number'},
    { field: 'id', headerName: '', width: 15, sortable: false, type: 'date', renderCell: (params) => {
            return <Link href={`http://${env_IP}:${ports.intraitables}/api/v1/untreatable/files/${params?.row?.fileId}`}>
                {/*<VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/>*/}
                <img src={download} width={22} style={{marginTop: '4px'}} />
            </Link>
    }},
];

