package com.manage.employ.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import com.manage.employ.entity.Student;
import com.manage.employ.repository.StudentRepo;
import com.manage.employ.serviceInt.ServiceInt;

@org.springframework.stereotype.Service
public class Service implements ServiceInt {
	@Autowired
	private StudentRepo repo;

	@Override
	public Student saveUserDetails(Student st) {
		// TODO Auto-generated method stub
		return repo.save(st);
	}

	@Override
	public Student getById(Long id) {
		// TODO Auto-generated method stub
		return repo.getById(id);
	}

	@Override
	public Student getByName(String name) {
		// TODO Auto-generated method stub
		return repo.getByName(name);
	}

	@Override
	public List<Student> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
		
	}

	@Override
	public Student updateDetails(Long id, Student st) {
		// TODO Auto-generated method stub
		Student std = repo.getById(id);
		std.setName(st.getName());
		std.setMobile(st.getMobile());
		std.setEmail(st.getEmail());
		std.setPassword(st.getPassword());
		std.setLocation(st.getLocation());
		return repo.save(std);
	}

	@Override
	public Page<Student> page(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

}
