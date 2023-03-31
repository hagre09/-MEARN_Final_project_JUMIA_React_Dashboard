import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosInstance } from "../../../netWork/netWork";

export const getContries = async (setCountries, setFilred) => {
    axiosInstance.get(`/country`, {
    }).then((res) => {
        console.log("country", res);
        setCountries(res.data);
        setFilred(res.data); 
    }).catch((err) => {

    })
}


export const delContries = async (id, countries, setCountries, filred, setFilred) => {
    console.log("id: " + id);

    axiosInstance.delete('/country/' + id, {}).then((res) => {
        console.log(res.data);
        removeLocal(id, countries, setCountries, filred, setFilred)
    }).catch((err) => {

    })
}

export const updateCountry = async (countries, setCountries, filred, setFilred, editRow, setEditRow) => {
    console.log("id: " + editRow._id);

    axiosInstance.put('/country/' + editRow._id, {name: editRow.name, arName: editRow.arName}).then((res) => {
        console.log(res.data);
        updateLocal(countries, setCountries, filred, setFilred, editRow, setEditRow)
    }).catch((err) => {

    })
}

export const updateLocal = (countries, setCountries, filred, setFilred, editRow, setEditRow) => {
    var result = [];
    countries.forEach(country => {
        result = (country._id == editRow._id) ? [...result, editRow] : result = [...result, country];
    });
    setCountries(result);


    result = [];
    filred.forEach(country => {
        result = (country._id == editRow._id) ? [...result, editRow] : result = [...result, country];
    });
    setFilred(result);
    setEditRow('');
}

export const removeLocal = (id, countries, setCountries, filred, setFilred) => {
    var result = countries.filter(country => {
        return country._id != id;
    }); 
    setCountries(result);


    result = filred.filter(country => {
        return country._id != id;
    });
    setFilred(result);
}

export const  getColumns = (countries, setCountries, filred, setFilred, editRow, setEditRow) =>{
    return [
        {
            name: 'Country Name',
            selector: (row) => row._id != editRow._id? row.name : <input 
                className="form-control" 
                type="text" 
                placeholder="Country Name" 
                value={editRow.name}
                onChange={(e)=>{
                    setEditRow({...editRow, name: e.target.value})
                }}
            />,
            sortable: true
        },

        {
            name: 'Caountry Ar',
            selector:  (row) => row._id != editRow._id? row.arName :<input 
                className="form-control" 
                type="text" 
                placeholder="Country Name" 
                value={editRow.arName}
                onChange={(e)=>{
                    setEditRow({...editRow, arName: e.target.value})
                }}
            />,
        },
        {
            name: 'Actions',
            cell: (row) => <>
                <FontAwesomeIcon icon={row._id != editRow._id? "pen-to-square" : "save"} color={row._id != editRow._id? "#666" : "green"} className="editAddIcon fa-2xl" onClick={(e)=>{
                    setEditRow(row)
                    if(row._id == editRow._id){
                        updateCountry(countries, setCountries, filred, setFilred, editRow, setEditRow)
                    }
                }}/>
                <FontAwesomeIcon icon="trash-alt" color="#666" className="editAddIcon fa-2xl" onClick={()=>{delContries(row._id, countries, setCountries, filred, setFilred)}}/>
            </>,
        }
    ];
}

export default getContries;