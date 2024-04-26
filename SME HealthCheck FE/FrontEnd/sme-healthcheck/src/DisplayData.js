import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';


function DisplayData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/displayData');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            // Generate unique ids for each row
            const dataWithIds = jsonData.map((row, index) => ({
                ...row,
                id: index + 1 // You can use any unique identifier here
            }));
            setData(dataWithIds);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
     


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'companyUEN', headerName: 'Company UEN', width: 150 },
        { field: 'companyName', headerName: 'Company Name', width: 150 },
        { field: 'fullName', headerName: 'Full Name', width: 150 },
        { field: 'positionWithCompany', headerName: 'Position with Company', width: 200 },
        { field: 'emailAddress', headerName: 'Email Address', width: 200 },

    ];

    return (
        <div className='container mt-3' style={{ height: 400, width: '80%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                    },
                }}
               
            />
        </div>
    )
}

export default DisplayData;