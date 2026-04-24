package com.fitpro.backend.repository;

import com.fitpro.backend.model.DietEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DietRepository
        extends JpaRepository<DietEntry, Long> {

    List<DietEntry> findByUserIdAndEntryDate(
            Long userId, LocalDate date);

    List<DietEntry> findByUserIdOrderByEntryDateDesc(Long userId);

    @Query("SELECT SUM(d.calories) FROM DietEntry d " +
            "WHERE d.user.id = :userId " +
            "AND d.entryDate = :date")
    Integer getTotalCaloriesByDate(Long userId, LocalDate date);

    @Query("SELECT SUM(d.protein) FROM DietEntry d " +
            "WHERE d.user.id = :userId " +
            "AND d.entryDate = :date")
    Double getTotalProteinByDate(Long userId, LocalDate date);
}