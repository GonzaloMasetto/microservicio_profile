const Profile = require('../models/profileModel');

// Obtener el perfil del usuario
const getProfile = async (req, res) => {
    const  userId  = req.user.id;

    try {
        const profile = await Profile.findOne({userId });

        if (!profile) {
            return res.status(404).json({ msg: 'Perfil no encontrado' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Crear o editar perfil
const createOrUpdateProfile = async (req, res) => {
    const { name, lastName, email, phone, imageId } = req.body;
    const userId = req.user.id; // Tomamos el userId del token autenticado

    try {
        let profile = await Profile.findOne({ userId });

        if (profile) {
            // Actualizar el perfil existente
            profile.name = name;
            profile.lastName = lastName;
            profile.email = email;
            profile.phone = phone;
            profile.updatedAt = Date.now();
            await profile.save();
            return res.json(profile);
        }

        // Crear nuevo perfil
        profile = new Profile({
            userId,
            name,
            lastName,
            email,
            phone
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createOrUpdateTagsProfile = async (req, res) => {
    const { tags } = req.body;
    const userId = req.user.id; // Tomamos el userId del token autenticado

    try {
        let profile = await Profile.findOne({ userId });

        if (profile) {
            // Actualizar el perfil existente
            profile.tags = tags;
            profile.updatedAt = Date.now();
            await profile.save();
            return res.json(profile);
        }

        // Crear nuevo perfil
        profile = new Profile({
            tags
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createOrUpdateImage = async (req, res) => {
    const { imageId } = req.body;
    const userId = req.user.id; // Tomamos el userId del token autenticado

    try {
        let profile = await Profile.findOne({ userId });

        if (profile) {
            // Actualizar el perfil existente
            profile.imageId = imageId;
            profile.updatedAt = Date.now();
            await profile.save();
            return res.json(profile);
        }

        // Crear nuevo perfil
        profile = new Profile({
            imageId
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Eliminar imagen del perfil
const deleteProfileImage = async (req, res) => {
    const { userId } = req.params;

    try {
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ msg: 'Perfil no encontrado' });
        }

        profile.imageId = null;
        profile.updatedAt = Date.now();
        await profile.save();

        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Exportamos todos los controladores
module.exports = {
    getProfile,
    createOrUpdateProfile,
    createOrUpdateTagsProfile,
    createOrUpdateImage,
    deleteProfileImage
};
