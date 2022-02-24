## Category
### GET /category
Get all categories

- Request

```
Nothing
```

- Return
category[]
```js
// example
{
  classes:                  // array or classes
  {                
    uuid: string;           // class uuid
    title: string;          // class title
    subtitle: string;       // class subtitle
    memberType: MemberType; // student or instructor
  }[];
  status: number;
}
```

<br>

### GET /category/order
Get category order array

ObjectId[]

<br>

---

## Tab
### GET /category/:catid
Get tabs of category '_id : catid'

tab[]

<br>

### GET /category/:catid/order
Get tab order array of category '_id : catid'

ObjectId[]

<br>
### PUT /category/:catid/order
Change tab order array of category '_id : catid'

ObjectId[]
changed order
