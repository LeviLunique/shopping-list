import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
    const { name, value } = req.body;

    try {
        const product = await prisma.product.create({
            data: {
                name,
                value,
            },
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};