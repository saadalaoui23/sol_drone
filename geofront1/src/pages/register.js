import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        num: '',
        nom_entreprise: '',
        mot_de_passe: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            if (formData.mot_de_passe !== formData.confirmPassword) {
                setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
                return;
            }

            const response = await axios.post('http://localhost:8000/users/', {
                prenom: formData.prenom,
                nom: formData.nom,
                email: formData.email,
                num: parseInt(formData.num, 10), // Assurez-vous que c'est un entier
                nom_entreprise: formData.nom_entreprise,
                mot_de_passe: formData.mot_de_passe
            });

            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Inscription réussie !' });
                setTimeout(()=>navigate('/'), 2000); // Naviguer après 2 secondes
            }
        } catch (error) {
            if (error.response) {
                setMessage({ type: 'error', text: `Erreur: ${error.response.data.message || 'Une erreur est survenue'}` });
            } else if (error.request) {
                setMessage({ type: 'error', text: 'Erreur: Pas de réponse du serveur' });
            } else {
                setMessage({ type: 'error', text: `Erreur: ${error.message}` });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=' bg d-flex flex-row '>
      <div className='img-1 justify-content-start'>
      </div>
      <div className='Login d-flex bd-highlight align-items-center justify-content-center ' style={{height: '50vh'}}>
            <Form className='formulaire1 d-flex flex-column align-items-stretch justify-content-center position-absolute' onSubmit={handleSubmit}>
            <Form.Group>
        <h1 className='text-center'>Créer un compte</h1>
      </Form.Group>
      <Form.Group className='T2 '>
        <h3 className='text-center fs-6 text-muted'>Devenir parmi nous dès Maintenant</h3>
      </Form.Group>
                <Form.Group className="mb-2 position-relative" controlId="prenom">
                    <Form.Control
                        type="text"
                        placeholder="Prénom"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.prenom}
                    />
                </Form.Group>

                <Form.Group className="mb-2 position-relative" controlId="nom">
                    <Form.Control
                        type="text"
                        placeholder="Nom"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.nom}
                    />
                </Form.Group>

                <Form.Group className="mb-2 position-relative" controlId="email">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.email}
                    />
                </Form.Group>

                <Form.Group className="mb-2 position-relative" controlId="num">
                    <Form.Control
                        type="number"
                        placeholder="Numéro de téléphone"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.num}
                    />
                </Form.Group>

                <Form.Group className="mb-2 position-relative" controlId="nom_entreprise">
                    <Form.Control
                        type="text"
                        placeholder="Nom d'entreprise"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.nom_entreprise}
                    />
                </Form.Group>

                <Form.Group className="mb-2 position-relative" controlId="mot_de_passe">
                <Form.Control
                        type={showPassword ? 'text' : 'password'} // Changer le type en fonction de l'état
                        placeholder="Mot de passe"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.mot_de_passe}
                    />
                    <Button
                        variant="link"
                        onClick={handlePasswordVisibility}
                        style={{ position: 'absolute', right: '10px', top: '0px',color:'black'  }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    
                </Form.Group>

                <Form.Group className="mb-3 position-relative" controlId="confirmPassword">
                <Form.Control
                        type={showPassword ? 'text' : 'password'} // Changer le type en fonction de l'état
                        placeholder="Confirmer mot de passe"
                        className='px-5 py-2'
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                    <Button
                        variant="link"
                        onClick={handlePasswordVisibility}
                        style={{ position: 'absolute', right: '10px', top: '0px',color:'black' }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </Form.Group>

                <Form.Group className='d-flex justify-content-center '>
                    <Button className='w-100 py-3 btn-dark' variant="primary" type="submit"  >
                        S'inscrire
                    </Button>
                </Form.Group>

                {message && (
                    <div style={{
                        color: message.type === 'success' ? 'green' : 'red',
                        textAlign: 'center',
                        marginTop: '10px'
                    }}>
                        {message.text}
                    </div>
                )}
            </Form>
        </div>
        </div>
    );
};

export default Register;