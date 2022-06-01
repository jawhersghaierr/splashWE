import React, {useState} from 'react'
import {useGetEnvironmentsQuery} from "./services/referentielApi";
import {DataGrid} from "@mui/x-data-grid";
import {DetailsOfEnvironmentsID} from "./DetailsOfEnvironmentsID";

export const Environments = () => {
    const [openDetailsId, setOpenDetailsId] = useState(null);
    const {data} = useGetEnvironmentsQuery();

    //TODO split in const file!
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'code', headerName: 'Code', width: 50 },
        { field: 'dateDebut', headerName: 'Date Debut', width: 130 },
        { field: 'numero', headerName: 'Numero', width: 70 },
        { field: 'libelle', headerName: 'Libelle', width: 330 },
    ];

    const getDetails = (({id}) => {
        setOpenDetailsId(id)
    })



    return <div className="wrapper">
        {data && <div style={{height: 400}}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[2]}
                onCellClick={getDetails}
                // checkboxSelection
            />
        </div>}
        {(openDetailsId !== null) && <DetailsOfEnvironmentsID id={openDetailsId} /> }
    </div>
}
