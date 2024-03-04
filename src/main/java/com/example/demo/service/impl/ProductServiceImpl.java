package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Product;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
    public String addProduct(Product product, MultipartFile imgFile) throws IOException {
        //save img (in ec2 ubuntu path)
//        File savePos = new File("/home/ubuntu/app/imgs");
//        if(!savePos.exists()){  // 不存在，则创建该文件夹
//            savePos.mkdir();
//        }
//        // 获取存放位置的规范路径
//        String realPath = savePos.getCanonicalPath();
//        System.out.println(realPath);
//        System.out.println("file changed");
        // 上传该文件/图像至该文件夹下
        String path=System.getProperty("user.dir")+"/static/imgs/";
//        String path=System.getProperty("user.dir")+"/src/main/resources/static/imgs/";
        System.out.println(path);

        imgFile.transferTo(new File(path+product.getImgname()));

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
