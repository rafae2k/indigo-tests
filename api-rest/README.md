# Getting Started

1. Clone the repo

   ```sh
   git clone https://github.com/rafae2k/indigo-tests
   ```

2. Enter the project folder
   ```sh
   cd indigo-tests
   ```
3. Install NPM packages
   ```sh
   yarn install
   ```
4. run dev server on port 3001
   ```sh
   yarn dev
   ```
5. Import the `Insomnia_2022-09-22.json` file into Insomnia to test the API

## API Reference

#### Get all heroes

```http
  GET /heroes
```

### Get hero by id

```http
  GET /heroes/${id}
```

### Create hero

```http
  POST /heroes
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `name`        | `string` | **Required**. Hero name        |
| `description` | `string` | **Required**. Hero description |

### Update hero

```http
  PUT /heroes/${id}
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `name`        | `string` | **Required**. Hero name        |
| `description` | `string` | **Required**. Hero description |

### Delete hero

```http
  DELETE /heroes/${id}
```
