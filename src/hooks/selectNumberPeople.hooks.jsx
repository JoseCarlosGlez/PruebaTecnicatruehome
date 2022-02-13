/* eslint-disable no-unreachable */
import React from 'react'
import { useState } from 'react'
import './selectNumberPeople.scss'
import classnames from 'classnames'
let numberAdultTemp = 0
let numberChildrenTemp = 0
const SelectNumberPeople = ({ GetNumberPassenger }, ref) => {


    const [isActive, setIsActive] = useState(false)
    const [numberAdult, setNumberAdult] = useState(0)
    const [numberChildren, setNumberChildren] = useState(0)




    return (

        <>
            <div className="dropdown-container" >
                <div className="dropdown-input" onClick={() => setIsActive(!isActive)}>
                    <span className='arrow-down'></span>
                    <div className='dropdown-values'>
                        <div className='dropdown-placeholder'>
                            {
                                numberAdult === 0 && numberChildren === 0 ? 'Pasajeros' : ''
                            }
                            {
                                numberAdult > 0 ? 'Adultos: ' + numberAdult + ', ' : ''
                            }
                            {
                                numberChildren > 0 ? ' Niños: ' + numberChildren : ''
                            }

                        </div>
                    </div>
                </div>
                <div className={classnames('dropdown-options', { 'dropdown-active': isActive })}>
                    <div className="dropdown-item" >
                        <p className="dropdown-item-title">
                            Adultos
                            <br />
                            (13+ años)
                        </p>
                        <span onClick={e => {
                            if (numberAdult > 0) {
                                numberAdultTemp--
                                setNumberAdult(numberAdultTemp)
                                GetNumberPassenger({ numberAdultTemp, numberChildrenTemp })

                            }


                        }}>
                            -
                        </span>

                        <span>
                            {numberAdult}
                        </span>

                        <span onClick={e => {
                            numberAdultTemp++
                            setNumberAdult(numberAdultTemp)
                            GetNumberPassenger({ numberAdultTemp, numberChildrenTemp })

                        }}>
                            +
                        </span>
                    </div>
                    <div className="dropdown-item" >
                        <p className="dropdown-item-title">
                            Niños
                            <br />
                            (2-12 años)
                        </p>
                        <span onClick={e => {
                            if (numberAdult > 0) {
                                numberChildrenTemp--
                                setNumberChildren(numberChildrenTemp)
                                GetNumberPassenger({ numberAdultTemp, numberChildrenTemp })
                            }
                        }}>
                            -
                        </span>
                        <span>
                            {numberChildren}
                        </span>
                        <span onClick={e => {
                            numberChildrenTemp++
                            setNumberChildren(numberChildrenTemp)
                            GetNumberPassenger({ numberAdultTemp, numberChildrenTemp })

                        }}>
                            +
                        </span>
                    </div>

                </div>
            </div>
        </>

    )
}

export default SelectNumberPeople;