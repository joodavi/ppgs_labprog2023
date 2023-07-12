import Indicadores from "../components/Indicadores";
import { Bar } from 'react-chartjs-2';
import Tabela from "../components/Tabela";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Input } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import axios from "axios";
import setupGraphics from "../setupGraphics";

interface DocenteOrientacoes {
    orientacaoTipo: string;
    orientacaoDiscente: string;
    orientacaoTitulo: string;
    orientacaoAno: number;
}

interface DocenteOrientacoesTabela {
    dados: DocenteOrientacoes[]
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

const tecnicas = [
    {
        titulo: 'Palestra', tipo: "Palestra", ano: 2022
    },
    {
        titulo: 'Palestra', tipo: "Software", ano: 2022
    }
]

export default function Docente() {
    // set docente
    const [docenteId, setDocenteId] = useState(15)
    const [docenteNome, setDocenteNome] = useState('')
    const [docenteLattes, setDocenteLattes] = useState('')
    const [docenteProducoesTotal, setDocenteProducoesTotal] = useState(0)

    // set filter
    const [anoInicial, setAnoInicial] = useState(2020)
    const [anoFinal, setAnoFinal] = useState(2023)

    // set orientacoes docente
    const [docenteOrientacoes, setDocenteOrientacoes] = useState<DocenteOrientacoes[]>([])

    // set props grafico
    const options = setupGraphics.options

    async function getDocenteData() {
        const docenteData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/docente/obterDocente/${docenteId}`)

                setDocenteId(response.data.id)
                setDocenteNome(response.data.nome)
                setDocenteLattes(response.data.lattes)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        docenteData()
    }

    async function getDocenteOrientacoes() {
        const docenteOrientacoes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/docente/obterOrientacoes/${docenteId}/${anoInicial}/${anoFinal}`)

                setDocenteOrientacoes(response.data)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        docenteOrientacoes()
    }

    async function getDocenteProducoes() {
        const docenteProducoes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/docente/obterProducoes/${docenteId}/${anoInicial}/${anoFinal}`)

                setDocenteProducoesTotal(response.data.length)
            } catch (e) {
                console.log("Erro", e)
            }
        }

        docenteProducoes()
    }

    useEffect(() => {
        getDocenteData()
        getDocenteOrientacoes()
        getDocenteProducoes()
    }, [anoInicial, anoFinal])

    function handleAnoInicial(event: any) {
        setAnoInicial(event.target.value)
    }

    function handleAnoFinal(event: any) {
        setAnoFinal(event.target.value)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        getDocenteData()
        getDocenteOrientacoes()
    }

    function getLabels() {
        var labels = []
        let anoIni = anoInicial
        let anoFim = anoFinal

        while (anoIni <= anoFim) {
            labels.push(anoIni)
            anoIni++
        }

        return labels
    }

    const dados = {
        labels: getLabels(),
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

    const conteudoTabelaOrientacoes = (
        <>
            <thead>
                <tr className="border-b-2">
                    <td className='bg-slate-700 p-4 w-2/5'>Discentes</td>
                    <td className='bg-slate-700 p-4 text-center'>Título</td>
                    <td className='bg-slate-700 p-4 text-center w-2/12'>Tipo</td>
                    <td className='bg-slate-700 p-4 text-center w-1/12'>Ano</td>
                </tr>
            </thead>
            <tbody>
                {docenteOrientacoes.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-600' : 'bg-slate-700'}>
                        <td className='p-4'>{item.orientacaoDiscente}</td>
                        <td className='p-4'>{item.orientacaoTitulo}</td>
                        <td className='p-4'>{item.orientacaoTipo}</td>
                        <td className='p-4'>{item.orientacaoAno}</td>
                    </tr>
                ))}
            </tbody>
        </>
    )

    const conteudoTabelaTecnicas = (
        <>
            <thead>
                <tr className="border-b-2">
                    <td className='bg-slate-600 p-4'>Título</td>
                    <td className='bg-slate-700 p-4 text-center w-2/12'>Tipo</td>
                    <td className='bg-slate-600 p-4 text-center w-1/12'>Ano</td>
                </tr>
            </thead>
            <tbody>
                {tecnicas.map((item) => (
                    <tr>
                        <td className='bg-slate-600 p-4'>{item.titulo}</td>
                        <td className='bg-slate-700 p-4 text-center'>{item.tipo}</td>
                        <td className='bg-slate-600 p-4 text-center'>{item.ano}</td>
                    </tr>
                ))}
            </tbody>
        </>
    )

    const conteudoTabelaArtigos = artigos.map((i) =>
        <>
            <thead>
                <tr className="border-b-2">
                    <td className='bg-slate-600 p-4'>Título</td>
                    <td className='bg-slate-700 p-4 text-center w-2/12'>Local</td>
                    <td className='bg-slate-600 p-4 text-center w-2/12'>Tipo</td>
                    <td className='bg-slate-700 p-4 text-center w-1/12'>Qualis</td>
                    <td className='bg-slate-600 p-4 text-center w-1/12'>Ano</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='bg-slate-600 p-4'>{i.titulo}</td>
                    <td className='bg-slate-700 p-4 text-center'>{i.local}</td>
                    <td className='bg-slate-600 p-4 text-center'>{i.tipo}</td>
                    <td className='bg-slate-700 p-4 text-center'>{i.qualis}</td>
                    <td className='bg-slate-600 p-4 text-center'>{i.ano}</td>
                </tr>
            </tbody>
        </>
    )

    return (
        <div className='bg-slate-800 flex flex-col items-center h-max w-full py-4'>
            <div className='w-8/12'>
                <div className="flex flex-row justify-between mb-2 align-middle">
                    <div className="flex">

                        <h1 className='text-white font-semibold text-2xl mb-1'>Docente: {docenteNome}</h1>
                        <a href={`http://lattes.cnpq.br/${docenteLattes}`} className="w-4 h-4" target="_blank">
                            <img src="https://icons.iconarchive.com/icons/academicons-team/academicons/256/lattes-icon.png" alt="Lattes icon" />
                        </a>
                    </div>
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
                <div className='flex justify-between'>
                    <Indicadores color='bg-gray-400' quantidade={docenteProducoesTotal} titulo='Total Produções' />
                    <Indicadores color='bg-cyan-600' quantidade={220} titulo='I Geral' />
                    <Indicadores color='bg-green-600' quantidade={220} titulo='I Restrito' />
                    <Indicadores color='bg-amber-400' quantidade={220} titulo='I Não Restrito' />
                </div>
                <Bar data={dados} options={options} />
                {/* <Bar data={dados} options={options} /> */}
                <Tabela title="Orientações" conteudoTabela={conteudoTabelaOrientacoes} />
                <Tabela title="Técnicas" conteudoTabela={conteudoTabelaTecnicas} />
                <Tabela title="Artigos" conteudoTabela={conteudoTabelaArtigos} />
            </div>
        </div>
    )
}