import React from 'react';

interface TabelaConteudo {
    title: string;
    colunasTabela: React.ReactNode;
    conteudoTabela: React.ReactNode;
}

export default function Tabela({ title, colunasTabela, conteudoTabela }: TabelaConteudo) {

    return (
        <div className="text-white mt-4 w-full h-">
            <div className='flex flex-row justify-between mb-4'>
                <h1 className='text-white font-semibold text-xl mb-1'>{title}</h1>
            </div>
            <table className='table-auto w-full'>
                <thead>
                    { colunasTabela }
                </thead>
                <tbody>
                    { conteudoTabela }
                </tbody>
            </table>
        </div>
    );
}