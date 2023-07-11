import { Input } from '@chakra-ui/react'

interface FiltroProps { 
    value: string;
    onChange: (value: string) => void;
}

export default function FiltroTabela({ value, onChange }: FiltroProps): JSX.Element {
    const handleInputChange = (event: any) => {
        onChange(event.target.value)
    }
    
    return (
        <Input variant='filled' placeholder='Buscar...'  value={value} onChange={handleInputChange} className='bg-slate-700 w-48 mr-4 rounded-sm p-1 hover:bg-slate-800 focus:outline focus:outline-2 focus:outline-slate-300 text-white'/>
    )
}