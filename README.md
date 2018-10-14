# Quantified Self- Express

# DOCUMENTATION

## Food Endpoints:

#### GET /api/v1/foods
- Retrieve all foods currently in the database
- If successful, this request will return a response in the following format:
  
```
[
  {
    "id": 1,
    "name": "Apple",
    "calories": "10"
  },
  {
    "id": 2,
    "name": "Banana",
    "calories": "80"
  },
  {
    "id": 3,
    "name": "Orange",
    "calories": "30"
  },
  {
    "id": 4,
    "name": "Peach",
    "calories": "40"
  },
  {
    "id": 5,
    "name": "Plum",
    "calories": "50"
  }
]
```

#### GET /api/v1/foods/:id
- Retrieve a single food based on the :id
- If the food is not found, a 404 will be returned.
- If successful, this request will return a response in the following format:
  
```
{
  "id": 1,
  "name": "Apple",
  "calories": "10"
},
```

#### POST /api/v1/foods
- Create a single food 
- ***Both name and calories are required parameters.*** 
- If the food is not successfully created, a 400 status code will be returned. 
- If successful, this request will return a response in the following format:
  
```
{
  "id": 1,
  "name": "DragonFruit",
  "calories": "50"
}
```