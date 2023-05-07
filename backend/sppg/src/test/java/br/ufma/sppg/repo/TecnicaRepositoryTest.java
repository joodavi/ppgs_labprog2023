package br.ufma.sppg.repo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.ufma.sppg.model.Docente;
import br.ufma.sppg.model.Orientacao;
import br.ufma.sppg.model.Tecnica;

@SpringBootTest
public class TecnicaRepositoryTest {
    @Autowired
    private TecnicaRepository repository;

    @Test
    public void deveSalvarTecnica() {
        Tecnica tecnica = Tecnica.builder().tipo("Tipo 1").titulo("Título 1").ano(2023).financiadora("CAPES").outrasInformacoes("Outras informações").qtdGrad(15).qtdMestrado(10).qtdDoutorado(5).build();

        Tecnica salvoTecnica = repository.save(tecnica);

        Assertions.assertNotNull(salvoTecnica);
        Assertions.assertEquals(tecnica.getTipo(), salvoTecnica.getTipo());
        Assertions.assertEquals(tecnica.getTitulo(), salvoTecnica.getTitulo());
        Assertions.assertEquals(tecnica.getAno(), salvoTecnica.getAno());
        Assertions.assertEquals(tecnica.getFinanciadora(), salvoTecnica.getFinanciadora());
        Assertions.assertEquals(tecnica.getOutrasInformacoes(), salvoTecnica.getOutrasInformacoes());
        Assertions.assertEquals(tecnica.getQtdGrad(), salvoTecnica.getQtdGrad());
        Assertions.assertEquals(tecnica.getQtdMestrado(), salvoTecnica.getQtdMestrado());
        Assertions.assertEquals(tecnica.getQtdDoutorado(), salvoTecnica.getQtdDoutorado());
    }

    @Test
    public void deveAtualizarEstatisticasTecnica() {
        Tecnica tecnica = Tecnica.builder().tipo("Tipo 1").titulo("Título 1").ano(2023).financiadora("CAPES").outrasInformacoes("Outras informações").qtdGrad(15).qtdMestrado(10).qtdDoutorado(5).build();

        Tecnica salvoTecnica = repository.save(tecnica);
        salvoTecnica.setTipo("Tipo 2");
        salvoTecnica.setFinanciadora("FAPEMA");
        Tecnica atualizado = repository.save(salvoTecnica);

        Assertions.assertNotNull(atualizado);
        Assertions.assertEquals(salvoTecnica.getTipo(), atualizado.getTipo());
        Assertions.assertEquals(salvoTecnica.getFinanciadora(), atualizado.getFinanciadora());
    }

    @Test
    public void deveImpedirRemoverTecnicaComDependencia() {
        Tecnica tecnica = Tecnica.builder().tipo("Tipo 1").titulo("Título 1").ano(2023).financiadora("CAPES").outrasInformacoes("Outras informações").qtdGrad(15).qtdMestrado(10).qtdDoutorado(5).build();
        
        Docente docente = Docente.builder().lattes("123456789").nome("Professor 1").dataAtualizacao(new Date()).build();
        List<Docente> docentes = new ArrayList<Docente>();
        docentes.add(docente);

        Orientacao orientacao = Orientacao.builder().tipo("Tipo 1").discente("Discente 1").titulo("Título 1").ano(2023).modalidade("Modalidade 1").instituicao("Instituição 1").curso("Curso 1").status("Ativo").build();
        List<Orientacao> orientacoes = new ArrayList<Orientacao>();
        orientacoes.add(orientacao);

        tecnica.setDocentes(docentes);
        tecnica.setOrientacoes(orientacoes);

        Tecnica salvoTecnica = repository.save(tecnica);
        Integer id = salvoTecnica.getId();
        repository.deleteById(id);

        Optional<Tecnica> temp = repository.findById(id);
        // não passou
        // expected: [false] but was: [true]
        Assertions.assertFalse(temp.isEmpty());

    }
}
