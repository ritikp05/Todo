import React, { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DoneIcon from '@mui/icons-material/Done';




// FOR geting data we will use a function and we will use local storage.setItem it will return all values which are stored inside list
// and we have to parse that data to get data 

const getLocalStorageitems = () => {

    let listt = localStorage.getItem('list');
    console.log(listt); // it will return a array

    if (listt) {
        return JSON.parse(localStorage.getItem('list'));

    }
    else {
        return [];
    }
}


function App() {

    const [inputVal, SetinputVal] = useState("");
    const [list, Setlist] = useState(getLocalStorageitems())

    const chngFun = (e) => {

        let value = e.target.value;
        SetinputVal(value);
    }

    const clkFun = () => {

        inputVal !== "" && (
            Setlist((preVal) => {
                return [...preVal, inputVal]
            }))
        SetinputVal("")
    }


    const delItem = (index) => {
        let updateddata = list.filter((elemnts, id) => {
            return index !== id;
        })

        Setlist(updateddata);
    }


    // Add data to local storage

// We can locally store our data using local storage  for setting item we use function setItem it takes two things key and value 
// key is anything value is thing which should be stored

    useEffect(() => {

        localStorage.setItem('list', JSON.stringify(list)) //we have to store data in the form of string thats why i am using json.stringfy 
        
        // here value is list which is use state initial variable which contain all the data which is entered in input

    }, [list])   //  when data stored in list which is  use state initial variable  when data is shown in list it will get added in localstorage


    const doneItem = (index) => {

        Setlist(
            list.map((itemss, iditem) => {
                if (iditem === index) {
                    return <del >{itemss}</del>;
                }
                else {
                    return itemss;
                }

            })
        )


    }

    function removeAll() {

        Setlist([]);
    }


    return (
        <div className='wrapper'>
            <div className='container'>
                <div className='todo'>
                    <h1 >ToDo List</h1>
                </div>
                <div className='secContainer'>
                    <input type='text' placeholder='Add A Task' onChange={chngFun} value={inputVal} />
                    <button className='btn' onClick={clkFun}><AddRoundedIcon></AddRoundedIcon></button>
                </div>
                <ul className='list' >
                    {
                        list.map((allItems, index) => {
                            return <div className="map" key={index} > <button className='firstbtn' onClick={() => doneItem(index)}><DoneIcon></DoneIcon></button>  <button className='secbtn' onClick={() => delItem(index)}  ><DeleteIcon></DeleteIcon></button><li >{allItems}</li>
                            </div>

                            //WE ARE PASSING INDEX INSIDE FUNCTION DELETE ITEM SO THAT WE CAN FILTER THE ITEM

                        })
                    }

                </ul>
                <button onClick={removeAll} className='RemoveAll'><ClearAllIcon></ClearAllIcon></button>
            </div>
        </div>

    )
}

export default App;