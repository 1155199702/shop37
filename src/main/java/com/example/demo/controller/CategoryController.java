package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    CategoryMapper categoryMapper;

    @Autowired
    CategoryService categoryService;
    @RequestMapping("/test")
    public String hello(){
        return "hello world";
    }

    @RequestMapping("/dbtest")
    public List<Category> dbtest(){
        List<Category> categories=categoryMapper.selectList(null);
        return categories;
    }

    @RequestMapping("/category/get")
    public List<Category> getProducts(){
        return categoryService.getCategories();
    }

    @PostMapping("/category/add")
    public String getProducts(@RequestBody Category category){

        System.out.println(category);
        return categoryService.addCategory(category);
    }

    @PostMapping("/category/update")
    public String updateProducts(@RequestBody Category category){

        System.out.println(category);
        return categoryService.updateCategory(category);
    }

    @DeleteMapping("/category/delete/{catid}")
    public String updateProducts(@PathVariable("catid") Integer catid){

        System.out.println(catid);
        return categoryService.deleteCategory(catid);
    }
}
