const userRepository = require('../services/userRepository');

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userRepository.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.toString()});
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userRepository.getUserById(req.params.id);
        if(!user) {
            res.status(404).json({ error: 'Usuário não encontrado'});
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
};

exports.createUser = async(req, res) => {
    try{
        const user = await userRepository.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err. toString() });
    }
};



exports.updateUser = async(req, res) => {
    try {
        const user = await userRepository.updateUser(req.params.id, req.body);
        if(!user) {
            res.status(404).json({ error: 'Usuário não encontrado'});
        } else {
            res.status(200).json(user);
        }
    }catch (err) {
        res.status(500).json({ error: err.toString() });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userRepository.deleteUser(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado'});
        } else {
            res.status(200).json({msg: 'Usuário deletado com sucesso'});
        }
    }catch (err) {
        res.status(500).json({ error: err.toString});
    }
};

