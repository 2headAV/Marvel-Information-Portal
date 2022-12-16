
# __Marvel Information Portal__

__Marvel Information Portal__ - is a web application that provides a beautiful library of Marvel characters as well as comics.

The application is made on the basis of an open API. The link to this API can be found below.

[MarvelAPI](https://developer.marvel.com/) (*to use the API you need to register and get a key*)

**API Request and Response Examples:**

*Request URL*
```
https://gateway.marvel.com:443/v1/public/characters?apikey=YOUR_API_KEY
```

*Response Body*
```js
{
  "code": 200,
  "status": "Ok",
  "copyright": "© 2022 MARVEL",
  "attributionText": "Data provided by Marvel. © 2022 MARVEL",
  "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2022 MARVEL</a>",
  "etag": "5b840945d6261a12b00b45da83568a5cec4afceb",
  "data": {
    "offset": 0,
    "limit": 20,
    "total": 1562,
    "count": 20,
    "results": [chasters and comic]
  }
}
```

**P.S.** The number of requests for this API is limited, only **3000** requests per day.


## **Technologies**
___

The application is made using the following technologies:
 + [HTML](https://webplatform.github.io/docs/html/)
 + [CSS/SCSS](https://sass-lang.com/)
 + [React](https://reactjs.org/)
  
  *In the future, it is planned to add the `Redux Toolkit` to the project.*

  ## Install Dependencies
  ___
  To install dependencies, use the following command:
  ```
  npm install
  ```
  To run the application, use the following command in a terminal:
  ```
  npm start
  ```

## To contact me
___

Telegram: **[nyyyytipo](https://t.me/nyyyytipo)**

Gmail: **artemav.3701@gmail.com**