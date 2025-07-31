import { body } from 'express-validator';

const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 50 }).withMessage('Name is too long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),

    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required'),

    body('enquery')
        .optional()
        .trim(),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 500 }).withMessage('Message is too long'),
];

export default contactValidation;
