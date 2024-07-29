"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mariadb_1 = __importDefault(require("mariadb"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const router = express_1.default.Router();
const pool = mariadb_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    connectTimeout: 10000
});
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }
    try {
        const connection = yield pool.getConnection();
        console.log('Connection established for register');
        const [existingUser] = yield connection.query('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser) {
            connection.release();
            return res.status(409).json({ error: 'Utilisateur déjà inscrit avec cet email.' });
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        yield connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
        connection.release();
        console.log('Connection released for register');
        res.status(200).json({ message: 'Inscription réussie!' });
    }
    catch (err) {
        console.error('Error during register:', err);
        res.status(500).json({ error: err.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }
    try {
        const connection = yield pool.getConnection();
        console.log('Connection established for login');
        const rows = yield connection.query('SELECT * FROM users WHERE email = ?', [email]);
        connection.release();
        console.log('Connection released for login');
        if (rows.length > 0) {
            const user = rows[0];
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (match) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ user: { email: user.email, name: user.name }, token });
            }
            else {
                res.status(401).json({ error: 'Mot de passe incorrect.' });
            }
        }
        else {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
    }
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
