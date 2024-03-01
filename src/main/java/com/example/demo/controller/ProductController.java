package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductService productService;

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
    public String getProducts(@RequestBody Product product){

        System.out.println(product);
        return productService.addProduct(product);
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
