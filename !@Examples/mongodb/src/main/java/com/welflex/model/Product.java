package com.welflex.model;

import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;
import com.google.code.morphia.annotations.Property;

@Entity(value = "products", noClassnameStored = true)
public class Product {
  @Id
  private String sku;

  @Property
  private String name;

  @Property
  private String description;

  @Property
  private CategoryType categoryType;
  
  @Property
  private double price;
  
  public Product() {}

  public Product withSku(String sku) {
    this.sku = sku;
    return this;
  }
  
  public Product ofType(CategoryType type) {
    this.categoryType = type;
    return this;
  }
  
  public Product withPrice(double price) {
    this.price = price;
    return this;
  } 
  
  public Product withName(String name) {
    this.name = name;
    return this;
  }
  
  public CategoryType getCategoryType() {
    return categoryType;
  }
  
  public void setCategoryType(CategoryType type) {
    this.categoryType = type;
  }
  
  public Product withDescription(String description) {
    this.description = description;
    return this;
  }
  
  public String getSku() {
    return sku;
  }

  public void setSku(String sku) {
    this.sku = sku;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }
}
