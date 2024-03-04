package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductForm;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    private ResourceLoader resourceLoader;

    @RequestMapping("/product/get")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @RequestMapping("/product/getByCatId/{catid}")
    public List<Product> getProductsByCatId(@RequestBody @PathVariable("catid") Integer catid){

        System.out.println(catid);
        return productService.getProductsByCatId(catid);
    }

    @RequestMapping("/product/getById/{pid}")
    public Product getProductById(@RequestBody @PathVariable("pid") Integer pid){

        System.out.println(pid);
        return productService.getProductById(pid);
    }

    @PostMapping("/product/add")
    public String addProduct(@RequestParam("product") String productJson, @RequestParam("imgFile")MultipartFile imgFile) throws IOException {
        // 处理productJson参数
        ObjectMapper objectMapper = new ObjectMapper();
        Product product;
        try {
            product = objectMapper.readValue(productJson, Product.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // 处理JSON解析异常
            return "Error parsing JSON";
        }

        System.out.println(product);
        System.out.println(imgFile.getName());
        try {
            return productService.addProduct(product,imgFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/product/update")
    public String updateProducts(@RequestBody Product product){

        System.out.println(product);
        return productService.updateProduct(product);
    }

    @DeleteMapping("/product/delete/{pid}")
    public String updateProducts(@PathVariable("pid") Integer pid){

        System.out.println(pid);
        return productService.deleteProduct(pid);
    }




}
