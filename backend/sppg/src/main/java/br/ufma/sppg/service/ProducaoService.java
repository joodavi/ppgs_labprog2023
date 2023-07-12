package br.ufma.sppg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufma.sppg.dto.DocenteProducaoDTO;
import br.ufma.sppg.model.Docente;
import br.ufma.sppg.model.Orientacao;
import br.ufma.sppg.model.Producao;
import br.ufma.sppg.model.Programa;
import br.ufma.sppg.repo.DocenteRepository;
import br.ufma.sppg.repo.OrientacaoRepository;
import br.ufma.sppg.repo.ProducaoRepository;
import br.ufma.sppg.repo.ProgramaRepository;
import br.ufma.sppg.service.exceptions.ServicoRuntimeException;
import jakarta.transaction.Transactional;


/*
 * A QUANTIDADE DE A1,A2,... POR ANO
 * SORT()
 */
@Service
public class ProducaoService {
    
    @Autowired
    ProducaoRepository prodRepo;

    @Autowired
    DocenteRepository docRepo;

    @Autowired
    ProgramaRepository progRepo;

    @Autowired
    OrientacaoRepository oriRepo;

    //TODO: checar tempo de processamento
    public List<Producao>obterProducoesPPG(Integer idPrograma, Integer data1, Integer data2){


        //É Presumido que o usuário coloque em data1 o valor mais baixo e em data2 o valor mais alto como por exemplo
        //data1=2016, data2=2023. Esta função verifica se a ordem esperada foi trocada e ajusta para que não ocorra erros
        if (data1 >= data2){
            Integer data = data2;
            data2 = data1;
            data1 = data;
        }

        Optional<Programa> programa = progRepo.findById(idPrograma);
        if(programa.isPresent()){

            //Verificando se o Programa possui Docentes cadastrados
            if(progRepo.getReferenceById(idPrograma).getDocentes() == null 
            || progRepo.getReferenceById(idPrograma).getDocentes().isEmpty())
                throw new ServicoRuntimeException("O programa não possui Docentes cadastrados");

            ArrayList<Producao> producoes = new ArrayList<>();

            for(int i = 0; i < progRepo.getReferenceById(idPrograma).getDocentes().size(); i++){
                //Verificando se o Docente do laço possui Array de Produções
                if(progRepo.getReferenceById(idPrograma).getDocentes().get(i).getProducoes() != null
                && !progRepo.getReferenceById(idPrograma).getDocentes().get(i).getProducoes().isEmpty())
                {
                    for(int j = 0; j< progRepo.getReferenceById(idPrograma).getDocentes().get(i).getProducoes().size(); j++){
                        if(progRepo.getReferenceById(idPrograma).getDocentes().get(i).getProducoes().get(j).getAno() >= data1
                        && progRepo.getReferenceById(idPrograma).getDocentes().get(i).getProducoes().get(j).getAno() <= data2){
                            producoes.add(progRepo.getReferenceById(idPrograma).getDocentes().get(i).getProducoes().get(j));
                        }
                    }
                }
            }
            if(producoes.isEmpty())
                throw new ServicoRuntimeException("O Programa não possui Docentes com Produções no periodo especificado");

            return producoes;
        }
        throw new ServicoRuntimeException("Programa Inexistente");

    };

    public List<Producao>obterProducoesDocente(Integer idDocente, Integer data1, Integer data2){

        //É Presumido que o usuário coloque em data1 o valor mais baixo e em data2 o valor mais alto como por exemplo
        //data1=2016, data2=2023. Esta função verifica se a ordem esperada foi trocada e ajusta para que não ocorra erros
        if (data1 >= data2){
            Integer data = data2;
            data2 = data1;
            data1 = data;
        }

        Optional<Docente> docente = docRepo.findById(idDocente);
        if(docente.isPresent()){

            if(docRepo.getReferenceById(idDocente).getProducoes() == null 
            || docRepo.getReferenceById(idDocente).getProducoes().isEmpty())
                throw new ServicoRuntimeException("O Docente não possui nenhuma Produção Registrada");

            ArrayList<Producao> producoes = new ArrayList<>();

            for(int i = 0; i < docRepo.getReferenceById(idDocente).getProducoes().size(); i++){
                if(docRepo.getReferenceById(idDocente).getProducoes().get(i).getAno() >= data1
                && docRepo.getReferenceById(idDocente).getProducoes().get(i).getAno() <= data2){
                    producoes.add(docRepo.getReferenceById(idDocente).getProducoes().get(i));
                }
            }
            if(producoes.isEmpty())
                throw new ServicoRuntimeException("O Docente não possui nenhuma Produção no periodo especificado");

            return producoes;
        }
        throw new ServicoRuntimeException("Docente Inexistente");
    }
    
    private void verificarProducao(Producao producao){
        if(producao==null)
            throw new ServicoRuntimeException("Produção deve ser Informada");
        if(producao.getTipo() == null || producao.getTipo() == "")
            throw new ServicoRuntimeException("O tipo da Produção deve ser informado");
        if(producao.getIssnOuSigla() == null || producao.getIssnOuSigla() == "")
            throw new ServicoRuntimeException("A Issn/Sigla da Produção deve ser informada");
        if(producao.getNomeLocal() == null || producao.getNomeLocal() == "")
            throw new ServicoRuntimeException("O nome local da Produção deve ser informado");
        if(producao.getTitulo() == null || producao.getTitulo() == "")
            throw new ServicoRuntimeException("O titulo da Produção deve ser informado");
        if(producao.getAno() == null)
            throw new ServicoRuntimeException("O ano da Produção deve ser Informado");
        if(producao.getAno() < 0)
            throw new ServicoRuntimeException("Informe um ano válido para a Produção");
        if(producao.getQualis() == null || producao.getQualis() == "")
            throw new ServicoRuntimeException("A qualis da Produção deve ser informada");
        Float percentileOuH5 = producao.getPercentileOuH5();
        if(percentileOuH5 == null || percentileOuH5 < 0)
            throw new ServicoRuntimeException("O percentile/h5 da Produção deve ser informado");
        if(producao.getQtdGrad() == null)
            throw new ServicoRuntimeException("A quantidade de Graduandos da Produção deve ser informada");
        if(producao.getQtdGrad() < 0)
            throw new ServicoRuntimeException("Deve ser informado uma quantia real de Graduandos da Produção");
        if(producao.getQtdMestrado() == null)
            throw new ServicoRuntimeException("A quantidade de Mestrandos da Produção deve ser informada");
        if(producao.getQtdMestrado() < 0)
            throw new ServicoRuntimeException("Deve ser informado uma quantia real de Mestrandos da Produção");
        if(producao.getQtdDoutorado() == null)
            throw new ServicoRuntimeException("A quantidade de Doutorandos da Produção deve ser informada");
        if(producao.getQtdDoutorado() < 0)
            throw new ServicoRuntimeException("Deve ser informado uma quantia real de Doutorandos da Produção");
    }

    @Transactional
    public Producao informarEstatisticasProducao(Producao producao){
        verificarProducao(producao);
        return prodRepo.save(producao);
    }

    public List<Orientacao> obterOrientacaoProducao(Integer idProducao){
        Optional<Producao> producao = prodRepo.findById(idProducao);
        if(producao.isPresent()){
            if(prodRepo.getReferenceById(idProducao).getOrientacoes() != null)
                return prodRepo.getReferenceById(idProducao).getOrientacoes();
        }
        throw new ServicoRuntimeException("A Producao não existe");
    }

    public List<DocenteProducaoDTO> obterProducoesDocentes(Integer anoIni, Integer anoFim) {
        final Integer menorData = anoIni;
        final Integer maiorData = anoFim;
    
        List<DocenteProducaoDTO> producoes = docRepo.findAll().stream()
            .filter(docente -> {
                List<Producao> producoesDocente = docRepo.getReferenceById(docente.getId()).getProducoes();
                return producoesDocente != null && !producoesDocente.isEmpty();
            })
            .map(docente -> {
                List<Producao> producoesDocente = docRepo.getReferenceById(docente.getId()).getProducoes();
                List<Producao> producoesFiltradas = producoesDocente.stream()
                    .filter(producao -> {
                        Integer ano = producao.getAno();
                        return ano >= menorData && ano <= maiorData;
                    })
                    .collect(Collectors.toList());
    
                return DocenteProducaoDTO.builder()
                    .docente(docente)
                    .producoes(producoesFiltradas)
                    .build();
            })
            .collect(Collectors.toList());
    
        if (producoes.isEmpty()) {
            throw new ServicoRuntimeException("O Docente não possui nenhuma Produção Registrada");
        }
    
        return producoes;
    }

}
