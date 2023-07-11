import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from '@chakra-ui/react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault()

        navigate('/admin')
    }

    return (
        <div className="flex h-screen bg-slate-800 w-full">
            <div className="m-auto w-1/3 p-6 bg-slate-900 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-white text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white font-bold mb-2">
                            Email
                        </label>
                        <Input
                            variant='filled'
                            type="email"
                            id="email"
                            className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white font-bold mb-2">
                            Senha
                        </label>
                        <Input
                            variant='filled' 
                            type="password"
                            id="password"
                            className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-700 text-white py-2 px-4 rounded hover:bg-emerald-900"
                        onSubmit={handleSubmit}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}