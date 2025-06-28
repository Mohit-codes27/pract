# React + Vite

## Common Errors and Troubleshooting

### 1. Context Import/Export Mismatch
**Error:**
```
TypeError: Cannot read properties of undefined (reading 'Provider')
```
or
```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.
```
**Cause:**  
Using the context provider component (`UserContext`) as the context object in `useContext`.  
**Solution:**  
Use `UserDataContext` for `useContext`, and `UserContext` only as a provider.

---

### 2. Incorrect Redux Dispatch Payload
**Error:**  
No error, but user data is not set in Redux state.
**Cause:**  
Dispatching `login(userData)` instead of `login({ userData })`.
**Solution:**  
Always dispatch as `dispatch(login({ userData }))`.

---

### 3. Missing or Incorrect Component Exports
**Error:**  
```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.
```
**Cause:**  
Component is not exported as default or imported incorrectly.
**Solution:**  
Ensure every component is exported as default and imported with the correct path.

---

### 4. Route Element is Undefined
**Error:**  
Same as above.
**Cause:**  
Route element in `createBrowserRouter` is not a valid React component.
**Solution:**  
Check all route elements are valid components.

---

### 5. Multiple React Versions
**Error:**  
Unpredictable errors, often similar to the above.
**Cause:**  
Multiple versions of React in `node_modules`.
**Solution:**  
Run `npm ls react` and ensure only one version is installed.

---

### 6. Incorrect Context Usage in UserProtectedWrapper
**Error:**  
```
TypeError: Cannot destructure property 'user' of 'React.useContext(...)' as it is undefined.
```
**Cause:**  
Using `UserContext` instead of `UserDataContext` in `useContext`.
**Solution:**  
Import and use `UserDataContext` for `useContext`.

---

### 7. Missing Dependencies
**Error:**  
```
Module not found: Can't resolve 'react-redux'
```
**Cause:**  
Not all required packages are installed.
**Solution:**  
Run `npm install` to install all dependencies.

---

### 8. Asset Path Issues (Vite)
**Error:**  
404 errors for assets like CSS or JS.
**Cause:**  
Incorrect asset paths in `index.html`.
**Solution:**  
Check and fix asset paths.

---

### 9. Using Hooks Outside Providers
**Error:**  
```
Invalid hook call. Hooks can only be called inside of the body of a function component.
```
**Cause:**  
Using hooks like `useDispatch`, `useNavigate`, or `useContext` outside their respective providers.
**Solution:**  
Ensure your component tree is wrapped with `<Provider>`, `<RouterProvider>`, etc.

---

**If you see any of these errors, check the corresponding cause and solution above.**
