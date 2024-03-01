package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    public List<Category> getCategories();

    public String addCategory(Category category);

    public String updateCategory(Category category);

    public String deleteCategory(Integer catid);
}
