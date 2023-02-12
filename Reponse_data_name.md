
1. User: 
a) Register = `newUser` - (id:token, User.name,User.username, User.password, User.role)
b) Login = `token` -> (user.id, user.role)
c) GetAllusers = `Allusers` -> For admin
---------------------------------------------
2. Basket:
a) Post = `basket` -> (basket.name)
b) Get = `loginBasket` -> (basket.name, basket.userId) -> Tokenlangan user.if ni query zaprosda `token` dab yibaramiz
c) Delete = `basket` -> (basket.id, basket.name, basket.userId)
--------------------------------------------------------
3. Categories:
a) Post = `newCategory` -> (id, name)
b) Get = `categories` -> (id, name)
c) Put = `category` -> (id, name)
d) Delete = `category` -> (id, name)
------------------------------------------
4. Types: 
a) Post = `newType` -> (id, name, img, categories_id)
b) GetbyCatId = `types` -> (id, name, img, categories_id) -> //Eslatma! paramsda  `categories_id` ni `id` o'zgaruvchiga alib yibaramiz
C) GetallTypes = `allTypes`-> (id, name, img, categories_id)
c) Put = `type` -> (id, name, img, categories_id)
d) Delete = `type` -> (id, name, img, categories_id)
---------------------------------------------------------------
5. Products: 
a) Post = `newProduct` -> (id, name, img, price, desc,type_id)
b) GetbyTypeId = `products` -> (id, name, img, price, desc,type_id) -> Elsatma! paramsda  type_id ni `id` o'zgaruvchiga alib yibaramiz
c) GetbySearch = `products` -> (id, name, img, price, desc,type_id) -> Elsatma! query zaprosda key `name` dab yibaramiz
d) GetbyId = `product` -> (id, name, img, price, desc,type_id) -> Basketa id bo'yicha yibarish uchun product.id ni `id` o'zgaruvchiga alib yibaramiz
f) GetallProducts = `allProducts`-> (id, name, img, price, desc,type_id)
e) Put = `product` -> (id, name, img, price, desc,type_id)
h) Delete = `product` -> (id, name, img, price, desc,type_id)
----------------------------------------------------------------------------
6. User_info:
a) Post = `newUser_info` -> (name, surname, phone, viloyat, tuman, shahar, aniq_adress, umummiybahosi, product_id)
b) Get = `user_info` -> (name, surname, phone, viloyat, tuman, shahar, aniq_adress, umummiybahosi, product_id)
c) Delete = `user_info` -> (name, surname, phone, viloyat, tuman, shahar, aniq_adress, umummiybahosi, product_id)

SQL SHELL (psql) = `CREATE DATABASE shop_1;`
Server's terminal = `npx prisma db push`