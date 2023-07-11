interface IndicadoresProps {
    titulo: string;
    color: string;
    quantidade: number;
}

export default function Indicadores({ quantidade, titulo, color }: IndicadoresProps) {
    return (
        <div>
            <div className="flex flex-row justify-between mr-4 w-48 h-fit p-2 rounded-sm bg-slate-400">
                <div className='flex'>
                    <div className={`w-12 h-15 ${color} rounded-sm`} />
                    <div className='ml-2 text-white'>
                        <h3>{titulo}</h3>
                        <div className='w-mx h-0.5 rounded-r-lg bg-gradient-to-r from-slate-800 to-slate-400 mb-2' />
                        <b className='mb-12'>{quantidade}</b>
                    </div>
                </div>
            </div>
        </div>
    )
}