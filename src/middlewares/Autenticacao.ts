import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
    // Adicione outras propriedades conforme necessário
}

export const Autenticacao = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({ mensagem: 'Token não fornecido' });
    }

    try {
        jwt.verify(token, 'cartorio') as DecodedToken;

        next();
    } catch (error) {
        // Se ocorrer um erro ao verificar o token
        if (error instanceof JsonWebTokenError) {
            // Token inválido
            return res.status(401).json({ mensagem: 'Token inválido' });
        } else if (error instanceof TokenExpiredError) {
            // Token expirado
            return res.status(401).json({ mensagem: 'Token expirado' });
        } else {
            // Outro tipo de erro
            return res.status(500).json({ mensagem: 'Erro na verificação do token' });
        }
    }
};
