package com.taskflow.task.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskflow.task.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByOwnerEmailOrderByCreatedAtDesc(String email);

    Optional<Task> findByIdAndOwnerEmail(Long id, String ownerEmail);

}
