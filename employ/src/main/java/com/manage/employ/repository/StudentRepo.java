package com.manage.employ.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manage.employ.entity.Student;

public interface StudentRepo extends JpaRepository<Student, Long> {
	
	Student getByName(String name);
	List<Student> findByNameContainingIgnoreCase(String name);

}
