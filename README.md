# dataexplorer-redux
DataExplorer prototype using Redux.

The state of the page is stored in a single JavaScript object and only gets modified using actions.

The single state object looks like this:
```
{
  entities: [{
    href:,
    fullName:,
    label:,
    simpleName:,
    description:
  },...], // Array of all entity metadata retrieved from the entities repository
  entity: {
    href:,
    fullName:,
    label:,
    simpleName:,
    description:
  }, // the entity selected from entities
  items: [{
    href:,
    <attr_1>: value1,
    <attr_2>: value2,
    ...
    <attr_n>: valuen
  },...], //First page of data that happened to get retrieved together with the entity's metadata, 
          //This is hacky, should fetch the selected attributes only
  metaData: {
    attributes: [{
      href:,
      fieldType:,
      name:,
      label:
      attributes: [...]
    }], // the attribute tree, including compound attributes
    description:,
    ... // rest of v2 metadata response object
  },
  selectedAtomicAttributes: ['attr_1', 'attr_3', ...] // array of Strings containing the fullName of selected atomic attributes, in order of appearance in the tree
}
```

The actions that modify it are
* `RECEIVE_ENTITIES`: When the list of entities is received
* `SELECT_ENTITY`: When the user selects an entity in the pulldown
* `RECEIVE_META_DATA`: When the metadata for the selected entity is received
* `SELECT_ALL_ATTRIBUTES`: When the user pushes the Select All button, also dispatched by `RECEIVE_META_DATA`
* `DESELECT_ALL_ATTRIBUTES`: When the user pushes the Deselect All button
* `ATTRIBUTE_SELECTION_CHANGE`: When the user toggles selection of a single (possibly compound) attribute in the attribute tree

To try it out:
```
> git clone git@github.com:fdlk/dataexplorer-redux.git
> npm install
> npm start
```

Surf to http://localhost:3000/ using a relatively modern browser.
You can inspect the current state and see the state changes if you open up the console.
