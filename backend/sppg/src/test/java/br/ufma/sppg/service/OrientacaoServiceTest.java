package br.ufma.sppg.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.ufma.sppg.model.Docente;
import br.ufma.sppg.model.Orientacao;
import br.ufma.sppg.model.Producao;
import br.ufma.sppg.model.Programa;
import br.ufma.sppg.model.Tecnica;
import br.ufma.sppg.repo.DocenteRepository;
import br.ufma.sppg.repo.OrientacaoRepository;
import br.ufma.sppg.repo.ProducaoRepository;
import br.ufma.sppg.repo.TecnicaRepository;
import br.ufma.sppg.service.exceptions.ServicoRuntimeException;
import jakarta.transaction.Transactional;

@SpringBootTest
public class OrientacaoServiceTest {
    @Autowired
    OrientacaoService service;

    @Autowired
    OrientacaoRepository repository;

    @Autowired
    DocenteRepository docenteRepository;

    @Autowired 
    ProducaoRepository producaoRepository;

    @Autowired
    TecnicaRepository tecnicaRepository;

    @Test
    @Transactional
    public void deveInformarPeriodoValido() {
        //Cenario
        Docente docente = Docente.builder().lattes("123456").nome("Docente 1").dataAtualizacao(new Date()).build();

        Orientacao orientacao1 = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao2 = Orientacao.builder().tipo("Tipo 2").discente("Discente 2").titulo("Titulo 2").ano(2020).modalidade("Modalidade 2").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao3 = Orientacao.builder().tipo("Tipo 3").discente("Discente 3").titulo("Titulo 3").ano(2021).modalidade("Modalidade 3").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao4 = Orientacao.builder().tipo("Tipo 4").discente("Discente 4").titulo("Titulo 4").ano(2022).modalidade("Modalidade 4").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao5 = Orientacao.builder().tipo("Tipo 5").discente("Discente 5").titulo("Titulo 5").ano(2023).modalidade("Modalidade 5").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Docente docenteSalvo =  docenteRepository.save(docente);

        //Acao
        Assertions.assertThrows(ServicoRuntimeException.class, () -> {
            service.obterOrientacaoDocente(docenteSalvo.getId(), 2023, 2022);
        }, "Ano inicial maior que ano fim");
    }

    @Test
    @Transactional
    public void deveObterOrientacoesDocentePorPeriodo() {
        // Cenario
        Docente docente = Docente.builder().lattes("123456").nome("Docente 1").dataAtualizacao(new Date()).build();

        Orientacao orientacao1 = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao2 = Orientacao.builder().tipo("Tipo 2").discente("Discente 2").titulo("Titulo 2").ano(2020).modalidade("Modalidade 2").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao3 = Orientacao.builder().tipo("Tipo 3").discente("Discente 3").titulo("Titulo 3").ano(2021).modalidade("Modalidade 3").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao4 = Orientacao.builder().tipo("Tipo 4").discente("Discente 4").titulo("Titulo 4").ano(2022).modalidade("Modalidade 4").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Orientacao orientacao5 = Orientacao.builder().tipo("Tipo 5").discente("Discente 5").titulo("Titulo 5").ano(2023).modalidade("Modalidade 5").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

        Docente docenteSalvo =  docenteRepository.save(docente);

        Orientacao orientacaoSalvo1 = repository.save(orientacao1);
        Orientacao orientacaoSalvo2 = repository.save(orientacao2);
        Orientacao orientacaoSalvo3 = repository.save(orientacao3);
        Orientacao orientacaoSalvo4 = repository.save(orientacao4);
        Orientacao orientacaoSalvo5 = repository.save(orientacao5);

        //Acao
        List<Orientacao> orientacoes = service.obterOrientacaoDocente(docente.getId(), 2020, 2022);

        Assertions.assertNotNull(orientacoes);
        Assertions.assertEquals(3, orientacoes.size());
        Assertions.assertEquals(orientacaoSalvo2.getId(), orientacoes.get(0).getId());
        Assertions.assertEquals(orientacaoSalvo3.getOrientador().getLattes(), docenteSalvo.getLattes());
    }

    // @Test
    // @Transactional
    // public void deveObterOrientacoesProgramaPorPeriodo() {
    //     // Cenario
    //     Programa programa = Programa.builder().nome("Programa 1").build();
    //     List<Programa> programas = new ArrayList<>();
    //     programas.add(programa);

    //     Docente docente = Docente.builder().lattes("123456").nome("Docente 1").dataAtualizacao(new Date()).build();

    //     docente.setProgramas(programas);

    //     Orientacao orientacao1 = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

    //     Orientacao orientacao2 = Orientacao.builder().tipo("Tipo 2").discente("Discente 2").titulo("Titulo 2").ano(2020).modalidade("Modalidade 2").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

    //     Orientacao orientacao3 = Orientacao.builder().tipo("Tipo 3").discente("Discente 3").titulo("Titulo 3").ano(2021).modalidade("Modalidade 3").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

    //     Orientacao orientacao4 = Orientacao.builder().tipo("Tipo 4").discente("Discente 4").titulo("Titulo 4").ano(2022).modalidade("Modalidade 4").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

    //     Orientacao orientacao5 = Orientacao.builder().tipo("Tipo 5").discente("Discente 5").titulo("Titulo 5").ano(2023).modalidade("Modalidade 5").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").orientador(docente).build();

    //     Docente docenteSalvo =  docenteRepository.save(docente);

    //     Orientacao orientacaoSalvo1 = repository.save(orientacao1);
    //     Orientacao orientacaoSalvo2 = repository.save(orientacao2);
    //     Orientacao orientacaoSalvo3 = repository.save(orientacao3);
    //     Orientacao orientacaoSalvo4 = repository.save(orientacao4);
    //     Orientacao orientacaoSalvo5 = repository.save(orientacao5);

    //     //Acao
    //     List<Orientacao> orientacoes = service.obterOrientacaoPrograma(docente.getId(), 2020, 2022);

    //     Assertions.assertNotNull(orientacoes);
    //     Assertions.assertEquals(3, orientacoes.size());
    //     Assertions.assertEquals(orientacaoSalvo2.getId(), orientacoes.get(0).getId());
    //     Assertions.assertEquals(orientacaoSalvo3.getOrientador().getLattes(), docenteSalvo.getLattes());
    // }

    @Test
    @Transactional
    public void deveAssociarOrientacaoTecnica() {
        // Cenario
        Orientacao orientacao = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").build();

        Tecnica tecnica = Tecnica.builder().tipo("Tipo 1").ano(2022).financiadora("CAPES").outrasInformacoes("Outras informacoes").qtdGrad(10).qtdMestrado(5).qtdDoutorado(2).build();

        Orientacao orientacaoSalvo = repository.save(orientacao);
        Tecnica tecnicaSalvo = tecnicaRepository.save(tecnica);

        service.associarOrientacaoTecnica(orientacaoSalvo.getId(), tecnicaSalvo.getId());

        Assertions.assertNotNull(orientacaoSalvo);
        Assertions.assertEquals(orientacaoSalvo.getTecnicas().get(0).getFinanciadora(), tecnicaSalvo.getFinanciadora());
    }

    @Test
    @Transactional
    public void deveAssociarOrientacaoProducao() {
        // Cenario
        Orientacao orientacao = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").build();

        Producao producao = Producao.builder().tipo("Tipo 1").issnOuSigla("Sigla").ano(2023).nomeLocal("Local").titulo("Titulo").qualis("A1").percentileOuH5((float) 2).qtdGrad(10).qtdMestrado(3).qtdDoutorado(1).build();

        Orientacao orientacaoSalvo = repository.save(orientacao);
        Producao producaoSalvo = producaoRepository.save(producao);

        //Acao
        service.associarOrientacaoProducao(orientacaoSalvo.getId(), producaoSalvo.getId());

        Assertions.assertNotNull(orientacaoSalvo);
        Assertions.assertEquals(orientacaoSalvo.getProducoes().get(0).getPercentileOuH5(), producaoSalvo.getPercentileOuH5());
    }

    @Test
    @Transactional
    public void naoDeveAssociarOrientacaoProducaoRepetido() {
        // Cenario
        Orientacao orientacao = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").build();

        Producao producao1 = Producao.builder().tipo("Tipo 1").issnOuSigla("Sigla").ano(2023).nomeLocal("Local").titulo("Titulo").qualis("A1").percentileOuH5((float) 2).qtdGrad(10).qtdMestrado(3).qtdDoutorado(1).build();

        Orientacao orientacaoSalvo = repository.save(orientacao);
        Producao producaoSalvo1 = producaoRepository.save(producao1);

        //Acao
        List<Producao> producoes = new ArrayList<>();
        producoes.add(producaoSalvo1);

        orientacaoSalvo.setProducoes(producoes);
        repository.save(orientacaoSalvo);

        Assertions.assertThrows(ServicoRuntimeException.class, () -> {
            service.associarOrientacaoProducao(orientacaoSalvo.getId(), producaoSalvo1.getId());
        }, "Produção já associada.");
    }
    @Test
    @Transactional
    public void naoDeveAssociarOrientacaoTecnicaRepetido() {
        // Cenario
        repository.deleteAll();
        tecnicaRepository.deleteAll();
        Orientacao orientacao = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Titulo 1").ano(2019).modalidade("Modalidade 1").instituicao("UFMA").curso("Ciencia da Computacao").status("Ativo").build();

        Tecnica tecnica1 = Tecnica.builder().tipo("Tipo 1").ano(2022).financiadora("CAPES").outrasInformacoes("Outras informacoes").qtdGrad(10).qtdMestrado(5).qtdDoutorado(2).build();

        Orientacao orientacaoSalvo = repository.save(orientacao);
        Tecnica tecnicaSalvo1 = tecnicaRepository.save(tecnica1);

        List<Tecnica> lTecnicas = new ArrayList<>();
        lTecnicas.add(tecnicaSalvo1);

        orientacaoSalvo.setTecnicas(lTecnicas);
        repository.save(orientacaoSalvo);

        Assertions.assertThrows(ServicoRuntimeException.class, () -> {
            service.associarOrientacaoTecnica(orientacaoSalvo.getId(), tecnicaSalvo1.getId());
        }, "Técnica já associada.");
    }
}
