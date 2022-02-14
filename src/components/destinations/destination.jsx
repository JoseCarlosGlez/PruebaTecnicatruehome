import './destination.scss';
import { useEffect, useRef, useState, useCallback } from 'react';

import SelectNumberPeople from './../../hooks/selectPassenger/selectNumberPeople.hooks';

//actions de redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountriesAction } from './../../redux/actions/countries.actions';


import { Link } from 'react-router-dom';


import Modal from 'react-modal';
import * as SWAL from 'sweetalert2'
import { TRIPS } from '../../enums/MagicWords.enum';
import { BsFillCartFill } from "react-icons/bs";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '30%',
        height: '30%',
        padding: '5px',
        transform: 'translate(-50%, -50%)',
    },
};

let toast = (icon, title, text) => {
    SWAL.fire({
        icon,
        title,
        text,
    })
}

Modal.setAppElement(document.getElementById('root'));

const DestinationsComponent = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [OriginOrDestiny, setIsOriginOrDestiny] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [destiny, setdestiny] = useState(null);
    const [departureDate, setDepartureDate] = useState('');
    const [arrivedDate, setArrivedDate] = useState('');
    const [typeTrip, setTypeTrip] = useState(false);
    const [numberPassenger, setNumberPassenger] = useState(null);
    const componentPassengerRef = useRef()
    const dispatch = useDispatch();


    const openModal = (from) => {
        setIsOriginOrDestiny(from)
        setIsOpen(true);
    }

    const selectCity = (name) => {
        if (OriginOrDestiny === 'origin') {
            if (name === destiny) return
            setOrigin(name)
        } else {
            if (name === origin) return
            setdestiny(name)
        }

        setIsOpen(false)
        return
    }


    const recolectData = () => {

        let newTrip = {
            destiny,
            origin,
            price: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000),
            departureDate,
            arrivedDate,
            numberPassenger
        }

        if (newTrip.destiny == null || newTrip.origin == null) {
            toast('error', 'Error', 'Favor de seleccionar origen y destino')
            return
        }

        if (newTrip.departureDate == null) {
            toast('error', 'Error', 'Favor de seleccionar fecha y hora de salida')
            return
        }


        if (!typeTrip && newTrip.arrivedDate == null) {
            toast('error', 'Error', 'Favor de seleccionar fecha y hora de regreso')
            return
        } else if (typeTrip) {
            newTrip.arrivedDate = null
        }

        if (numberPassenger === null || (numberPassenger.numberAdult === 0 && numberPassenger.numberChildren === 0)) {
            toast('error', 'Error', 'Favor de seleccionar numero de pasajeros')
            return
        }

        setOrigin(null)
        setdestiny(null)
        setDepartureDate('')
        setArrivedDate('')

        componentPassengerRef.current.resetValues()
        let trips = localStorage.getItem(TRIPS) !== null ? JSON.parse(localStorage.getItem(TRIPS)) : []
        console.log({ ...newTrip, id: Math.random() })
        trips.push({ ...newTrip, id: Math.random })
        localStorage.setItem(TRIPS, JSON.stringify(trips))
        toast('success', 'Viaje almacenado correctamente')
    }


    useEffect(() => {
        const uploadCities = () => dispatch(getAllCountriesAction())
        uploadCities()
    }, []);

    const setPasenger = useCallback(
        (value) => {
            setNumberPassenger(value)
        })

    const cities = useSelector(state => state.countriesReducer.countries)

    return (
        <div>
            <div className="title">
                <h1>Reservacion de vuelos</h1>
                <Link className='shoppingCart' to="shoppingcart"><BsFillCartFill />  compras </Link>
            </div>
            <div className='typeTrip'>
                <p onClick={() => {

                    setTypeTrip(false)

                }} className={!typeTrip ? 'selected' : ''}  >Viaje redondo</p>
                <p onClick={() => {
                    setTypeTrip(true)
                    setArrivedDate('')
                }
                } className={typeTrip ? 'selected' : ''} >Viaje sencillo</p>
            </div>

            <div className='citySections'>
                <div className='origin' onClick={e => openModal('origin')}>
                    <p>{origin != null ? origin : '- - -'}</p>
                    <span>Origen</span>
                </div>
                <div className='destination' onClick={e => openModal('destination')}  >
                    <p>{destiny != null ? destiny : '- - -'}</p>
                    <span>Destino</span>
                </div>

            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={e => setIsOpen(false)}
                style={customStyles}
            >
                <ul className='citiesList'>
                    {
                        cities.length > 0 ? cities.map(city => <li onClick={e => selectCity(city.name)} className='cityItem' key={city.code}>{city.name}</li>) : null
                    }
                </ul>
            </Modal>
            <div className='calendarSections'>
                <div>
                    <label htmlFor="">Fecha de salida</label>
                    <input onChange={e => { setDepartureDate(e.target.value) }} type="datetime-local" value={departureDate} min={new Date().toISOString().slice(0, -8)} />
                </div>
                <div>

                    <label htmlFor="">Fecha de llegada</label>
                    <input onChange={e => setArrivedDate(e.target.value)} type="datetime-local" value={arrivedDate} disabled={typeTrip || departureDate === ''} min={departureDate !== '' ? departureDate : new Date().toISOString().slice(0, -8)} />
                </div>
            </div >

            <div className='selectSections'>
                <SelectNumberPeople GetNumberPassenger={setPasenger} ref={componentPassengerRef} />
                <button onClick={recolectData}>Guardar vuelo</button>

            </div>
        </div>
    )
}


export default DestinationsComponent
