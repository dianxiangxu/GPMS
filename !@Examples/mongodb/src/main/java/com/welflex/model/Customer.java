package com.welflex.model;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;
import com.google.code.morphia.annotations.Indexed;
import com.google.code.morphia.utils.IndexDirection;

@Entity(value="customers", noClassnameStored=true)
public class Customer {
  @Id
  private ObjectId id;

  private String firstName;
  @Indexed(value=IndexDirection.DESC, name="lastNameIndex", dropDups=false) 
  private String lastName;
  
  public Customer() {}
  
  public Customer withFirstName(String firstName) {
    this.firstName = firstName;
    return this;
  }
  
  public Customer withLastName(String lastName) {
    this.lastName = lastName;
    return this;
  }
 
  public ObjectId getId() {
    return id;
  }

  public void setId(ObjectId id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return "Customer [firstName=" + firstName + ", id=" + id + ", lastName=" + lastName + "]";
  }
}
