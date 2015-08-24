package com.welflex.model;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Property;
import com.google.code.morphia.annotations.Reference;

@Embedded
public class LineItem {

  @Property
  private int lineNumber;

  @Property
  private int quantity;

  @Reference
  private Product product;
  
  public LineItem withLineNumber(int lineNumber) {
    this.lineNumber = lineNumber;
    return this;
  }
  
  public LineItem withQuantity(int quantity) {
    this.quantity = quantity;
    return this;
  }
  
  public LineItem withProduct(Product product) {
    this.product = product;
    return this;
  }

  public int getLineNumber() {
    return lineNumber;
  }

  public void setLineNumber(int lineNumber) {
    this.lineNumber = lineNumber;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  @Override
  public String toString() {
    return "LineItem [lineNumber=" + lineNumber + ", product=" + product + ", quantity="
      + quantity + "]";
  }
  
}
