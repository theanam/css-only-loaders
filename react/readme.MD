## React component for the CSS only loader project

#### How to use

Download the module with npm (or yarn)

    yarn add cssonly-loaders-react

The module come with two component, `<Loader/>` and `<FullLoader/>`, The Loader is also a default export.

to use only the loader, component, without any wrapper or anything, use the sample code:
```js
    import Loader from "cssonly-loaders-react";

    function App(props){
        return (
            <Loader>
        )
    }
```

Every prop has default, so,it will still render without any props, It should render the `simple-circle` loader with default colors and attributes. 

If you want to use a loader, that fills in the container and blocks everything(most probable use IMO) you need to use the `FullLoader` component. 

To use the full loader, make sure the loader container has position set to anothing other than `static`. because this component relies on position `absolute`.

Here's a barebone sample code:

```js
    import Loader from "cssonly-loaders-react";

    function App(props){
        return (
            <FullLoader>
        )
    }
```
It should render the `simple circle` loader with all the default color and attributes with a semi-transparent, black `rgba(0,0,0,0.4)` backdrop.

> You can change the loader attributes with props

#### List of props:

