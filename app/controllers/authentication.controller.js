import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const usuarios = [{
    user: 'a',
    email: 'a@a',
    password: '$2a$05$XvUc16dYRpGkq0m1lunvM.WabYdJ9pxRPdQexfcgXFxSWtKEwg9Pu'

}]



async function login(req, res) {
    console.log('hola');
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if (!user || !password) {
        return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' })
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (!usuarioARevisar) {
        return res.status(400).send({ status: 'Error', message: 'Error durante el login' })
    }
    const logincorrecto = await bcryptjs.compare(password, usuarioARevisar.password);
    if (!logincorrecto) {
        return res.status(400).send({ status: 'Error', message: 'Error durante el login' })
    }
    const token = jsonwebtoken.sign(
        { user: usuarioARevisar.user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION });

    const cookieOption = {
        expires: process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
        path: '/'
    }
    res.cookie(jwt, token, cookieOption)

}

async function register(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;

    if (!user || !password || !email) {
        return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' })
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioARevisar) {
        return res.status(400).send({ status: 'Error', message: 'Este usuario ya existe' })
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({ status: 'ok', message: `Usuario ${nuevoUsuario.user} agregado`, redirect: '/' })
}

export const methods = {
    login,
    register

}