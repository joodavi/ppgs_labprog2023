package br.ufma.sppg.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;

import br.ufma.sppg.model.Docente;
import br.ufma.sppg.model.Orientacao;
import br.ufma.sppg.model.Producao;
import br.ufma.sppg.model.Programa;
import br.ufma.sppg.model.Tecnica;
import br.ufma.sppg.repo.ProgramaRepository;

public class ServicePrograma {
    @Autowired
    ProgramaRepository repository;

    public Programa salvar(Programa programa) {
        verificarPrograma(programa);
        return repository.save(programa);
    }

    public List<Programa> obterPorInput(Programa nome) {
        Example<Programa> example = Example.of(nome, ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING));

        return repository.findAll(example);
    }

    public List<Programa> obterTodos() {
        return repository.findAll();
    }

    public List<Docente> obterProgramaDocente(Programa programa) {
        verificarPrograma(programa);
        verificarProgramaId(programa.getId());
        List<Docente> docente = repository.obterProgramaDocente(programa.getId());

        return docente;
    }

    public List<Producao> obterProducaoPorQuery(Integer idPrograma, Integer dataInicio, Integer dataFim) {
        verificarProgramaId(idPrograma);
        verificarPeriodo(dataInicio, dataFim);

        List<Producao> producoes = repository.obterProducaoPorQuery(idPrograma, dataInicio, dataFim);

        return producoes;
    }

    public List<Orientacao> obterOrientacaoPorQuery(Integer idPrograma, Integer dataInicio, Integer dataFim) {
        verificarProgramaId(idPrograma);
        verificarPeriodo(dataInicio, dataFim);

        List<Orientacao> producoes = repository.obterOrientacaoPorQuery(idPrograma, dataInicio, dataFim);

        return producoes;
    }

    public List<Tecnica> obterTecnicaPorQuery(Integer idPrograma, Integer dataInicio, Integer dataFim) {
        verificarProgramaId(idPrograma);
        verificarPeriodo(dataInicio, dataFim);

        List<Tecnica> producoes = repository.obterTecnicaPorQuery(idPrograma, dataInicio, dataFim);

        return producoes;
    }

    public List<Producao> obterProducao(Integer idPrograma, Integer dataInicio, Integer dataFim) {
        verificarProgramaId(idPrograma);
        verificarPeriodo(dataInicio, dataFim);
        List<Producao> producoes = new ArrayList<Producao>();
        List<Docente> docentes = repository.obterProgramaDocente(idPrograma);
        List<Producao> producoesDocente = new ArrayList<Producao>();

        for(Docente docente : docentes) {
            producoesDocente = docente.getProducoes();
            for(Producao producao : producoesDocente) {
                if (producao.getAno() >= dataInicio && producao.getAno() <= dataFim) {
                    producoes.add(producao);
                }
            }
        } 

        return producoes;
    }

    public List<Orientacao> obterOrientacao(Integer idPrograma, Integer dataInicio, Integer dataFim) {
        verificarProgramaId(idPrograma);
        verificarPeriodo(dataInicio, dataFim);
        List<Orientacao> orientacoes = new ArrayList<Orientacao>();
        List<Docente> docentes = repository.obterProgramaDocente(idPrograma);
        List<Orientacao> orientacaosDocente = new ArrayList<Orientacao>();

        for(Docente docente : docentes) {
            orientacaosDocente = docente.getOrientacoes();
            for(Orientacao orientacao : orientacaosDocente) {
                if (orientacao.getAno() >= dataInicio && orientacao.getAno() <= dataFim) {
                    orientacoes.add(orientacao);
                }
            }
        } 

        return orientacoes;
    }

    public List<Tecnica> obterTecnica(Integer idPrograma, Integer dataInicio, Integer dataFim) {
        verificarProgramaId(idPrograma);
        verificarPeriodo(dataInicio, dataFim);
        List<Tecnica> tecnicas = new ArrayList<Tecnica>();
        List<Docente> docentes = repository.obterProgramaDocente(idPrograma);
        List<Tecnica> tecnicasDocente = new ArrayList<Tecnica>();

        for(Docente docente : docentes) {
            tecnicasDocente = docente.getTecnicas();
            for(Tecnica tecnica : tecnicasDocente) {
                if (tecnica.getAno() >= dataInicio && tecnica.getAno() <= dataFim) {
                    tecnicas.add(tecnica);
                }
            }
        } 

        return tecnicas;
    }

    // public List<Double> obterProgramaIndices(Integer idPrograma, Integer dataInicio, Integer dataFim) {
    //     verificarProgramaId(idPrograma);
    //     verificarPeriodo(dataInicio, dataFim);
    //     Double indice = 0.0;
    //     List<String> indicesPrograma = repository.obterProgramaIndices(idPrograma, dataInicio, dataFim);

    //     for()
    // }

    private void verificarPeriodo(Integer dataInicio, Integer dataFim) {
        if (dataInicio > dataFim)
            throw new ServiceRuntimeException("A primeira data inserida não pode ser 'maior' que a segunda");
        
        if (dataInicio == dataFim)
            throw new ServiceRuntimeException("As datas não podem ser iguais");
    }

    private void verificarProgramaId(Integer idPrograma) {
        if (idPrograma == null)
            throw new ServiceRuntimeException("Programa nulo ou sem ID");
    }

    private void verificarPrograma(Programa programa) {
        if (programa == null) 
            throw new ServiceRuntimeException("Um programa válido deve ser informado");

        if ((programa.getNome() == null) || (programa.getNome().equals("")))
            throw new ServiceRuntimeException("O programa deve conter um nome");

    }
}
