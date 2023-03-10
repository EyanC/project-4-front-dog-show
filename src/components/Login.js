import React, {useState} from 'react'
import axios from 'axios'

const Login = (props) => {
    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [toggleLogout, setToggleLogout] = useState(false)
    // const [currentUser, setCurrentUser] = useState({})
    
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleCreateUser = (event) => {
        event.preventDefault()
        event.currentTarget.reset()
        let userObj = {
            email,
            password,
        }
        setEmail('')
        setPassword('')
        axios.post('https://morning-harbor-71338.herokuapp.com/api/useraccount', userObj).then((response) => {
            if(response.data.email){
                console.log(response);
                setToggleError(false)
                setErrorMessage('')
                props.setCurrentUser(response.data)
                handleToggleLogout()
                props.toggleShowLogin()
            } else {
                setErrorMessage(response.data)
                setToggleError(true)
            }
        })
    }

    const handleLogin = (event) => {
        event.preventDefault()
        event.currentTarget.reset()
        let userObj = {
            email: email,
            password: password
        }
        setEmail('')
        setPassword('')
        axios.put(`https://morning-harbor-71338.herokuapp.com/api/useraccount/login`, userObj).then((response) => {
            if(response.data){
                console.log(response);
                setToggleError(false)
                setErrorMessage('')
                props.setCurrentUser(response.data)
                handleToggleLogout()
                props.toggleShowLogin()
            } else {
                console.log(response);
                setToggleError(true)
                setErrorMessage(response.data)
            }
        })
    }
    
    const handleLogout = () => {
        props.setCurrentUser({})
        handleToggleLogout()
    }
    
    const handleToggleForm = () => {
        setToggleError(false)
        if(toggleLogin === true) {
            setToggleLogin(false)
        } else {
            setToggleLogin(true)
        }
    }
    
    const handleToggleLogout = () => {
        if(toggleLogout) {
            setToggleLogout(false)
        } else {
            setToggleLogout(true)
        }
    }



    return (
        
        <div className='overlay'>
            <div className="add-form-container">
                <div className="add-form-header">
                    <h3>Already Registered? Login Here:</h3>
                    <button onClick={props.toggleShowLogin} className='close-add-button'>
                                <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z"
                                        fill="white"
                                    />
                                </svg>
                    </button>
                </div>
                    <form onSubmit={handleLogin} className='add-form'>
                        <label htmlFor="em">Email: </label>
                        <input type='text' placeholder='Email' name='em' className='add-input form-control' onChange={(event)=> {setEmail(event.target.value)}}/>
                        <label htmlFor="pass">Password: </label>
                        <input type='password' name='pass' placeholder='Password' className='add-input form-control' onChange={(event)=> {setPassword(event.target.value)}}/>
                        {toggleError ?
                        <h5 className='errorMsg'>{errorMessage}</h5>
                        :
                        null
                        }
                        <input type='submit' value='Login'  className='submitBtn btn btn-outline-primary add-submit-button'/>
                    </form>
                    {/* New User Registers here */}
                    <h3>New User? Register Here:</h3>
                        <form onSubmit={handleCreateUser} className='add-form'>
                        <label htmlFor="new-em">Email: </label>
                        <input name='new-em' type='text' placeholder='Email' className='add-input form-control' onChange={(event)=> {setEmail(event.target.value)}}/>
                        <label htmlFor="new-pass">Password: </label>
                        <input name='new-pass' type='password' placeholder='Password' className='add-input form-control' onChange={(event)=> {setPassword(event.target.value)}}/>
                        {toggleError ?
                            <h5 className='errorMsg'>{errorMessage}</h5>
                            :
                            null
                        }
                        <input type='submit' value='Register' className='submitBtn btn btn-outline-primary add-submit-button'/>
                    </form>
                
            

                </div>
        </div>
        
        
        )
    }
    
export default Login