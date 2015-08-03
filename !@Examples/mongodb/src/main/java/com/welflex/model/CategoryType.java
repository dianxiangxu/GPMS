package com.welflex.model;

public enum CategoryType {
  CAMERA(1), GAMING_CONSOLE(2), TELEVISION(3);
  
  private final int type;
  
  CategoryType(int type) {
    this.type = type;
  }
  
  public int getType() {
    return type;
  }
  
  public int getValue() {
    return type;
  }
}
