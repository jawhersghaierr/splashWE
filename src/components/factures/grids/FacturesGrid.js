import React, {useEffect, useRef, useState, forwardRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '@mui/material/Pagination';
import {CircularProgress, Typography, Button, Link} from "@mui/material";
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';

import {columns, reverseMapFacturation} from "./facturesGridColumns";
import {baseUrl, useGetFacturesQuery} from "../services/facturesApi";
import { selectCriterias } from '../facturesSlice'
import {usePrevious} from '../../../utils/status-utils';
import { allowSearch } from '../../../utils/validator-utils';
import mainPS from "../../../../assets/PS.png";
import {NoSearchResultsAlert, MoreThan200Results, MoreThan10000ResultsForDownload} from "../../shared";
import {env_IP, ports} from "../../../../env-vars";
import download from "../../../../assets/icons/download-blue.svg";
import {addCriteriasForGetRequest} from "../../../utils/utils";
import {reshapeCriterias} from "../utils/utils";


export const FacturesGrid = ({disciplines}) => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [alertForMoreThan10000ResultsForDownload, setAlertForMoreThan10000ResultsForDownload] = useState( false);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const size = 20;

    const { data, isFetching, isSuccess, isError, error } = useGetFacturesQuery({currentPage, criterias, sortProperties}, {skip: !allowSearch(criterias), forceRefetch: true });

    const handlePageChange = (event, value) => {
        setCurrentPage(value-1)
    };
    const handleOrdering = ( value) => {
        setSortProperties({
            sortProperty: value[0]?.field || null,
            sortDirection: value[0]?.sort?.toUpperCase() || null
        })
    };

    useEffect(() => {
        if (data && JSON.stringify(criterias) !== JSON.stringify(prevCriterias) && currentPage > 0 ) {
            setCurrentPage(0)
        }
    }, [criterias, currentPage]);

    const openAlertForMoreThan10000ResultsForDownload = () => {
        setAlertForMoreThan10000ResultsForDownload(true)
    }
    const closeAlertForMoreThan10000ResultsForDownload = () => {
        setAlertForMoreThan10000ResultsForDownload(false)
    }

    if (!isFetching && isSuccess  && !data?.results) return <NoSearchResultsAlert/>
    if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div className="gridContent">
        {(isSuccess && data?.results) && <div>
            <div style={{margin: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage * size + 1} - {currentPage * size + ((Number(currentPage + 1) == Number(data?.totalPages))? Number(data?.totalElements) - currentPage * size : size)} sur {data?.totalElements} résultats
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<img src={download} width={22} style={{marginTop: '4px', color: 'white'}} />}
                    component={Link}
                    href={`http://${env_IP}:${ports.download}/api/v1/download?target=${baseUrl}/${addCriteriasForGetRequest({
                        url: 'factures',
                        filters: reshapeCriterias({criterias}),
                        prepareForDownload: true
                    })}&columns=${Object.values(reverseMapFacturation)}&mapping=${Object.keys(reverseMapFacturation)}&dateFormat=dateNai`}
                    className="RoundedEmptyButt"
                    download="result.csv"
                    onClick={openAlertForMoreThan10000ResultsForDownload}
                >
                    Еxporter
                </Button>
            </div>
            <DataGrid
                rows={data?.results || []}
                columns={columns()}
                pageSize={size}
                autoHeight
                hideFooter={true}
                disableColumnMenu={true}
                disableColumnResize={false}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="75px" alignItems="center" justifyContent="center">
                            <b>Aucun résultat pour ces critères de recherche</b>
                        </Stack>
                    )
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                }
                onCellClick={(params, event) => {
                    event.defaultMuiPrevented = true;
                }}

                sortingMode="server"
                onSortModelChange={handleOrdering}

                sx={{ '& .boldValue': { fontWeight: 'bold', },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    },
                }}
            />
        </div>}

        {!data && <div>
            <img  src={mainPS} alt="mainPS" className={'imgContext'}/>
            <h2 style={{color: '#003154', position: 'relative', width: '400px', left: '605px', bottom: '545px'}}>
                Vous y trouverez toutes les informations pertinentes pour les professionnels de la santé du système.
            </h2>
        </div>}

        {(isSuccess && data?.results) && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totalPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

        <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>
        <MoreThan10000ResultsForDownload open={alertForMoreThan10000ResultsForDownload} handleMsgClose={closeAlertForMoreThan10000ResultsForDownload}/>

    </div>
}

