package com.example.demo;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.mapper.CategoryMapper;
import lombok.experimental.Accessors;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
class Demo1ApplicationTests {

    @Autowired
    CategoryMapper categoryMapper;
    @Test
    void contextLoads() {
    }

    @Test
    void dbtest(){
        List<Category> categories=categoryMapper.selectList(null);
        for(Category category:categories){
            System.out.println(category);
        }
    }

    @Test
    void pathtest(){
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now);
    }

}
