package com.manage.employ.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manage.employ.entity.Student;

public interface StudentRepo extends JpaRepository<Student, Long> {
	
	Student getByName(String name);

}
