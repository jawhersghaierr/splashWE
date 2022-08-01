import React, {useState} from 'react'
import {useGetParcoursQuery} from "../../services/referentielApi";
import {DataGrid} from "@mui/x-data-grid";
import {DetailsOfParcourID} from "./DetailsOfParcourID";

export const Parcours = () => {
    const [openDetailsId, setOpenDetailsId] = useState(null);
    const {data} = useGetParcoursQuery();

    //TODO split in const file!
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'code', headerName: 'Code', width: 50 },
        { field: 'inParcour', headerName: 'in Parcour', type: 'boolean', width: 130 },
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
        {(openDetailsId !== null) && <DetailsOfParcourID id={openDetailsId} /> }
    </div>
}
