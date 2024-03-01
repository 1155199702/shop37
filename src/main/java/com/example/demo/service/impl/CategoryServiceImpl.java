package com.example.demo.service.impl;

import com.example.demo.entity.Category;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryMapper categoryMapper;
    @Override
    public List<Category> getCategories() {
        return categoryMapper.selectList(null);
    }

    @Override
    public String addCategory(Category category) {
        categoryMapper.insert(category);
        return "success";
    }

    @Override
    public String updateCategory(Category category) {
        categoryMapper.updateById(category);
        return "update success";
    }

    @Override
    public String deleteCategory(Integer catid) {
        categoryMapper.deleteById(catid);
        return "delete success";
    }
}
