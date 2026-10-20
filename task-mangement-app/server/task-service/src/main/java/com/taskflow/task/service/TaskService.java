package com.taskflow.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskflow.task.dto.TaskRequest;
import com.taskflow.task.entity.Task;
import com.taskflow.task.entity.TaskStatus;
import com.taskflow.task.repository.TaskRepository;

import jakarta.transaction.Transactional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(TaskRequest request, String ownerEmail) {
        Task task = new Task();

        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setStatus(TaskStatus.TODO);
        task.setOwnerEmail(ownerEmail);

        return taskRepository.save(task);
    }

    public List<Task> getMyTasks(String ownerEmail) {
        return taskRepository.findAllByOwnerEmailOrderByCreatedAtDesc(ownerEmail);
    }

    public Task getTaskById(Long id, String ownerEmail) {
        return taskRepository.findByIdAndOwnerEmail(id, ownerEmail)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Transactional
    public Task updateTask(Long id, TaskRequest request, String ownerEmail) {
        Task task = getTaskById(id, ownerEmail);

        task.setTitle(request.title());
        task.setDescription(request.description());

        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskStatus(Long id, TaskStatus status, String ownerEmail) {
        Task task = getTaskById(id, ownerEmail);
        task.setStatus(status);

        return taskRepository.save(task);
    }

    public void deleteTask(Long id, String ownerEmail) {
        Task task = getTaskById(id, ownerEmail);
        taskRepository.delete(task);
    }

}
