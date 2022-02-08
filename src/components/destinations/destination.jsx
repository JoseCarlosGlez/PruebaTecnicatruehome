import './destination.scss';
import { useEffect, useState } from 'react';

import SelectNumberPeople from './../../hooks/selectNumberPeople.hooks';

import { useDispatch, useSelector } from 'react-redux';

//actions de redux
import { getAllCountries } from './../../redux/actions/countries.actions';


const DestinationsComponent = (countries) => {

    const dispatch = useDispatch();

    const [typeTrip, setTypeTrip] = useState(false);

    useEffect(() => {

        dispatch(getAllCountries())

    }, []);

    return (
        <>
            <div className='typeTrip'>
                <p onClick={() => setTypeTrip(!typeTrip)} className={!typeTrip ? 'selected' : ''}  >Viaje redondo</p>
                <p onClick={() => setTypeTrip(!typeTrip)} className={typeTrip ? 'selected' : ''} >Viaje sencillo</p>
            </div>

            <div className='citySections'>
                <div className='origin'>
                    <p>Ciudad de Mexico</p>
                    <span>Origen</span>
                </div>
                <div className='destination' >
                    <p>- - -</p>
                    <span>Destino</span>
                </div>

            </div>


            <div className='calendarSections'>
                <input type="date" min={new Date()} />
                <input type="date" min={new Date()} />
            </div >


            <div className='peopleSections'>
                <SelectNumberPeople />
            </div>
        </>
    )
}


export default DestinationsComponent
