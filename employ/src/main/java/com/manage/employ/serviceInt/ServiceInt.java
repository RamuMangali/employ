package com.manage.employ.serviceInt;

import java.util.List;

import org.springframework.data.domain.Page;

import com.manage.employ.entity.Student;

public interface ServiceInt {
	
	Student saveUserDetails(Student st);
	Student getById(Long id);
	Student getByName(String name);
	List<Student> getAll();
	void delete(Long id);
	Student updateDetails(Long id,Student st);
	Page<Student> page(Page page);
	

}
