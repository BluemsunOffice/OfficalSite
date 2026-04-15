---
title: "异常"
date: 2024-06-21T13:02:51+08:00

image: "/img/blog_pic/java.jpg"
draft: false
weight: 100
author: "韩云硕"
categories: ["后端"]
description: "ArrayIndexOutOfBoundException 数组索引越界"
---
# 异常

### ArrayIndexOutOfBoundException 数组索引越界

```java
 int arr = {11,22,33};
 System.out.println(arr[10]);
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### ClassCastException 类转换异常

### NullPointerException 空指针异常

## 异常体系

### 最顶层父类Throwable

### 子类Error

### StackOverflowError 栈内存溢出

### OutofMemoryError 堆内存溢出

```java
int[] arr = new int [Interger.MAX_VALUE];
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 子类Exception

#### RuntimeException及其子类：运行时异常



#### 除RuntimeException及其子类之外所有类：编译时异常 



## 向上抛出

```java
public class BluemSun {
        public static void main(String[] args) {
            System.out.println("开始");
            method();                   //new ArithmeticException(); JVM
            System.out.println("结束");
        }

        public static void method(){
            System.out.println(10/0);//new ArithmeticException()
        }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 捕获异常

```java
public static void method(){
            try {
                System.out.println(10 / 0);//new ArithmeticException();
            }catch(ArithmeticException a){//ArithmeticException a = new ArithmeticException();
                System.out.println("捕获成功");//执行异常方案
            }
            //new ArithmeticException()
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
public static void method(){
            try {
                int[] arr = null;
                System.out.println(arr[10]);//new NullPointerException();
                System.out.println(10 / 0);//new ArithmeticException();
                
            }catch(ArithmeticException a){//ArithmeticException a = new ArithmeticException();
                System.out.println("捕获成功");//执行异常方案
            }catch(NullPointerException b){
                System.out.println("捕获成功");
            }
            //new ArithmeticException()
        }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
public static void method(){
            try {
                int[] arr = null;
                System.out.println(arr[10]);//new NullPointerException();
                System.out.println(10 / 0);//new ArithmeticException();

            }catch(Exception e){
                System.out.println("捕获成功");//Exception e = new NullPointerException();对象多态
            }
          
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

##  抛出异常

```java
public class BluemSun {
        public static void main(String[] args) throws ParseException {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年mm月dd日");
            Date date = sdf.parse("2024年8月8日");
            System.out.println();
        }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 二者结合

```java
static class Student{
            int age;
            public int getAge() {
                return age;
            }


            public void setAge() throws Exception{                     //抛出异常
                if(age >= 0 && age <= 120){
                    this.age = age;
                }else{
                    throw new Exception("请输入年龄范围在10-20之间的数据");//抛出异常时执行的语句
                }
            }
        }
        class test{
            public static void main(String[] args){
                Student stu = new Student();

                try{                                                //捕获抛出的异常
                    stu.setAge();
                } catch (Exception e) {
                    System.out.println("请输入正确的年龄范围");
                }

            }

        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 自定义异常

```java
public class StudentAgeException extends RuntimeException{   //自定义一个RuntimeException的子类
            
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

# StringBuffer

参考：http://t.csdnimg.cn/BAyyy

StringBuffer：可变长字符串，jdk1.0提供，运行效率慢、线程安全。

## 1.构造方法

```java
//无参构造方法默认容量为16
public StringBuffer(){
        
}
//自定义容量    
public StringBuffer(int capacity) {
   
}
//在创建对象的时候就给其赋值，容量为你的输入+16
public StringBuffer(String str) {
   
}
//类似于第三种构造方法
public StringBuffer(CharSequence seq) {
   
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 2.添加：append（）

```java
buffer.append("A");
System.out.println(buffer);//A
buffer.append("2");
System.out.println(buffer);//A2
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 3.删除：delete（）、deleteCharAt（）

```java
        buffer.append("springboot");//springboot
        
        buffer.delete(6,10);
        System.out.println(buffer);//spring
        
        buffer.deleteCharAt(1);
        System.out.println(buffer);//sring
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 4.insert（）

```java
        buffer.append("springboot");
        //insert（offset，str）从下标offset开始，插入str
        buffer.insert(6,"my");//springmyboot
        
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 5.length(),capacity()

```java
        //length()实际长度
        System.out.println(buffer.length());//10
        //capacity()容量
        System.out.println(buffer.capacity());//26
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

# Stringbuilder

StringBuilder:可变字符串，jdk5.0提供，运行效率快、线程不安全

方法和属性与Stringbuffer一致

# BigDeicmal

参考：http://t.csdnimg.cn/CqX5d

需要导入java.math包，可以精确计算浮点数，但浮点数传给它的时候要用字符串

```java
BigDecimal add(BigDecimal bd)   //加
BigDeimal subtract(BigDecimal bd)  //减
 BigDecimal  multiply(BigDecimal  bd) //乘
 BigDecimal  divide(BigDecimal bd)  //除
 //注意，这个运算只能和自己（本类型）进行相加减，另外除法可能会遇到无限循环小数，除法还有另一个方法
 divide(BigDecimal bd,int scal,RoundingMode mode)
 //参数scale：指定精确到小数点后几位。
 //参数mode：指定小数部分的取舍模式，通常采用四舍五入的模式。取值为BigDecimal.ROUND_HALE_UP。
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 包装类

将基本数据类型，包装成类（变成引用数据类型）

| 基本数据类型 | 引用数据类型 |
| ------------ | ------------ |
| byte         | Byte         |
| short        | Short        |
| int          | Interger     |
| long         | Long         |
| char         | Character    |
| float        | Float        |
| double       | Double       |
| boolean      | Boolean      |

### 手动包装

```java
public class Interger1 {
    public Interger(int num) {
            int num = 10;
            Interger i1 = new Interger(num);//已过时
            Interger i1 = Interger.valueOf(num);//推荐
        }
    }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 手动拆封

```java
public class Interger1 {
    public Interger(int num) {
            int num = 10;
            Interger i1 = new Interger(num);//已过时
            Interger i1 = Interger.valueOf(num);//推荐
            int i = i1.intValue();
        }
    }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 自动装箱

```java
public class Interger1 {
    public Interger(int num) {
            Interger i1 = num;
        }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 自动拆箱

```java
public class Interger1 {
    public Interger(int num) {
            Integer i1 = num ; 
            int i = i1 ; 
        }
    }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 进制转换

```java
public class Interger1 {
    public Interger(int num) {
            int  num = 100 ;         
            System.out.println("Interger.toBinaryString(num)");//二进制
            System.out.println("Interger.toOctalString(num)"); //八进制
            System.out.println("Interger.toHexString(num)");   //十六进制
            String s = '123';
            System.out.println(Integer.parseInt(s) + 100);     //223,数字字符串做加减
        }
    }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## List接口

存取有序，有索引，可以存储重复的。

```java
//和索引有关的API
public void add(int index,E element)://在索引位置添加元素
public E remove (int index)//根据索引删除集合中的元素
public E set(int index,E element);//根据索引修改集合中的元素
public E get(int index);//返回指定索引处的元素
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

遍历list

```java
for(int i = 0 ; i < list.size() ; i++){
            String s = list.get(i);
            System.out.println(s);
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

正向遍历，采用ListIterator（接口）

```java
ListIterator<string> it = list.listInterrater();
        while(it.hasNext()){
            String s = it.next();
            System.out.println(s);
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

逆向遍历，先正向以后指针指向最后一个元素再逆向

```java
ListIterator<string> it = list.listInterrater();
        while(it.hasNext()){
            String s = it.next();
            System.out.println(s);
        }

ListIterator<String> it = list.listInterrater();
        while(it.hasPrevious()){
            String s = it.previous();
            System.out.println(s);
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
List<String> list = new ArrayList<>();
        
        list.add("nihao");
        list.add("wuyu");
        list.add("likeyou");
        
        ListIterator<String> it = list.listInterrater();
        while(it.hasNext()){
            String s = it.next();
            if("likeyou".equals(s)){
                list.remove("likeyou");//并发修改异常,场景:使用[迭代器]遍历集合的过程中,调用了集合对象的添加或删除方法,就会出现此异常.
            }
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
List<String> list = new ArrayList<>();

        list.add("nihao");
        list.add("wuyu");
        list.add("likeyou");

        Iterator<String> it = list.iterator();
        while(it.hasNext()){
            String s = it.next();
            if("likeyou".equals(s)){
                it.remove();//解决方案:迭代器遍历的过程中,不允许使用集合对象的添加或删除,那就使用迭代器自己的添加或删除方法
                            //添加的时候要用list自己的迭代器ListIterator
            }
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 泛型

JDK5引入，可以在编译阶段约束操作的数据类型，并检查。

好处：1.统一数据类型2.将运行期的错误提升到了编译期

```java
ArrayList<String>list = new ArrayList<>();
        list.add("张三");
        list.add("李四");
        list.add("王五");
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
Iterator it = list.iterator();//迭代器不加泛型
        while (it.hasNext()) {
            Object it = it.next();//Object类型
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
Iterator<String> it = list.iterator();//泛型String
        while (it.hasNext()) {
            String s = it.next();
        }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```java
ArrayList<String> list = new ArrayList<>();
        list.add("张三");
        list.add("李四");
        list.add("王五");
        list.add(new Random());//定义泛型为字符串，不能接受其他类型的数据，在编译时就会报错
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 泛型类

泛型标识符：EVKT

E：Element

T：Type

K：Key

V：Value

```java
public class demo1 {

        public static void main(String[] args){
            Student<String> stu = new Student<>();//在创建对象的时候确定泛型类的类型
            stu.getE();
        }

}

class Student<E>{
    private E e;

    public E getE() {
        return e;
    }

    public void setE(E e) {
        this.e = e;
    }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 泛型方法

1.非静态的方法：内部的泛型会根据类的泛型去匹配。

2.静态的方法：静态方法中如果加入了泛型，必须声明出自己独立的泛型

```java
public class demo2 <T>{
    public static void main(String[] args){
        String[] arr1 = {"张三","李四","王五"};
        Integer[] arr2 = {11,22,33};
        Double[] arr3 = {11.1,22.2,33.3};

        printArray(arr1);
        printArray(arr2);
        printArray(arr3);
    }
    public static<T> void printArray(T[] arr){    //静态的方法在内存加载的时候就存在了,在那时就需要定义泛型
        System.out.print("[");
        for (int i = 0; i < arr.length-1; i++) {
            System.out.print(arr[i]+",");
        }
        System.out.print(arr[arr.length-1]+"]");
    }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 泛型接口

```java
public class demo3 {
    public static void main(String[] args){
        InterBImpl<String> i = new InterBImpl<>();
    }
}

interface Inter<E>{
    void show(E e);
}
class InterAImpl implements Inter<String>{    //实现类,实现接口的时候确定到具体的类型
    @Override
    public void show(String s){

    }
}
class InterBImpl<E> implements Inter<E>{    //实现类实现接口,没有指定具体类型,就让接口的泛型,跟着类的泛型去匹配
    @Override
    public void show(E e){

    }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 泛型通配符

？：任意类型

？ extends E ：可以传入的是E，或者是E的子类

？ super E：可以传入的是E，或E的父类

# set接口

HashSet集合特点:
 1.不允许存储重复元素
 2.不包含带索引的方法
 3.是一个无序的集合,存储的元素和取出的元素顺序[有可能]不一致
 4.底层是一个哈希表结构
 JDK1.8之前:数组+单向链表
 JDK1.8之后:数组+单向链表|数组+红黑树     

# map集合

特点:
 1.Map集合是一个双列集合,每个元素包含两个值,一个key,一个value
 2.Map集合中key是不允许重复的,value可以重复
 3.Map集合中一个key只能对应一个value
 4.Map集合中key和value的数据类型可以是相同的,也可以是不同的