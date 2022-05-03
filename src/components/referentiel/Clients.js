import React, {useState} from 'react'
import {useGetClientsQuery} from "./services/referentielApi";
import {DataGrid} from "@mui/x-data-grid";
import {DetailsOfClientID} from "./DetailsOfClientID";

export const Clients = () => {
    const [openDetailsId, setOpenDetailsId] = useState(null);
    const {data} = useGetClientsQuery();

    //TODO split in const file!
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'typologie', headerName: 'Typologie', width: 50 },
        { field: 'siren', headerName: 'Siren', width: 50 },
        { field: 'numeroAmc', headerName: 'Amc', width: 50 },
        { field: 'numero', headerName: 'Numero', width: 130 },
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
        {(openDetailsId !== null) && <DetailsOfClientID id={openDetailsId} /> }
    </div>
}
