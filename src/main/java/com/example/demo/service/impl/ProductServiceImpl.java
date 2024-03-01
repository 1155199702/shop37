package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Product;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductMapper productMapper;
    @Override
    public List<Product> getProducts() {
        return productMapper.selectList(null);
    }

    @Override
    public List<Product> getProductsByCatId(Integer catid) {
        QueryWrapper<Product> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("catid",catid);
        return productMapper.selectList(queryWrapper);
    }

    @Override
    public String addProduct(Product product) {
        productMapper.insert(product);
        return "add product success";
    }

    @Override
    public String updateProduct(Product product) {
        productMapper.updateById(product);
        return "update product success";
    }

    @Override
    public String deleteProduct(Integer pid) {
        productMapper.deleteById(pid);
        return "delete product success";
    }

    @Override
    public Product getProductById(Integer pid) {
        return productMapper.selectById(pid);
    }
}
