import Indicadores from '../components/Indicadores';
import Tabela from '../components/Tabela';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Input, Select } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import setupGraphics from '../setupGraphics';

interface ProgramaData {
    id: number;
    nome: string;
}

interface DocentesProducoes {
    docente: {
        id: number;
        lattes: string;
        nome: string;
    };
    qualis: number[];
}

interface DadosGrafico {
    [index: number]: number[];
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Programas() {
    const [selectedPrograma, setProgramaSelected] = useState("")
    const [programas, setProgramas] = useState<ProgramaData[]>([])
    const [docentesProducoes, setDocentesProducoes] = useState<DocentesProducoes[]>([])

    // set indices
    const [iGeral, setIGeral] = useState(0)
    const [iRestrito, setIResttrito] = useState(0)
    const [iNaoRestrito, setINaoRestrito] = useState(0)

    // set stats
    const [producoesStats, setProducoesStats] = useState(0)

    // set dados grafico programa producoes
    const [graficoProgramaProducoes, setGraficoProgramaProducoes] = useState<DadosGrafico>([])

    // set filter
    const [programaId, setProgramaId] = useState(15)
    const [anoInicial, setAnoInicial] = useState(2020)
    const [anoFinal, setAnoFinal] = useState(2023)

    // set props grafico
    const options = setupGraphics.options

    // obtendo programas
    async function getProgramas() {
        const dataPrograma = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/programa/obterProgramas')

                setProgramas(response.data)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataPrograma()
    }

    // obtendo indices
    async function getIndices() {
        const dataIndices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/qualis/indice/${programaId}/${anoInicial}/${anoFinal}`)

                setIGeral(response.data.indice.indiceGeral.toFixed(2))
                setIResttrito(response.data.indice.indiceRest.toFixed(2))
                setINaoRestrito(response.data.indice.indiceNRest.toFixed(2))
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataIndices()
    }

    // obtendo stats
    async function getStatsProducoes() {
        const dataProducoes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/qualis/stats/${programaId}/${anoInicial}/${anoFinal}`)

                setProducoesStats(response.data.producoes)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataProducoes()
    }

    // obtendo dados grafico
    async function getDadosGraficoProgramaProducoes() {
        const dataGraficoProducaoQualis = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/qualis/${programaId}/${anoInicial}/${anoFinal}`)

                setGraficoProgramaProducoes(response.data)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataGraficoProducaoQualis()
    }

    // obtendo dados professores
    async function getDadosProfessoresProducoes() {
        const dataProfessoresProducoes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/programa/obterProducoes/${anoInicial}/${anoFinal}`)

                setDocentesProducoes(response.data)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        dataProfessoresProducoes()
    }

    useEffect(() => {
        getStatsProducoes()
        getDadosProfessoresProducoes()
        getIndices()
        getProgramas()
        getDadosGraficoProgramaProducoes()
    }, [anoInicial, anoFinal])

    const dadosOrdenados = docentesProducoes.slice().sort((a, b) =>
        a.docente.nome.localeCompare(b.docente.nome)
    )

    const conteudoTabela = (
        <>
            <thead>
                <tr className="border-b-2">
                    <td className='bg-slate-700 p-4'>Docentes</td>
                    <td className='bg-slate-700 p-4 text-center'>A1</td>
                    <td className='bg-slate-700 p-4 text-center'>A2</td>
                    <td className='bg-slate-700 p-4 text-center'>A3</td>
                    <td className='bg-slate-700 p-4 text-center'>A4</td>
                    <td className='bg-slate-700 p-4 text-center'>B1</td>
                    <td className='bg-slate-700 p-4 text-center'>B2</td>
                    <td className='bg-slate-700 p-4 text-center'>B3</td>
                    <td className='bg-slate-700 p-4 text-center border-r-2'>B4</td>
                </tr>
            </thead>
            <tbody>
                {dadosOrdenados.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-600' : 'bg-slate-700'}>
                        <td className='p-4'>{item.docente.nome}</td>
                        {item.qualis.map((qualisItem) => (
                            <td className='text-center'>{qualisItem}</td>
                        ))}
                        <td className='border-l-2 text-center'>
                            <Link to={`docente`} className='underline'>
                                Detalhar...
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    )

    function handleSelectedPrograma(event: any) {
        setProgramaSelected(event.target.value)
    }

    function handleAnoInicial(event: any) {
        setAnoInicial(event.target.value)
    }

    function handleAnoFinal(event: any) {
        setAnoFinal(event.target.value)
    }

    function getLabels() {
        var labels = []
        let anoIni = anoInicial
        let anoFim = anoFinal

        while (anoIni <= anoFim) {
            labels.push(anoIni)
            anoIni++
        }

        labels.reverse()
        return labels
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        getStatsProducoes()
        getDadosProfessoresProducoes()
        getIndices()
        getProgramas()
    }

    const dados = {
        labels: getLabels(),
        datasets: [
            {
                label: 'A1',
                data: graficoProgramaProducoes[0],
                backgroundColor: '#4dc9f6',
            },
            {
                label: 'A2',
                data: graficoProgramaProducoes[1],
                backgroundColor: '#f67019'
            },
            {
                label: 'A3',
                data: graficoProgramaProducoes[2],
                backgroundColor: '#537bc4'
            },
            {
                label: 'A4',
                data: graficoProgramaProducoes[3],
                backgroundColor: '#acc236'
            },
        ]
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
                                <Input variant='filled' placeholder='1990' min={1990} max={2023} value={anoInicial} onChange={handleAnoInicial}
                                    className="w-full bg-slate-700 border text-white border-gray-300 p-2 rounded" />
                            </div>
                            <div className='flex flex-col mr-4'>
                                <label htmlFor="" className='mb-2 text-white'>Ano Final</label>
                                <Input variant='filled' placeholder='2023' min={1987} max={2023} value={anoFinal} onChange={handleAnoFinal}
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
                    <Tabela title='Docentes' conteudoTabela={conteudoTabela} />
                </div>
            </div>
        </div>
    );
}