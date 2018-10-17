# api fur admin

base_url=/admin/api

## 网站基础

### `get` /site

获取网站基本配置

不用

### `get` /home

不用

### `post` /login

照旧

### get /upload/token



```javascript
{
  token:""
}

```



### `post` /file/upload
上传

- request payload

```javascript
{
	file: 
	category:
    token:
    url:"null"
}
```

- response



```javascript
{

  url:""
}

```



### `get` /site/settings

获取设置项，不考虑

### `post` /site/settings

改变设置项，不考虑

## 资源管理

base_url=/admin/api/:resource

### `get` /

- response

```javascript
{
  total: data.length, //总项数
  perPage, //每页放几个
  page, //一共多少页
  data: [{},{}] //数据
}
```

### `get` /grid

```javascript
{
    {
  "searchModel": {},
  "searchFields": {
    渲染搜索字段
    ...参考 字段定义...
  },
  "fields": {
    渲染表格字段
    ...参考 字段定义...
  }
}
}
```



### `get` /view

//返回对应的fields

- response

```javascript
{
  fields:{
    ...
  }
}
```

### `get` /:id
// 单个项目的数据

- response

```javascript
{
  data:{
    ...
  }
}
```

### `put` /:id
// 更新单个项目的数据

- response

```javascript
{
  data:{
    ...
  }
}
```

### `post` /
//创建新项目

- params

```javascript
{
  data:{

  }
}
```

- response

```javascript
{
  data:{
    ...
  }
}
```

### `delete` /:id
//删除项目

- params

```javascript
{
  id:
}
```

- response

```javascript
{
  success: true
}
```

## 各项配置说明

### 活动管理 activity

```javascript
data: [],
fields: {
  id: {cols: 3},
  type: {
    label: '种类', 
    type: 'radiolist', cols: 3, options: [
      { text: '文化课', value: '文化课' },
      { text: '兴趣课', value: '兴趣课' },
      { text: '思想沙龙', value: '思想沙龙' },
      { text: '公益晚会', value: '公益晚会' },
      { text: '其他', value: '其他' },
    ], searchable: true, description: '请选择活动类型'
  },
  name: {label: '活动名称',  cols: 6, searchable: true },
  ownerId: {label: '组长ID',  cols: 3 },
  place: {label: '地点',  cols: 3 },
  finished: {label: '是否结束', type: 'switch', cols: 3 },
  presented: {label: '是否展示', type: 'switch', cols: 3 },
  image: {label: '图片', type: 'image', cols: 6 },
  conclusion: {label: '总结', type: 'html', listable: false, cols: 6 },
  description: {label: '描述', type: 'html', listable: false, cols: 6 },
  beginTime: { label: '开始时间', type: 'date' },
  lasting: {label: '持续时间', cols: 3 }
}
```

### 知识点 point & 题型讲解 explain & 学习指导 guidance

```javascript
data: [对应的东西],
fields: {
  id: {cols: 3},
  file: {label: '文件', type: 'file'},
  name: {label: '名称', cols: 6, searchable: true },
  uploadTime: { label: '上传日期', type: 'date' },
  grade: {label: '年级', type: 'number', cols: 3, sortable: true },
  subject: {label: '学科', cols: 3, searchable: true },
  description: {label: '描述', type: 'html', listable: false, cols: 6 },
  contributor: {label: '上传人', cols: 3 },
  }
```

### 典型例题 example

在上面的基础上去掉contributor

加上

```javascript
fields: {
  teacher: {label: '讲解人', cols: 3 },
  image: {label: '图片', type: 'image', cols: 6 }
}
```

### 学习经验 experience

```javascript
data: [对应的东西],
fields: {
  id: {cols: 3},
  title:{label: '标题', cols: 3 },
  content: {label: '内容', type: 'html', listable: false, cols: 6 },
  contributor: {label: '分享人', cols: 3 },
  uploadTime: { label: '上传日期', type: 'date' }
  }
```

### 大学介绍 school

```javascript
data: [对应的东西],
fields: {
  id: {cols: 3},
  name:{label: '学校名称', cols: 3 },
  type:{label: '学校类别', cols: 3 },
  content: {label: '内容', type: 'html', listable: false, cols: 6 },
  uploadTime: { label: '上传日期', type: 'date' }
  }
```

### 学科介绍 subject
大学介绍基础上加上：

```javascript
fields: {
  major:{label: '专业', cols: 3 }
  }
```

### 用户管理 user

```javascript
data: [对应的东西],
fields: {
  id: {cols: 3},
  name: {label: '用户名',  cols: 3, searchable: true },
  name: {label: '真实姓名',  cols: 3, searchable: true },
  email: {label: '邮箱',  cols: 3 },
  phone: {label: '电话号码',  cols: 3 },
  qq: {label: 'QQ',  cols: 3 },
  description: {label: '描述', type: 'html', listable: false, cols: 6 },
  school: {label: '学校名称', cols: 3 },
  avatar: {label: '头像', type: 'image', cols: 6 },
  presented: {label: '是否管理员', type: 'switch', cols: 3 },
  }
```

