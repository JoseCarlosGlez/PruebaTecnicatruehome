import { React, useState, useEffect } from 'react';
import './shoppingcart.scss'
import RegisterForm from '../registerData/registerData';
import { Link } from 'react-router-dom';
import { TRIPS } from '../../enums/MagicWords.enum';

const ShoppingCart = (props) => {
    const [tickets, setTickets] = useState([])
    const [payment, setpayment] = useState(false)

    useEffect(() => {
        if (localStorage.getItem(TRIPS) == null) return

        setTickets(JSON.parse(localStorage.getItem(TRIPS)))

        console.log(JSON.parse(localStorage.getItem(TRIPS)))

    }, [])

    const deleteTripBook = (index) => {
        let ticketsTemp = tickets.filter((v, i) => i !== index)
        setTickets(ticketsTemp)
        localStorage.setItem(TRIPS, JSON.stringify(ticketsTemp))
    }


    return (
        <>
            <div className='container-cart'>
                <Link to="/">Regresar a comprar</Link>
                <h1>Carrito de compras</h1>
                <div className='tableWrap'>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Fecha salida</th>
                                <th>Fecha llegada</th>
                                <th>Numero de pasajeros</th>
                                <th>Precio Total</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map((value, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.origin}</td>
                                        <td>{value.destiny}</td>
                                        <td>{new Date(value.departureDate).toLocaleDateString()} - {new Date(value.departureDate).toLocaleTimeString()} </td>
                                        <td>{value.arrivedDate !== null ? ` ${new Date(value.arrivedDate).toLocaleDateString()} - ${new Date(value.arrivedDate).toLocaleTimeString()}` : '- - -'}</td>
                                        <td>{`Adultos: ${value.numberPassenger.numberAdultTemp}, Niños: ${value.numberPassenger.numberChildrenTemp} `}</td>
                                        <td>{value.price}</td>
                                        <td>
                                            <button onClick={e => deleteTripBook(index)}>Eliminar</button>
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                tickets.length > 0 ? < tr className='lastRowTotal' >
                                    <td colSpan={8} >Total: $ {tickets.reduce((total, currentValue) => total + Number(currentValue.price), 0)}</td>
                                </tr> : null
                            }

                            {
                                tickets.length === 0 ? <tr>
                                    <td colSpan={8} className="error" >No hay boletos para comprar</td>
                                </tr> : null
                            }

                        </tbody>
                    </table>
                </div>

                {
                    tickets.length > 0 ?
                        <button className='registerData' onClick={e => setpayment(true)}>
                            Registrar datos
                        </button> :
                        null


                }

            </div >

            {payment === true && tickets.length > 0 ? <RegisterForm /> : null}

        </>
    )

}


export default ShoppingCart;