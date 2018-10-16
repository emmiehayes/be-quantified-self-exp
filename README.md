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
  "food": 6
}
```

#### PATCH /api/v1/foods/:id  
- Update an existing food 
- ***Only field(s) updated are required parameters.*** 
- If the food is not successfully updated, a 400 status code will be returned.
- If successful, this request will return a response in the following format:
  
```
{
  message: `Food with id:${id} was successfully updated.`
}
```

#### DELETE /api/v1/foods/:id
- Delete and exisiting food 
- If the food can’t be found, a 404 will be returned.
- If successful, the request will return a 204 status code.


## Food Endpoints:

#### GET /api/v1/meals

- Retrieve all the meals along with their associated foods
- If successful, this request will return a response in the following format:

```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 4,
                "name": "Banana",
                "calories": 140
            },
            {
                "id": 3,
                "name": "Waffle",
                "calories": 67
            },
            {
                "id": 12,
                "name": "Honey",
                "calories": 60
            }
        ]
    },
    {
        "id": 2,
        "name": "Lunch",
        "foods": [
            {
                "id": 3,
                "name": "Avocado",
                "calories": 67
            },
            {
                "id": 4,
                "name": "Toast",
                "calories": 15
            },
        ]
    }
]
```

#### GET /api/v1/meals/:meal_id/foods

- Retrieve all foods associated with a single meal 
- If the meal is not found, a 404 will be returned.
- If successful, this request will return a response in the following format:

```
{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 140
        },
        {
            "id": 6,
            "name": "Waffle",
            "calories": 67
        },
        {
            "id": 12,
            "name": "Honey",
            "calories": 60
        }
    ]
}
```

#### POST /api/v1/meals/:meal_id/foods/:id

- Add a single food to a meal 
- If the food is not successfully added to the meal, a 400 status code will be returned. 
- If successful, this request will return a response in the following format:

```
{
    "message": "Successfully added Honey to Breakfast"
}
```


#### DELETE /api/v1/meals/:meal_id/foods/:id

- Delete a single food from a meal
- If the food is not listed for the meal, a 404 will be returned.
- If successful, this request will return a response in the following format:

```
{
    "message": "Successfully removed Banana from Breakfast"
}
```

