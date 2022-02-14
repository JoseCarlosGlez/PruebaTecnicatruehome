import { React, useState, useEffect } from 'react';
import './shoppingcart.scss'
import RegisterForm from '../registerData/registerData';
import { Link } from 'react-router-dom';
import { TRIPS } from '../../enums/MagicWords.enum';
import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('root'));
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '40%',
        height: '40%',
        padding: '2px',
        transform: 'translate(-50%, -50%)',
    },
};

const ShoppingCart = (props) => {
    const [tickets, setTickets] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);

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
                                        <td>{`Adultos: ${value.numberPassenger.numberAdult}, Niños: ${value.numberPassenger.numberChildren} `}</td>
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
                        <button className='registerData' onClick={e => setIsOpen(true)}>
                            Registrar datos
                        </button> :
                        null


                }

            </div >

            {tickets.length > 0 ?

                (<Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    onRequestClose={e => setIsOpen(false)}

                >
                    <RegisterForm />
                </Modal>
                ) : null}

        </>
    )

}


export default ShoppingCart;