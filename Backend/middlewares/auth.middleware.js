import UserModel from '../models/user.model.js';
import EmployeeModel from '../models/employee.model.js';
import blacklistToken from '../models/blacklist.model.js';
import jwt from 'jsonwebtoken';


export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistToken.findOne({token: token});
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserModel.findById(decoded._id)

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export const authEmployee = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistToken.findOne({token: token});
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const employee = await EmployeeModel.findById(decoded._id)

        req.employee = employee;

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default {
    authUser,
    authEmployee
}

