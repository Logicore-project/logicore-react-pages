# logicore-react-pages

[PRG](https://en.wikipedia.org/wiki/Post/Redirect/Get)-like approach for React + Django AJAX apps

Used together with: [Django counterpart](https://github.com/Logicore-project/logicore-django-react-pages)

## Usage

1. Perform installation and configuration of `logicore-django-react` and `logicore-django-react-pages`: https://github.com/Logicore-project/logicore-django-react-pages#usage

2. Install:

```bash
yarn add logicore-react-pages
```

3. Create minimal starter `App.js`:

```javascript
import React from "react";
import { App, mainComponents, wrapperComponents } from "logicore-react-pages";

const MainWrapper = ({ result, onChange }) => {
  const Component = mainComponents[result?.template];
  return (
    <>
      {Component && result && <Component {...{ ...result, onChange }} />}
    </>
  );
};

Object.assign(wrapperComponents, {
    MainWrapper,
});


const HomeView = (props) => {
  return <div>Hello, {props.name}</div>;
};

Object.assign(mainComponents, {
    HomeView,
});

export default App;
```


## License

MIT © [andrewboltachev](https://github.com/andrewboltachev)
