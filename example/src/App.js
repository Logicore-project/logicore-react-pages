import React, { useState } from 'react'

import {
  validateDefinition,
  definitionIsInvalid,
  pathToUpdate,
  FormComponent,
  GenericForm,
  formComponents,
  FieldLabel,
  interceptors,
  fieldsLayouts,
  getByPath,
  setByPath,
  modifyHelper,
  update,
} from "logicore-react-pages";

const App = () => {
  return (<div className="container">
    <h3 className="my-3">todo</h3>
  </div>);
}
export default App;
