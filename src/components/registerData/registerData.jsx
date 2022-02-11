import './registerData.scss'
import { ErrorMessage, Field, form, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { TRIPS } from "./../../enums/MagicWords.enum";
import * as SWAL from 'sweetalert2'
import { useNavigate } from "react-router-dom";
const registerForm = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Navigate = useNavigate()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .typeError('Ingrese solo letras')
                .min(4, 'Favor de ingresar mas de 4 caracteres')
                .required('Este campo es requeriod'),
            lastName: Yup.string()
                .typeError('Ingrese solo letras')
                .min(4, 'Favor de ingresar mas de 4 caracteres')
                .required('Este campo es requeriod'),
            address: Yup.string()
                .typeError('Ingrese solo letras')
                .min(4, 'Favor de ingresar mas de 4 caracteres')
                .required('Este campo es requeriod'),
            email: Yup.string()
                .typeError('Email invalido')
                .email('Email invalido')
                .required('Este campo es requeriod')
        }),
        onSubmit: async (values, { resetForm }) => {
            let trips = JSON.parse(localStorage.getItem(TRIPS))
            let dataSaveDB = { ...values, trips }
            try {
                await axios.post('http://localhost:3004/trips', dataSaveDB)

                localStorage.removeItem(TRIPS)
                resetForm()


                SWAL.fire({
                    icon: 'success',
                    title: 'Viajes reservados',
                    text: 'Gracias por reservar sus viajes, vuelva pronto',
                })
                Navigate('/')


            } catch (error) {

                SWAL.fire({
                    icon: 'error',
                    title: 'Verifique su conexion de internet',
                })

            }

        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="bg-cover">
                <div className="FullNameRow">
                    <div className="colFirstName">
                        <label>Nombre completo:</label>
                        <input type="text" placeholder='Ingrese su nombre completo'
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}

                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className='error'>{formik.errors.firstName}</div>
                        ) : null}

                    </div>
                    <div className='colLastName'>
                        <label>Apellidos: </label>
                        <input type="text" placeholder='Ingrese su apellido completo' name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className='error'>{formik.errors.lastName}</div>
                        ) : null}

                    </div>
                </div>

                <div className="addressRow">
                    <div className="col-Direccion">
                        <label>Direccion: </label>
                        <input type="text" placeholder='Ingrese su direccion'
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            name="address" />
                        {formik.touched.address && formik.errors.address ? (
                            <div className='error'>{formik.errors.address}</div>
                        ) : null}

                    </div>
                    <div className="col-email">
                        <label>Correo electronico: </label>
                        <input type="email" placeholder='Ingrese su correo electronico' name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='error'>{formik.errors.email}</div>
                        ) : null}

                    </div>

                </div>

                <button type='submit' className='buytickets'>
                    Comprar boletos
                </button>
            </div>
        </form>

    )
}


export default registerForm;