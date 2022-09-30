# logicore-react-pages

[PRG](https://en.wikipedia.org/wiki/Post/Redirect/Get)-like approach for React + Django AJAX apps

Used together with: [Django counterpart](https://github.com/Logicore-project/logicore-django-react-pages)

# Installation

```bash
yarn add logicore-react-pages
```

## Usage

Minimal starter `App.js`:

```javascript
import React from "react";
import { App, mainComponents, componentWrappers } from `logicore-react-pages`;

Object.assign(mainComponents, {
    MyComponent1,
    MyComponent2,
});

Object.assign(componentWrappers, {
    MyWrapper1,
    MyWrapper2,
});

export default App;
```


## License

MIT © [andrewboltachev](https://github.com/andrewboltachev)
