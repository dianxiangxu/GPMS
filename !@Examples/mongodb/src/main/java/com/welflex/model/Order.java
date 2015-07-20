package com.welflex.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Embedded;
import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;
import com.google.code.morphia.annotations.PrePersist;
import com.google.code.morphia.annotations.Property;
import com.google.code.morphia.annotations.Reference;

@Entity(value="orders", noClassnameStored=true)
public class Order {
  @Id
  private ObjectId id;

  @Reference
  private Customer customer;

  @Embedded
  private List<LineItem> lines;
 
  @Property  
  private Date creationDate;
  
  private Date lastUpdateDate;
  
  public ObjectId getId() {
    return id;
  }

  public void setObjectId(ObjectId id) {
    this.id = id;
  }

  public Order withCustomer(Customer customer) {
    this.customer = customer;
    return this;
  }

  public Order withLineItems(LineItem... lineItems) {
    if (lines == null) {
      lines = new ArrayList<LineItem>();
    }
    lines.addAll(Arrays.asList(lineItems));
    return this;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public List<LineItem> getLines() {
    return lines;
  }

  public void setLines(List<LineItem> lines) {
    this.lines = lines;
  }
  
  @PrePersist
  public void prePersist() {
    this.creationDate = (creationDate == null) ? new Date() : creationDate;
    this.lastUpdateDate = (lastUpdateDate == null) ? creationDate : new Date();
  }

  @Override
  public String toString() {
    return "Order [customer=" + customer + ", id=" + id + ", createDate=" + creationDate + ", lastUpdateDate=" + lastUpdateDate + ", lines=" + lines + "]";
  }
}
