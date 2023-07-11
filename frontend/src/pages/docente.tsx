import Indicadores from "../components/Indicadores";
import { Bar } from 'react-chartjs-2';
import Tabela from "../components/Tabela";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Input } from '@chakra-ui/react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const dados = {
    labels: ['2023', '2022', '2021', '2020', '2019'],
    datasets: [
        {
            label: 'A1',
            data: [9, 33, 30, 26, 17],
            backgroundColor: '#4dc9f6',
        },
        {
            label: 'A2',
            data: [0, 8, 13, 17, 6],
            backgroundColor: '#f67019'
        },
        {
            label: 'A3',
            data: [12, 26, 24, 46, 20],
            backgroundColor: '#537bc4'
        },
        {
            label: 'A4',
            data: [0, 30, 49, 25, 55],
            backgroundColor: '#acc236'
        },
    ]
}

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Produção vs Qualis',
            color: '#fff',
            font: {
                size: 18
            },
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    }
};

const orientacoes = [
    {
        discente: 'João Davi Lima dos Santos', titulo: "Dissertação", tipo: "Mestrado", ano: 2022
    },
    {
        discente: 'Maria Clara Sousa Silva de Almeida Mendes', titulo: "TCC 1", tipo: "Doutorado", ano: 2022
    },
    {
        discente: 'Aluno 3', titulo: "PIBIC 1", tipo: "Pós-Doutorado", ano: 2022
    },
    {
        discente: 'Aluno 4', titulo: "Dissertação 2", tipo: "Mestrado", ano: 2021
    },
    {
        discente: 'Aluno 5', titulo: "TCC 2", tipo: "Mestrado", ano: 2021
    },
    {
        discente: 'Aluno 6', titulo: "PIBIC 2", tipo: "Mestrado", ano: 2021
    }
]

const colunasTabelaOrientacoes = (
    <tr className="border-b-2">
        <td className='bg-slate-600 p-4 w-2/5'>Discentes</td>
        <td className='bg-slate-700 p-4 text-center'>Título</td>
        <td className='bg-slate-600 p-4 text-center w-2/12'>Tipo</td>
        <td className='bg-slate-700 p-4 text-center w-1/12'>Ano</td>
    </tr>
)

const conteudoTabelaOrientacoes = orientacoes.map((i) =>
    <tr>
        <td className='bg-slate-600 p-4 text-left'>{i.discente}</td>
        <td className='bg-slate-700 p-4 text-left'>{i.titulo}</td>
        <td className='bg-slate-600 p-4 text-center'>{i.tipo}</td>
        <td className='bg-slate-700 p-4 text-center'>{i.ano}</td>
    </tr>
)

const artigos = [
    {
        titulo: 'Artigo 1', local: "Revista", tipo: "Períodico", qualis: 'A1', ano: 2022
    },
    {
        titulo: 'Artigo 2', local: "Revista", tipo: "Evento", qualis: 'A2', ano: 2022
    },
    {
        titulo: 'Artigo 3', local: "Revista", tipo: "Evento", qualis: 'A3', ano: 2021
    },
    {
        titulo: 'Artigo 4', local: "Revista", tipo: "Evento", qualis: 'A4', ano: 2021
    },
]

const colunasTabelaArtigos = (
    <tr className="border-b-2">
        <td className='bg-slate-600 p-4'>Título</td>
        <td className='bg-slate-700 p-4 text-center w-2/12'>Local</td>
        <td className='bg-slate-600 p-4 text-center w-2/12'>Tipo</td>
        <td className='bg-slate-700 p-4 text-center w-1/12'>Qualis</td>
        <td className='bg-slate-600 p-4 text-center w-1/12'>Ano</td>
    </tr>
)

const conteudoTabelaArtigos = artigos.map((i) =>
    <tr>
        <td className='bg-slate-600 p-4'>{i.titulo}</td>
        <td className='bg-slate-700 p-4 text-center'>{i.local}</td>
        <td className='bg-slate-600 p-4 text-center'>{i.tipo}</td>
        <td className='bg-slate-700 p-4 text-center'>{i.qualis}</td>
        <td className='bg-slate-600 p-4 text-center'>{i.ano}</td>
    </tr>
)

const tecnicas = [
    {
        titulo: 'Palestra', tipo: "Palestra", ano: 2022
    },
    {
        titulo: 'Palestra', tipo: "Software", ano: 2022
    }
]

const colunasTabelaTecnicas = (
    <tr className="border-b-2">
        <td className='bg-slate-600 p-4'>Título</td>
        <td className='bg-slate-700 p-4 text-center w-2/12'>Tipo</td>
        <td className='bg-slate-600 p-4 text-center w-1/12'>Ano</td>
    </tr>
)

const conteudoTabelaTecnicas = tecnicas.map((i) =>
    <tr>
        <td className='bg-slate-600 p-4'>{i.titulo}</td>
        <td className='bg-slate-700 p-4 text-center'>{i.tipo}</td>
        <td className='bg-slate-600 p-4 text-center'>{i.ano}</td>
    </tr>
)

export default function Docente() {
    return (
        <div className='bg-slate-800 flex flex-col items-center h-max w-full py-4'>
            <div className='w-8/12'>
                <div className="flex flex-row justify-between mb-2 align-middle">
                    <h1 className='text-white font-semibold text-2xl mb-1'>Docente</h1>
                    <a
                        href="/auth"
                        className="text-white rounded bg-emerald-700 p-2"
                    >
                        Administrador
                    </a>
                </div>
                <div className='w-mx h-0.5 rounded-r-lg bg-gradient-to-r from-slate-400  to-slate-800 mb-2' />
                <form className='mb-2'>
                        <h2 className='text-white font-semibold text-xl mb-2'>Filtros</h2>
                        <div className='mt-0.5 flex'>
                            <div className='flex flex-col mr-4'>
                                <label htmlFor="" className='mb-2 text-white'>Ano Inicial</label>
                                <Input variant='filled' placeholder='2019' min={1987} max={2023} className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded" />
                            </div>
                            <div className='flex flex-col mr-4'>
                                <label htmlFor="" className='mb-2 text-white'>Ano Final</label>
                                <Input variant='filled' placeholder='2023' min={1987} max={2023} className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded" />
                            </div>
                            <button
                                type="submit"
                                className="w-fit h-fit bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-900 mt-8"
                            >
                                Filtrar
                            </button>
                        </div>
                    </form>
                <h2 className='text-white font-semibold text-xl mb-3'>Indicadores</h2>
                <div className='flex justify-between'>
                    <Indicadores color='bg-gray-400' quantidade={220} titulo='Total Produções' />
                    <Indicadores color='bg-cyan-600' quantidade={220} titulo='I Geral' />
                    <Indicadores color='bg-green-600' quantidade={220} titulo='I Restrito' />
                    <Indicadores color='bg-amber-400' quantidade={220} titulo='I Não Restrito' />
                </div>
                <Bar data={dados} options={options} />
                <Bar data={dados} options={options} />
                <Tabela title="Orientações" colunasTabela={colunasTabelaOrientacoes} conteudoTabela={conteudoTabelaOrientacoes} />
                <Tabela title="Artigos" colunasTabela={colunasTabelaArtigos} conteudoTabela={conteudoTabelaArtigos} />
                <Tabela title="Técnicas" colunasTabela={colunasTabelaTecnicas} conteudoTabela={conteudoTabelaTecnicas} />
            </div>
        </div>
    )
}