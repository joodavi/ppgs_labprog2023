import Indicadores from '../components/Indicadores';
import Tabela from '../components/Tabela';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Input, Select } from '@chakra-ui/react'
import axios from 'axios';
import connection from '../connection';

interface ProgramaData {
    id: number;
    nome: string;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const dados = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
        {
            label: 'A1',
            data: [17, 26, 30, 33, 9],
            backgroundColor: '#4dc9f6',
        },
        {
            label: 'A2',
            data: [6, 17, 13, 8, 0],
            backgroundColor: '#f67019'
        },
        {
            label: 'A3',
            data: [20, 46, 24, 26, 12],
            backgroundColor: '#537bc4'
        },
        {
            label: 'A4',
            data: [55, 25, 49, 30, 0],
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
            weight: 500,
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

const docentes = [
    {
        docente: 'Alexandre César Muniz de Oliveira', A1: 1, A2: 0, A3: 1, A4: 0, B1: 2, B2: 0, B3: 0, B4: 0
    },
    {
        docente: 'Anselmo Cardoso de Paiva', A1: 22, A2: 4, A3: 3, A4: 1, B1: 1, B2: 1, B3: 2, B4: 3
    },
    {
        docente: 'Carlos de Salles Soares Neto', A1: 1, A2: 1, A3: 0, A4: 1, B1: 0, B2: 0, B3: 0, B4: 0
    },
    {
        docente: 'Geraldo Braz Júnior', A1: 10, A2: 3, A3: 2, A4: 0, B1: 0, B2: 1, B3: 2, B4: 2
    }
]

const colunasTabela = (
    <tr className="border-b-2">
        <td className='bg-slate-600 p-4'>Docentes</td>
        <td className='bg-slate-700 p-4 text-center'>A1</td>
        <td className='bg-slate-600 p-4 text-center'>A2</td>
        <td className='bg-slate-700 p-4 text-center'>A3</td>
        <td className='bg-slate-600 p-4 text-center'>A4</td>
        <td className='bg-slate-700 p-4 text-center'>B1</td>
        <td className='bg-slate-600 p-4 text-center'>B2</td>
        <td className='bg-slate-700 p-4 text-center'>B3</td>
        <td className='bg-slate-600 p-4 text-center'>B4</td>
    </tr>
)

const conteudoTabela = docentes.map((i) =>
    <tr>
        <td className='bg-slate-600 p-4'>{i.docente}</td>
        <td className='bg-slate-700 p-4 text-right'>{i.A1}</td>
        <td className='bg-slate-600 p-4 text-right'>{i.A2}</td>
        <td className='bg-slate-700 p-4 text-right'>{i.A3}</td>
        <td className='bg-slate-600 p-4 text-right'>{i.A4}</td>
        <td className='bg-slate-700 p-4 text-right'>{i.B1}</td>
        <td className='bg-slate-600 p-4 text-right'>{i.B2}</td>
        <td className='bg-slate-700 p-4 text-right'>{i.B3}</td>
        <td className='bg-slate-600 p-4 text-right'>{i.B4}</td>
        <td className='bg-slate-700 p-4 text-center hover:bg-slate-800'> <a href="/docente" className='underline'>Detalhar...</a> </td>
    </tr>
)

export default function Programas() {
    const [selectedPrograma, setProgramaSelected] = useState("")
    const [programas, setProgramas] = useState<ProgramaData[]>([])

    // set indices
    const [iGeral, setIGeral] = useState(0)
    const [iRestrito, setIResttrito] = useState(0)
    const [iNaoRestrito, setINaoRestrito] = useState(0)

    // set stats
    const [producoesStats, setProducoesStats] = useState(0)

    // set filter
    const [filterProgramaId] = useState(15)
    const [anoInicial, setAnoInicial] = useState(1987)
    const [anoFinal, setAnoFinal] = useState(2023)

    // obtendo programas
    useEffect(() => {
        const dataPrograma = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/programa/obterProgramas')

                setProgramas(response.data)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataPrograma()
    }, [])

    // obtendo indices
    useEffect(() => {
        const dataIndices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/qualis/indice/${filterProgramaId}`)

                setIGeral(response.data.indice.indiceGeral.toFixed(2))
                setIResttrito(response.data.indice.indiceRest.toFixed(2))
                setINaoRestrito(response.data.indice.indiceNRest.toFixed(2))
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataIndices()
    }, [])

    // obtendo stats
    useEffect(() => {
        const dataProducoes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/qualis/stats/${filterProgramaId}`)

                setProducoesStats(response.data.producoes)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataProducoes()
    })


    function handleSelectedPrograma(event: any) {
        setProgramaSelected(event.target.value)
    }

    function handleAnoInicial(event: any) {
        setAnoInicial(event.target.value)
    }

    function handleAnoFinal(event: any) {
        setAnoFinal(event.target.value)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        
    }

    return (
        <div className='bg-slate-800 flex flex-col items-center h-max w-full py-4'>
            <div className='w-8/12'>
                <div>
                    <div className="flex flex-row justify-between mb-2 align-middle">
                        <h1 className='text-white font-semibold text-2xl mb-1'>Programas</h1>
                        <a
                            href="/auth"
                            className="text-white rounded bg-emerald-700 p-2"
                        >
                            Administrador
                        </a>
                    </div>
                    <div className='w-mx h-0.5 rounded-r-lg bg-gradient-to-r from-slate-400  to-slate-800 mb-2' />
                    <form className='mb-2' onSubmit={handleSubmit}>
                        <h2 className='text-white font-semibold text-xl mb-2'>Filtros</h2>
                        <div className='mt-0.5 flex'>
                            <div className='flex flex-col mr-4'>
                                <label htmlFor="" className='mb-2 text-white'>Programa</label>
                                <Select iconColor='#00000000' variant='filled' value={selectedPrograma} onChange={handleSelectedPrograma}
                                    className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded">
                                    {programas.map((programa) => (
                                        <option key={programa.id} value={programa.id}>
                                            {programa.nome}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div className='flex flex-col mr-4'>
                                <label htmlFor="" className='mb-2 text-white'>Ano Inicial</label>
                                <Input variant='filled' placeholder='2019' min={1987} max={2023} value={anoInicial} onChange={handleAnoInicial}
                                className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded" />
                            </div>
                            <div className='flex flex-col mr-4'>
                                <label htmlFor="" className='mb-2 text-white'>Ano Final</label>
                                <Input variant='filled' placeholder='2023' min={1987} max={2023} value={anoFinal}
                                className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded" />
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
                    <div className='flex justify-between mb-2'>
                        <Indicadores color='bg-gray-600' quantidade={producoesStats} titulo='Total Produções' />
                        <Indicadores color='bg-cyan-600' quantidade={iGeral} titulo='I Geral' />
                        <Indicadores color='bg-green-600' quantidade={iRestrito} titulo='I Restrito' />
                        <Indicadores color='bg-yellow-600' quantidade={iNaoRestrito} titulo='I Não Restrito' />
                    </div>
                    <Bar data={dados} options={options} />
                    <Tabela title='Docentes' colunasTabela={colunasTabela} conteudoTabela={conteudoTabela} />
                </div>
            </div>
        </div>
    );
}