package com.welflex.dao;

import java.util.List;

import com.google.code.morphia.DAO;
import com.welflex.model.CategoryType;
import com.welflex.model.Product;
import com.welflex.mongo.MongoConnectionManager;

public class ProductDaoImpl extends DAO<Product, String> implements ProductDao {

  public ProductDaoImpl() {
    super(Product.class, MongoConnectionManager.instance().getDb());
  }

  @Override
  public List<Product> getProducts() {
    return find().asList();
  }

  @Override
  public List<Product> getProductsWithCategory(CategoryType type) {
    return createQuery().field("categoryType").equal(type).asList();
  }

  @Override
  public List<Product> getProductsWithCategory(CategoryType type, double maxPrice) {
    return createQuery().field("price").lessThanOrEq(maxPrice).field("categoryType").equal(type).asList();
  }
}
