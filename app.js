import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";


const prisma = new PrismaClient();

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions));

app.use(express.json());

//rota para criação dos usuários
app.post('/biblioteca/usuarios/cadastro', async (req, res) => {
    
    try {
        await prisma.usuarios.create({
            data: {
                endereco: req.body.endereco,
                name: req.body.name
            }
        })

        res.status(201).json({ message:'Usuário cadastrado com sucesso.' });
        
    } catch (error) {
        console.error(error);
        res.status(501).json({ message:'Usuário não foi cadastrado.' })
    }
    
})

//rota para listagem dos usuários
app.get('/biblioteca/usuarios/listagem', async (req,res) => {
    try {
        const usuarios = await prisma.usuarios.findMany();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:'Houve um erro na busca.' })
    }
})

//rota para deletar o usuário
app.delete('/biblioteca/usuarios/deletar', async (req, res) => {
    try {
        await prisma.usuarios.delete({
            where: {
                id: req.body.id
            }
        })
        res.status(200).json({ message:'Usuário deletado com sucesso.' })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message:'Houve um erro ao deletar o usuário.' })
    }
    
})

//rota para registro de livros
app.post('/biblioteca/livros/cadastro', async (req, res) => {
    
    try {
        await prisma.Livros.create({
            data: {
                autor: req.body.autor,
                titulo: req.body.titulo,
                exemplares: parseInt(req.body.exemplares)
            }
        })

        res.status(201).json({ message:'Livro registrado com sucesso.' });
        
    } catch (error) {
        console.error(error);
        res.status(501).json({ message:'Livro não foi registrado.' })
    }
    
})

//rota para deletar livro do registro
app.delete('/biblioteca/livros/deletar', async (req, res) => {
    try {
        await prisma.Livros.delete({
            where: {
                id: req.body.id
            }
        })
        res.status(200).json({ message:'Livro deletado com sucesso.' })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message:'Houve um erro ao deletar o livro.' })
    }
})

//rota para consulta de livros disponíveis
app.get('/biblioteca/livros/consulta', async (req,res) => {
    try {
        const livro = await prisma.Livros.findUnique({
            where: {
                titulo: req.query.titulo
            }
        });
        
        const mensagem = `Esse livro está disponível e há ${livro.exemplares} exemplares.`

        res.status(200).json(mensagem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:'Houve um erro na busca.' })
    }
})

//rota para realizar empréstimo
app.post('/biblioteca/emprestimo', async (req, res) => {
    
    try {
        const livro = await prisma.Livros.findUnique({
            where: {
                titulo: req.body.titulo
            }
        });

        if (livro.exemplares > 0) {
            await prisma.Emprestimos.create({
                data: {
                    usuario: req.body.usuario,
                    titulo: req.body.titulo,
                    data_emprestimo: req.body.data_emprestimo
                }
            })
            
            const novo_Exemplares = (livro.exemplares) - 1

            await prisma.Livros.update({
                where: {
                    titulo: req.body.titulo
                },
                data: {
                    exemplares: novo_Exemplares
                }
            })
            res.status(201).json({ message:'Empréstimo realizado com sucesso.' });
        }  
    } catch (error) {
        console.error(error);
        res.status(501).json({ message:'Empréstimo não foi realizado.' })
    }
    
})

//rota para realizar devolução
app.post('/biblioteca/devolucao', async (req, res) => {
    
    try {
        const livro = await prisma.Livros.findUnique({
            where: {
                titulo: req.body.titulo
            }
        });

        await prisma.Devolucoes.create({
            data: {
                usuario: req.body.usuario,
                titulo: req.body.titulo,
                data_devolucao: req.body.data_devolucao
            }
        })
        
        const novo_Exemplares = (livro.exemplares) + 1

        await prisma.Livros.update({
            where: {
                titulo: req.body.titulo
            },
            data: {
                exemplares: novo_Exemplares
            }
        })
        res.status(201).json({ message:'Devolução realizada com sucesso.' });
        
    } catch (error) {
        console.error(error);
        res.status(501).json({ message:'Devolução não foi realizada.' })
    }
    
})

//rota para listagem dos livros emprestados pelos usuarios
app.get('/biblioteca/usuarios/emprestimos', async (req,res) => {
    try {
        const registros = await prisma.Emprestimos.findMany({
            where: {
                usuario: req.query.usuario
            }
        });
        res.status(200).json(registros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:'Houve um erro na busca.' })
    }
})

export default app;