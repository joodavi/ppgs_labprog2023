package br.ufma.sppg.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufma.sppg.model.Docente;
import br.ufma.sppg.model.Orientacao;
import br.ufma.sppg.model.Producao;
import br.ufma.sppg.model.Programa;
import br.ufma.sppg.model.Tecnica;

public interface ProgramaRepository 
    extends JpaRepository<Programa, Integer> {
        @Query("SELECT d FROM Docente d " + 
            "JOIN d.programa p " +
            "WHERE p.id = :programaId")
        List<Docente> obterProgramaDocente(Integer id);

        @Query("SELECT p FROM Producao p " +
                "JOIN p.docente d " +
                "JOIN d.programa pr " +
                "WHERE pr.id = :programaId " +
                "AND p.ano >= :dataInicio " +
                "AND p.ano <= :dataFim")
            List<Producao> obterProducaoPorQuery(Integer programaId, Integer dataInicio, Integer dataFim);

        @Query("SELECT o FROM Orientacao o " +
                "JOIN o.docente d " +
                "JOIN d.programa pr " +
                "WHERE pr.id = :programaId " +
                "AND o.dataInicio >= :dataInicio " +
                "AND o.dataFim <= :dataFim")
            List<Orientacao> obterOrientacaoPorQuery(Integer programaId, Integer dataInicio, Integer dataFim);

        @Query("SELECT t FROM Tecnica t " +
                "JOIN t.docente d " +
                "JOIN d.programa pr " +
                "WHERE pr.id = :programaId " +
                "AND t.dataInicio >= :dataInicio " +
                "AND t.dataFim <= :dataFim")
            List<Tecnica> obterTecnicaPorQuery(Integer programaId, Integer dataInicio, Integer dataFim);

        // @Query("SELECT pr.qualis FROM Programa pr " +
        //         "JOIN pr.docentes d " +
        //         "JOIN d.producoes p " +
        //         "WHERE pr.id = :programaId " +
        //         "AND p.data >= :dataInicio " +
        //         "AND p.data <= :dataFim")
        //     List<String> obterProgramaIndices(Integer programaId, Integer dataInicio, Integer dataFim);
}
