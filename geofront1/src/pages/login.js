
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';


const Login = () => {
  const navigate= useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
};
  return (
    <div className=' bg d-flex flex-row '>
      <div className='img-1 justify-content-start'>
      </div>
      <div className='Login d-flex bd-highlight align-items-center justify-content-center' >
        <Form className='formulaire d-flex flex-column align-items-stretch justify-content-center position-absolute' >
      <Form.Group>
        <h1 className='text-center'>Bienvenue !</h1>
      </Form.Group>
      <Form.Group className='T2 '>
        <h3 className='text-center fs-6 text-muted'>connectez-vous et explorer vos cartes</h3>
      </Form.Group>
      <Form.Group className="mb-3  position-relative"  controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Email" className='px-5 py-3' />
        <svg className='s1 position-absolute' xmlns="http://www.w3.org/2000/svg" width="38" height="22" viewBox="0 0 256 256"><path fill="black" d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"/></svg>

      </Form.Group>
      <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
      <Form.Control
                        type={showPassword ? 'text' : 'password'} // Changer le type en fonction de l'état
                        placeholder="Mot de passe"
                        className='px-5 py-3'
                    />
                    <Button
                        variant="link"
                        onClick={handlePasswordVisibility}
                        style={{ position: 'absolute', right: '10px', top: '10px', color: 'black'}}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>

        <svg className='s2 position-absolute' xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.5 9q.045-1.208.27-2.45c.11-.616.166-.924.356-1.135s.66-.36 1.599-.66C7.035 4.019 8.987 2 11.998 2s4.967 2.02 7.277 2.755c.939.3 1.408.449 1.598.66c.19.21.246.519.357 1.135q.225 1.242.27 2.45m-2.055 8c-1.32 2.023-3.268 3.637-5.83 4.618c-.667.255-1 .382-1.614.382c-.612 0-.946-.128-1.613-.383c-2.562-.98-4.51-2.594-5.831-4.617M8.5 12l1 1m0 0l1 1m-1-1l1-1m-1 1l-1 1m-5-2l1 1m0 0l1 1m-1-1l1-1m-1 1l-1 1m10-2l1 1m0 0l1 1m-1-1l1-1m-1 1l-1 1m5-2l1 1m0 0l1 1m-1-1l1-1m-1 1l-1 1" color="black"/></svg>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <div className='d-flex flex-row align-items-stretch  justify-content-between'>
        <Form.Check  type="checkbox" label="Se souvenir de moi" />
        <Link path='forget_password' style={{color: 'grey'}}>Mot de passe oublié ?</Link>

        </div>
        </Form.Group>
      <Form.Group className='d-flex  justify-content-center md-6'>
      <Button className='w-100 py-3 btn-dark' variant="primary " type="submit" >
        se connecter
      </Button></Form.Group>
      <Form.Group>
        <p className='p1 fs-5 my-4 ' >Vous n'avez pas de compte ?<Link to='register_page' style={{color: 'grey'}}>Inscrivez-vous Maintenant</Link></p>

      </Form.Group>
    </Form>
    </div>

    </div>

  )
}
export default Login;